import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRefuelData, selectRefuel } from "../utils/reducers/refuelSlice";
import RefuelCard from "../components/RefuelCard";
import { Firestore } from "firebase/firestore/lite";
import { AppDispatch } from "../utils/store";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

interface HomeProps {
  db: Firestore;
}

const Homepage = ({ db }: HomeProps) => {
  const [fireUser, setFireUser] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const refuelList = useSelector(selectRefuel);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setFireUser(uid);
        console.log("user id", uid);

        dispatch(fetchRefuelData(db));
      } else {
        navigate("/");
      }
    });
  }, [db, dispatch, navigate]);

  const rechartData = refuelList.map((data) => ({
    date: data.date,
    consumption: data.consumption,
  }));

  const totalKm = refuelList.reduce(
    (total, km) => total + parseFloat(km.carKm) || 0,
    0
  );

  const totalCost = refuelList.reduce(
    (total, cost) => total + cost.cost || 0,
    0
  );

  const totalConsump = refuelList.reduce(
    (total, con) => total + con.consumption || 0,
    0
  );
  const avgCon = totalConsump / refuelList.length;

  return (
    <main>
      <h1>Car consumption monitoring</h1>
      <div className="homepage">
        {!fireUser ? (
          <Login />
        ) : (
          <div className="refuel-form">
            <h2>Totals</h2>
            <div className="totals">
              <div className="refuel-input">
                <label htmlFor="totalKm">Km:</label>
                <input readOnly type="text" value={totalKm} id="totalKm" />
              </div>
              <div className="refuel-input">
                <label htmlFor="totalCost">Cost:</label>
                <input
                  readOnly
                  type="text"
                  value={totalCost.toFixed(2)}
                  id="totalCost"
                />
              </div>
              <div className="refuel-input">
                <label htmlFor="avgConsumption">Avg consumption:</label>
                <input
                  readOnly
                  type="text"
                  value={!isNaN(avgCon) ? avgCon.toFixed(2) : 0}
                  id="avgConsumption"
                />
              </div>
            </div>
          </div>
        )}
        {refuelList.length > 0 && fireUser && (
          <div className="refuel-form">
            <LineChart
              width={350}
              height={350}
              data={rechartData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="date" />
              <YAxis dataKey="consumption" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
            </LineChart>
          </div>
        )}
      </div>
      {refuelList.length > 0 && fireUser && (
        <div className="all-events">
          <h3>All refuel events</h3>
          <div className="refuel-cards">
            {refuelList.map((fuel) => (
              <RefuelCard
                key={fuel.id}
                id={String(fuel.id)}
                date={fuel.date}
                carKm={fuel.carKm}
                refuelLitres={fuel.refuelLitres}
                pricePerLitre={fuel.pricePerLitre}
                cost={fuel.cost}
                consumption={fuel.consumption}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Homepage;
