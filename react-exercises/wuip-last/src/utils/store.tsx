import { configureStore } from "@reduxjs/toolkit";
import refuelReducer from "./reducers/refuelSlice";

const store = configureStore({
  reducer: {
    refuel: refuelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
