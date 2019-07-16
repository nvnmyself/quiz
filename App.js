import React,{Component} from 'react'
import {createAppContainer,createStackNavigator} from 'react-navigation'
import Splash from './Component/Splash';
import Login from './Component/Login';
import Register from './Component/Register';
import HomePage from './Component/HomePage';
import Profile from './Component/Profile';
import Exams from './Component/Exams';
import Exam from './Component/Exam';
import Examtest from './test2';
import Subject from './Component/Subjects';
import Instruction from './Component/Instruction';
import Package from './Component/Package';
import Wallet from './Component/Wallet';
import Myresult from './Component/Myresult';

export default createAppContainer(createStackNavigator({
  Splash:{
    screen:Splash
  },
  Login:{
    screen:Login
  },
  Register:{
    screen:Register
  },
  HomePage:{
    screen:HomePage
  },
  Profile:{
    screen:Profile
  },
  Subjects:{
        screen:Subject
  },
  Exams:{
   screen:Exams
  },
  Exam:{
    screen:Exam
  },
  Examtest:{
    screen:Examtest
  },
  Instruction:{
    screen:Instruction
  },
  Package:{
    screen:Package
  },
  Wallet:{
    screen:Wallet
  },
  Myresult:{
    screen:Myresult
  }
},{
  headerMode:'none'
}))