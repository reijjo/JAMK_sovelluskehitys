import { useState, useEffect } from "react";
import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore/lite";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function ToDoFormAndList({ db }) {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const todosCol = collection(db, "todos");
      const todoSnapshot = await getDocs(todosCol);
      const todos = todoSnapshot.docs.map((doc) => {
        return {
          text: doc.data().text,
          id: doc.id,
        };
      });

      console.log("todos", todos);

      setItems(todos);

      setLoading(false);
    };
    console.log("fetch data...");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        console.log("user id", uid);

        fetchData();
      } else {
        navigate("/");
      }
    });
    fetchData();
  }, [db, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newItem = { text: itemText };
    const docRef = await addDoc(collection(db, "todos"), newItem);

    newItem.id = docRef.id;

    setItems([...items, newItem]);
    setItemText("");
  };

  const removeItem = (item) => {
    deleteDoc(doc(db, "todos", item.id));

    let filteredArray = items.filter(
      (collectionItem) => collectionItem.id !== item.id
    );
    setItems(filteredArray);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error logging out", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="newTodo"
          value={itemText}
          onChange={(event) => setItemText(event.target.value)}
          placeholder="Write a new todo here"
        />
        <input type="submit" value="Add" />
      </form>

      <ul>
        {loading && <p>Loading...</p>}
        {items.map((item) => (
          <li key={item.id}>
            {item.text + " "} <span onClick={() => removeItem(item)}> x </span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
}

export default ToDoFormAndList;
