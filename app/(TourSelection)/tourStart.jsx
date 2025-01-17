import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

import Collapsible from 'react-native-collapsible';
import {setDoc, doc, getDoc } from 'firebase/firestore';
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

const GetPhotoRef = async (PlaceName) => {
  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${PlaceName}&key=${process.env.EXPO_PUBLIC_PHOTO_GOOGLE_API_KEY}`
    );
    const result = await resp.json();
    return result?.results[0]?.photos[0]?.photo_reference;
  } catch (error) {
    console.error("Error fetching photo reference:", error);
    return null;
  }
};

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
  const [userTrips, setUserTrips] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [docId, setDocId] = useState();

  const { docIdForEdit } = useLocalSearchParams();

  useEffect(() => {
    const GetMyTrips = async () => {
      try {
        if (docIdForEdit) {
          // Use docIdForEdit to fetch the trip data
          const tripDoc = await getDoc(doc(db, 'UserTrips', docIdForEdit));
          if (tripDoc.exists()) {
            setUserTrips([tripDoc.data()]);
            setDocId(docIdForEdit);
          } else {
            console.error("No trip found for docId:", docIdForEdit);
          }
        }
      } catch (error) {
        console.error("Error fetching user trips:", error);
      }
    };

    GetMyTrips();
  }, [docIdForEdit]);

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

    if (existingSelection) {
      let formattedDay = "Invalid Day";
      if (existingSelection.day_visit.startsWith("day")) {
        const dayNumber = parseInt(existingSelection.day_visit.substring(3), 10);
        formattedDay = `Ngày ${dayNumber + 1}`;
      } else {
        console.error("Invalid day_visit format:", existingSelection.day_visit);
      }

      if (existingSelection.day_visit !== dayKey) {
        setModalContent({ placeName: location.placeName, day_visit: formattedDay });
        setModalVisible(true);
        return;
      }

      setSelectedLocations((prev) => {
        return prev.filter(
          (selected) =>
            !(selected.placeName === location.placeName && selected.day_visit === dayKey)
        );
      });
    } else {
      setSelectedLocations((prev) => {
        return [...prev, { ...location, day_visit: dayKey }];
      });
    }
  };

  const [photoRefs, setPhotoRefs] = useState({});

  useEffect(() => {
    const fetchPhotoReferences = async () => {
      if (userTrips.length > 0) {
        const allLocations = userTrips[0]?.tripData?.places_to_visit || [];
        const photoPromises = allLocations.map(async (location) => {
          const ref = await GetPhotoRef(location.placeName);
          return { placeName: location.placeName, photoRef: ref };
        });

        const photoResults = await Promise.all(photoPromises);
        const photoRefMap = photoResults.reduce((acc, curr) => {
          if (curr.photoRef) {
            acc[curr.placeName] = curr.photoRef;
          }
          return acc;
        }, {});

        setPhotoRefs(photoRefMap);
      }
    };

    fetchPhotoReferences();
  }, [userTrips]);

  const renderLocations = (dayKey) => {
    return (
      <ScrollView>
        {userTrips[0]?.tripData?.places_to_visit?.map((location, index) => {
          const selectedByThisAccordion = selectedLocations.some(
            (selected) =>
              selected.placeName === location.placeName && selected.day_visit === dayKey
          );

          const photoRef = photoRefs[location.placeName];
          const photoUri = photoRef
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_PHOTO_GOOGLE_API_KEY}`
            : null;

          return (
            <View key={`${dayKey}-location${index}`} style={styles.customBox}>
              {photoUri ? (
                <Image style={styles.image} source={{ uri: photoUri }} />
              ) : (
                <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Text>Loading...</Text>
                </View>
              )}
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

                if (place.day_visit === "None" && matchedSelectedPlace && matchedSelectedPlace.day_visit !== "None") {
                  return {
                    ...place,
                    day_visit: matchedSelectedPlace.day_visit,
                  };
                }

                return {
                  ...place,
                  day_visit: matchedSelectedPlace ? matchedSelectedPlace.day_visit : "None",
                };
              });

              const updatedTripData = {
                ...trip.tripData,
                places_to_visit: updatedPlacesToVisit,
              };

              const tripRef = doc(db, "UserTrips", docId);
              await setDoc(tripRef, { ...trip, tripData: updatedTripData });

              console.log("Trip data updated successfully!");
              router.push(docIdForEdit ? { pathname: '/tourFinal', params: { docIdForEdit } } : '/tourFinal');
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
    maxWidth:'97%',
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
    padding:3,
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