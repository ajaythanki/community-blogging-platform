import { IBlogCard } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "../api/blogApi";
import BlogCard from "../components/BlogCard";
import { Container } from "@mui/material";
const BlogPage = () => {
  //get blogs
  const {
    data,
    isError,
    error,
    isLoading,
  } = useQuery({ queryKey: ["blog"], queryFn: getAllBlog });

  if(isError){console.log(error);return<>Something went wrong</>;}
  if(isLoading)return<>Loading...</>;
  console.log(data?.blogs);
  return (
    <Container sx={{pt:2, maxWidth:"1200px"}}>
      {data?.blogs &&
        data?.blogs.map((blog:IBlogCard) => (
          <BlogCard
            key={blog?._id}
            isAuthor={localStorage.getItem("authUser") === blog?.author?._id}
            title={blog?.title}
            description={blog?.description}
            thumbnail={blog?.thumbnail}
            author={blog?.author}
            createdAt={blog.createdAt}
            category={blog.category}
          />
        ))}
    </Container>
  );
};

export default BlogPage;
