import { configureStore, combineReducers } from "@reduxjs/toolkit/";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";

export const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
