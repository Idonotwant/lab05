import api from "./axiosClient";
export const user = {
  async getContent() {
    const { data } = await api.get("/users/content");
    return data;
  },
  async createContent({ newFormData }) {
    const { data } = await api.post("/users/createContent", newFormData);
    return data;
  },
  async modContent({ newFormData }) {
    const { data } = await api.post("/users/modContent", newFormData);
    return data;
  },
  async deleteContent({ newFormData }) {
    const { data } = await api.post("/users/deleteContent", newFormData);
    return data;
  },
  async login({ formData }) {
    const { data } = await api.post("/users/login", formData);
    return data;
  },
  async createOne({ formData }) {
    const { accountName, nickName, passWord, picture } = formData;
    const passData = new FormData();
    passData.append("accountName", accountName);
    passData.append("nickName", nickName);
    passData.append("passWord", passWord);
    passData.append("picture", picture);
    const { data } = await api.post("/users", passData);
    return data;
  },
};
