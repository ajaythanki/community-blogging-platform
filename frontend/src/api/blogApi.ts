import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}blogs/`;

const createBlog = async (blogData: unknown) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);
  console.log("userData?.token",userData);

  const { data }: any = await axios.post(`${baseURL}`, blogData, {
    headers: {
      Authorization: `Bearer ${userData && userData.userData?.token}`,
    },
  });
  return data;
};
const getAllBlog = async () => {
  const { data }: any = await axios.get(
    `${baseURL}`,
  );
  return data;
};

export {createBlog, getAllBlog};