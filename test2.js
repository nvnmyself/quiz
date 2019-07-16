import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';








const { width, height } = Dimensions.get('window')
let arrnew = []

const jsonData3={
  "0": {
  "question": "first prime minister?",
  "options": {
  "option_one": "moti lal nehru",
  "option_two": "jawahar lal nehru",
  "option_three": "ggggggggggg",
  "option_four": "rrrrrrrrr"
  }
  },
  "1": {
  "question": "WHAT IS YOUR NAME?",
  "options": {
  "option_one": "GHFGH",
  "option_two": "JHGH",
  "option_three": "GHVGHG",
  "option_four": "HJGJ"
  }
  },
  "2": {
  "question": "City of lake?",
  "options": {
  "option_one": "Bhoapl",
  "option_two": "Delhi",
  "option_three": "lucknow",
  "option_four": "Patna"
  }
  }
  }
  

const jsonData=[  
  {  
     "question":"first prime minister?",
     "options":{  
        "option_one":"moti lal nehru",
        "option_two":"jawahar lal nehru",
        "option_three":"ggggggggggg",
        "option_four":"rrrrrrrrr"
     }
  },
  {  
     "question":"present governor of M.P?",
     "options":{  
        "option_one":"govind narayan singh",
        "option_two":"ravi shankar shukla",
        "option_three":"kkkkkkkkkkkkkkkkk",
        "option_four":"qqqqqqqqqqqqqqqqqq"
     }
  }
]
const jsonData1 = {"quiz" : {
  "quiz1" : {
    "question1" : {
      "correctoption" : "option3",
      "options" : {
        "option1" : "Java",
        "option2" : "PHP",
        "option3" : "Javascript",
        "option4" : "IOS"
      },
      "question" : "React is a ____ library"
    },
    "question2" : {
      "correctoption" : "option4",
      "options" : {
          "option1" : "XML",
          "option2" : "YML",
          "option3" : "HTML",
          "option4" : "JSX"
        },
      "question" : "____ tag syntax is used in React"
    },
    "question3" : {
      "correctoption" : "option1",
      "options" : {
          "option1" : "Single root DOM node",
          "option2" : "Double root DOM node",
          "option3" : "Multiple root DOM node",
          "option4" : "None of the above"
        },
      "question" : "Application built with just React usually have ____"
    },
    "question4" : {
      "correctoption" : "option2",
      "options" : {
          "option1" : "mutable",
          "option2" : "immutable",
          "option3" : "variable",
          "option4" : "none of the above"
        },
      "question" : "React elements are ____"
    },
    "question5" : {
      "correctoption" : "option3",
      "options" : {
          "option1" : "functions",
          "option2" : "array",
          "option3" : "components",
          "option4" : "json data"
        },
      "question" : "React allows to split UI into independent and reusable pieses of ____"
    },
    
    
  }
}
}

export default class Examtest extends Component{
 constructor(props){
     super(props)
     this.qno=0
     this.score = 0
     this.qarray=[]
     this.store=""
     const val=""
     const {params}=this.props.navigation.state;
   //  console.log(params.json)
   const jdt=params.json
   console.log(jdt)
   arrnew=Object.keys(jdt).map(function(k){return jdt[k]});
   //arrnew=params.json
 console.log(arrnew)
      this.state={
        question:arrnew[this.qno].question,
        options : arrnew[this.qno].options,
        correctoption:arrnew[this.qno].correct_option,
        qarray:[],
        aarray:[''],
        tarray:[],
        marray:[],
        barray:[],
        carray:[],
        choose:[],
        Choosed:'',
        selected_category: ' ',
        selected_category1: ' '
      }
     
     
 }
 _handleCategorySelect (index)  { 
    console.log(index)  
    this.setState({selected_category: index}); }

 store=(value)=>{
  let {qarray}=this.state;
  let {aarray}=this.state;
  aarray[this.qno]=value
  qarray[this.qno]=arrnew[this.qno].question
  this.setState({
    aarray,
    qarray
  })
  console.log(this.state.qarray)
console.log(this.state.aarray)
 }

 submit=()=>{
   const {params}=this.props.navigation.state;

  console.log(this.state.carray)
  const question=this.state.qarray;
  const subjectID=params.subjectID;
  const topicID=params.topicID;
  const answer=this.state.aarray; 
  const a=question.toString();
  const b=answer.toString().split(',');
  const c=this.state.carray;
  console.log(subjectID+topicID)
  //GET request 
  console.log(a)
  console.log(b)
 
return  fetch(`http://www.radicaltechsupport.com/ayurquiz/activity.php?method=submitTest&subjectId=${encodeURIComponent(subjectID)}&topicId=${encodeURIComponent(topicID)}&question=${encodeURIComponent(a)}&selectedAns=${encodeURIComponent(b)}&correctAns=${encodeURIComponent(c)}&userId=1`, {
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

   
  })
  //If response is not in json then in error
  .catch((error) => {
      //Error 
    //  alert(JSON.stringify(error));
      console.log(error);
  });
}


