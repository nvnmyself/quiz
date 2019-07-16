
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from 'react-native';

export default class Register extends Component {

  constructor(props){
    super(props)
    this.state={
      name:'',
      mobile:'',
      password:'',
      email:'',
      isLoading:false
    }
  }
   
  getDataUsingGet=()=>{


    if(this.state.mobile==''|| this.state.mobile.length<10){
      alert("Mobile number can't be empty or less than 10 digit")
    }else{
      if(this.state.name==''){
        alert("Name can't be empty")
      }else{
        if(this.state.password==''){
          alert("Password can't be empty")
        }else{
          if(this.state.email==''){
            alert("Email is empty or not valid")
          }else{
            this.setState({
              isLoading:true
            })
   
           const mobile=this.state.mobile;
           const password=this.state.password;
           const email=this.state.email;
           const name=this.state.name ;
           const device=''
           //GET request 
           fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=user_registration&name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}&deviceId=${encodeURIComponent(device)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`, {
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
             //  alert(JSON.stringify(responseJson));
             this.setState({
               isLoading:false
             },function(){
               if(responseJson.response.status==1){
                 alert("Registration successfull")
                 this.props.navigation.navigate("Login")
               }else if(responseJson.response.status==2){
                 alert("User already exist")
                 this.props.navigation.navigate("Login")
               }else{
                 alert("Registration Failed")
               }
               
             })
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
        <ImageBackground source={require('../src/logo.png')} style={{flex:1,width:'100%',height:'100%'}} resizeMode="contain" blurRadius={2}>
     <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
          {/* <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
         */}
          <TextInput style={styles.inputs}
              placeholder="enter your name"
             // secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(name)=>this.setState({name})}
              />
        </View>

        <View style={styles.inputContainer}>
          {/* <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          */}
          <TextInput style={styles.inputs}
              placeholder="enter your email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email)=>this.setState({email})}
              />
        </View>
        
        <View style={styles.inputContainer}>
          {/* <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
         */}
          <TextInput style={styles.inputs}
              placeholder="enter your password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password)=>this.setState({password})}
              />
        </View>

        <View style={styles.inputContainer}>
          {/* <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          */}
          <TextInput style={styles.inputs}
              placeholder="enter your mobile"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(mobile)=>this.setState({mobile})}
              />
        </View>
        
   
     
        {/* <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text>Forgot?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.getDataUsingGet}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer1}>
            <Text style={styles.registerText}>Already Have a Account? Sign In</Text>
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
      borderColor:'#C1BFBF'
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
    width:250,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderWidth:2,
    borderColor:'#033309'
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
 