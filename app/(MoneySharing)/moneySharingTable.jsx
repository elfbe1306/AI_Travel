import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import {styles} from '../../styles/moneySharingTable_style';


import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

//Lay data bo vo day
const data = [
  { "Ten_muc": "Ăn gà Texas", "So_tien": 100000, "Nguoi_tham_gia": ["Lê Vy", "Ngọc Nhơn"], "Nguoi_ung_tien": ["Song Khuê"] },
  { "Ten_muc": "Ăn gà KFC", "So_tien": 200000, "Nguoi_tham_gia": ["Lê Vy"], "Nguoi_ung_tien": ["Song Khuê", "Ngọc Nhơn"] },
];

export default function MoneySharingTable() {
  const router = useRouter();
  const [collapsedStates, setCollapsedStates] = useState(data.map(() => ({ thamGia: false, ungTien: false })));

  const toggleCollapse = (index, key) => {
    const newStates = [...collapsedStates];
    newStates[index][key] = !newStates[index][key];
    setCollapsedStates(newStates);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.tableContent}>
      <Text style={styles.tableContentText}>{item.Ten_muc}</Text>
      <Text style={styles.tableContentText}>{item.So_tien}</Text>

      {/* Collapsible for Người tham gia */}
      <View style={styles.collapsibleContainer}>
        <TouchableOpacity onPress={() => toggleCollapse(index, 'thamGia')} style={styles.tableContentText}>
          <AntDesign
            name={collapsedStates[index].thamGia ? "caretup" : "caretdown"} 
            size={16}
            color="#02954F"
            style={styles.collapsibleIcon}
          />
        </TouchableOpacity>
        {collapsedStates[index].thamGia && (
          <View style={styles.participantBox}>
            {item.Nguoi_tham_gia.map((person, idx) => (
              <Text key={idx} style={styles.tableContentText}>{person}</Text>
            ))}
          </View>
        )}
      </View>

      {/* Collapsible for Người ứng tiền */}
      <View style={styles.collapsibleContainer}>
        <TouchableOpacity onPress={() => toggleCollapse(index, 'ungTien')} style={styles.tableContentText}>
        <AntDesign
            name={collapsedStates[index].thamGia ? "caretup" : "caretdown"} 
            size={16}
            color="#02954F"
            style={styles.collapsibleIcon}
          />
        </TouchableOpacity>
        {collapsedStates[index].ungTien && (
          <View style={styles.participantBox}>
            {item.Nguoi_ung_tien.map((person, idx) => (
              <Text key={idx} style={styles.tableContentText}>{person}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.firstHeaderContainer}>
        <View style={styles.userNameBox}>
          <View style={styles.imageBox}>
            <Image source={require('../../assets/images/character.png')} style={styles.userImage} />
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
          data={data}
          keyExtractor={(item, index) => item.Ten_muc.toString()}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.Footer}>
        <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Text style={styles.nextButtonText}>
            Quay lại
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/moneySharingFinal')}
          style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            Lưu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



