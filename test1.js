import React,{Component} from 'react'

import {Text,View,FlatList,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const data = [
    {key: 'Devin'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
  ];


  const jsonData = {"quiz" : {
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
      }
    }
  }
  }


export default class check extends Component{
    constructor(props) {
        const jdt=jsonData.quiz.quiz1;
        arrnew=Object.keys(jdt).map(function(k){return jdt[k]});
        super(props);
        this.state = {
          itemsCount:0 ,
          selected_category: ' '
        };
      }
   
      renderNewItem = () => {
        if (this.state.itemsCount < data.length) {
          this.setState((prevState) => ({ itemsCount: (prevState.itemsCount + 1) }));
        }
      }

      _handleCategorySelect (index)  { 
        console.log(index)  
        this.setState({selected_category: index}); }

      render() {
     let that=this;

         // const datasource=Object.keys(jsonData).map(function(k){return jsonData[k]})
        console.log(arrnew)
          return (
          <View style={styles.container}>
            <FlatList
            data={arrnew.slice(this.state.itemsCount, this.state.itemsCount+1)}
            ref={(e) => this.selected_category = e}
            // data={data.slice(this.state.itemsCount, this.state.itemsCount+1)}
            //  keyExtractor={(item, index) => item.key}
              renderItem={({ item,index }) => 
              <View>
              <Text onPress={this.renderNewItem}>{item.question}</Text>
              
              {Object.keys(item.options).map(function(k){
                  
                  return (
                 <TouchableOpacity 
                 style={that.state.selected_category === item.options[k]?  
                    styles.selected : null}
                 onPress={() => that._handleCategorySelect(item.options[k])}>
                 <Text>{item.options[k]}</Text>
                 </TouchableOpacity>
              )})}
              
              </View>
              }
            />
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
    selected:{
        backgroundColor:'red'
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
})