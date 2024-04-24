import { prisma } from "../../../../adapters.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getContent(req, res) {
  try {
    const allContents = await prisma.content.findMany();
    for (const content of allContents) {
      // 對每一個內容執行額外的操作
      const user = await prisma.user.findUnique({
        where: {
          accountName: content.accountName,
        },
      });
      const picture = await prisma.picture.findUnique({
        where: {
          id: user.pictureId,
        },
      });
      // 將額外的資料添加到 content 物件中，例如：
      content.accountName = user.accountName;
      content.nickName = user.nickName;
      content.pictureId = picture.id;
      const base64Image = picture.picture.toString("base64");
      content.picture = `data:image/jpeg;base64,${base64Image}`;
    }
    res.status(200).json(allContents);
  } catch (error) {
    res.status(500).send("Could not find posts");
  }
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createContent(req, res) {
  try {
    const token = req.cookies.token;
    const { contents } = req.body;

    // 驗證 JWT
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        // 如果 JWT 驗證失敗，返回未授權的錯誤
        return res.status(401).send("Unauthorized");
      }
      const usr = decoded;
      const { accountName } = usr;
      const content = await prisma.content.create({
        data: {
          accountName,
          content: contents,
        },
      });
      res.status(200).json(content);
    });
  } catch (error) {
    return;
  }
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function modContent(req, res) {
  try {
    const token = req.cookies.token;
    const { id, contents, accountName } = req.body;

    // 驗證 JWT
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        // 如果 JWT 驗證失敗，返回未授權的錯誤
        return res.status(401).send("Unauthorized");
      }
      const usr = decoded;
      const usrname = usr.accountName;

      // 更新帖子的内容
      if (usrname == accountName) {
        const updatedContent = await prisma.content.update({
          where: { id },
          data: { content: contents },
        });
        return res.status(200).json(updatedContent);
      } else {
        return res.status(401).send("Not your post");
      }
    });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).send("Could not update content");
  }
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteContent(req, res) {
  try {
    const token = req.cookies.token;
    const { id, accountName } = req.body;
    console.log(req.body);
    // 驗證 JWT
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        // 如果 JWT 驗證失敗，返回未授權的錯誤
        return res.status(401).send("Unauthorized");
      }
      const usr = decoded;
      const usrname = usr.accountName;

      // 檢查帖子的作者是否與當前用戶匹配
      if (usrname === accountName) {
        // 如果匹配，則刪除帖子
        await prisma.content.delete({
          where: { id },
        });

        // 返回成功的消息
        return res.status(200).send("Content deleted successfully");
      } else {
        // 如果帖子的作者與當前用戶不匹配，返回錯誤消息
        return res.status(401).send("Not your post");
      }
    });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).send("Could not delete content");
  }
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function login(req, res) {
  const { accountName, passWord } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { accountName } });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const validPassword = await bcrypt.compare(passWord, user.passWord);

    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }
    const newUser = { ...user };
    delete newUser.passWord;
    const token = jwt.sign(newUser, process.env.JWT_KEY);
    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Could not log in");
  }
}

//謝謝GPT

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneUser(req, res) {
  const { accountName, nickName, passWord } = req.body;
  const file = req.file;
  try {
    // 讀取圖片文件的二進制數據
    const pictureBytea = Buffer.from(file.buffer);
    // 將圖片數據上傳到資料庫中，並獲取到自動生成的 ID
    const picture = await prisma.picture.create({
      data: {
        picture: pictureBytea,
      },
    });

    // 使用剛剛獲取到的圖片 ID 來創建用戶
    const salt = await bcrypt.genSalt(10);
    const hashedPassWord = await bcrypt.hash(passWord, salt);
    const user = await prisma.user.create({
      data: {
        accountName,
        nickName,
        passWord: hashedPassWord,
        pictureId: picture.id,
      },
    });
    const newUser = { ...user };
    delete newUser.passWord;
    // 返回創建的用戶對象
    return res.status(201).json({ newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Could not create user" });
  }
}
