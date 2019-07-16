import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
export default class Myresult extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
      isLoading:true,
      userID:'',
     
    };
  }

  componentDidMount(){
  
  AsyncStorage.getItem("userID").then((value)=>{
      this.setState({
          userID:value
      },this.getDataUsingGet1)
  })
  }

  getDataUsingGet=()=>{
   
       //GET request 
     return  fetch(`http://www.radicaltechsupport.com/ayurquiz/fetchAllQuestion.php`, {
           method: 'GET'
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
        jsonData:responseJson.response
      })
        
       })
       //If response is not in json then in error
       .catch((error) => {
           //Error 
         //  alert(JSON.stringify(error));
           console.log(error);
       });
     }

     getDataUsingGet1=()=>{
  // const {params}=this.props.navigation.state;
   const userID=this.state.userID;
  
      //GET request 
    return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=myResult&userId=1`, {
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
       dataSource:responseJson.response
     })
       
      })
      //If response is not in json then in error
      .catch((error) => {
          //Error 
        //  alert(JSON.stringify(error));
          console.log(error);
      });
    }

  renderItem = ({item}) => {
    const {params}=this.props.navigation.state;
    var callIcon = "https://img.icons8.com/color/48/000000/phone.png";
    if(item.video == true) {
      callIcon = "https://img.icons8.com/color/48/000000/video-call.png";
    }
    return (
      <TouchableOpacity 
    //  onPress={()=>this.props.navigation.navigate("Instruction",{
    //      subjectID:item.subject_id,
    //      topicID:item.topic_id
    //  })}
      >
        <View style={styles.row}>
          <Icon  name="envira" style={[styles.pic,{color:'green',fontSize:40,borderRadius:40,}]} />
          <View style={{flex:1}}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.topic_name}</Text>
            </View>
            <View style={styles.end}>
              <Icon style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} name="question-circle-o"/>
              <Text style={styles.time}>No of Question {item.no_of_question}</Text>
            </View>
            <View style={styles.end}>
              <Icon style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} name="clock-o"/>
              <Text style={styles.time}>Time {item.duration}</Text>
            </View>
            <View style={styles.end}>
              <Icon style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} name="calendar"/>
              <Text style={styles.time}>posted {item.date}</Text>
            </View>
          </View>
            </View>
      </TouchableOpacity>
    );
  }
 

  render() {
    return(
      <View style={{ flex: 1 }} >
        <FlatList 
          extraData={this.state}
          data={this.state.dataSource}
       //   ref={(e) => this.state.calls = e}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>

          {/* <TouchableOpacity  onPress={()=>{
            console.log(this.state.jsonData)
            this.props.navigation.navigate("Examtest",{
            json:this.state.jsonData
          })}}>
            <Text>fetch</Text>
          </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',

  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,

  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,

  },
  icon:{
    height: 28,
    width: 28, 
  }
}); 