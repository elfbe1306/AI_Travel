import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from '../../constants/Colors'
import Feather from '@expo/vector-icons/Feather';
import {styles} from '../../styles/home_style'

export default function Home() {
  return (
    <View style={{backgroundColor: Colors.LIME_GREEN, flex: 1}}>

      <View style={styles.headerContainer}>
        <View style={styles.firstHeaderContainer}>
          <View style={styles.userNameBox}>
            <View style={styles.imageBox}>
              <Image source={require('../../assets/images/character.png')} style={styles.userImage}/>
            </View>
            <Text style={styles.userName}>Doan Le Vy </Text>
          </View>

          <View style={styles.notificationButton}>
            <Feather name="bell" size={30} color="black" />
          </View>
        </View>

        <View style={styles.secondHeaderContainer}>
          <Text style={styles.secondHeaderContainerTitleText}>{`Khám phá
thế giới hùng vĩ`}</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.firstBodyContainer}>
          <Text style={{fontFamily: 'nunito-bold', fontSize: 18, color: Colors.DARK_GREEN}}>Tour của tôi</Text>

          <TouchableOpacity>
            <Text style={{fontFamily: 'nunito', fontSize: 12, color: Colors.DARK_GREEN}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <View>

        </View>
      </View>
    </View>
  )
}