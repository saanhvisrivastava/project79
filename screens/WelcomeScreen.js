import * as React from 'react';
import {ScrollView,Text,View,TouchableOpacity,Alert,StyleSheet,TextInput,Image,Modal,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailaddress:"",
            password:"",
            isModalVisible:'false',
            firstName:"",
            lastName:"",
            address:"",
            contact:"",
            password:"",
            confirmPassword:" "
        }
    }

    showModal=()=>{
      return(
        <Modal visible={this.state.isModalVisible}
        animationType='fade'
        transparent={true}
        
        >
          <View style={styles.modalContainer}>
          <ScrollView style={{width:'100%'}}>
            
     <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
       <Text style={styles.modalTitle}>Registration</Text>
        <TextInput placeholder={"firstName"}
        style={styles.fornTextInput}
        maxLength={15}
        onChangeText={(text)=>{
         this.setState({
           firstName:text
         })
        }}
        > </TextInput>

<TextInput placeholder={"lastName"}
        style={styles.fornTextInput}
        maxLength={15}
        onChangeText={(text)=>{
         this.setState({
           lastName:text
         })
        }}
        > </TextInput>

<TextInput placeholder={"contact"}
        style={styles.fornTextInput}
        maxLength={10}
        //keyBoardType={numeric}
        onChangeText={(text)=>{
         this.setState({
           contact:text
         })
        }}
        > </TextInput>

<TextInput placeholder={"address"}
        style={styles.fornTextInput}
        multiline={true}
        
        onChangeText={(text)=>{
         this.setState({
           address:text
         })
        }}
        > </TextInput>

<TextInput placeholder={"email"}
        style={styles.fornTextInput}
       
        keyBoardType={'email-address'}
        onChangeText={(text)=>{
         this.setState({
           email:text
         })
        }}
        > </TextInput>

<TextInput placeholder={"password"}
        style={styles.fornTextInput}
       
        secureTextEntry={true}
        onChangeText={(text)=>{
         this.setState({
           password:text
         })
        }}
        > </TextInput>
       
       <TextInput placeholder={"confirmPassword"}
        style={styles.fornTextInput}
       
        secureTextEntry={true}
        onChangeText={(text)=>{
         this.setState({
           confirmPassword:text
         })
        }}
        > </TextInput>


       <View style={styles.modalBackButton}>
         <TouchableOpacity style={styles.registeredButton}
         onPress={()=>{this.signUp(this.state.email,this.state.password,
          this.state.confirmPassword)}}
         > 
           <Text style={styles.registeredButtonText}>Register</Text>
         </TouchableOpacity>
       
       


       </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity style={styles.cancelButton}
          onPress={()=>{{this.setState({
            isModalVisible:false
          })}}}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
       </View>
        </Modal>
      )
      
      
    }

    signUp=(email,pass,confirmPass)=>{
      if(pass!==confirmPass){
        return Alert.alert("PASSWORD AND CONFIRM PASSWORD DOES NOT MATCH");
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(() => {
          db.collection("users").add({
            address:this.state.address,
            email:this.state.email,
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            contact:this.state.contact
          })
        return Alert.alert("User added successfully")

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
          // ..
        });
      }
    }

    login=(email,pass)=>{
      firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
      return Alert.alert("Login successful")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
        // ..
      });
  }


render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        {
          this.showModal()
        }
        </View>
          <View style={styles.profileContainer}>
          <Text style={styles.title}>Welcome To BarterSystem</Text>
          </View>
          <View style={styles.buttonContainer}>
              <TextInput style={styles.loginBox}placeholder="abc@gmail.com"
              keyboardType="email-address"
              onChangeText={(text)=>{
               this.setState({
                   emailaddress:text
               })
              }}

              
              ></TextInput>

<TextInput placeholder="Abc647@"
              secureTextEntry={true}
              onChangeText={(text)=>{
               this.setState({
                   password:text
               })
              }}
              />

              <TouchableOpacity style={styles.button}
              onPress={()=>this.setState({
                isModalVisible:true
              })}
              >
                  <Text style={styles.buttonText}> Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
              onPress={()=>{this.login(this.state.emailaddress,this.state.password)}}
              >
                  <Text style={styles.buttonText}> Login</Text>
              </TouchableOpacity>
          </View>


      </View>

    )
}

}
const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})