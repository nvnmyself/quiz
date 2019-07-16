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
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import call from 'react-native-phone-call';
export default class Subject extends Component {
  
    call = () => {
        //handler to make a call
        const args = {
          number: '9479536321',
          prompt: false,
          
        };
        call(args).catch(console.error);
      };
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Profile", image:"user"},
        {id:2, title: "Exams", image:"star"} ,
        {id:3, title: "Q. Bank", image:"star"} ,
        {id:4, title: "My Result",image:"mortar-board"} ,
        {id:5, title: "Package", image:"gear"} ,
        {id:6, title: "Setting",image:"gear"} ,
   
    ],
    isLoading:true
    };
  }

 componentDidMount(){
     this.getDataUsingGet()
 }

  clickEventListener(item) {
    Alert.Alert(item.title)
  }

  getDataUsingGet=()=>{
   
    //GET request 
  return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=fetchSubjectlist`, {
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

  render() {
      if(this.state.isLoading){
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size={30} color="green"/>
          </View>
      }
    return (
       
      <View style={styles.container}>
          <View style={styles.header}>
          <TouchableOpacity style={styles.noti}
          onPress={()=>this.props.navigation.goBack()}
          >
              <Icon style={styles.notiText} name="arrow-left"/>
              </TouchableOpacity>
              <Text style={styles.headerText}>My Dashboard</Text>
            
          </View>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.dataSource}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.subject_id;
          }}
          renderItem={({item}) => {
            return (
      
                  <TouchableOpacity style={styles.card} onPress={()=>this.props.navigation.navigate("Exams",{
                    subjectID:item.subject_id
                  })}>
                <View style={styles.cardFooter}></View>
                <Icon style={styles.cardImage} name="mortar-board"/>
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{item.subject_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            
             
   
            )
          }}/>
     
       </ScrollView>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
   // marginTop:20,
    backgroundColor:'#F8F8F8'
  },
  list: {
      marginTop:30,
    paddingHorizontal: 5,
    backgroundColor:"#F8F8F8",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

  //  elevation: 12,
    marginVertical: 10,
    backgroundColor:"white",
    flexBasis: '42%',
    marginHorizontal: 10,
    borderWidth: 3,
    borderTopLeftRadius:30,
    borderBottomRightRadius:30,
    borderColor: '#85C226',
  },
  cardHeader: {
    paddingVertical: 13,
    paddingHorizontal: 16,
   // borderTopLeftRadius: 1,
    //borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    fontSize:50,
    color:'#85C226',
    alignSelf:'center'
  },
  title:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#85C226"
  },
  button:{
      alignItems:'center',
      justifyContent:'center',
    //  marginBottom: 15,
     // borderWidth:1,
      backgroundColor:'#85C226',
      width:350,
      height:55,
      margin:20,
      alignSelf:'center',
      flexDirection:'row'

  },
  btnText:{
      fontSize:25,
      padding:20,
      color:'#fff',
      fontWeight: 'bold',

  },
  btnIcon:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize:25,
  },
  header:{
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