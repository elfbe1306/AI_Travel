import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import {styles} from '../../styles/moneySharingTable_style';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

//Lay data bo vo day
const data = [ 
  {"Ten_muc": "Ăn gà Texas", "So_tien": 100000, "Nguoi_tham_gia": "Lê Vy", "Nguoi_ung_tien": "Song Khuê"},
  {"Ten_muc": "Ăn gà KFC", "So_tien": 200000, "Nguoi_tham_gia": "Lê Vy", "Nguoi_ung_tien": "Song Khuê"}
]

export default function MoneySharingTable() {
  const router = useRouter();
  const renderItem = ({item}) => (
    <View style={styles.tableContent}>
      <Text style={styles.tableContentText}>{item.Ten_muc}</Text>
      <Text style={styles.tableContentText}>{item.So_tien}</Text>
      <Text style={styles.tableContentText}>{item.Nguoi_tham_gia}</Text>
      <Text style={styles.tableContentText}>{item.Nguoi_ung_tien}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/moneySharingFinal')}> 
        <Feather name="chevron-right" size={24} color="black" /> 
        {/* Nút này để chuyển trang cho testing có gì xóa sau */}
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
      <View style={styles.tableFrame}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText1}>Tên mục</Text>
          <Text style={styles.tableHeaderText1}>Số tiền</Text>
          <Text style={styles.tableHeaderText2}>Người tham gia</Text>
          <Text style={styles.tableHeaderText2}>Người ứng tiền</Text>
        </View>
        <FlatList
          data ={data}
          keyExtractor ={(item,index)=>{item.Ten_muc.toString()}}
          renderItem={renderItem}
        />
      </View>
    </View>
  )
}



