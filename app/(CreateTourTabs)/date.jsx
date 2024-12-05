import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function DateOptions() {
  const {TourOptions} = useLocalSearchParams()
  return (
    <View style={{marginTop: 100}}>
      <Text>DateOptions - {TourOptions}</Text>
    </View>
  )
}