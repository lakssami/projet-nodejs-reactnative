import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Single = ({route}) => {
    fetch("http://10.0.2.2:4003/" , { method : "get" , body : JSON.stringify()})
        .then(reponse=> reponse.json())
        .then(data=>{
          console.log(data)
          })
    
  return (
    <View>
      <Text>Détails de l'oeuvre</Text>
      <Text>{route.params.id}</Text>
    </View>
  )
}

export default Single

const styles = StyleSheet.create({})