import { useContext, useEffect, useState } from "react";
import services from "../services";
import mypic from "/IU.png";
import { AuthContext } from "../services/authContent";

function PostPage() {
  const [contents, setContents] = useState([]);
  const [isModOpen, setIsModOpen] = useState(false);
  useEffect(() => {
    // 在進入 "posts" 頁面時發送 GET 請求到後端
    services.user
      .getContent() // 假設你的後端路由為 '/api/posts'
      .then((data) => {
        // 從後端獲取到的資料
        const fetchedPosts = data;
        // 更新本地狀態中的資料
        for (const fetchedPost of fetchedPosts) {
          const dataURI = fetchedPost.picture;
          fetchedPost.picture = dataURI;
        }
        setContents(fetchedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ contents: "" });
  const { userData } = useContext(AuthContext);
  const handleFormOpen = () => {
    setIsOpen(!isOpen);
    setFormData((prev) => ({
      ...prev,
      ["contents"]: "",
    }));
  };
  const handleFormModify = (postId) => {
    // 根據 postId 執行相應的修改操作，例如打開一個編輯表單
    console.log("Modify post with ID:", postId);
    const post = contents.find((item) => item.id === postId);
    setFormData((prev) => ({
      ...prev,
      ["contents"]: post.content,
      ["id"]: postId,
    }));
    setIsModOpen(true);
    // 這裡可以打開編輯表單或者其他操作
  };
  const handleFormModSubmit = (event) => {
    const newFormData = { ...formData };
    newFormData.accountName = userData.accountName;
    services.user.modContent({ newFormData });
    setIsModOpen(!isModOpen);
    setFormData((prev) => ({
      ...prev,
      ["contents"]: "",
      ["id"]: "",
    }));
    event.preventDefault();
  };
  const handleFormModOpen = () => {
    setIsModOpen(!isModOpen);
    setFormData((prev) => ({
      ...prev,
      ["contents"]: "",
      ["id"]: "",
    }));
  };
  const handleFormDelete = (postId) => {
    // 確認用戶是否確認刪除
    if (window.confirm("Are you sure you want to delete this content?")) {
      // 調用後端接口刪除帖子
      const newFormData = {};
      newFormData.id = postId;
      newFormData.accountName = userData.accountName;
      services.user
        .deleteContent({ newFormData })
        .then(() => {
          // 刷新頁面或者執行其他操作
          // 這裡可以添加相應的代碼
        })
        .catch((error) => {
          console.error("Error deleting content:", error);
          // 處理刪除失敗的情況
          // 這裡可以添加相應的代碼
        });
    }
  };
  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = (event) => {
    // services.user.login({ formData }).then((data) => {
    //   setMessage(JSON.stringify(data, null, 2));
    // });
    const newFormData = { ...formData };
    newFormData.accountName = userData.accountName;
    services.user.createContent({ newFormData }).then((data) => {
      if (data && data.content) {
        return;
      }
    });
    setIsOpen(!isOpen);
    setFormData((prev) => ({
      ...prev,
      ["contents"]: "",
    }));
    event.preventDefault();
  };
  return (
    <div className=" pr-3 bg-cyberAccent flex flex-grow flex-col">
      <div>
        {isOpen && (
          <div className="right-sidebar-modal w-full">
            <div className="right-sidebar-modal-content">
              <form className="flex flex-col">
                <div className="flex justify-center items-center w-full">
                  <label htmlFor="name" className=" font-bold">
                    Write something
                  </label>
                </div>
                <input
                  type="text"
                  id="contents"
                  name="contents"
                  required
                  maxLength={200}
                  className=" h-32"
                  onChange={handleTextInputChange}
                  value={formData.contents}
                />
                <div className=" mt-3">
                  <button
                    type="submit"
                    onClick={handleFormSubmit}
                    className="bg-cyberAccent font-bold  px-4 rounded-full border-2  mb-1 float-right"
                  >
                    Submit
                  </button>
                  <button
                    className="bg-cyberAccent font-bold  px-4 rounded-full border-2  mb-1 float-right"
                    onClick={handleFormOpen}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {!isOpen && (
          <div className="flex justify-center items-center w-full pt-4">
            <button
              className="bg-cyberAccent font-bold  px-4 rounded-full border-2  mb-1 "
              onClick={handleFormOpen}
            >
              createPost
            </button>
          </div>
        )}
        {isModOpen && (
          <div className="right-sidebar-modal w-full">
            <div className="right-sidebar-modal-content">
              <form className="flex flex-col">
                <div className="flex justify-center items-center w-full">
                  <label htmlFor="name" className=" font-bold">
                    Write something
                  </label>
                </div>
                <input
                  type="text"
                  id="contents"
                  name="contents"
                  required
                  maxLength={200}
                  className=" h-32"
                  onChange={handleTextInputChange}
                  value={formData.contents}
                />
                <div className=" mt-3">
                  <button
                    type="submit"
                    onClick={handleFormModSubmit}
                    className="bg-cyberAccent font-bold  px-4 rounded-full border-2  mb-1 float-right"
                  >
                    Submit
                  </button>
                  <button
                    className="bg-cyberAccent font-bold  px-4 rounded-full border-2  mb-1 float-right"
                    onClick={handleFormModOpen}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {contents.map((post) => (
        <div
          key={post.id}
          className="flex flex-row bg-cyberSub w-full h-56 border-2 rounded-lg m-2"
        >
          <div className="flex-shrink-0 w-36 py-3 px-1">
            <img
              src={post.picture}
              alt="Picture"
              className=" w-36 flex items-center justify-center"
            ></img>
          </div>
          <div className=" ml-3 mt-3 flex flex-col flex-grow">
            <div className="flex h-8 flex-row w-full border-b-2">
              <div className=" w-1/3  flex flex-row">
                <span className="inline-block w-20">{post.nickName}</span>
              </div>
              <div className="flex flex-row-reverse w-2/3 float-right pr-2">
                <button className="bg-cyberAccent font-bold  px-4 rounded-full border-2 float-right mb-1 mx-1">
                  bad
                </button>
                <button className="bg-cyberAccent font-bold  px-4 rounded-full border-2 float-right mb-1 mx-1">
                  good
                </button>
                {userData.accountName &&
                  userData.accountName === post.accountName && (
                    <>
                      <button
                        className="bg-cyberAccent font-bold  px-4 rounded-full border-2 float-right mb-1 mx-1"
                        onClick={() => handleFormModify(post.id)}
                      >
                        modify
                      </button>
                      <button
                        onClick={() => handleFormDelete(post.id)}
                        className="bg-cyberAccent font-bold  px-4 rounded-full border-2 float-right mb-1 mx-1"
                      >
                        delete
                      </button>
                    </>
                  )}
              </div>
            </div>
            <div className=" flex h-full mb-3 rounded-lg bg-cyberAccent mt-2 mr-2">
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostPage;

// useEffect(() => {
//   service.user.getAll().then((allUsers) => {
//     setPosts(allUsers);
//   });
// }, []);
