import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useRef, useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button, Header, Input} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Dialog} from 'react-native-simple-dialogs';

const App = () => {
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState('');
  const [text, setText] = useState('');
  const [markers, setMarkers] = useState([]);

  const floatingRef = useRef(null);

  // Store and get data
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@places', JSON.stringify(markers));
    } catch (e) {
      console.log('Marker saving error', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@places');

      if (value !== null) {
        setMarkers(JSON.parse(value));
      }
    } catch (e) {
      console.log('Markers loading error', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [markers]);

  // Open and close dialog
  const openDialog = () => {
    setOpen(!open);
  };

  const closeDialog = () => {
    if (floatingRef.current) {
      floatingRef.current.animateButton();
    }
    setPlace('');
    setText('');
    setOpen(false);
  };

  // Find place
  const findPlace = async () => {
    const url = `https://nominatim.openstreetmap.org/search?city=$${place}&format=json&limit=1`;

    try {
      const res = await axios.get(url);

      if (res.data && res.data.length > 0) {
        // console.log('res', JSON.stringify(res.data, null, 2));

        const thePlace = res.data[0];
        const lat = parseFloat(thePlace.lat);
        const lon = parseFloat(thePlace.lon);

        setMarkers([
          ...markers,
          {
            lat,
            lon,
            title: thePlace.name,
            desc: text,
          },
        ]);
      } else {
        console.log('Place not found.');
      }
    } catch (error) {
      console.log('error finding city', error);
    } finally {
      closeDialog();
    }
  };

  // Return
  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{
          text: 'MyPlaces',
          style: {color: '#fff', fontWeight: 'bold'},
        }}
      />

      {/* Map */}
      <MapView
        style={{height: '100%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 64.0,
          longitude: 26.0,
          latitudeDelta: 9.0,
          longitudeDelta: 15.0,
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{latitude: marker.lat, longitude: marker.lon}}
            title={marker.title}
            description={marker.desc}
          />
        ))}
      </MapView>

      {/* Floating Action */}
      <FloatingAction onPressMain={openDialog} ref={floatingRef} />

      {/* Dialog */}
      <Dialog
        visible={open}
        title="Add a new MyPlace"
        titleStyle={{textAlign: 'center'}}
        onTouchOutside={closeDialog}>
        <View style={styles.dialog}>
          <Input
            label="City"
            onChangeText={text => setPlace(text)}
            value={place}
          />
          <Input
            label="Text"
            onChangeText={text => setText(text)}
            value={text}
          />
          <View style={styles.buttons}>
            <Button
              title="Cancel"
              buttonStyle={styles.cancelButton}
              titleStyle={styles.cancelTitle}
              onPress={closeDialog}
            />
            <Button title="Save" onPress={findPlace} />
          </View>
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  dialog: {
    width: '100%',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'lightgray',
  },
  cancelTitle: {
    color: '#000',
  },
});

export default App;
