import { useRoutes } from "react-router-dom";
import router from "~/pages/TeamPages/router";
import { HelmetProvider } from "react-helmet-async";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { SidebarProvider } from "~/pages/TeamPages/contexts/SidebarContext";

import "nprogress/nprogress.css";
import { TeamChatProvider } from "./contexts/TeamChatContext";
import { ChatProvider } from "~/context/ChatContext";

export default function TeamPages() {
  const content = useRoutes(router);

  return (
    <HelmetProvider>
      <SidebarProvider>
        <ThemeProvider>
          <TeamChatProvider>
          {/* <ChatProvider> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              {content}
            </LocalizationProvider>
          {/* </ChatProvider> */}
          </TeamChatProvider>
        </ThemeProvider>
      </SidebarProvider>
    </HelmetProvider>
  );
}
