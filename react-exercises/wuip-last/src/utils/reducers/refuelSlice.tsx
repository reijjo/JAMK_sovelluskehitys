import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Refuel, RefuelState } from "../types";
import { AppDispatch, RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore/lite";
import app from "../firebase";

const db = getFirestore(app);

const initialState: RefuelState = {
  refuel: [],
};

const refuelSlice = createSlice({
  name: "refuel",
  initialState,
  reducers: {
    setRefuel(state, action: PayloadAction<Refuel[]>) {
      state.refuel = action.payload;
    },
    addRefuel(state, action: PayloadAction<Refuel>) {
      // const { payload } = action;
      // const withId = { ...payload, id: uuidv4() };
      // state.refuel = [...state.refuel, withId];
      state.refuel = [...state.refuel, action.payload];
    },
    deleteRefuel(state, action) {
      const { payload } = action;

      const updatedFuels = state.refuel.filter((f) => f.id !== payload.id);
      state.refuel = updatedFuels;

      // Remove from db
      const todoDoc = doc(collection(db, "fuel"), payload.id);
      deleteDoc(todoDoc);
    },
  },
});

export const { setRefuel, addRefuel, deleteRefuel } = refuelSlice.actions;

export const selectRefuel = (state: RootState) => state.refuel.refuel;

export default refuelSlice.reducer;

export const fetchRefuelData =
  (db: Firestore) => async (dispatch: AppDispatch) => {
    const todosCol = collection(db, "fuel");
    const todoSnapshot = await getDocs(todosCol);
    const fuels = todoSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        date: data.date,
        carKm: data.carKm,
        refuelLitres: data.refuelLitres,
        pricePerLitre: data.pricePerLitre,
        cost: data.cost,
        consumption: data.consumption,
      };
    });
    dispatch(setRefuel(fuels));
  };

export const addRefuelToFirestore =
  (db: Firestore, refuel: Refuel) => async (dispatch: AppDispatch) => {
    try {
      const docRef = await addDoc(collection(db, "fuel"), {
        ...refuel,
        id: uuidv4(),
      });
      dispatch(addRefuel({ ...refuel, id: docRef.id }));
    } catch (error) {
      console.log("error adding to database", error);
    }
  };
