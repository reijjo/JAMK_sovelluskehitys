# mobile-exercises

Teemu Aitomeri, AF6364

# How to:

- Create project: `npx react-native@latest init PROJECTNAME`
- Open Android Studio -> `...` -> `Virtual Device Manager` -> Choose device (or create a new one)
- `npm start` -> `a` to run android

# Basic App.tsx

- Just rename `App.tsx` to `App.jsx` to use JavaScript and not TypeScript
- If you use JavaScript add this line: `requireConfigFile: false,` to `.eslintrc.js`
  `

```tsx
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

function App() {
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.sectionContainer}>
        <Text>Hello React Native CLI</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
```

## Use MongoDB Realm

- `npm install realm @realm/react`
- `import Realm from 'realm'`
- Create a schema for example in `models.jsx` file

```jsx
import Realm from "realm";

export class Todo extends Realm.Object {
  static schema = {
    name: "Todo",
    properties: {
      _id: "objectId",
      text: { type: "string" },
    },
    primaryKey: "_id",
  };
}
```

- And in `App.jsx` file wrap App in RealmProvider

```jsx
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
```

# Flutter

- Start here: `https://docs.flutter.dev/get-started/install`
- Create new Flutter app `flutter create --template=app MYAPPNAME`
- Open emulator from Android Studio
- `flutter devices` to check that flutter finds your emulator
- Go to your projects folder and `flutter run`
- Really basic example where to start:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Movies',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Movies Page - Now Playing'),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(title),
      ),
      body: const Center(child: Text('Hello')),
    );
  }
}

```
