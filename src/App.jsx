import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { useRoutes, useLocation } from "react-router-dom";
import router from "~/router";
import { Toaster } from "react-hot-toast";

export default function App() {
  const location = useLocation();
  const content = useRoutes(router);
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  if (!content) return null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // for redirecting if logged in used this instead of protected route //
  // used this redirection because of few conditions in route protection
  useEffect(() => {
    if (
      auth?.token &&
      auth.id &&
      auth?.role === "team" &&
      (location.pathname === "/auth/team/login" ||
        location.pathname === "/auth/login" ||
        location.pathname === "/auth/freelancer/login")
    ) {
      navigate("/team");
    }
    if (
      auth?.token &&
      auth.id &&
      auth?.role === null &&
      (location.pathname === "/auth/team/login" ||
        location.pathname === "/auth/login" ||
        location.pathname === "/auth/freelancer/login")
    ) {
      navigate("/dashboard");
    }
    if (
      auth?.token &&
      auth.id &&
      auth?.role === "freelancer" &&
      (location.pathname === "/auth/team/login" ||
        location.pathname === "/auth/login" ||
        location.pathname === "/auth/freelancer/login" ||
        location.pathname === "/")
    ) {
      navigate("/dashboard/freelancer/dashboard");
    }
  }, [location.pathname, auth.token, auth.id]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            color: "#141B41",
            zIndex: 99,
          },

          duration: 3000,
          success: {
            iconTheme: {
              primary: "#2956A8",
              secondary: "#FFFAEE",
            },
            duration: 3000,
          },
          error: {
            iconTheme: {
              primary: "#940b20",
              secondary: "#FFFAEE",
            },
            duration: 3000,
          },
        }}
      />

      {content}
    </>
  );
}
