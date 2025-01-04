import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const ReviewSection = ({ icon, title, text, styles }) => (
  <View style={styles.container}>
    {icon}
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  </View>
);

export default function TourFinalPreview() {
  const router = useRouter();

  useEffect(() => {
    console.log(SelectedTransport, lowerTotalEstimatedCost, upperTotalEstimatedCost);
  }, [])

  const WhoTravel = 'Cùng gia đình';
  const StartDate = '2024-07-20';
  const EndDate = '2024-07-25';
  const Budget = '10,000,000';
  const Destination = 'Đà Lạt';

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };


  const startDateObj = new Date(StartDate);
  const endDateObj = new Date(EndDate);
  // Tính hiệu số ngày đi
  const diffInMilliseconds = endDateObj.getTime() - startDateObj.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      
      <Image
        source={require('../../assets/images/tourFinalPreviewHeroimage.png')}
        style={{ width: '100%', height: 250 }}
      />

      <View style={{ flexDirection: 'row', position: 'relative' }}>
        <TouchableOpacity style={{ position: 'absolute', top: 17, right: 60 }}>
          <Feather name="share-2" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', top: 17, right: 20 }}>
          <Feather name="edit-2" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ReviewSection
        icon={<Ionicons name="location-outline" size={26} color="black" />}
        title="Điểm đến"
        text={Destination}
        styles={styles.common}
      />

      <ReviewSection
        icon={<Feather name="calendar" size={26} color="black" />}
        title="Thời gian"
        text={`${formatDate(StartDate)} - ${formatDate(EndDate)} (${diffInDays} ngày)`}
        styles={styles.common}
      />

      <ReviewSection
        icon={<AntDesign name="hearto" size={26} color="black" />}
        title="Tận hưởng chuyến đi"
        text={WhoTravel}
        styles={styles.common}
      />

      <ReviewSection
        icon={<FontAwesome name="money" size={24} color="black" />}
        title="Dự trù kinh phí chuyến đi"
        text={`${Budget} đồng`}
        styles={styles.common}
      />

      <ReviewSection
        icon={<MaterialCommunityIcons name="airplane" size={26} color="black" />}
        title="Phương tiện di chuyển"
        text="Máy bay"
        styles={styles.common}
      />

      <View style={styles.reviewSchedule}>
        <Feather name="map" size={24} color="black" />
        <Text style={styles.reviewScheduleTitle}>Lịch trình</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE68A',
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  reviewSchedule: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    alignItems: 'center',
    marginTop: '3%',
    marginBottom: '5%'
  },
  reviewScheduleTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    marginLeft: 10
  }
  ,
  common: {
    container: {
      flexDirection: 'row',
      marginHorizontal: '3%',
      marginTop: '5%',
      marginBottom: '1%'
    },
    box: {
      marginTop: -6,
      marginLeft: 10
    },
    title: {
      fontFamily: 'nunito',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      letterSpacing: 0.5,
      textAlign: 'left',
      color: '#1B1E28'
    },
    text: {
      fontFamily: 'nunito',
      fontSize: 14,
      fontWeight: '800',
      lineHeight: 20,
      letterSpacing: 0.5,
      textAlign: 'left',
      color: '#0A6138'
    }
  }
});
