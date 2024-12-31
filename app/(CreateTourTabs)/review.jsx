import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {styles} from '../../styles/review_style'
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Review() {
  const {WhoTravel, StartDate, EndDate, MinBugget, MaxBugget, Destination} = useLocalSearchParams();
  const router = useRouter()

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const calculateDaysAndNights = () => {
    if (!StartDate || !EndDate) return { days: 0, nights: 0 };

    const start = new Date(StartDate);
    const end = new Date(EndDate);

    const timeDiff = end - start;

    const days = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; 
    const nights = days - 1;

    return { days, nights };
  }

  const { days, nights } = calculateDaysAndNights();

  return (
    <ImageBackground source={require('../../assets/images/Login_Page.jpg')} style={styles.ImageBackGroundContainer}>
        <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <View style = {styles.reviewContainer}>
          <Text style={styles.reviewContainerTitle}>Chuyến đi của bạn</Text>

          <View style={styles.reviewDestination}>
            <Ionicons name="location-outline" size={32} color="black"/>

            <View style={styles.reviewDestinationBox}> 
              <Text style={styles.reviewDestinationTitle}>Điểm đến</Text>
              <Text style={styles.reviewDestinationText}>{Destination}</Text>
            </View>
          </View>

          <View style={styles.reviewDate}>
            <Feather name="calendar" size={32} color="black"/>

            <View style={styles.reviewDateBox}>
              <Text style={styles.reviewDateTitle}>Thời gian</Text>
              <Text style={styles.reviewDateText}>{formatDate(StartDate)} - {formatDate(EndDate)}</Text>
              <View style={styles.iconTextContainer}>
                <MaterialIcons name="sunny" size={28} color="yellow" />
                <Text style={styles.iconText}>{days}</Text>
                <Ionicons name="moon" size={28} color="gray" />
                <Text style={styles.iconText}>{nights}</Text>
              </View>
            </View>
          </View>

          <View style={styles.reviewWhoTravel}>
            <AntDesign name="hearto" size={32} color="black"/>

            <View style={styles.reviewWhoTravelBox}>
              <Text style={styles.reviewWhoTravelTitle}>Tận hưởng chuyến đi</Text>
              <Text style={styles.reviewWhoTravelText}>{WhoTravel}</Text>
            </View>
          </View>

          <View style={styles.reviewBugget}>
            <FontAwesome5 name="money-bill-wave" size={32} color="black" />

            <View style={styles.reviewBuggetBox}>
              <Text style={styles.reviewBuggetBoxTitle}>Dự trù kinh phí chuyến đi</Text>
              <Text style={styles.reviewBuggetBoxText}>{MinBugget} đồng - {MaxBugget} đồng</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            router.push({
              pathname: 'loading',
              params: {
                WhoTravel : WhoTravel, 
                StartDate: StartDate, 
                EndDate: EndDate,
                MinBugget: MinBugget,
                MaxBugget: MaxBugget,
                Destination: Destination
              }
            });
          }}
        >
          <Text style={styles.continueButtonText}>Tạo chuyến đi</Text>
        </TouchableOpacity>

    </ImageBackground>
  )
}