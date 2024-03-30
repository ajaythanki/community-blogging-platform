import { useMutation } from "@tanstack/react-query";
import {
  createBlog,
} from "../../../../api/blogApi";
import toast from "react-hot-toast";

export const useCreateBlogMutation = () =>
  useMutation({
    // mutationKey: "createBlog",
    mutationFn: createBlog,
    onMutate: () => toast.loading("Creating Blog", { id: "blog" }),
    onSuccess: () => {
      return toast.success(`Blog Created Successfully`, {
        id: "blog",
      });
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(`Creating Blog failed : ${error?.response.data.message}`, {
          id: "blog",
        });
      }
    },
  });