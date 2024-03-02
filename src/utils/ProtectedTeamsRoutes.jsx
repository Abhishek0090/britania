import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function ProtectedTeamsRoutes({ children }) {
  const auth = useSelector(selectAuth);

  return (
    <>
      {auth?.id !== null && auth?.role === "team" ? (
        children || <Outlet />
      ) : (
        <Navigate to="/auth/team/login" />
      )}
    </>
  );
}
