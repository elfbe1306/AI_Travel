import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'; // Thêm RefreshControl
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../../styles/home_style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';

export default function Home() {
  const router = useRouter();
  const [tours, setTours] = useState([]); // State to store tours
  const [currentUserEmail, setCurrentUserEmail] = useState(''); // State to store current user's email
  const [userName, setUserName] = useState(''); // State to store user's name
  const [refreshing, setRefreshing] = useState(false); // State to manage refresh state

  // Fetch user session and user name
  useEffect(() => {
    const checkSession = async () => {
      const user = await AsyncStorage.getItem('userSession');
      if (user) {
        const userData = JSON.parse(user);
        setCurrentUserEmail(userData.email);
        fetchUserName(userData.email); // Fetch user's name
        fetchTours(userData.email); // Fetch tours with user's email
      }
    };
    checkSession();
  }, []);

  // Fetch user's name from Firestore
  const fetchUserName = async (email) => {
    try {
      const usersQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(usersQuery);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first matching document
        const userData = userDoc.data();
        setUserName(userData.fullName || ''); // Use fullName or fallback to an empty string
      } else {
        console.warn('No matching user document found');
      }
    } catch (error) {
      console.error('Error fetching user name: ', error);
    }
  };

  // Fetch tours from Firestore
  const fetchTours = async (userEmail) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'UserTrips')); // 'UserTrips' is the Firestore collection name
      const toursData = [];
      querySnapshot.forEach((doc) => {
        const tourData = doc.data();
        if (tourData.participants && tourData.participants.includes(userEmail)) {
          toursData.push({ id: doc.id, ...tourData });
        }
      });
      setTours(toursData);
    } catch (error) {
      console.error('Error fetching tours: ', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTours(currentUserEmail);
  };

  return (
    <View style={{ backgroundColor: Colors.LIME_GREEN, flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.firstHeaderContainer}>
          <View style={styles.userNameBox}>
            <View style={styles.imageBox}>
              <Image source={require('../../assets/images/character.png')} style={styles.userImage} />
            </View>
            <Text style={styles.userName}>{userName || 'Guest'}</Text>
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
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.DARK_GREEN]}
              tintColor={Colors.DARK_GREEN}
            />
          }
        >
          {tours.map((tour) => (
            <TouchableOpacity
              key={tour.id}
              style={styles.tourCard}
              onPress={() =>
                router.push({ pathname: '/tourFinalPreview', params: { docId: tour.id } })
              }
            >
              <Image
                source={{ uri: tour.tripData.places_to_visit[0].image_url }}
                style={styles.tourImage}
              />
              <Text style={styles.tourDestination}>{tour.Destination}</Text>
              <Text style={styles.tourDate}>
                {new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(new Date(tour.StartDate))}
              </Text>
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