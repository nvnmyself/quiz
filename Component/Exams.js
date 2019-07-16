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
export default class Exams extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "Mark Doe",   date:"12 jan", time:'11:14 am', video:false, image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Clark Man",  date:"12 jul", time:'15:58 am', video:false, image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Jaden Boor", date:"12 aug", time:'12:45 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "Srick Tree", date:"12 feb", time:'08:32 am', video:false, image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "John Doe",   date:"12 oct", time:'07:45 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "John Doe",   date:"12 jan", time:'09:54 am', video:false, image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "John Doe",   date:"12 jul", time:'11:22 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "John Doe",   date:"12 aug", time:'13:33 am', video:false, image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "John Doe",   date:"12 oct", time:'11:58 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "John Doe",   date:"12 jan", time:'09:28 am', video:false, image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
      ],
      isLoading:true,
     
    };
  }

  componentDidMount(){
  
    this.getDataUsingGet1()
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
   const {params}=this.props.navigation.state;
   const subjectID=params.subjectID;
   console.log(subjectID)
      //GET request 
    return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=fetchTopiclist&subjectId=${encodeURIComponent(subjectID)}`, {
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
     onPress={()=>this.props.navigation.navigate("Instruction",{
         subjectID:item.subject_id,
         topicID:item.topic_id
     })}
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
              <Text style={styles.time}>posted {item.creation_date}</Text>
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
            return item.topic_id;
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