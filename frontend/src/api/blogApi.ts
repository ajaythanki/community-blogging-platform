import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}blogs/`;

const createBlog = async (blogData: unknown) => {
  const { data }: any = await axios.post(
    `${baseURL}`,
    blogData,
  );
  return data;
};
const getAllBlog = async () => {
  const { data }: any = await axios.get(
    `${baseURL}`,
  );
  return data;
};

export {createBlog, getAllBlog};