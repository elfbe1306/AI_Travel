import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TourFinal() {
  const router = useRouter();
  const [userSelectedTrips, setUserSelectedTrips] = useState([]);

  useEffect(() => {
    const fetchUserSelectedTrips = async () => {
      try {
        const userTrips = await AsyncStorage.getItem('selectedLocations');
        if (userTrips) {
          const parsedTrips = JSON.parse(userTrips);
          setUserSelectedTrips(parsedTrips); // Directly use the parsed trips
          console.log('Retrieved Trip Data:', parsedTrips);
        } else {
          console.error("User Trip not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error retrieving user trips:", error);
      }
    };

    fetchUserSelectedTrips();
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/tourTransport')}> 
        <Feather name="chevron-right" size={24} color="black" /> 
        {/* Nút này để chuyển trang cho testing có gì xóa sau */}
      </TouchableOpacity>

      {/* Code ở đây nhé */}

      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EFC8',
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  nextButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '80%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
})