import { View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../../styles/mytrip_style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../../configs/FireBaseConfig';

export default function MyTrip() {
  const router = useRouter();
  const [tours, setTours] = useState([]); // State để lưu trữ dữ liệu tour

  // Hàm để lấy dữ liệu từ Firebase
  const fetchTours = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'UserTrips')); // 'UserTrips' là tên collection trong Firestore
      const toursData = [];
      querySnapshot.forEach((doc) => {
        toursData.push({ id: doc.id, ...doc.data() }); // Lấy dữ liệu và thêm vào mảng
        toursData.push({ id: doc.id + 1, ...doc.data() }); // Lấy dữ liệu và thêm vào mảng
      });
      setTours(toursData); // Cập nhật state với dữ liệu mới
    } catch (error) {
      console.error('Error fetching tours: ', error);
    }
  };

  // Sử dụng useEffect để gọi hàm fetchTours mỗi khi component được render
  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <View style={{ backgroundColor: Colors.LIME_GREEN, flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.firstHeaderContainer}>
          <View style={styles.userNameBox}>
            <View style={styles.imageBox}>
              <Image source={require('../../assets/images/character.png')} style={styles.userImage} />
            </View>
            <Text style={styles.userName}>Doan Le Vy </Text>
          </View>

          <View style={styles.notificationButton}>
            <Feather name="bell" size={30} color="black" />
          </View>
        </View>
      </View>

      <Text style={styles.tourTitle}>Tour của tôi</Text>
      <View style={styles.bodyContainer}>
        {/* <View style={styles.firstBodyContainer}>
        </View> */}

        {/* Thay đổi ScrollView từ ngang sang dọc */}
        <ScrollView style={styles.tourScrollView} showsVerticalScrollIndicator={false}>
          {tours.map(tour => (
            <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => router.push({ pathname: '/tourStart', params: { docIdForEdit: tour.id } })}>
              <Image source={{ uri: tour.tripData.places_to_visit[0].image_url }} style={styles.tourImage} />
              <Text style={styles.tourDestination}>{tour.Destination}</Text>
              <Text style={styles.tourDate}>{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(tour.StartDate))}</Text>
              <TouchableOpacity style={styles.tourMarker}>
                <Feather name="bookmark" size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}