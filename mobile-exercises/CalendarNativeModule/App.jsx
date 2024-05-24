import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import NewModuleButton from './NewModuleButton';

function App() {
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.sectionContainer}>
        <Text>Calendar Native Module</Text>
        <NewModuleButton />
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
