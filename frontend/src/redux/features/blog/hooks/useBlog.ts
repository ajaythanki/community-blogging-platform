import { useMutation } from "@tanstack/react-query";
import {
  createBlog, deleteBlogById, getBlogById, updateBlog,
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
export const useUpdateBlogMutation = () =>
  useMutation({
    // mutationKey: "updateBlog",
    mutationFn: updateBlog,
    onMutate: () => toast.loading("Updating Blog", { id: "blog" }),
    onSuccess: () => {
      return toast.success(`Blog Updated Successfully`, {
        id: "blog",
      });
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(`Updating Blog failed : ${error?.response.data.message}`, {
          id: "blog",
        });
      }
    },
  });
export const useDeleteBlogMutation = () =>
  useMutation({
    // mutationKey: "updateBlog",
    mutationFn: deleteBlogById,
    onMutate: () => toast.loading("Deleting Blog", { id: "blog" }),
    onSuccess: () => {
      return toast.success(`Blog Deleted Successfully`, {
        id: "blog",
      });
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(`Deleting Blog failed : ${error?.response.data.message}`, {
          id: "blog",
        });
      }
    },
  });
export const useGetBlogById = () =>
  useMutation(
    {
      // mutationKey: "createBlog",
      mutationFn: getBlogById,
      onError: (error: any) => {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(`Failed to get Blog : ${error?.response.data.message}`, {
            id: "blog",
          });
        }
      },
      retry:3,
    },
  );