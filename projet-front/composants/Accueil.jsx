import { StyleSheet, Text, View ,Image, ScrollView} from 'react-native'
import React, { useContext,useEffect,useState } from 'react'
import { ProfilContext } from '../contexts/profilContext'
import * as SQLITE from "expo-sqlite"

const Accueil = () => {
  
    // const {jwt}= useContext(ProfilContext)
    // useEffect(function(){
    // //  const db= SQLITE.openDatabase("demo.sqlite");
      // db.transaction(function(tx){
        // tx.executeSql(`SELECT * FROM jwt
                    // `,
                      // [],
                      // function(transact, resultat){ console.log(resultat.rows._array) },
                      // function(transact , err){ console.log("erreur lors de la création") })
      // })
    // },[])
    const [resultat,setResultat]=useState([])
    useEffect(function (){
   fetch("http://10.0.2.2:4003/all")
   
   .then(reponse=>reponse.json())
   .then(data => {setResultat(data);console.log(data)})
    },[])
  return (
    <View>
      <Text>Ensemble des oeuvres disponible dans le musée</Text>
      <ScrollView>
      {resultat.map(function(r,index){
        return <View key ={index} style={styles.box}>
          <Text>{r.nom}</Text>
          <Image source ={{uri:r.image}}style={{width : 300, height : 150 , flexDirection : "row"}}/>
        
        </View>
      })}
    </ScrollView>
    </View>
  )
}

export default Accueil

const styles = StyleSheet.create({
  box: { 
    alignItems :"center",
    marginTop : 20,
    marginBottom : 10
  }
})


//</ScrollView> <Image source={require("../assets/monalisa.png")} style={{width :200 , height:200}} />

//<Text>{r.nom}</Text>
