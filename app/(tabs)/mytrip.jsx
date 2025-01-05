import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function MyTrip() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>MyTrip</Text>
      <TouchableOpacity 
        onPress={() => {
          router.push({
            pathname: '/tourStart',
            params: {docIdForEdit: 1736083677326}
          })
        }}
      >
        <Text>Nhan em di a iu</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})