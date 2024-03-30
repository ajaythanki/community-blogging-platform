import { useMutation } from "@tanstack/react-query";
import {
  userLogin,
  userLogout,
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
    onSuccess: (data) => {
      toast.success(`Verified Successfully: ${data.message}`, {
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
    onSuccess: (data: any) => {
      toast.success(`Signed In Success: ${data.message}`, { id: "userlogin" });
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

export const useLogoutMutation = () =>
  useMutation({
    // mutationKey: "userLogout",
    mutationFn: userLogout,
    onMutate: () => {
      toast.loading("Logging Out", { id: "userlogout" });
    },
    onSuccess: (data) => {
      toast.success(`Logged Out Success: ${data.message}`, {
        id: "userlogout",
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(`Logging out failed : ${error?.response.data.message}`, {
        id: "userlogout",
      });
    },
  });
