import { IBlogCard, TUser } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "../api/blogApi";
import BlogCard from "../components/BlogCard";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { categories } from "../constants";
const BlogPage = () => {
  //get blogs
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState<any>();
  const handleFilterChange = (
    _: React.SyntheticEvent,
    newValue: string,
  ) => {
    setSelectedCategory(newValue);

    if(data.blogs.length>0){
      if(newValue === "All")
      setFilteredBlogs(data.blogs);
      else setFilteredBlogs(data.blogs.filter((blog:any)=>blog.category===newValue));
    }
  };

  const {
    data,
    isError,
    error,
    isLoading,
  } = useQuery({ queryKey: ["blog"], queryFn: getAllBlog });
  const {user}:TUser = useSelector((state: any) => state.user);

  useEffect(()=>{
    if (data?.blogs && data.blogs.length > 0) {
      const uniqueCategories = [...new Set(data?.blogs.map((blog:any)=>blog.category))];
      console.log(uniqueCategories,uniqueCategories);
      setFilteredCategories([...uniqueCategories]);
      setFilteredBlogs(data?.blogs);
    }
  } ,[data]);

  if(isError){console.log(error);return<>Something went wrong</>;}
  if(isLoading)return<>Loading...</>;
  return (
    <Container sx={{ pt: 2 }}>
      <Box>
        <Box sx={{ maxWidth: "100%", mb:1 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleFilterChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {filteredCategories?.length > 0 && (
              <Tab
                defaultChecked={true}
                value={"All"}
                label={"All"}
                sx={{ fontSize: "1rem" }}
              />
            )}

            {filteredCategories?.map((category: string) => (
              <Tab
                key={category}
                value={category}
                label={category}
                // sx={customProductsStyles.button}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Grid container spacing={3} alignItems={"stretch"}>
        {filteredBlogs &&
          filteredBlogs.map((blog: IBlogCard) => (
            <Grid item xs={12} sm={6} md={4} key={blog?._id}>
              <BlogCard isAuthor={user._id === blog?.author?._id} {...blog} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default BlogPage;
