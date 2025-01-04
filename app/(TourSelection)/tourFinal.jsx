import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

import Collapsible from 'react-native-collapsible';
import { collection, getDocs, query, where} from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';

const AccordionItem = ({ title, expanded, toggleAccordion, renderContent }) => (
  <View style={styles.accordionItem}>
    <View style={[styles.header, expanded && styles.headerExpanded]}> 
      <Text style={[styles.title, expanded && styles.titleExpanded]}>{title}</Text> 
      <TouchableOpacity onPress={toggleAccordion}>
        <AntDesign name={expanded ? "caretdown" : "caretright"} size={20} color="#02954F" />
      </TouchableOpacity>
    </View>

    <Collapsible collapsed={!expanded}>
      <View style={styles.content}>{renderContent && renderContent()}</View>
    </Collapsible>
  </View>
);

const getDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  while (start <= end) {
    dateArray.push(new Date(start).toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
};

export default function TourFinal() {
  const router = useRouter();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [lowerTotalEstimatedCost, setLowerTotalEstimatedCost] = useState(0);
  const [upperTotalEstimatedCost, setUpperTotalEstimatedCost] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const { email } = JSON.parse(userSession);
          setUserEmail(email);
          console.log("Retrieved User Email:", email);
        } else {
          console.error("User session not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error retrieving user session:", error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const GetMyTrips = async () => {
      if (!userEmail) return; // Ensure userEmail exists
      try {
        const q = query(collection(db, 'UserTrips'), where('userEmail', '==', userEmail));
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        });
        setUserTrips(trips);
      } catch (error) {
        console.error("Error fetching user trips:", error);
      }
    };

    GetMyTrips();
  }, [userEmail]);

  useEffect(() => {
    if (userTrips.length > 0) {
      const { StartDate, EndDate } = userTrips[0];
      const dates = getDateRange(StartDate, EndDate);
      setDateRange(dates);

      // Preselect locations with day_visit
      const allLocations = userTrips[0]?.tripData?.places_to_visit || [];
      const preselectedLocations = allLocations
        .filter((location) => location.day_visit !== "None")
        .map((location) => ({
          ...location,
          day_visit: location.day_visit,
        }));
      setSelectedLocations(preselectedLocations);
    }
  }, [userTrips]);

  useEffect(() => {
    if (selectedLocations.length > 0) {
      let lowerCost = 0;
      let upperCost = 0;
  
      selectedLocations.forEach((location) => {
        if (location.ticket_price) {
          lowerCost += location.ticket_price;
          upperCost += location.ticket_price;    
        }
      });
  
      setLowerTotalEstimatedCost(lowerCost);
      setUpperTotalEstimatedCost(upperCost);
    }
  }, [selectedLocations]);

  const renderLocations = (dayKey) => {
    const matchedLocations = selectedLocations.filter((location) => location.day_visit === dayKey);

    if (!matchedLocations || matchedLocations.length === 0) {
      return <Text style={styles.noLocationsText}>Bạn không có lịch trình trong ngày hôm nay</Text>;
    }

    return (
      <ScrollView>
        {matchedLocations.map((location, index) => (
          <View key={`${dayKey}-location${index}`} style={styles.customBox}>
            <Image source={{ uri: location.image_url }} style={styles.image} />
            <View style={styles.contentWrapper}>
              <View style={styles.headCA}>
                <Text style={styles.locaName}>{location.placeName}</Text>
                <View style={styles.IconWrapper}>
                  <Feather name="navigation" size={16} color="black" />
                </View>
              </View>
              <Text style={styles.subText}>{location.details}</Text>
              <View style={styles.ContentDetail}>
                <View style={styles.IconDetail}>
                  <Feather name="clock" size={14} color="black" />
                </View>
                <Text style={styles.textDetail}>Thời gian tham quan: {location.best_time_to_visit}</Text>
              </View>
              <View style={styles.ContentDetail}>
                <Ionicons name="ticket-outline" size={15} color="black" />
                <Text style={styles.textDetail}>Giá vé: {location.ticket_price.toLocaleString()} đồng</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    )
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.headTextContainer}>
        <Text style={styles.headText}>Lịch trình của bạn</Text>
      </View>

      {dateRange.map((date, index) => {
        const formattedDate = new Date(date).toLocaleDateString('vi-VN');
        return (
          <AccordionItem
            key={`day${index}`}
            title={`Ngày ${index + 1} - ${formattedDate}`}
            expanded={expandedIndex === index}
            toggleAccordion={() => setExpandedIndex(expandedIndex === index ? null : index)}
            renderContent={() => renderLocations(`day${index}`)}
          />
        );
      })}

      <TouchableOpacity
        style={styles.ContinueButton}
        onPress={() => {
          router.push({
            pathname: '/tourTransport',
            params: {
              lowerTotalEstimatedCost: lowerTotalEstimatedCost,
              upperTotalEstimatedCost: upperTotalEstimatedCost
            }
          })
        }}
      >
        <Text style={styles.ContinueText}>Tiếp tục</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EFC8',
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
  headTextContainer: {
    marginTop:'35%',
    marginLeft:'8%',
  },
  headText: {
    color:'black',
    fontFamily:'nunito-bold',
    fontSize:'20'
  },
  accordionItem: {
    marginTop:'8%',
    marginLeft:'6%',
    marginRight:'6%',
    borderRadius:20,
    backgroundColor: '#A1D59963',
    overflow: 'hidden',
    elevation: 2,
  },
  header: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerExpanded:{
    backgroundColor:'#A1D599',
  },
  title: {
    color: 'black',
    marginLeft:'3%',
    fontSize: 16,
    fontFamily: 'nunito',
  },
  titleExpanded:{
    fontFamily:'nunito-bold',
  },
  content: {
    padding: 5,
    maxHeight:300,
  },
  customBox: {
    marginTop: '0.1%',
    marginBottom:'2%',
    backgroundColor: Colors.LIGHT_YELLOW,
    padding: 8,
    borderRadius: 16,
  },
  contentWrapper:{
    marginLeft:'2%',
  },
  image: {
    width: '100%',
    height: 165,
    marginBottom:'2%',
    borderRadius: 16,
  },
  headCA:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  locaName:{
    fontSize:16,
    fontWeight: 600,
    fontFamily:'nunito',
  },
  IconWrapper:{
    marginTop:'1%',
    marginRight:'2%',
    flexDirection:'row',
    justifyContent:'space-between=',
    justifyContent:'flex-end',
    gap:'10%',
  },
  subText:{
    fontFamily:'nunito',
    fontSize:13,
    fontWeight:600,
  },
  ContentDetail:{
    marginTop:'2%',
    flexDirection:'row',
    justifyContent:'space-between=',
    gap:'1%',
  },
  textDetail:{
    color:'#7D848D',
    fontFamily:'nunito',
    fontSize:13,
    fontWeight:400,
  },
  IconDetail:{
    marginTop:'0.6%'
  },
  ContinueButton:{
    marginVertical:'10%',
    marginLeft:'72%',
    backgroundColor:'#FFDF6B',
    borderRadius:15,
    width:85,
    height:30,
  },
  ContinueText:{
    alignSelf:'center',
    fontFamily:'nunito',
    fontWeight:600,
    fontSize:16,
    color:'#02954F',
  },
  noLocationsText: {
    textAlign: 'center',
    fontFamily: 'nunito',
    height: 25,
    fontSize: 13
  }
})