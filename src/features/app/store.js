import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "~/features/app/api/apiSlice";
import authReducer from "~/features/auth/authSlice";
import studentSlice from "~/features/student/studentSlice";
import freelancerSlice from "~/features/freelancer/freelancerSlice";
import chatSlice from "~/features/team/Chats/chatSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath],
};

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  student: studentSlice,
  freelancer: freelancerSlice,
  chats: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),

  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;
