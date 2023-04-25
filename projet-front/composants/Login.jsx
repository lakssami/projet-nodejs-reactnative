import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React , {useState, useContext } from 'react'
import { ProfilContext } from '../contexts/profilContext'

const Login = ({navigation}) => {
  const { setJWT} = useContext(ProfilContext)
    const [email, setEmail] =useState("zrrrt@yahoo.fr")
    const [password, setPassword] =useState("Paris12345")

    const submit = function(){
        const identifiant = { email, password}
        console.log(identifiant)
        fetch("http://10.0.2.2:4003/login" , { method : "post" , body : JSON.stringify(identifiant), headers : {"content-type" : "application/json"}})
        .then(reponse=> reponse.json())
        .then(data=>{
          console.log(data)
          setJWT(data.token)})
    }
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="email" style={styles.forme} value={email} onChangeText={(text) => setEmail(text)}/>
      <TextInput placeholder='password' style={styles.forme} value={password} onChangeText={(text) => setPassword(text)}/>
      <Button onPress={ submit } title="voulez-vous créer un compte?" />
    </View>
  )
}


export default Login

const styles = StyleSheet.create({
    forme : {
        borderWidth : 1,
        padding : 15 ,
        borderColor : "black",
        backgroundColor : "white",
        marginBottom : 15
    }
})