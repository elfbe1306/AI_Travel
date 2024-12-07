import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Loading() {
  const router = useRouter();
  const {WhoTravel, StartDate, EndDate, MinBugget, MaxBugget, Destination} = useLocalSearchParams();
  return (
    <View>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{marginTop: '50%'}}>{WhoTravel}, {StartDate}, {EndDate}, {MinBugget}, {MaxBugget}, {Destination}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
})