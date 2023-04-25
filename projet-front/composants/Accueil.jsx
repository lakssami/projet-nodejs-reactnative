import { StyleSheet, Text, View, Image } from 'react-native'
import React , {useContext, useEffect} from 'react'
import {ProfilContext} from "../contexts/profilContext"

const Accueil = () => {
  const { jwt } = useContext(ProfilContext)
  return (
    <View>
      <Text>Ensemble des oeuvres disponible dans le musée</Text>
      <Text>{jwt}</Text>
    </View>
  )
}

export default Accueil

const styles = StyleSheet.create({})