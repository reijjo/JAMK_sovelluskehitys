import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherForecast from './WeatherForecast';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      console.log('Cities saving error', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities');

      if (value !== null) {
        setCities(JSON.parse(value));
      }
    } catch (e) {
      console.log('Cities loading error', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [cities]);

  const openDialog = () => {
    setModalVisible(true);
  };

  const addCity = () => {
    setCities([...cities, {id: Math.random(), name: cityName}]);
    setModalVisible(false);
  };

  const cancelCity = () => {
    setModalVisible(false);
  };

  const deleteCity = deleteCity => {
    let filteredArray = cities.filter(city => city.id !== deleteCity);
    setCities(filteredArray);
  };

  return (
    <SafeAreaView>
      <Header
        centerComponent={{text: 'Weather App', style: {color: '#fff'}}}
        rightComponent={
          <Icon name="plus" size={24} color="#fff" onPress={openDialog} />
        }
      />
      {cities.map(city => (
        <WeatherForecast key={city.id} city={city} deleteCity={deleteCity} />
      ))}
      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <View>
          <Input
            onChangeText={text => setCityName(text)}
            placeholder="Type cityname here"
          />
        </View>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>
    </SafeAreaView>
  );
};

export default App;
