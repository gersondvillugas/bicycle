
import { StatusBar } from 'expo-status-bar';
import React,  { Component} from 'react'
import MapView from 'react-native-maps';
;
import  Constants from 'expo-constants'
import {Dimensions, Platform, StyleSheet, Text, View,Image, Button ,Alert,TextInput,SyncStorage,AsyncStorage} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location'
import * as Permissions from  'expo-permissions'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
  
      const payload = {
           email: this.state.email,
           password:this.state.password
       };
      console.log(this.state.email)
      console.log(this.state.password)
      //crt +k crt +u
      axios.post(`http://192.168.1.9:4000/api/user/login`,  payload )
        .then(res => {
         console.log(res);
        // console.log(res.data);
        // localStorage.setItem("USER",JSON.stringify(res.data.usuario))
        console.log("user :"+JSON.stringify(res.data.message.user))
        console.log("ids :" +res.data.message.user.userId   )
        var id=res.data.message.user.userId
        AsyncStorage.setItem('USER',JSON.stringify(res.data.message.user))
        AsyncStorage.setItem('USER_ID',id)

        //const result = AsyncStorage.getItem('USER');
         

        })
        var value =   AsyncStorage.getItem('USER');

        console.log("value "+value);   
        const result = AsyncStorage.getItem('USER_ID'); 
        console.log("last try :"+AsyncStorage.getItem('USER_ID'));
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
            <Text style={styles.inputext}>Bicyclse</Text>
  
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
            title={'Login'}
            style={styles.input}
            onPress={this.submit}
           />
              <Text
               onPress={()=>this.props.navigation.navigate('Home')}
              >
                Registro
           
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