import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
} from "react-native";

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>ToDo example with React Native</Text>
    </View>
  );
};

const ToDoList = () => {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  const addToDoItem = () => {
    if (itemText !== "") {
      setItems([...items, { id: Math.random(), text: itemText }]);
      setItemText("");
    }
    Keyboard.dismiss();
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput}
          value={itemText}
          onChangeText={(text) => setItemText(text)}
          placeholder="Write a new todo here"
        />
        <Button
          title={"Add"}
          style={styles.addTodoButton}
          onPress={addToDoItem}
        />
      </View>
      <ScrollView style={styles.list}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}>* {item.text}</Text>
            <Text
              style={styles.listItemDelete}
              onPress={() => removeItem(item.id)}
            >
              X
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5,
  },
  banner: {
    backgroundColor: "cadetblue",
    justifyContent: "center",
    marginBottom: 20,
  },
  bannerText: {
    color: "white",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  addToDo: {
    flexDirection: "row",
    marginBottom: 20,
  },
  addToDoTextInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    padding: 5,
    margin: 2,
    flex: 1,
  },
  list: {
    color: "black",
    margin: 2,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
  },
  listItemText: {},
  listItemDelete: {
    marginStart: 10,
    color: "red",
    fontWeight: "bold",
  },
});
