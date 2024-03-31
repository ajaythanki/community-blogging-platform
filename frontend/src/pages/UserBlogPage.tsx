import { IBlogCard, TUser } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getUserBlogs } from "../api/blogApi";
import BlogCard from "../components/BlogCard";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
const UserBlogPage = () => {
  //get blogs
  const {
    data,
    isError,
    error,
    isLoading,
  } = useQuery({ queryKey: ["blog"], queryFn: getUserBlogs });
  const {user}:TUser = useSelector((state: any) => state.user);

  if(isError){console.log(error);return<>Something went wrong</>;}
  if(isLoading)return<>Loading...</>;
  console.log(user);
  return (
    <Container sx={{ pt: 2, textAlign:"center" }}>
      {data?.blogs?.length > 0 ?
      
      <Grid container spacing={3} alignItems={"stretch"}>
      {data?.blogs &&
        data?.blogs.map((blog: IBlogCard) => (
          <Grid item xs={12} sm={6} md={4} key={blog?._id}>
            <BlogCard isAuthor={user._id === blog?.author?._id} {...blog} />
          </Grid>
        ))}
        </Grid>
        :
        <h3>No Blogs Found</h3>
        }
    </Container>
  );
};

export default UserBlogPage;
