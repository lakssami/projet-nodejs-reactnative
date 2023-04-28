import { StyleSheet, Text, View } from 'react-native'
import React , {useState, useEffect} from 'react'

const Single = ({route}) => {
  const [resultat, setResultat]=useState({})

    useEffect(function(){
    fetch("http://10.0.2.2:4003/" + route.params.id)
        .then(reponse=> reponse.json())
        .then(data=>{setResultat(data);
          //console.log(data)
          })
        },[])
    
  return (
    <View>
      <Text>Détails de l'oeuvre</Text>
      <Text>{JSON.stringify(resultat.description)}</Text>
    </View>
  )
}

export default Single

const styles = StyleSheet.create({})