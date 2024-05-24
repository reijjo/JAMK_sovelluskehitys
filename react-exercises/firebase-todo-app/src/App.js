import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getFirestore } from "firebase/firestore/lite";
import app from "./firebase";

import ToDoFormAndList from "./components/ToDoFormAndList";
import Login from "./components/Login";

const db = getFirestore(app);

function Banner() {
  return <h1>Todo Example with React</h1>;
}

function App() {
  return (
    <div>
      <Banner />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<ToDoFormAndList db={db} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
