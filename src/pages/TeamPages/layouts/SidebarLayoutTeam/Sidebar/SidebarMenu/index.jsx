import React,{ useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "~/pages/TeamPages/contexts/SidebarContext";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { MenuList } from "./MenuList";
import { MenuWrapper } from "~/utils/CustomStyles";
import { Disclosure, Transition } from "@headlessui/react";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux"; 
import { TeamChatContext } from "../../../../contexts/TeamChatContext";

export default function SidebarMenu() {
  const auth = useSelector(selectAuth);
  const { teamAllChats } = useContext(TeamChatContext);
 
  const { closeSidebar } = useContext(SidebarContext);

  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const [totalUnReadMessages, setTotalUnReadMessages] = useState(null);

  useEffect(() => {
    const totalUnReadMessages = Array.isArray(teamAllChats) &&  teamAllChats?.reduce((acc, item) => {
      return acc + item.unread_messages;
    }, 0);
    setTotalUnReadMessages(totalUnReadMessages);
  }, [teamAllChats]);
  
  return (
    <React.Fragment>
      <MenuWrapper>
        {MenuList?.map((link, i) => (
          <div
            key={i}
            className="px-3  text-left md:cursor-pointer group font-league "
          >
            {link.submenu ? (
              <Disclosure>
                {({ open }) => (
                  <>
                    {link?.scope?.includes(auth?.teamDomain) && (
                      <div className="p-5">
                        <Disclosure.Button className="font-semibold flex items-start justify-between w-40">
                          <span>
                            <span>{link.icon}</span>
                            <span className="pl-2">{link.name}</span>
                          </span>
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
                          <Disclosure.Panel static className="mt-1  ">
                            {link?.sublinks?.map((slinks, i) => (
                              <>
                                {slinks?.scope?.includes(auth?.teamDomain) && (
                                  <div
                                    key={i}
                                    className="z-50  px-5 rounded-3xl "
                                  >
                                    <Link to={slinks.link}>
                                      <h1
                                        onClick={() => {
                                          subHeading !== slinks.name
                                            ? setSubHeading(slinks.name)
                                            : setSubHeading("");

                                          localStorage.removeItem("currentId");
                                          localStorage.removeItem(
                                            "ActiveStatus"
                                          );

                                          closeSidebar();
                                        }}
                                        className="py-2 my-3  font-semibold flex justify-start items-center w-full"
                                      >
                                        {" "}
                                        <span className="pr-5">
                                          {slinks.icon}
                                        </span>
                                        <span>{slinks.name}</span>
                                      </h1>
                                    </Link>
                                  </div>
                                )}
                              </>
                            ))}
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </>
                )}
              </Disclosure>
            ) : (
              <Link to={link.link}>
                <h1
                  onClick={() => {
                    heading !== link.name
                      ? setHeading(link.name)
                      : setHeading("");
                    localStorage.removeItem("currentId");
                    localStorage.removeItem("ActiveStatus");
                    closeSidebar();
                  }}
                  className="py-2 my-3 pr-[2.5rem] font-semibold flex justify-between items-center w-full"
                >
                  <span className="flex gap-1 items-center">
                    <span className="pl-5">{link.icon}</span>
                    <span className="pl-2">{link.name}</span>
                  </span>
                  {totalUnReadMessages > 0 && link.name === "Chats" ? (
                    <span className="inline-block rounded-full bg-none border-2 border-blue141   font-bold p-4 text-center flex items-center justify-center h-4 w-4 text-purple911">
                      {totalUnReadMessages>999 ? "999+" : totalUnReadMessages}
                    </span>
                  ) : null}
                </h1>
              </Link>
            )}
          </div>
        ))}
      </MenuWrapper>
    </React.Fragment>
  );
}
