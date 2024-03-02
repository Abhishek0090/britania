import React, { useState, useEffect, useRef } from "react";
import Logo from "~/assets/logo/bluepen.png";
import ColorLogo from "~/assets/logo/BlackOnWhite.png";
import ServicesScroll from "~/components/ServicesScroll";
import { selectAuth } from "~/features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DrawerComp from "./Drawer";
import { useSelector } from "react-redux";
import { Disclosure, Transition } from "@headlessui/react";

import { logout } from "~/features/auth/authSlice";
import { useDispatch } from "react-redux";

const authStudentLinks = [
  {
    name: "About",
    submenu: true,
    sublinks: [
      { name: "About Us", link: "/about" },
      { name: "Contact Us", link: "/contact" },
    ],
  },
  {
    name: "Student",
    submenu: true,
    sublinks: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Post Assignment", link: "/submit" },
      // { name: "Plag Orders", link: "/orders" },
      { name: "Logout", link: "logout" },
    ],
  },
];

const authFreelancerLinks = [
  {
    name: "About",
    submenu: true,
    sublinks: [
      { name: "About Us", link: "/about" },
      { name: "Contact Us", link: "/contact" },
    ],
  },
  {
    name: "Freelancer",
    submenu: true,
    sublinks: [{ name: "Dashboard", link: "/dashboard/freelancer/dashboard" }],
  },
];

const authTeamsLinks = [
  {
    name: "About",
    submenu: true,
    sublinks: [
      { name: "About Us", link: "/about" },
      { name: "Contact Us", link: "/contact" },
    ],
  },
  {
    name: "Teams",
    submenu: true,
    sublinks: [{ name: "Dashboard", link: "/team" }],
  },
];

const publicLinks = [
  {
    name: "About",
    submenu: true,
    sublinks: [
      { name: "About Us", link: "/about" },
      { name: "Contact Us", link: "/contact" },
    ],
  },
  {
    name: "Login",
    submenu: true,
    sublinks: [
      { name: "Login", link: "/auth/login" },
      { name: "Sign Up", link: "/auth/signup" },
    ],
  },
  {
    name: "Freelancer",
    submenu: true,
    sublinks: [
      { name: "Login", link: "/auth/freelancer/login" },
      { name: "SignUp", link: "/freelance" },
    ],
  },
  {
    name: "Teams",
    submenu: true,
    sublinks: [{ name: "Login", link: "/auth/team/login" }],
  },
];

