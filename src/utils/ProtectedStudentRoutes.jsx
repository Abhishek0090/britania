import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedStudentRoutes({ children }) {
  const auth = useSelector(selectAuth);

  return (
    <>
      {auth?.id !== null && auth?.role === null  ? (
        children || <Outlet />
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
}
