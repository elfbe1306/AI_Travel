import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

import Collapsible from 'react-native-collapsible';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';


// Accordion component - phần này là để chỉnh chung các Accordition - 1 Acordition là 1 ngày
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

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    dateArray.push(new Date(d).toISOString().split('T')[0]); // Get the date in yyyy-mm-dd format
  }

  return dateArray;
};

// TourStart component
export default function TourStart() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState(null); //này dùng để tránh multiple expanded, chỉ cho phép 1 Accordition expand
  const [selectedLocations, setSelectedLocations] = useState([]); // này và handleIconToggle dùng để chuyển từ nút "plus-circle" thành "check" khi bấm

  const handleLocationToggle = (dayKey, location) => {
    setSelectedLocations((prevState) => {
      const exists = prevState.find(
        (item) => item.placeName === location.placeName && item.day === dayKey
      );
      if (exists) {
        // Remove the location if already selected for the given day
        return prevState.filter(
          (item) => !(item.placeName === location.placeName && item.day === dayKey)
        );
      } else {
        // Add the location with its associated day
        return [...prevState, { day: dayKey, ...location }];
      }
    });
  };

  // Lấy email của người đăng nhập hiện tại và dữ liệu tour
  const [userEmail, setUserEmail] = useState(null);
  const [userTrips, setUserTrips] = useState([]);

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
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', userEmail))
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setUserTrips(prev => [...prev, doc.data()]);
      });
    }

    GetMyTrips();

  }, [userEmail])


  // Tính số ngày để render
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    if (userTrips.length > 0) {
      const { StartDate, EndDate } = userTrips[0];
      const dates = getDateRange(StartDate, EndDate);
      setDateRange(dates);
    }

  }, [userTrips]);


  //Phần này code content được expanded ra ứng với từng ngày
  const renderLocations = (dayKey) => {
    // Filter out locations already selected for other days
    const filteredLocations = userTrips[0]?.tripData?.places_to_visit?.filter((location) => {
      return !selectedLocations.some(
        (item) => item.placeName === location.placeName && item.day !== dayKey
      );
    });
  
    // Sort locations: selected locations for the current day appear first
    const sortedLocations = filteredLocations.sort((a, b) => {
      const isSelectedA =
        selectedLocations.some((item) => item.placeName === a.placeName && item.day === dayKey) ||
        a.day_visit === dayKey;
      const isSelectedB =
        selectedLocations.some((item) => item.placeName === b.placeName && item.day === dayKey) ||
        b.day_visit === dayKey;
      return isSelectedB - isSelectedA; // Place selected (true = 1) before non-selected (false = 0)
    });
  
    return (
      <ScrollView>
        {sortedLocations?.map((location, index) => {
          const isSelected = selectedLocations.some(
            (item) => item.placeName === location.placeName && item.day === dayKey
          );
          return (
            <View key={`${dayKey}-location${index}`} style={styles.customBox}>
              <Image source={require('../../assets/images/imageTourStart.png')} style={styles.image} />
              <View style={styles.contentWrapper}>
                <View style={styles.headCA}>
                  <Text style={styles.locaName}>{location.placeName}</Text>
                  <View style={styles.IconWrapper}>
                    <Feather name="navigation" size={16} color="black" />
                    <TouchableOpacity
                      onPress={() => handleLocationToggle(dayKey, location)}
                    >
                      <Feather
                        name={isSelected ? "check" : "plus-circle"}
                        size={16}
                        color={isSelected ? "#02954F" : "black"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.subText}>{location.details}</Text>
                <View style={styles.ContentDetail}>
                  <View style={styles.IconDetail}>
                    <Feather name="clock" size={14} color="black" />
                  </View>
                  <Text style={styles.textDetail}>
                    Thời gian tham quan: {location.best_time_to_visit}
                  </Text>
                </View>
                <View style={styles.ContentDetail}>
                  <Ionicons name="ticket-outline" size={15} color="black" />
                  <Text style={styles.textDetail}>
                    Giá vé: {location.ticket_price.toLocaleString()} đồng
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  };
  

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/tourFinal')}>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      {/* Code ở đây nhé nhưng mà phía trên có 2 cái thêm là renderLocation với AccorditionItem nha*/}

      <View style={styles.headTextContainer}>
        <Text style={styles.headText}>Cùng sắp xếp chuyến đi nào</Text>
      </View>

      {dateRange.map((date, index) => {
        const formattedDate = new Date(date).toLocaleDateString('vi-VN'); // Convert to dd-mm-yyyy format
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
        style={styles.SaveButton}
        onPress={async () => {
          try {
            await AsyncStorage.setItem('selectedLocations', JSON.stringify(selectedLocations));
            router.push('/tourFinal');
          } catch (error) {
            console.error('Error storing selectedLocations:', error);
          }
        }}
      >
        <Text style={styles.saveText}>Lưu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PASTEL_GREEN,
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
    fontSize:20,
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
  SaveButton:{
    marginVertical:'10%',
    marginLeft:'72%',
    backgroundColor:'#FFDF6B',
    borderRadius:15,
    width:85,
    height:30,
  },
  saveText:{
    alignSelf:'center',
    fontFamily:'nunito',
    fontWeight:600,
    fontSize:16,
    color:'#02954F',
  },

})