export default function Navbar() {
  const auth = useSelector(selectAuth);
  const [showMenu] = useState(null);
  const navigate = useNavigate();
  const discloseRef = useRef(null);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const dispatch = useDispatch();

  // Navbar Toggle Indexing
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };

  const handleMouseLeave = () => {
    setSelectedIndex(null);
  };

  const handlelogout = async () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  const [links, setLinks] = useState(
    auth?.id !== null && auth?.role === null
      ? authStudentLinks
      : (auth?.id !== null && auth?.role === "technical") ||
        auth?.role === "non-technical"
      ? authFreelancerLinks
      : auth?.id !== null && auth?.role === "team"
      ? authTeamsLinks
      : publicLinks
  );

  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 140) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  useEffect(() => {
    setLinks(
      auth?.id !== null && auth?.role === null
        ? authStudentLinks
        : (auth?.id !== null && auth?.role === "technical") ||
          auth?.role === "non-technical"
        ? authFreelancerLinks
        : auth?.id !== null && auth?.role === "team"
        ? authTeamsLinks
        : publicLinks
    );
  }, [auth]);

  return (
    <header
      className={` w-full mb-[0.75rem]  
         bg-opacity-20 backdrop-blur-lg bg-white    z-10 fixed  trasition ease-in-out duration-500 ${
           animateHeader && "mb-[0.25rem] shadow-xl"
         }`}
    >
      <div className="max-w-[90rem] mx-auto hidden xl:block">
        <div
          className={`flex max-w-screen-2xl  ${
            animateHeader && ""
          } mx-auto items-center justify-between  trasition ease-in-out duration-500`}
        >
          <div className="flex items-center justify-between">
            <Link to="/">
              <img
                src={Logo}
                alt="bluepen logo"
                className="md:cursor-pointer h-[100%] w-[90px]"
              />
            </Link>
            {window.innerWidth > 1024 && <ServicesScroll />}
          </div>

          <nav>
            <ul
              className="flex justify-between items-center md:pr-0 group"
              style={{ listStyle: "none" }}
            >
              {links?.map((link, i) => (
                <li
                  key={i}
                  className="px-3 text-left md:cursor-pointer group font-league"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Disclosure>
                    {({ open, toggle }) => (
                      <div className="p-5">
                        <Disclosure.Button
                          onClick={() => toggle()}
                          className="font-semibold flex items-center justify-between w-full"
                        >
                          <span className="text-[20px]">{link.name}</span>
                          <span>
                            {open ? (
                              <ExpandLessTwoToneIcon />
                            ) : (
                              <ExpandMoreTwoToneIcon />
                            )}
                          </span>
                        </Disclosure.Button>
                        <Transition
                          show={
                            (open || selectedIndex === i) &&
                            selectedIndex !== null
                          }
                          enter="transition duration-500 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-100 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="text-gray-700">
                            <div className="absolute top-0 hidden group-hover:md:block hover:md:block">
                              <div className="bg-white p-2 flex flex-col justify-start items-start shadow-2xl rounded-xl shadow-black ">
                                {link.sublinks.map((s, i) =>
                                  s.link === "logout" ? (
                                    <h1
                                      className="w-32 text-lg font-Regular capitalize p-2"
                                      onClick={handlelogout}
                                    >
                                      {" "}
                                      Logout{" "}
                                    </h1>
                                  ) : (
                                    <Link to={s.link} key={i}>
                                      <h1 className="w-32 text-lg font-Regular capitalize p-2">
                                        {s.name}
                                      </h1>
                                    </Link>
                                  )
                                )}
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <nav
        className={`flex my-[0.75rem] ${
          animateHeader && "my-[0.25rem]"
        } xl:hidden  max-w-screen-xl   mx-auto items-center justify-between px-8 trasition ease-in-out duration-500`}
      >
        <Link to="/">
          <img
            src={Logo}
            alt="bluepen logo"
            className="md:cursor-pointer h-[3.5rem] w-[4rem]"
          />
        </Link>

        <nav>
          <ul className="flex items-center justify-start">
            {showMenu ? (
              ""
            ) : (
              //MENU ICON
              <>
                <DrawerComp>
                  <List>
                    {links.map((link, i) => (
                      <ListItem key={i}>
                        <div className="px-3  text-left md:cursor-pointer group font-league ">
                          <Disclosure>
                            {({ open }) => (
                              <div className="px-5 pt-2">
                                <Disclosure.Button className="font-semibold flex items-start justify-between w-40">
                                  <span>{link.name}</span>
                                  <span>
                                    {open ? (
                                      <ExpandLessTwoToneIcon />
                                    ) : (
                                      <ExpandMoreTwoToneIcon />
                                    )}
                                  </span>
                                </Disclosure.Button>
                                <Transition
                                  show={open}
                                  enter="transition duration-1000 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-100 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                                >
                                  <Disclosure.Panel
                                    static
                                    className="mt-1  text-gray-700"
                                  >
                                    {link.sublinks.map((slinks, i) => (
                                      <div
                                        key={i}
                                        className="z-50 bg-gray-200 px-5 rounded-3xl shadow-xl"
                                      >
                                        {slinks.link === "logout" ? (
                                          <button
                                            className="w-32 text-lg font-Regular capitalize p-2"
                                            onClick={handlelogout}
                                          >
                                            {" "}
                                            Logout{" "}
                                          </button>
                                        ) : (
                                          <Link to={slinks.link}>
                                            <h1
                                              onClick={() => {
                                                subHeading !== slinks.name
                                                  ? setSubHeading(slinks.name)
                                                  : setSubHeading("");
                                              }}
                                              className="py-2 my-3  font-semibold flex justify-start items-center w-full"
                                            >
                                              {slinks.name}
                                            </h1>
                                          </Link>
                                        )}
                                      </div>
                                    ))}
                                  </Disclosure.Panel>
                                </Transition>
                              </div>
                            )}
                          </Disclosure>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </DrawerComp>
              </>
            )}
          </ul>
        </nav>
      </nav>
    </header>
  );
}
