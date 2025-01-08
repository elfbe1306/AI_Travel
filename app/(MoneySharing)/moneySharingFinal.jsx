import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { styles } from '../../styles/moneySharingFinal_style';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function MoneySharingFinal() {
  const router = useRouter();
  const {updatedCategories} = useLocalSearchParams();

  useEffect(() => {
    const parsedCategories = JSON.parse(updatedCategories);
    console.log('Parsed Categories:', JSON.stringify(parsedCategories, null, 2)); // Pretty print JSON
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Code ở đây nhé */}
      <View style={styles.firstHeaderContainer}>
        <View style={styles.userNameBox}>
          <View style={styles.imageBox}>
            <Image source={require('../../assets/images/character.png')} style={styles.userImage}/>
          </View>
          <Text style={styles.userName}>Doan Le Vy</Text>
        </View>

        <View style={styles.notificationButton}>
          <Feather name="bell" size={30} color="black" />
        </View>
      </View>

      <Text style={styles.firstTitle}> Phân chia chi phí </Text>
    </View>
  )
}