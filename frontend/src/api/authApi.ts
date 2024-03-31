import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}auth/`;


const userLogin = async (credentials: unknown) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);
  const { data }: any = await axios.post(`${baseURL}login`, credentials, {
    headers: {
      Authorization: `Bearer ${userData && userData.userData?.token}`,
    },
  });
  console.log("userData.token",userData);
  return data as any;
};
const userSignup = async (credentials: unknown) => {
  const { data } = await axios.post(`${baseURL}signup`, credentials, {
    withCredentials: true,
  });
  return data;
};
// const userLogout = async () => {
//   const { data } = await axios.post(`${baseURL}logout`, {
//     withCredentials: true,
//   });
//   return data;
// };
const userVerify = async ({
  verificationCode,
}: {
  verificationCode: unknown;
}) => {
  const userData = JSON.parse(window.localStorage.getItem("authUser") as string);

  const { data } = await axios.post(
    `${baseURL}verify`,
    { verificationCode },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userData && userData.userData?.token}`,
      },
    },
  );
  return data;
};

export { userLogin, userSignup, userVerify };
