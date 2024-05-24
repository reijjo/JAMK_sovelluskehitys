import React, { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";

import { Card, Input, TextField } from "@mui/material";
import { Button } from "@mui/base/Button";

const firebaseConfig = {
  apiKey: "AIzaSyDD77UiJQlomzBWpwBG1RnUReiQbcDIfJw",
  authDomain: "shoppinglist-cef55.firebaseapp.com",
  projectId: "shoppinglist-cef55",
  storageBucket: "shoppinglist-cef55.appspot.com",
  messagingSenderId: "73359510440",
  appId: "1:73359510440:web:3e9c5f9daed908eb30eb9d",
  measurementId: "G-SZ7DDYNXRQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, "items");
      const dataSnapshot = await getDocs(dataCollection);

      const items = dataSnapshot.docs.map((doc) => {
        return {
          name: doc.data().name,
          count: doc.data().count,
          id: doc.id,
        };
      });
      setItems(items);
      setLoading(false);
    };
    fetchData();
  }, []);

  // add a new item to data base and shopping list items
  const addItem = async () => {
    // create a new shopping list item
    let newItem = { name: item, count: count, id: "" };
    // add to database
    let doc = await addDoc(collection(db, "items"), newItem);
    // get added doc id and set id to newItem
    newItem.id = doc.id;
    // update states
    setItems([...items, newItem]);
    setItem("");
    setCount(1);
  };

  // delete item from database and UI
  const deleteItem = async (item) => {
    console.log("ite", item);
    deleteDoc(doc(db, "items", item.id));
    // delete from items state and update state
    let filteredArray = items.filter(
      (collectionItem) => collectionItem.id !== item.id
    );
    setItems(filteredArray);
  };

  if (loading) return <p>Loading...</p>;

  const sh_items = items.map((item, index) => {
    return (
      <Card
        variant="outlined"
        sx={{
          minWidth: 300,
          maxWidth: 400,
          padding: "8px 16px",
          margin: "4px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        key={index}
      >
        <div>
          {item.name} {item.count}
        </div>{" "}
        <button onClick={() => deleteItem(item)}>x</button>
      </Card>
    );
  });

  console.log("itemjne", items);

  return (
    <div className="App">
      <div
        style={{
          minWidth: 300,
          maxWidth: 400,
          padding: "8px 16px",
          margin: "4px 0",
          display: "flex",
        }}
      >
        <TextField
          id="standard-basic"
          label="Item"
          variant="standard"
          onChange={(e) => setItem(e.target.value)}
          value={item}
          style={{ margin: "0px 4px", flex: 1 }}
        />
        <Input
          type="number"
          label="Count"
          onChange={(e) => setCount(e.target.value)}
          value={count}
          style={{ width: 50, margin: "0px 4px" }}
        />
        <Button type="button" onClick={addItem}>
          Add
        </Button>
      </div>
      {sh_items}
    </div>
  );
}

export default App;
