import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {Colors} from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Bugget() {
  const  {WhoTravel, StartDate, EndDate} = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.selectBugget}>
          <Text style={styles.selectBuggetTitle}>Chi phí của bạn</Text>

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.AVOCADO_GREEN,
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99
  },
  selectBugget: {
    marginTop: '40%',
    marginHorizontal: '6%'
  },
  selectBuggetTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 28,
  }
});