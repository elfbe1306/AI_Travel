import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'; // Thêm RefreshControl
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../../styles/home_style';

import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';

export default function Home() {
  const router = useRouter();
  const [tours, setTours] = useState([]); // State để lưu trữ dữ liệu tour
  const [currentUserEmail, setCurrentUserEmail] = useState(''); // State để lưu trữ email của người dùng hiện tại
  const [refreshing, setRefreshing] = useState(false); // State để quản lý trạng thái refresh

  // Hàm lấy email người dùng hiện tại để tham gia tour du lịch
  useEffect(() => {
    const checkSession = async () => {
      const user = await AsyncStorage.getItem('userSession');
      if (user) {
        const userData = JSON.parse(user);
        setCurrentUserEmail(userData.email);
        fetchTours(userData.email); // Gọi hàm fetchTours với email của người dùng
      }
    };
    checkSession();
  }, []);

  // Hàm để lấy dữ liệu từ Firebase
  const fetchTours = async (userEmail) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'UserTrips')); // 'UserTrips' là tên collection trong Firestore
      const toursData = [];
      querySnapshot.forEach((doc) => {
        const tourData = doc.data();
        // Kiểm tra xem người dùng hiện tại có trong mảng participants không
        if (tourData.participants && tourData.participants.includes(userEmail)) {
          toursData.push({ id: doc.id, ...tourData }); // Lấy dữ liệu và thêm vào mảng
        }
      });
      setTours(toursData); // Cập nhật state với dữ liệu mới
    } catch (error) {
      console.error('Error fetching tours: ', error);
    } finally {
      setRefreshing(false); // Dừng hiệu ứng refresh sau khi hoàn thành
    }
  };

  // Hàm xử lý khi người dùng kéo xuống để refresh
  const onRefresh = async () => {
    setRefreshing(true); // Bắt đầu hiệu ứng refresh
    await fetchTours(currentUserEmail); // Gọi lại hàm fetchTours để cập nhật dữ liệu
  };

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
          <TouchableOpacity onPress={() => router.push('/mytrip')}>
            <Text style={styles.viewAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tourScrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Trạng thái refresh
              onRefresh={onRefresh} // Hàm xử lý khi refresh
              colors={[Colors.DARK_GREEN]} // Màu của hiệu ứng refresh
              tintColor={Colors.DARK_GREEN} // Màu của icon refresh
            />
          }
        >
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
  );
}