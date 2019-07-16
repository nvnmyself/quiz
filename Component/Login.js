
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,ScrollView,
  ActivityIndicator,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component {
    constructor(props){
      super(props)
      this.state={
        mobile:'',
        password:'',
        isLoading:false
      }
    }

  
    getDataUsingGet=()=>{
      if(this.state.mobile=='' || this.state.mobile.length<10){
        alert("Mobile number can't be empty or less than 10 digit")
      }else{
        if(this.state.password==''){
          alert("Password can't be empty")
        }else{
          this.setState({
            isLoading:true
          })
          const mobile=this.state.mobile;
          const password=this.state.password;
         console.log(mobile,password)
         console.log(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=login&mobile=${encodeURIComponent(mobile)}&password=${encodeURIComponent(password)}&deviceId=1`)
          //GET request 
          fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=login&mobile=${encodeURIComponent(mobile)}&password=${encodeURIComponent(password)}&deviceId=1`, {
              method: 'GET',
              headers:{
                'Cache-Control':'no-cache'
              }
              //Request Type 
          })
          .then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
              //Success 
              console.log(responseJson)
              this.setState({
                isLoading:false
              },
              function(){
                if(responseJson.status==1){
                  alert("Login Successfull")
                   AsyncStorage.setItem("userID",responseJson.id)
                  // AsyncStorage.setItem("name",responseJson.response.name)
                  // AsyncStorage.setItem("mobile",responseJson.response.mobile)
                  this.props.navigation.navigate("HomePage")
                }else{
                  alert(responseJson.response.message)
                }
              })
             // alert(JSON.stringify(responseJson));
              console.log(responseJson);
          })
          //If response is not in json then in error
          .catch((error) => {
              //Error 
              this.setState({
                isLoading:false
              })
              alert(JSON.stringify(error));
              console.error(error);
          });
        }
      }
      }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size={30} color="green"/>
        </View>
      )
    }
    return (
        <ImageBackground source={require('../src/logo.png')} style={{flex:1,width:'100%',height:'100%'}} resizeMode="cover" blurRadius={2}>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          */}
          <TextInput style={styles.inputs}
              placeholder="enter mobile number"
              keyboardType="numeric"
              maxLength={10}
            
              underlineColorAndroid='transparent'
              onChangeText={(mobile)=>this.setState({
                mobile
              })}
              />
        </View>
        
        <View style={styles.inputContainer}>
          {/* <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
         */}
          <TextInput style={styles.inputs}
              placeholder="enter your password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password)=>this.setState({
                password
              })}
              />
        </View>
     
        {/* <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text>Forgot?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
        onPress={this.getDataUsingGet}
        style={[styles.buttonContainer, styles.loginButton]} >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate("Register")}
        style={styles.buttonContainer1}>
            <Text style={styles.registerText}>Don't Have Account? Create Now</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]}>
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/facebook/androidL/40/FFFFFF'}}/>
            <Text style={styles.loginText}>Continue with facebook</Text>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]}>
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/google/androidL/40/FFFFFF'}}/>
            <Text style={styles.loginText}>Sign in with google</Text>
          </View>
        </TouchableOpacity> */}
     
      </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: '#B0E0E6',
  },
  inputContainer: {
     // borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
     // borderRadius:30,
      //borderBottomWidth: 1,
      width:300,
      height:53,
      marginBottom:25,
      flexDirection: 'row',
      alignItems:'center',
      borderTopLeftRadius: 25,
      borderBottomRightRadius: 25,
      borderWidth: 3,
      borderColor:'#85C226'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
    
  },
  icon:{
    width:30,
    height:30,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25
  },
  buttonContainer1: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25
  },
  loginButton: {
    backgroundColor: '#85C226',
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#ff0000",
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20
  },
  restoreButtonContainer:{
    width:250,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  socialIcon:{
    color: "#FFFFFF",
    marginRight:5
  },
  registerText:{
      color:'#2E5A28',
      fontSize:18,
      fontWeight:'bold'
  }
});
 