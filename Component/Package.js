import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class Package extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      userID:''
    };
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
    return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=packageList`, {
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
      
     })
       
      })
      //If response is not in json then in error
      .catch((error) => {
          //Error 
        //  alert(JSON.stringify(error));
          console.log(error);
      });
    }
 
    Buy=()=>{
      const userID=this.state.userID;
      const packageID=this.state.userSelected.package_id;
      console.log(userID,packageID)
       //GET request 
     return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=packageBook&packageId=${encodeURIComponent(packageID)}&userId=${encodeURIComponent(userID)}`, {
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
        modalVisible:false
      //  dataSource:responseJson.response,
       
      },function(){
        if(responseJson.response.status==1){
          alert("Package booked succesfully")
         
        }else{
          alert(responseJson.response.message)
        }
      })
        
       })
       //If response is not in json then in error
       .catch((error) => {
           //Error 
         //  alert(JSON.stringify(error));
           console.log(error);
       });
     }

 
  clickEventListener = (item) => {
    this.setState({userSelected: item}, () =>{
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
           <View style={styles.header}>
          <TouchableOpacity style={styles.noti}
          onPress={()=>this.props.navigation.goBack()}
          >
              <Icon style={styles.notiText} name="arrow-left"/>
              </TouchableOpacity>
              <Text style={styles.headerText}>Packages</Text>
            
          </View>
        <FlatList 
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.dataSource}
          keyExtractor= {(item) => {
            return item.package_id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              <View style={{alignItems:'center',justifyContent:'center',width:90,height:90}}>
              <Icon style={styles.image} name="book"/>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.package_name}</Text>
                <Text style={styles.position}><Icon name="rupee"/> Price {item.price}</Text>
                <Text style={styles.position}><Icon name="book"/> Test Series : {item.no_of_test_series}</Text>
                <Text style={styles.position}><Icon name="clock-o"/> Duration : {item.duration}</Text>
                <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                  <Text style={styles.followButtonText}>View</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}/>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                    {/* <Image style={styles.image} source={{uri: this.state.userSelected.image}}/>
                   */}
                    <Text style={[styles.name,{color:'#000'}]}>{this.state.userSelected.name}</Text>
                    <Text style={styles.position}>{this.state.userSelected.position}</Text>
                    <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView>
               
              </View>
              <View style={styles.popupButtons}>
              <TouchableOpacity style={styles.followButton}
              onPress={this.Buy}
              >
                  <Text style={styles.followButtonText}>Buy</Text>  
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  //  marginTop:20,
    backgroundColor:"#FFFFFF"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
   
    fontSize:50,
    borderRadius:45,
    color:'#85C226'
  },



  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row',
    
  },

  name:{
    fontSize:15,
    flex:1,
    alignSelf:'flex-start',
    color:"#85C226",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'flex-start',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: "#85C226",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center',
    marginBottom:10
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#85C226',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
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