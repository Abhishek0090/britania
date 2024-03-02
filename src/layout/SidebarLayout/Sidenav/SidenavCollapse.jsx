import PropTypes from "prop-types";

import {
  Icon,
  ListItemText,
  ListItemIcon,
  ListItem,
  Collapse,
  Button,
} from "@mui/material";

import VuiBox from "~/components/VuiBox";
import { ChatContext } from "~/context/ChatContext";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "./styles/sidenavCollapse";

// Vision UI Dashboard React context
import { useVisionUIController } from "~/context";
import React, { useContext, useEffect, useState } from "react";

function SidenavCollapse({
  color,
  icon,
  name,
  children,
  active,
  noCollapse,
  open,
  ...rest
}) { 
  const { freelancerAllChats } = useContext(ChatContext);

  const [totalUnReadMessages ,setTotalUnReadMessages] = useState(null)

  useEffect(()=>{
    const filteredMessages = Array.isArray(freelancerAllChats) &&freelancerAllChats?.reduce((acc,item)=>{
      return acc + item?.unread_messages
    },0) 
    setTotalUnReadMessages(filteredMessages)
  },[freelancerAllChats])

  const [controller] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;

  return (
    <React.Fragment>
      <ListItem component="li">
        <VuiBox
          {...rest}
          sx={(theme) => collapseItem(theme, { active, transparentSidenav })}
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, { active, transparentSidenav, color })
            }
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>
                {icon}
              </Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, { miniSidenav, transparentSidenav, active })
            }
          />

          {name === "Chats" ? (
            totalUnReadMessages > 0 ? <span className="inline-block rounded-full text-sm   bg-blue141 text-black font-bold p-4 text-center flex items-center justify-center h-4 w-4">{totalUnReadMessages > 99 ? "99+" : totalUnReadMessages}</span> : null 
            
          ) : null}
        </VuiBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </React.Fragment>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  color: "info",
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  color: PropTypes.oneOf(["info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavCollapse;
