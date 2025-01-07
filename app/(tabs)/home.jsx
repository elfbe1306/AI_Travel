import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../../styles/home_style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';

// Mockup data for tours
const mockTours = [
  { id: 1, tourDestination: 'QUY NHƠN', tourDate: '02/01/2025', image: require('../../assets/images/homeTourQuyNhon.png') },
  { id: 2, tourDestination: 'HÀ NỘI', tourDate: '03/09/2025', image: require('../../assets/images/homeTourHaNoi.png') },
  // Add more tours as needed
];

export default function Home() {
  const router = useRouter();
  const [tours, setTours] = useState([]); // State để lưu trữ dữ liệu tour

  // Hàm để lấy dữ liệu từ Firebase
  const fetchTours = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'UserTrips')); // 'UserTrips' là tên collection trong Firestore
      const toursData = [];
      querySnapshot.forEach((doc) => {
        toursData.push({ id: doc.id, ...doc.data() }); // Lấy dữ liệu và thêm vào mảng
      });
      // toursData.map(tour => console.log(tour.tripData.places_to_visit[0].image_url))
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
          <Text style={styles.secondHeaderContainerTitleText}>{`Khám phá\nthế giới hùng vĩ`}</Text>
          <Image
            source={require('../../assets/images/calligraphy_line.png')}
            style={styles.calligraphyLine}
          />
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.firstBodyContainer}>
          <Text style={styles.tourTitle}>Tour của tôi</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tourScrollView}>
          {tours.map(tour => (
            <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => router.push({pathname: '/tourFinalPreview', params: {docId: tour.id}})}>
              <Image source={ {uri: tour.tripData.places_to_visit[0].image_url} } style={styles.tourImage} />
              <Text style={styles.tourDestination}>{tour.Destination}</Text>
              <Text style={styles.tourDate}>{new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(tour.StartDate))}</Text>
              <View style={styles.tourMarker}>
                <Feather name="bookmark" size={20} color="white" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}