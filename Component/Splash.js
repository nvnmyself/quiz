import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state={
      userID:''
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed ");
  }
componentDidMount(){
AsyncStorage.getItem("userID").then((value)=>{
  this.setState({
    userID:value
  },this.check)
})
  
}
check=()=>{
  console.log(this.state.userID)
  setTimeout(()=>{
    if(this.state.userID!=''){
      this.props.navigation.navigate("HomePage")
    }else{
      this.props.navigation.navigate("Login")
    }
   
  },3000)
}
  render() {
    return (
        // <ImageBackground source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkj-zLSvnK_Oqvog7uRpVanCuE2OIad1Wvgglk0GKIFi1YojzP0w'}} style={{width: '100%', height: '100%'}} resizeMode="cover" blurRadius={.2}>
        <View style={styles.container}>
        <Image source={require('../src/logo.png')}
         style={styles.image}/>
         <Text style={styles.title}>Ayurvedic Entrance</Text>
          
        </View>
      //  </ImageBackground>
 
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
  },
  container: {
    flex: 1,
   // marginTop:'50%',
    alignItems: 'center',
    justifyContent:'center',
   // backgroundColor: '#EE82EE',
  },
  image:{
    width:205,
    height:205,
    marginBottom:50
  },
  title:{
      color:'#85C226',
      fontSize:28,
      fontFamily:'monospace',
      fontWeight:'bold'
     // height:42
  },
  logo:{
    width:120,
    height:120,
    justifyContent: 'center',
    marginBottom:10,
    marginTop:30,
  },
  companyName: {
    fontSize:25,
    //fontWeight: '600',
    color: 'black',
    fontFamily: 'monospace',

  },
  slogan:{
    fontSize:18,
    fontWeight: '600',
    color: '#228B22',
    marginTop:10,
  },
  descriptionContent:{
    padding:30
  },
  description:{
    fontSize:18,
    textAlign:'center',
    marginTop:10,
    color: '#FFFFFF',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:30,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: '#EE82EE',
  }
}); 