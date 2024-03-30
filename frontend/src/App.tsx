import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import BlogPage from "./pages/BlogPage";
import UserBlogPage from "./pages/UserBlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route
          path="/my-blogs"
          element={
            <ProtectedRoute>
              <UserBlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlogPage />
            </ProtectedRoute>
          }
        />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Layout>
  );
}

export default App;


