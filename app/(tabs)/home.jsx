import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from '../../constants/Colors'
import Feather from '@expo/vector-icons/Feather';

export default function Home() {
  return (
    <View style={{backgroundColor: Colors.LIME_GREEN, flex: 1}}>

      <View style={styles.headerContainer}>
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

        <View style={styles.secondHeaderContainer}>
          <Text style={styles.secondHeaderContainerTitleText}>{`Khám phá
thế giới hùng vĩ`}</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.firstBodyContainer}>
          <Text style={{fontFamily: 'nunito-bold', fontSize: 18, color: Colors.DARK_GREEN}}>Tour của bạn</Text>

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

const styles = StyleSheet.create({
  headerContainer: {
    flex: 3.5
  },
  bodyContainer: {
    flex: 6.5
  },
  firstHeaderContainer: {
    position: 'absolute',
    marginTop: '15%',
    justifyContent:'space-between=',
    alignItems: 'center',
    alignContent: 'center',
    gap: '25%',
    flexDirection:'row',
  },
  userNameBox: {
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 30,
    paddingVertical: 5,
    borderRadius: 40,
    marginLeft: '5%',
    flexDirection:'row',
  },
  imageBox: {
    backgroundColor: 'pink', 
    borderRadius: 99,
    height: 50,
  },
  userImage : {
    top: -30,
    width: 50, 
    height: 75,
  },
  userName: {
    marginTop: 16,
    marginLeft: 15,
    fontFamily: 'nunito-bold'
  },
  notificationButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99
  },
  secondHeaderContainer: {
    marginTop: '40%',
    marginLeft: '5%'
  },
  secondHeaderContainerTitleText: {
    fontFamily: 'nunito-bold',
    fontSize: 30
  },
  firstBodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    alignItems: 'center',
  }
});