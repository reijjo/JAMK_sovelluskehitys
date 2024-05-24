import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages.tsx/Homepage";
import Add from "./Pages.tsx/Add";
import { Link } from "react-router-dom";
import { getFirestore } from "firebase/firestore/lite";
import app from "./utils/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";

const db = getFirestore(app);

const App = () => {
  const [fireUser, setFireUser] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setFireUser(uid);
        console.log("user id", uid);
      }

      console.log("user", user);
    });
  }, [dispatch]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        window.location.replace("/");
      })
      .catch((error) => {
        console.log("Error logging out", error);
      });
  };

  return (
    <Router>
      <div
        style={{
          height: "8vh",
          width: "100%",
          backgroundColor: "#f5f5f5",
          color: "var(--black",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        {fireUser && (
          <button
            style={{
              padding: "4px 8px",
              backgroundColor: "pink",
              fontSize: "1.2rem",
            }}
            onClick={logOut}
          >
            Logout
          </button>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Homepage db={db} />} />
        <Route path="/add" element={<Add db={db} />} />
      </Routes>
    </Router>
  );
};

export default App;
