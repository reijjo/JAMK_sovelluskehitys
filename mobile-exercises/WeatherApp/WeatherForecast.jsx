import {Card} from 'react-native-elements';
import {View, Text, Image, Button} from 'react-native';
import useAxios from 'axios-hooks';

const WeatherForecast = params => {
  const city = params.city;
  const API_KEY = '1c832937684ae64648c84c81b2a6f6ba';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  const [{data, loading, error}, refetch] = useAxios(
    URL + city.name + '&appid=' + API_KEY + '&units=metric',
  );

  let time = new Date().toLocaleString();

  const refreshForecast = () => {
    refetch();
  };

  const deleteCity = () => {
    params.deleteCity(city.id);
  };

  if (loading) {
    return (
      <Card>
        <Card.Title>Loading....</Card.Title>
      </Card>
    );
  }

  if (error) {
    console.log('error', error);
    return (
      <Card>
        <Card.Title>Error loading weather forecast!</Card.Title>
      </Card>
    );
  }

  // just for testing
  // console.log(JSON.stringify(data, null, 2));

  return (
    <Card>
      <Card.Title>
        {city.name}: {time}
      </Card.Title>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text>Main: {data.weather[0].main}</Text>
          <Text>Temp: {data.main.temp} °C</Text>
          <Text>Feels: {data.main.feels_like} °C</Text>
          <Text>
            Min-Max: {data.main.temp_min} - {data.main.temp_max} °C
          </Text>
        </View>

        <Image
          style={{width: 50, height: 50}}
          source={{
            uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button title="del" onPress={deleteCity} />
        <Button title="refresh" onPress={refreshForecast} />
      </View>
    </Card>
  );
};

export default WeatherForecast;
