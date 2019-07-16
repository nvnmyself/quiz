import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Instruction extends Component{
    constructor(props){
        super(props)
        this.state={

        }

    }

    componentDidMount(){
        this.getDataUsingGet()
    }

    getDataUsingGet=()=>{
      const{params}=this.props.navigation.state;
      const subjectID=params.subjectID;
      const topicID=params.topicID
        //GET request 
      return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=fetchAllQuestion&subjectId=${subjectID}&topicId=${encodeURIComponent(topicID)}`, {
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
 



    render(){
        const {params}=this.props.navigation.state;

        return(
            <View style={styles.container}>
                <Text>Instruction</Text>
                <TouchableOpacity 
                style={{backgroundColor:'green'}}
                onPress={()=>this.props.navigation.navigate("Examtest",{
                    json:this.state.jsonData,
                    subjectID:params.subjectID,
                    topicID:params.topicID

                })}>
                    <Text style={{color:'#FFFFFF',padding:10}}>Start Test</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})