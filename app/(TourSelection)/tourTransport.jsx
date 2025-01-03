import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TourTransport() {
  const router = useRouter();
  const {lowerTotalEstimatedCost, upperTotalEstimatedCost} = useLocalSearchParams();

  useEffect(() => {
    console.log(lowerTotalEstimatedCost, upperTotalEstimatedCost);
  })

  const transportOptions = [
    {
      id: 1,
      title: 'Máy bay',
      icon: <MaterialCommunityIcons name="airplane" size={26} color="black" />,
      time: '1 - 2 tiếng',
      price: '1.000.000 - 3.000.000 đồng',
    },
    {
      id: 2,
      title: 'Tàu hỏa',
      icon: <FontAwesome5 name="train" size={24} color="black" />,
      time: '7 - 8 tiếng',
      price: '150.000 - 1.000.000 đồng',
    },
    {
      id: 3,
      title: 'Xe khách',
      icon: <MaterialIcons name="directions-bus" size={24} color="black" />,
      time: '8 - 9 tiếng',
      price: '300.000 - 500.000 đồng',
    },
    {
      id: 4,
      title: 'Tự lái',
      icon: <Feather name="truck" size={24} color="black" />,
      time: '',
      price: '',
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Hãy chọn phương tiện phù hợp nhé!</Text>

      <ScrollView style={{ marginTop: '5%' }}>
        <View style={styles.cardContainer}>
          {transportOptions.map((option) => (

            <View key={option.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                  {option.icon}
                  <Text style={styles.cardTitle}>{option.title}</Text>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="add-circle-outline" size={26} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.cardContent}>
                {option.time ? (
                  <View style={styles.iconTextContainer}>
                    <Ionicons name="time-outline" size={16} color="black" />
                    <Text style={styles.cardText}>Thời gian: {option.time}</Text>
                  </View>
                ) : null}
                {option.price ? (
                  <View style={styles.iconTextContainer}>
                    <Ionicons name="pricetag-outline" size={16} color="black" />
                    <Text style={styles.cardText}>Giá vé: {option.price}</Text>
                  </View>
                ) : null}
              </View>
              
              {option.time && option.price && <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Xem</Text>
              </TouchableOpacity>}
            </View>

          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/tourFinalPreview')}>
        <Text style={styles.continueButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F2D4',
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  nextButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '80%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  title: {
    marginTop: '32%',

    fontFamily: 'nunito-bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  cardContainer: {
    marginHorizontal: '5%',
    marginTop: '5%',
    backgroundColor: '#A1D59963',
    borderRadius: 15,
    padding: 10,
  },
  card: {
    backgroundColor: '#FFE68A',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontFamily: 'nunito',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.5,
    textAlign: 'left',
    textDecorationSkipInk: 'none',
    textUnderlinePosition: 'from-font',
    marginLeft: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    // marginLeft: 30,
    // backgroundColor: 'red'
  },
  cardText: {
    fontFamily: 'nunito',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 12,
    letterSpacing: 0.3,
    textAlign: 'left',
    textDecorationSkipInk: 'none',
    textUnderlinePosition: 'from-font',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 2,
    // backgroundColor: 'blue'
  },
  button: {
    backgroundColor: '#02954F',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'nunito-bold',
    fontSize: 12,
  },
  continueButton: {
    paddingVertical: 7,
    paddingHorizontal: 0,
    backgroundColor: '#02954F',
    borderRadius: 30,
    marginLeft: '65%',
    marginRight: '6%',
    marginTop: '5%'
  },
  continueButtonText: {
    textAlign: 'center',
    fontFamily: 'nunito-bold',
    color: '#E8F2D4'
  }
});
