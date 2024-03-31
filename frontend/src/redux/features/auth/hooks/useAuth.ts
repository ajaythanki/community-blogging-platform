import { useMutation } from "@tanstack/react-query";
import {
  userLogin,
  // userLogout,
  userSignup,
  userVerify,
} from "../../../../api/authApi";
import toast from "react-hot-toast";

export const useSignupMutation = () =>
  useMutation({
    // mutationKey: "usersignup",
    mutationFn: userSignup,
    onMutate: () => toast.loading("Signing Up", { id: "usersignup" }),
    onSuccess: (data) => {
      window.localStorage.setItem("auth_token", JSON.stringify(data?.token));
      return toast.success(`Signed Up Successfully: ${data.message}`, {
        id: "usersignup",
      });
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(`Signup failed : ${error?.response.data.message}`, {
          id: "usersignup",
        });
      }
    },
  });
export const useVerifyUserMutation = () =>
  useMutation({
    // mutationKey: "userVerify",
    mutationFn: userVerify,
    onMutate: () => {
      toast.loading("Verifying", { id: "userverification" });
    },
    onSuccess: () => {
      toast.success(`Verified Successfully`, {
        id: "userverification",
      });
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(`Verification failed : ${error?.response?.data?.message}`, {
          id: "userverification",
        });
      }
    },
  });
export const useLoginMutation = () =>
  useMutation({
    // mutationKey: "userLogin",
    mutationFn: userLogin,
    onMutate: () => {
      toast.loading("Signing In", { id: "userlogin" });
    },
    onSuccess: () => {
      toast.success(`Signed In Success:`, { id: "userlogin" });

    },
    onError: (error: any) => {
      console.log(error);
      if (error.message == "Network Error") {
        toast.error(`Something went wrong`, {
          id: "userlogin",
        });
      }
      toast.error(`Signing in failed : ${error?.response.data.message}`, {
        id: "userlogin",
      });
    },
  });

