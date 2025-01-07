import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../../styles/home_style';

// Mockup data for tours
const mockTours = [
  { id: 1, destination: 'QUY NHƠN', date: '02/01/2025', image: require('../../assets/images/homeTourQuyNhon.png') },
  { id: 2, destination: 'HÀ NỘI', date: '03/09/2025', image: require('../../assets/images/homeTourHaNoi.png') },
  // Add more tours as needed
];

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
          {mockTours.map(tour => (
            <TouchableOpacity key={tour.id} style={styles.tourCard}>
              <Image source={tour.image} style={styles.tourImage} />
              <Text style={styles.tourDestination}>{tour.destination}</Text>
              <Text style={styles.tourDate}>{tour.date}</Text>
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