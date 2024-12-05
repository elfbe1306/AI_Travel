import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Bugget() {
  const  {WhoTravel, StartDate, EndDate} = useLocalSearchParams()
  return (
    <View style={{marginTop: '50%'}}>
      <Text>Bugget - {WhoTravel} - {StartDate} - {EndDate}</Text>
    </View>
  )
}