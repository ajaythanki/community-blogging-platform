import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}blogs/`;

const createBlog = async (blogData: unknown) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);

  const { data }: any = await axios.post(`${baseURL}`, blogData, {
    headers: {
      Authorization: `Bearer ${userData && userData.userData?.token}`,
    },
  });
  return data;
};
const updateBlog = async (blogData: any) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);

  const { data }: any = await axios.put(`${baseURL}${blogData?.id}`, blogData, {
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
const getBlogById = async (blogId:string) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);

  const { data }: any = await axios.get(
    `${baseURL}${blogId}`,
    {
      headers: {
        Authorization: `Bearer ${userData && userData.userData?.token}`,
      },
    },
  );
  return data;
};
const getUserBlogs = async () => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);

  const { data }: any = await axios.get(
    `${baseURL}user`,
    {
      headers: {
        Authorization: `Bearer ${userData && userData.userData?.token}`,
      },
    },
  );
  return data;
};
const getBlogsByCategory = async (category:string) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);

  const { data }: any = await axios.post(
    `${baseURL}category`,
    { category },
    {
      headers: {
        Authorization: `Bearer ${userData && userData.userData?.token}`,
      },
    },
  );
  return data;
};
const deleteBlogById = async (blogId:string) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);

  const { data }: any = await axios.delete(
    `${baseURL}${blogId}`,
    {
      headers: {
        Authorization: `Bearer ${userData && userData.userData?.token}`,
      },
    },
  );
  return data;
};

export {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlogById,
  getUserBlogs,
  getBlogsByCategory,
};