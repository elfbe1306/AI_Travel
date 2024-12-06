import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from '../../constants/Colors'

export default function Review() {
  const {WhoTravel, StartDate, EndDate, MinBugget, MaxBugget, Destination} = useLocalSearchParams();
  const router = useRouter()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{marginTop: '50%'}}>{WhoTravel}, {StartDate}, {EndDate}, {MinBugget}, {MaxBugget}, {Destination}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIME_GREEN
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
})