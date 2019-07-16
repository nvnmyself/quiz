import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      isLoading:true,
      userID:'',
      name:'',
      email:''
    }
  }

componentDidMount(){
  AsyncStorage.getItem("userID").then((value)=>{
    this.setState({
      userID:value
    },this.getDataUsingGet)
  })
  
}




  getDataUsingGet=()=>{
   const userID=this.state.userID;
   console.log(userID)
    //GET request 
  return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=userProfile&userId=${encodeURIComponent(userID)}`, {
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
       // AsyncStorage.setItem("new",responseJson.response)
   this.setState({
     isLoading:false,
     dataSource:responseJson.response,
     name:responseJson.response.name,
     email:responseJson.response.email
   })
     
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
      //  alert(JSON.stringify(error));
        console.log(error);
    });
  }

  profile=()=>{
   if(this.state.email=='' ||this.state.name=='')
   {alert("All fields are mendatory")}
   else{
     this.setState({
       isLoading:true
     })
    const email=this.state.email;
    const name=this.state.name;
    const userID=this.state.userID;
   
    console.log(userID)
     //GET request 
     return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=updateProfile&userId=${encodeURIComponent(userID)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`, {
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
        // AsyncStorage.setItem("new",responseJson.response)
    this.setState({
      isLoading:false,
     
    },function(){
        if(responseJson.response.status==1){
          alert("Profile Updated Succesfully")
          this.getDataUsingGet()
        }else{alert(responseJson.response.message)}
    })
      
     })
     //If response is not in json then in error
     .catch((error) => {
         //Error 
       //  alert(JSON.stringify(error));
         console.log(error);
     });
   }
   }

   password=()=>{
  if(this.state.password=='' || this.state.npassword==''){alert("Fields can't be empty")}
  else{
    if(this.state.cpassword!=this.state.npassword){alert("Password not matched")}
    else{
      this.setState({
        isLoading:true
      })
    
      const userID=this.state.userID;
      const password=this.state.password
      const npassword=this.state.npassword
      console.log(userID)
       //GET request 
     return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=updatePassword&userId=${encodeURIComponent(userID)}&oldPass=${encodeURIComponent(password)}&newPass=${encodeURIComponent(npassword)}`, {
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
          // AsyncStorage.setItem("new",responseJson.response)
      this.setState({
        isLoading:false,
       
      },function(){
        if(responseJson.response.status==1){
          alert("Password Updated Sucessfully")
        }else{alert(responseJson.response.message)}
    })
        
       })
       //If response is not in json then in error
       .catch((error) => {
           //Error 
         //  alert(JSON.stringify(error));
           console.log(error);
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
      <View style={styles.container}>
           <View style={styles.headers}>
          <TouchableOpacity style={styles.noti}
          onPress={()=>this.props.navigation.goBack()}
          >
              <Icon style={styles.notiText} name="arrow-left"/>
              </TouchableOpacity>
              <Text style={styles.headerText}>Profile</Text>
            
          </View>
         <ScrollView>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar2.png'}}/>
                <Text style={styles.name}>
               {this.state.name}
                </Text>
                <Text style={[styles.name,{fontSize:10}]}>
               Member Since {this.state.dataSource.profileCreate}
                </Text>
                
            </View>
           
          </View>

          <View style={styles.profileDetail}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Wallet</Text>
              <Text style={styles.count}>{this.state.dataSource.wallet==''?'0':this.state.dataSource.wallet}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Expense</Text>
              <Text style={styles.count}>{this.state.dataSource.expenses==''?'0':this.state.dataSource.expenses}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>deposit</Text>
              <Text style={styles.count}>{this.state.dataSource.deposit==''?'0':this.state.dataSource.deposit}</Text>
            </View>
          </View>
           
         
            <View style={styles.card}>
               <Text style={{fontSize:15,fontWeight:'bold'}}>Update Profile</Text>
               <TextInput 
                placeholder="Enter Email "
                underlineColorAndroid="transparent"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(email)=>this.setState({email})}
                style={{width:250,height:45,borderWidth:1,marginTop:8,borderColor:'grey',borderRadius:10}}
               />
                <TextInput 
                placeholder="Enter Name "
                value={this.state.name}
                keyboardType="default"
                underlineColorAndroid="transparent"
                onChangeText={(name)=>this.setState({name})}
                style={{width:250,height:45,borderWidth:1,marginTop:8,borderColor:'grey',borderRadius:10}}
               />

               <TouchableOpacity onPress={this.profile} style={styles.buttonContainer}>
                 <Text style={{color:'#FFFFFF',padding:10}}>Update Profile</Text>
               </TouchableOpacity>
            </View>  

            <View style={styles.card}>
               <Text style={{fontSize:15,fontWeight:'bold'}}>Update Password</Text>
               <TextInput 
                placeholder="Old Password "
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={(password)=>this.setState({password})}
                style={{width:250,height:45,borderWidth:1,marginTop:8,borderColor:'grey',borderRadius:10}}
               />
                <TextInput 
                placeholder="New Password"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={(npassword)=>this.setState({npassword})}
                style={{width:250,height:45,borderWidth:1,marginTop:8,borderColor:'grey',borderRadius:10}}
               />
                <TextInput 
                placeholder="Confirm Password"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={(cpassword)=>this.setState({cpassword})}
                style={{width:250,height:45,borderWidth:1,marginTop:8,borderColor:'grey',borderRadius:10}}
               />

               <TouchableOpacity style={styles.buttonContainer}
               onPress={this.password}
               >
                 <Text style={{color:'#FFFFFF',padding:10}}>Update Password</Text>
               </TouchableOpacity>
            </View>  
        
            </ScrollView> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#85C226",
   
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:-19,
    alignItems: 'center',
    flexDirection: 'row',
    position:'relative',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#85C226"
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
   // width:250,
    borderRadius:10,
    backgroundColor: "#85C226",
  },
  card:{
    margin:10,
    backgroundColor:'#FFFFFF',
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    elevation:1,
    marginBottom:10
  },
  description:{
    fontSize:20,
    color: "#00CED1",
    marginTop:10,
    textAlign: 'center'
  },
  headers:{
    backgroundColor:'grey',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
},
headerText:{
  fontWeight:'bold',
  fontSize:20,
  color:'#85C226',
  flex:1,
  marginHorizontal:10
   },
   noti:{
       alignItems:'center',
       justifyContent:'center',
      // borderWidth:1,
       margin:5
       
   },
   notiText:{
     color:'#fff',
     fontWeight:'bold',
     fontSize:20,
     color:'#85C226',
     marginRight: 20,
   },
   headers:{
    backgroundColor:'grey',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
},
headerText:{
  fontWeight:'bold',
  fontSize:20,
  color:'#85C226',
  flex:1,
  marginHorizontal:10
   },
   noti:{
       alignItems:'center',
       justifyContent:'center',
      // borderWidth:1,
       margin:5
       
   },
   notiText:{
     color:'#fff',
     fontWeight:'bold',
     fontSize:20,
     color:'#85C226',
     marginRight: 20,
   }
});
 