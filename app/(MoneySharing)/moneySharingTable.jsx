import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {styles} from '../../styles/moneySharingTable_style';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MoneySharingTable() {
  const router = useRouter();
  const { participants, categories } = useLocalSearchParams();
  const parsedParticipants = participants ? JSON.parse(participants) : [];
  const parsedCategories = categories ? JSON.parse(categories) : [];

  const [collapsedStates, setCollapsedStates] = useState(parsedCategories.map(() => ({ thamGia: false, ungTien: false })));
  const [selectedParticipants, setSelectedParticipants] = useState(
    parsedCategories.map(() => ({ thamGia: [], ungTien: [] }))
  );

  useEffect(() => {
    console.log(parsedParticipants);
  }, []);

  const toggleCollapse = (index, key) => {
    const newStates = [...collapsedStates];
    newStates[index][key] = !newStates[index][key];
    setCollapsedStates(newStates);
  };

  const [updatedCategories, setUpdatedCategories] = useState(
    parsedCategories.map((category) => ({
      ...category,
      participants: [],
      payers: [],
    }))
  );

  const toggleParticipantSelection = (categoryIndex, key, person) => {
    // Update selectedParticipants
    setSelectedParticipants((prev) => {
      const newSelections = [...prev];
      const selectedList = newSelections[categoryIndex][key];
  
      if (selectedList.some((p) => p.name === person.name)) {
        newSelections[categoryIndex][key] = selectedList.filter((p) => p.name !== person.name);
      } else {
        newSelections[categoryIndex][key] = [...selectedList, person];
      }
  
      // Sync updatedCategories
      setUpdatedCategories((prevCategories) => {
        const newCategories = [...prevCategories];
        newCategories[categoryIndex][key === 'thamGia' ? 'participants' : 'payers'] =
          newSelections[categoryIndex][key];
        return newCategories;
      });
  
      return newSelections;
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.tableContent}>
      <Text style={styles.tableContentText}>{item.name}</Text>
      <Text style={styles.tableContentText}>{item.value}</Text>
  
      {['thamGia', 'ungTien'].map((key) => (
        <View key={key} style={styles.collapsibleContainer}>
          <TouchableOpacity onPress={() => toggleCollapse(index, key)} style={styles.tableContentText}>
            <AntDesign
              name={collapsedStates[index][key] ? 'caretup' : 'caretdown'}
              size={16}
              color="#02954F"
              style={styles.collapsibleIcon}
            />
          </TouchableOpacity>
  
          {collapsedStates[index][key] && (
            <View style={styles.participantBox}>
              {parsedParticipants.map((person, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => toggleParticipantSelection(index, key, person)}
                  style={
                    selectedParticipants[index][key].some((p) => p.name === person.name)
                      ? styles.selectedParticipant
                      : styles.unselectedParticipant
                  }
                >
                  <Text style={styles.tableContentText}>{person.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
  
          {/* Show Selected Participants with Background Color */}
          <View style={styles.selectedNamesContainer}>
            {selectedParticipants[index][key].map((participant, idx) => (
              <View
                key={idx}
                style={[styles.nameBox, { backgroundColor: participant.color || '#E0F7FA' }]}
              >
                <Text style={styles.nameBoxText}>{participant.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={parsedCategories}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={renderItem}
      ListHeaderComponent={
        <>
          <View style={styles.firstHeaderContainer}>
            <View style={styles.userNameBox}>
              <View style={styles.imageBox}>
                <Image
                  source={require('../../assets/images/character.png')}
                  style={styles.userImage}
                />
              </View>
              <Text style={styles.userName}>Doan Le Vy</Text>
            </View>
            <View style={styles.notificationButton}>
              <Feather name="bell" size={30} color="black" />
            </View>
          </View>
          <Text style={styles.firstTitle}>Phân chia chi phí</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText1}>Tên mục</Text>
            <Text style={styles.tableHeaderText1}>Số tiền</Text>
            <Text style={styles.tableHeaderText2}>Người tham gia</Text>
            <Text style={styles.tableHeaderText2}>Người ứng tiền</Text>
          </View>
        </>
      }
      ListFooterComponent={
        <View style={styles.Footer}>
          <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
            <Text style={styles.nextButtonText}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/moneySharingFinal',
                params: { updatedCategories: JSON.stringify(updatedCategories) },
              })
            }
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}



