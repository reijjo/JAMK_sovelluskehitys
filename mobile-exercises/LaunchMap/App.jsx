import React, {useState} from 'react';
import {
  Button,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const launchMap = () => {
    const location = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.sectionContainer}>
        <TextInput
          placeholder="Latitude"
          onChangeText={text => setLatitude(text)}
        />
        <TextInput
          placeholder="Longitude"
          onChangeText={text => setLongitude(text)}
        />
        <Button title="Launch a Map" onPress={launchMap} />
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