 next=()=>{
  let {aarray}=this.state;
  if(this.qno < arrnew.length-1){
   
    this.qno++
   
   this.setState({ 
    
       question: arrnew[this.qno].question, 
       options: arrnew[this.qno].options,
       correctoption: arrnew[this.qno].correct_option
    //   Choosed:aarray[this.qno]
     
 })

 }

}

jump(val){
    let {aarray}=this.state;
   
     
      this.qno=parseInt(val)
     
     this.setState({ 
      
         question: arrnew[this.qno].question, 
         options: arrnew[this.qno].options,
         correctoption: arrnew[this.qno].correct_option, 
         Choosed:aarray[this.qno]
       
   })
  
   
  
  }



 prev=()=>{
   let {aarray}=this.state;

  if(this.qno > 0){
    this.qno--
    this.setState({ question: arrnew[this.qno].question,
      options: arrnew[this.qno].options,
      correctoption: arrnew[this.qno].correct_option
    //  Choosed:aarray[this.qno]
      })
  }
}
_answer(ans,index){
 // alert(ans)
  let {qarray}=this.state;
  let {aarray}=this.state;
  let {carray}=this.state
  let {marray}=this.state;
  let {barray}=this.state;
  aarray[this.qno]=ans.toString();
  qarray[this.qno]=this.qno.toString();
  carray[this.qno]=this.state.correctoption
  marray[this.qno]=index;
  barray[this.qno]=index-1;
  this.setState({
    aarray,
    qarray,
    marray,
    barray,
    carray,
    Choosed:ans,
    selected_category: index+this.qno,
    selected_category1:index+this.qno
  })
  console.log(this.state.qarray)
console.log(this.state.aarray)

    }



 render(){
  let that = this

const currentoption=this.state.options;
const mr=this.state.marray[this.qno];
const br=this.state.barray[this.qno]
const option=Object.keys(currentoption).map(function(k){
  return(
    <TouchableOpacity  
    
  //  onPress={(status) => _this._answer(status,k)}
  style={that.state.selected_category === currentoption[k] || mr==currentoption[k]?  
    styles.selected : styles.selected1}
 onPress={() => that._answer(k,currentoption[k])}
    key={k} >
      <Text style={{fontSize:20,padding:10}}>
      
      {currentoption[k]}
      </Text> 
    </TouchableOpacity>
  )
})

const box=Object.keys(arrnew).map(function(k){return(
   
    <TouchableOpacity 
    onPress={()=>that.jump(k)}
    style={that.state.selected_category1 ===that.state.barray[k] || that.state.barray[k]==arrnew[this.qno] ?  
        styles.selectedd : styles.selectedd1}/>

    
)})

     return(
       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <View>
                <Text style={{fontSize:20,fontWeight:'bold',color:'black',marginBottom:10}}>{this.state.question}</Text>
              </View>
              
              <View style={{alignItems:'center',width:'100%'}}>
              {option}
              </View>
              <View style={{marginTop:20}}>
                <Text >Choosed Item </Text>
              </View>
             
     <View style={{flexDirection:'row',marginTop:40}}>
       <TouchableOpacity style={{flex:1,alignItems:'center'}} 
       onPress={this.prev}
       >
         <Icon style={{fontSize:30}} name="ios-arrow-dropleft"/>
       </TouchableOpacity>

       <TouchableOpacity
       onPress={this.next}
       style={{flex:1,alignItems:'center'}} >
         <Icon style={{fontSize:30}} name="ios-arrow-dropright"/>
       </TouchableOpacity>
     </View>
 <View style={{flexDirection:'row',width:300,alignItems:'center',justifyContent:'center',flexWrap: 'wrap'}}>
  {box}
  
  </View>
  <TouchableOpacity onPress={this.submit}>
    <Text>submit</Text>
  </TouchableOpacity>
         </View>
     )
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
    selected:{
        borderColor:'grey',
        elevation:22,
        borderWidth:1,
        alignItems:'center',justifyContent:'center',width:'80%',marginTop:5,backgroundColor:'#FFFFFF',
    },
    selectedd:{
     width:10,height:10,
    marginLeft: 5,
     backgroundColor:'grey',
     
    },
    selectedd1:{
        borderColor:'grey',
        width:10,height:10
       ,backgroundColor:'red',
       marginLeft: 5,
       
    },
    selected1:{
        alignItems:'center',justifyContent:'center',width:'80%',marginTop:5,backgroundColor:'#FFFFFF',elevation:1
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
})