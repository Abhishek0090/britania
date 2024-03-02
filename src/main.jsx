import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { VisionUIControllerProvider } from "~/context";
import { SidebarProvider } from "~/context/SidebarContext";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "~/features/app/store";
import { GoogleOAuthProvider } from "react-oauth-google";
import { ChatProvider } from "~/context/ChatContext";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HelmetProvider>
        <GoogleOAuthProvider clientId="440581039465-61i5du8ego5ia7sog6675lblu8utbjqt.apps.googleusercontent.com">
          <ChatProvider>
            <SidebarProvider>
              <VisionUIControllerProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </VisionUIControllerProvider>
            </SidebarProvider>
          </ChatProvider>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);
