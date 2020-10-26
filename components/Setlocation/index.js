
import { StatusBar } from 'expo-status-bar';
import React,  { Component} from 'react'
import MapView from 'react-native-maps';
;
import  Constants from 'expo-constants'
import {Dimensions, Platform, StyleSheet, Text, View,Image, Button ,Alert,TextInput,AsyncStorage } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location'
import * as Permissions from  'expo-permissions'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import SyncStorage from 'sync-storage';

class  Setlocation extends Component {
    state = {
      precio: "",
      longitude: "",
      latitude:"",
      id:""
  
    //  users: [],
    };
  
    componentDidMount(){
       //console.log(localStorage.getItem('USER'))
      // 'bar'

      AsyncStorage.getItem('USER_ID').then((mobileNo) => {
        if(mobileNo){
            this.setState({id: mobileNo});
            console.log( "has id"+this.state.id);
        }else {
          console.log("i don't know id ")
        }
    });
    if(Platform.OS === 'android' && !Constants.isDevice){
      this.setState({
        errorMessage:'opps,this will not work on skech in in android emulator'
      });

    }else {
      this._getLocationAsync();
      }
    
  }   
    _getLocationAsync = async () =>{
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status != 'granted'){
        this.setState({
           errorMessage:'Permission to access location was denied'
        })
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          // const location = JSON.stringify(position);
  
          // this.setState({ location });
          this.setState({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
            error:null
          });
        },
        error => this.setState({error:error.message}),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      //console.log(this.state.location.coords.longitude)
      //console.log(this.state.location.coords.latitude)
}
    findCoordinates =  () => {
     
          axios.put(`http://192.168.1.9:4000/api/user/${this.state.id}`,  {
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            precio:this.state.precio
          } )
          .then(res => {
            console.log(res);
          console.log(res.data);
          })
        // localStorage.setItem
         this.props.navigation.navigate('Localisation')
          //this.props.navigation.navigate('Details')
         
       }
  
  render(){
  
    return (
      <View  style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft} >
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: 'https://4.bp.blogspot.com/-V8DYLBvoRsE/VkJp8RkJb5I/AAAAAAAAAVA/pSd5NUwB5Co/s1600/cuentos-infantiles-cortos-bicicleta-300x234.jpg',
                  }}
                />
  
                </View>
                <View style={styles.headerRight} >
                 <Image
                  // title="Login" onPress={this.saludo}
                 style={styles.tinyLogo}
                 source={{
                   uri: 'https://4.bp.blogspot.com/-V8DYLBvoRsE/VkJp8RkJb5I/AAAAAAAAAVA/pSd5NUwB5Co/s1600/cuentos-infantiles-cortos-bicicleta-300x234.jpg',
                 }}
                 />
                </View>
  
            </View>
            <View style={[styles.body,styles.negrita]}>
            {/* <Text>Ohello!</Text> */}
            <Text style={styles.inputext}>i don't know</Text>
  
           <TextInput
  
             name="precio"
             value={this.state.precio}
             onChangeText={(precio) => this.setState({ precio })}
             label='precio'
              placeholder='precio'
             style={styles.input}
           />
         
             <Button
            title={'publicar'}
            style={styles.input}
            onPress={this.findCoordinates}
           // onPress={() => this.props.navigation.navigate('Details')}
            
            // onPress={this.onLogin.bind(t}
          />
  
            </View>
      </View>
    );
                }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column'
    },
    negrita:{
     fontWeight:'bold'
    },
    inputext: {
      width: 200,
      height: 44,
      padding: 10,
      textAlign:'center',
      fontWeight:'bold',
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    input: {
      width: 200,
      height: 50,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    header: {
      flex: 0.5,
       marginTop:10,
      flexDirection:'row'
    },
    headerLeft:{
      flex: 1,
  
    },
    headerRight:{
      flex:1,
  
  
    },
    body:{
      flex:1,
      alignItems:'center'
    },
    tinyLogo: {
      width: 150,
  
      height: 150,
      borderRadius:50,
      resizeMode:'contain'
    },
  });
  

export  default Setlocation;