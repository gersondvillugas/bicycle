import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import MapView from 'react-native-maps';
;
import Constants from 'expo-constants'
import { Dimensions, Platform, StyleSheet, Text, View, Image, Button, Alert, TextInput } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
class Localisation extends Component {
  state = {
    location: null,
    errorMessage: null,
    locationResult: null,
    latitude: 0,
    longitude: 0,
    erro: null,
    users:[],
    user: 'gerson'
  }
  componentDidMount() {
    axios.get('http://192.168.1.9:4000/api/user')

      .then( (response) =>{
        // handle success
        //console.log(response);
        console.log(response.data.users);
        this.setState({ users:response.data.users})
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status != 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        // const location = JSON.stringify(position);

        // this.setState({ location });
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    //console.log(this.state.location.coords.longitude)
    //console.log(this.state.location.coords.latitude)
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
          region={{
            latitude: -12.046374
            ,
            longitude: -77.042793
            ,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* <MapView.Marker

            coordinate={{
              latitude: -12.0444784,
              longitude: -76.9319131
            }}
            title={"niño de mierda"}
            description={"desss"}
          />  */}

{     this.state.users.map(user =>{
        return( 
                <MapView.Marker
                title={user.email}
                coordinate={{latitude:user.latitude,longitude:user.longitude}}
                
                description={"description ey"}
    
             />
        );
      })}
        </MapView>
        {/* {this.state.users.map(project=><Project
                   key={project._id}
                   id={project._id}
                   title={project.title}
                   country={project.country}
                   description={project.description}
                   budget={project.budget}
                />)} */}
        {/* <Text         */}
    

      </View>
    )
  }



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default Localisation