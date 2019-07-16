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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import call from 'react-native-phone-call';
export default class HomePage extends Component {
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
        {id:1, title: "Profile", image:"user",nav:"Profile"},
        {id:2, title: "Exams", image:"star",nav:"Subjects"} ,
        {id:3, title: "Q. Bank", image:"star",nav:"profile"} ,
        {id:4, title: "My Result",image:"mortar-board",nav:"Myresult"} ,
        {id:5, title: "Package", image:"gear",nav:"Package"} ,
        {id:6, title: "Notes",image:"book",nav:"profile"} ,
        {id:7, title: "Package", image:"gear",nav:"Package"} ,
        {id:8, title: "Wallet",image:"credit-card",nav:"Wallet"} ,
   
    ]
    };
  }

  clickEventListener(item) {
    Alert.Alert(item.title)
  }

  render() {
    return (
       
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>My Dashboard</Text>
              <TouchableOpacity style={styles.noti}>
              <Icon style={styles.notiText} name="bell"/>
              </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
      
                  <TouchableOpacity style={styles.card} onPress={()=>this.props.navigation.navigate(item.nav)}>
                <View style={styles.cardFooter}></View>
                <Icon style={styles.cardImage} name={item.image}/>
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            
             
   
            )
          }}/>
       
       </ScrollView>
       <TouchableOpacity style={styles.button} onPress={this.call}>
           <Icon name="phone" style={styles.btnIcon}/>
          <Text style={styles.btnText}>Connect To Expert</Text>    
       </TouchableOpacity>
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
    fontSize:30,
    color:'#85C226',
    marginRight: 20,
  }
});    