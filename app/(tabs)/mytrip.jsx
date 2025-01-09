import { View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight, TextInput, Alert, TouchableWithoutFeedback, Keyboard, RefreshControl } from 'react-native'; // Thêm RefreshControl
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../../styles/mytrip_style';

import * as Clipboard from 'expo-clipboard'; // Import thư viện Clipboard
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../../configs/FireBaseConfig';

function ResultDropDown({ visible, onClose, tour, onJoinTour }) {
  if (!visible || !tour) return null;

  return (
    <View style={styles.searchResultDropdown}>
      <Text style={styles.searchResultTitle}>
        Du lịch {tour.Destination} tạo bởi {tour.userName}
      </Text>
      <View style={styles.searchResultDateAndJoinButton}>
        <Text style={styles.searchResultDate}>
          {new Date(tour.StartDate).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}
        </Text>
        <TouchableOpacity style={styles.tourJoinButton} onPress={() => onJoinTour(tour.id)}>
          <Text style={styles.tourJoinButtonText}>Tham gia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MyTrip() {
  const router = useRouter();
  const [showCodePopup, setShowCodePopup] = useState(null); // State để lưu trữ ID của card đang hiển thị popup
  const [tours, setTours] = useState([]); // State để lưu trữ dữ liệu tour
  const [showResultDropDown, setShowResultDropDown] = useState(false); // State để quản lý việc hiển thị ResultDropDown
  const [searchText, setSearchText] = useState(''); // State để lưu trữ giá trị nhập vào ô tìm kiếm
  const [searchResult, setSearchResult] = useState(null); // State để lưu trữ kết quả tìm kiếm
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

  // Hàm tìm kiếm tour bằng ID
  const searchTourById = async (id) => {
    try {
      const docRef = doc(db, 'UserTrips', id); // Tham chiếu đến document có ID tương ứng
      const docSnap = await getDoc(docRef); // Lấy dữ liệu từ document

      if (docSnap.exists()) {
        setSearchResult({ id: docSnap.id, ...docSnap.data() }); // Lưu kết quả tìm kiếm vào state
        setShowResultDropDown(true); // Hiển thị dropdown
      } else {
        Alert.alert('Không tìm thấy', 'Không có tour nào với ID này.'); // Hiển thị thông báo nếu không tìm thấy
        setSearchResult(null); // Đặt kết quả tìm kiếm về null
        setShowResultDropDown(false); // Ẩn dropdown
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm tour: ', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tìm kiếm tour.'); // Hiển thị thông báo lỗi
    }
  };

  // Hàm xử lý tham gia tour
  const handleJoinTour = async (tourId) => {
    try {
      const tourRef = doc(db, 'UserTrips', tourId); // Tham chiếu đến document của tour
      await updateDoc(tourRef, {
        participants: arrayUnion(currentUserEmail), // Thêm email của người dùng hiện tại vào mảng participants
      });
      Alert.alert('Thành công', 'Bạn đã tham gia tour thành công!');
      setShowResultDropDown(false); // Ẩn dropdown sau khi tham gia
      fetchTours(currentUserEmail); // Cập nhật lại danh sách tour
    } catch (error) {
      console.error('Lỗi khi tham gia tour: ', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tham gia tour.'); // Hiển thị thông báo lỗi
    }
  };

  // Hàm xử lý sự kiện scroll
  const handleScroll = () => {
    setShowResultDropDown(false); // Ẩn ResultDropDown khi cuộn
  };

  return (
    <TouchableWithoutFeedback onPress={() => { setShowResultDropDown(false); Keyboard.dismiss(); }}>
      <View style={{ backgroundColor: Colors.LIME_GREEN, flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.firstHeaderContainer}>
            <View style={styles.userNameBox}>
              <View style={styles.imageBox}>
                <Image source={require('../../assets/images/character.png')} style={styles.userImage} />
              </View>
              <Text style={styles.userName}>Doan Le Vy </Text>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchBarContainer}>
                <Feather name="search" size={20} color="#7D848D" />
                <TextInput
                  style={styles.searchBar}
                  placeholder="Nhập tour được chia sẻ"
                  placeholderTextColor="#7D848D"
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)} // Cập nhật giá trị nhập vào
                  onFocus={() => setShowResultDropDown(true)}
                  onSubmitEditing={() => searchTourById(searchText)} // Gọi hàm tìm kiếm khi nhấn Enter
                />
              </View>

              <ResultDropDown 
                visible={showResultDropDown} 
                onClose={() => setShowResultDropDown(false)} 
                tour={searchResult} 
                onJoinTour={handleJoinTour} // Truyền hàm handleJoinTour vào ResultDropDown
              />
            </View>
          </View>
        </View>

        <Text style={styles.tourTitle}>Tour của tôi</Text>
        <View style={styles.bodyContainer}>
          <ScrollView 
            style={styles.tourScrollView} 
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll} // Thêm sự kiện onScroll
            scrollEventThrottle={16} // Đảm bảo sự kiện scroll được gọi thường xuyên
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
    </TouchableWithoutFeedback>
  );
}