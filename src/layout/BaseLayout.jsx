import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

const BaseLayout = ({ children }) => {
  const location = useLocation().pathname.split("/")[1];

  return (
    <>
      <div className=" min-h-[80vh] flex-1  ">
        <Navbar />
        <div className="md:h-[4rem] h-[4.5rem] " />
        {children || <Outlet />}
      </div>
      <div className={`mt-auto ${location === "chats" ? "fixed" : "static"}`}>
        <Footer />
      </div>
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
