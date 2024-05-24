import 'react-native-get-random-values';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
} from 'react-native';
import {RealmProvider} from '@realm/react';
import {Todo} from './db/models';
import {useQuery, useRealm} from '@realm/react';
import {BSON} from 'realm';

// Banner
const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>
        ToDo example with React Native & MongoDB Realm
      </Text>
    </View>
  );
};

// Todo List
const ToDoList = () => {
  const [itemText, setItemText] = useState('');
  const [items, setItems] = useState([]);

  const realm = useRealm();
  const todos = useQuery(Todo);

  useEffect(() => {
    setItems(todos);
  }, []);

  // Add and remove items
  const addToDoItem = () => {
    if (itemText !== '') {
      realm.write(() => {
        realm.create(Todo, {
          _id: new BSON.ObjectId(),
          text: itemText,
        });
      });
      setItemText('');
    }
    Keyboard.dismiss();
  };

  const removeItem = id => {
    const newItems = items.filter(todo => todo._id.toString() !== id);
    setItems(newItems);

    realm.write(() => {
      const toDelete = realm.objectForPrimaryKey('Todo', new BSON.ObjectId(id));
      if (toDelete) {
        realm.delete(toDelete);
      }
    });
  };

  // Return
  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput}
          value={itemText}
          onChangeText={text => setItemText(text)}
          placeholder="Write a new todo here"
        />
        <Button
          title={'Add'}
          style={styles.addTodoButton}
          onPress={addToDoItem}
        />
      </View>
      <ScrollView style={styles.list}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}>- {item.text}</Text>
            <Text
              style={styles.listItemDelete}
              onPress={() => removeItem(item._id.toString())}>
              X
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// App
const App = () => {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
      <StatusBar style="auto" />
    </View>
  );
};

// AppWrapper
function AppWrapper() {
  return (
    <RealmProvider schema={[Todo]}>
      <App />
    </RealmProvider>
  );
}

export default AppWrapper;
// export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5,
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 2,
    marginRight: 16,
    flex: 1,
  },
  addTodoButton: {
    color: '#333',
  },
  list: {
    color: 'black',
    margin: 2,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  listItemText: {},
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
