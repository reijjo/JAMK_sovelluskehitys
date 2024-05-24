import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Refuel } from "../utils/types";
import { useDispatch } from "react-redux";
import {
  addRefuel,
  addRefuelToFirestore,
  fetchRefuelData,
} from "../utils/reducers/refuelSlice";
import { useNavigate } from "react-router-dom";
import { Firestore } from "firebase/firestore/lite";
import { AppDispatch } from "../utils/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

interface AddProps {
  db: Firestore;
}

const Add = ({ db }: AddProps) => {
  const [refuel, setRefuel] = useState<Refuel>({
    id: "",
    date: "",
    carKm: "",
    refuelLitres: "",
    pricePerLitre: 1.957,
    cost: 0,
    consumption: 0,
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        console.log("user id", uid);

        dispatch(fetchRefuelData(db));
      } else {
        navigate("/");
      }

      console.log("user", user);
    });
  }, [db, dispatch, navigate]);

  const handleRefuel = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRefuel((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const addNewRefuel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!refuel.date || !refuel.carKm || !refuel.refuelLitres) {
      console.log("Fill the fields");
      return;
    }

    dispatch(addRefuel(refuel));
    dispatch(addRefuelToFirestore(db, refuel));

    setRefuel({
      id: "",
      date: "",
      carKm: "",
      refuelLitres: "",
      pricePerLitre: 1.956,
      cost: 0,
      consumption: 0,
    });

    navigate("/");
  };

  return (
    <main>
      <div className="homepage">
        <form className="refuel-form" onSubmit={addNewRefuel}>
          <h2>Refuel</h2>
          <div className="refuel-input">
            <label htmlFor="date">Date</label>
            <input
              onChange={handleRefuel}
              type="date"
              id="date"
              name="date"
              value={refuel.date}
            />
          </div>
          <div className="refuel-input">
            <label htmlFor="carKm">Car kilometers</label>
            <input
              onChange={handleRefuel}
              type="text"
              id="carKm"
              name="carKm"
              value={refuel.carKm}
            />
          </div>
          <div className="refuel-input">
            <label htmlFor="refuelLitres">Refueled liters</label>
            <input
              onChange={handleRefuel}
              type="text"
              id="refuelLitres"
              name="refuelLitres"
              value={refuel.refuelLitres}
            />
          </div>
          <div className="refuel-input">
            <label htmlFor="pricePerLitre">Price per liter</label>
            <input
              readOnly
              type="text"
              id="pricePerLitre"
              name="pricePerLitre"
              value={refuel.pricePerLitre}
            />
          </div>
          <div className="refuel-input">
            <label htmlFor="cost">Cost</label>
            <input
              readOnly
              type="text"
              id="cost"
              name="cost"
              value={(refuel.cost =
                refuel.refuelLitres && !isNaN(parseFloat(refuel.refuelLitres))
                  ? parseInt(refuel.refuelLitres) * refuel.pricePerLitre
                  : 0).toFixed(2)}
            />
          </div>
          <div className="refuel-input">
            <label htmlFor="consumption">Consumption l/100km</label>
            <input
              readOnly
              type="text"
              id="consumption"
              name="consumption"
              value={(refuel.consumption =
                refuel.carKm &&
                !isNaN(parseInt(refuel.carKm)) &&
                parseInt(refuel.refuelLitres)
                  ? (parseInt(refuel.refuelLitres) / parseInt(refuel.carKm)) *
                    100
                  : 0).toFixed(2)}
            />
          </div>
          <div className="refuel-input refuel-buttons">
            <button type="button">Clear</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Add;
