import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

import Collapsible from 'react-native-collapsible';
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';

// Accordion component
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

export default function TourStart() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [docId, setDocId] = useState();

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
        setDocId(trips[0].ID);
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


  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ placeName: "", day_visit: "" });

  const handleLocationToggle = (dayKey, location) => {
    const existingSelection = selectedLocations.find(
      (selected) => selected.placeName === location.placeName
    );
  
    // console.log("existingSelection.day_visit:", existingSelection?.day_visit);
  
    if (existingSelection) {
      // Safely format the day as "Ngày 1", "Ngày 2", etc.
      let formattedDay = "Invalid Day";
      if (existingSelection.day_visit.startsWith("day")) {
        const dayNumber = parseInt(existingSelection.day_visit.substring(3), 10); // Extract the number after "day"
        formattedDay = `Ngày ${dayNumber + 1}`;
      } else {
        console.error("Invalid day_visit format:", existingSelection.day_visit);
      }
  
      // Location is already selected on another day
      if (existingSelection.day_visit !== dayKey) {
        setModalContent({ placeName: location.placeName, day_visit: formattedDay });
        setModalVisible(true);
        return;
      }
  
      // Unselect location if it's selected by this accordion
      setSelectedLocations((prev) => {
        const updated = prev.filter(
          (selected) =>
            !(selected.placeName === location.placeName && selected.day_visit === dayKey)
        );
        // console.log("Updated selected locations after unselect:", updated);
        return updated;
      });
    } else {
      // Select the location and associate it with this accordion
      setSelectedLocations((prev) => {
        const updated = [...prev, { ...location, day_visit: dayKey }];
        // console.log("Updated selected locations after add:", updated);
        return updated;
      });
    }
  };
  
  const renderLocations = (dayKey) => {
    return (
      <ScrollView>
        {userTrips[0]?.tripData?.places_to_visit?.map((location, index) => {
          // Check if this location is selected by this accordion
          const selectedByThisAccordion = selectedLocations.some(
            (selected) =>
              selected.placeName === location.placeName && selected.day_visit === dayKey
          );
  
          return (
            <View key={`${dayKey}-location${index}`} style={styles.customBox}>
              <Image source={{}} style={styles.image} />
              <View style={styles.contentWrapper}>
                <View style={styles.headCA}>
                  <Text style={styles.locaName}>{location.placeName}</Text>
                  <View style={styles.IconWrapper}>
                    <Feather name="navigation" size={16} color="black" />
                    <TouchableOpacity
                      onPress={() => handleLocationToggle(dayKey, location)}
                    >
                      <Feather
                        name={selectedByThisAccordion ? "check" : "plus-circle"}
                        size={16}
                        color={selectedByThisAccordion ? "#02954F" : "black"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.subText}>{location.details}</Text>
                <View style={styles.ContentDetail}>
                  <Feather name="clock" size={14} color="black" />
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

      <View style={styles.headTextContainer}>
        <Text style={styles.headText}>Cùng sắp xếp chuyến đi nào</Text>
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
      style={styles.SaveButton}
      onPress={async () => {
        try {
          if (userTrips.length > 0) {
            const trip = userTrips[0];
            const updatedPlacesToVisit = trip.tripData.places_to_visit.map((place) => {
              const matchedSelectedPlace = selectedLocations.find(
                (selected) => selected.placeName === place.placeName
              );

              // If `day_visit` in tripData is "None" and there is a selected location with a valid `day_visit`
              if (place.day_visit === "None" && matchedSelectedPlace && matchedSelectedPlace.day_visit !== "None") {
                return {
                  ...place,
                  day_visit: matchedSelectedPlace.day_visit, // Bind the new `day_visit`
                };
              }

              // If no matched place or day_visit in selected location is "None", set `day_visit` to "None"
              return {
                ...place,
                day_visit: matchedSelectedPlace ? matchedSelectedPlace.day_visit : "None", // Set to "None" if no match
              };
            });

            // Prepare updated tripData
            const updatedTripData = {
              ...trip.tripData,
              places_to_visit: updatedPlacesToVisit,
            };

            // Save updated tripData to the database
            const tripRef = doc(db, "UserTrips", docId); // Assuming `docId` is the document ID
            await setDoc(tripRef, { ...trip, tripData: updatedTripData });

            console.log("Trip data updated successfully!");
            router.push('/tourFinal');
          } else {
            console.error("No trips found to update.");
          }
        } catch (error) {
          console.error("Error saving trip data:", error);
        }
      }}
    >
      <Text style={styles.saveText}>Lưu</Text>
    </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Thông báo</Text>
            <Text style={styles.modalMessage}>
              Địa điểm "{modalContent.placeName}" đã được chọn vào {modalContent.day_visit}.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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


  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#02954F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})