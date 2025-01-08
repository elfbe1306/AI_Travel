import { View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../../styles/mytrip_style';

import * as Clipboard from 'expo-clipboard'; // Import thư viện Clipboard
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../../configs/FireBaseConfig';

export default function MyTrip() {
  const router = useRouter();
  const [showCodePopup, setShowCodePopup] = useState(null); // State để lưu trữ ID của card đang hiển thị popup
  const [tours, setTours] = useState([]); // State để lưu trữ dữ liệu tour

  // Hàm sao chép mã code vào clipboard
  const copyToClipboard = async (code) => {
    try {
      await Clipboard.setStringAsync(code); // Sao chép mã code vào clipboard
      Alert.alert('Thành công', 'Mã code đã được sao chép!'); // Hiển thị thông báo
    } catch (error) {
      console.error('Lỗi khi sao chép mã code: ', error);
      Alert.alert('Lỗi', 'Không thể sao chép mã code.'); // Hiển thị thông báo lỗi
    }
  };

  // Hàm để lấy dữ liệu từ Firebase
  const fetchTours = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'UserTrips')); // 'UserTrips' là tên collection trong Firestore
      const toursData = [];
      querySnapshot.forEach((doc) => {
        toursData.push({ id: doc.id, ...doc.data() }); // Lấy dữ liệu và thêm vào mảng
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

          <View style={styles.searchBarContainer}>
            <Feather name="search" size={20} color="#7D848D"/>
            <TextInput
              style={styles.searchBar}
              placeholder="Nhập tour được chia sẻ"
              placeholderTextColor="#7D848D"
            />
          </View>
        </View>
      </View>

      <Text style={styles.tourTitle}>Tour của tôi</Text>
      <View style={styles.bodyContainer}>
        <ScrollView style={styles.tourScrollView} showsVerticalScrollIndicator={false}>
          {tours.map(tour => (
            <TouchableOpacity key={tour.id} style={styles.tourCard} onPress={() => router.push({ pathname: '/tourStart', params: { docIdForEdit: tour.id } })}>
              <Image source={{ uri: tour.tripData.places_to_visit[0].image_url }} style={styles.tourImage} />
              
              <View style={styles.tourInfo}>
                <Text style={styles.tourDestination}>{tour.Destination}</Text>
                <Feather 
                  name="share-2" 
                  size={24} 
                  color="black" 
                  onPress={() => setShowCodePopup(showCodePopup === tour.id ? null : tour.id)}
                />
                {showCodePopup === tour.id && (
                  <View style={styles.codePopup}>
                    <Image source={require('../../assets/images/play.png')} style={styles.codeImage} />
                    <Text style={styles.codeText}>Mã code</Text>
                    <TouchableOpacity 
                      style={styles.codeBox} 
                      onPress={() => {
                        copyToClipboard(tour.id); 
                        setShowCodePopup(null);
                      }}
                    >
                      <Feather name="copy" size={16} color="#0A6138" />
                      <Text style={styles.tourCode}>{tour.id}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
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