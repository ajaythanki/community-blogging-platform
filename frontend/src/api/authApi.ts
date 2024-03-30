import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}auth/`;
const userLogin = async (credentials: unknown) => {
  const { data }: any = await axios.post(
    `${baseURL}login`,
    credentials,
    {
      withCredentials: true,
    },
  );
  return data as any;
};
const userSignup = async (credentials: unknown) => {
  const { data } = await axios.post(`${baseURL}signup`, credentials, {
    withCredentials: true,
  });
  return data;
};
const userLogout = async () => {
  const { data } = await axios.post(`${baseURL}logout`, {
    withCredentials: true,
  });
  return data;
};
const userVerify = async ({
  verificationCode,
}: {
  verificationCode: unknown;
}) => {
  const { data } = await axios.post(
    `${baseURL}verify`,
    { verificationCode },
    {
      withCredentials: true,
    },
  );
  return data;
};

export { userLogin, userSignup, userVerify, userLogout };
