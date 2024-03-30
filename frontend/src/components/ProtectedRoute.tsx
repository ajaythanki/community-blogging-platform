import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "../redux/features/auth/userSlice";

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  
  useEffect(() => {
    if (!isAuthenticated) {
      const userData = JSON.parse(window.localStorage.getItem("authUser") as string);
      if (userData?.email) {
        dispatch(setUser({userData, isAuthenticated:true}));
      }
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
