
import { StatusBar } from 'expo-status-bar';
import React,  { Component} from 'react'
import MapView from 'react-native-maps';
;
import  Constants from 'expo-constants'
import {Dimensions, Platform, StyleSheet, Text, View,Image, Button ,Alert,TextInput,SyncStorage} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location'
import * as Permissions from  'expo-permissions'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import SyncStorage from 'sync-storage';

class  Login extends Component {
    state = {
      email: "",
      password: "",
  
  
  
    //  users: [],
    };
     saludo =() =>{
      Alert.alert('Hola bicycle')
    }
   submit = event => {
      event.preventDefault();
  
      const user = {
           email: this.state.email,
           password:this.state.password
       };
      console.log(this.state.email)
      console.log(this.state.password)
      //crt +k crt +u
      axios.post(`http://192.168.1.9:4000/api/user/add`,  user )
        .then(res => {
          console.log(res);
         console.log(res.data);
         SyncStorage.set("USER",JSON.stringify(res.data.usuario))
         SyncStorage.set("USER_ID",JSON.stringify(res.data.usuario.userID))

         const result1 = SyncStorage.get('USER');
         console.log(result1);
         const result2= SyncStorage.get('USER_ID');
         console.log(result2)
        })
          
       // localStorage.setItem
         this.props.navigation.navigate('SetLocation')
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
            <Text style={styles.inputext}>Bicycle</Text>
  
           <TextInput
  
             name="email"
             value={this.state.email}
             onChangeText={(email) => this.setState({ email })}
             label='email'
              placeholder='email'
             style={styles.input}
           />
           <TextInput
             name="password"
             value={this.state.password}
            //  onChangeText={(password) => this.setState({ password })}
             onChangeText={(password) => this.setState({ password })}
  
             label='password'
             placeholder='password'
             secureTextEntry={true}
             style={styles.input}
           />
             <Button
            title={'Registro'}
            style={styles.input}
            onPress={this.submit}
           // onPress={() => this.props.navigation.navigate('Details')}
            
            // onPress={this.onLogin.bind(t}
          />
          <Text
               onPress={()=>this.props.navigation.navigate('Login')}
              >
                Login
           
             </Text>
  
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
  

export  default Login;