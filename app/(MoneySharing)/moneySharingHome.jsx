import { View, Text, TouchableOpacity, Image, TextInput, Alert, FlatList, ScrollView} from 'react-native';
import React, { useState} from 'react';
import { useRouter } from 'expo-router';

import { styles } from '../../styles/moneySharingHome_style';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

export default function MoneySharing() {
  const router = useRouter();
  const [participants, setParticipants] = useState([]);

  const getRandomPastelColor = () => {
    const randomColor = () => Math.floor(Math.random() * 64 + 180);
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  };

  const addParticipantInput = () => {
    // Add the new participant at the beginning of the array
    setParticipants([{ name: '', isEditing: true, color: getRandomPastelColor() }, ...participants]);
  };
  

  const updateParticipantName = (index, name) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = name;
    setParticipants(updatedParticipants);
  };

  const finalizeParticipantName = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].isEditing = false;
    setParticipants(updatedParticipants);
  };

  const [categories, setCategories] = useState([{ name: '', value: '' }]);

  const addCategoryInput = () => {
    setCategories([...categories, { name: '', value: '' }]);
  };

  const updateCategory = (index, key, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][key] = value;
    setCategories(updatedCategories);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.firstHeaderContainer}>
          <View style={styles.userNameBox}>
            <View style={styles.imageBox}>
              <Image source={require('../../assets/images/character.png')} style={styles.userImage} />
            </View>
            <Text style={styles.userName}>Doan Le Vy</Text>
          </View>

          <View style={styles.notificationButton}>
            <Feather name="bell" size={30} color="black" />
          </View>
        </View>

        <Text style={styles.firstTitle}> Phân chia chi phí </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center',marginRight:'5%' }}>
          <Text style={styles.bodyText}>Người tham gia </Text>
          <FlatList
            style={{width:200}}
            data={participants}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 4,
                  marginVertical:4,
                  height:36,
                  backgroundColor: item.color,
                  borderRadius: 16,
                }}
              >
                {item.isEditing ? (
                  <TextInput
                    style={[styles.nameBox, { flex: 1 }]}
                    placeholder="Nhập tên"
                    placeholderTextColor="#7D848D"
                    value={item.name}
                    onChangeText={(text) => updateParticipantName(index, text)}
                    onBlur={() => finalizeParticipantName(index)}
                  />
                ) : (
                  <Text style={[styles.nameBox, { flex: 1 }]}>{item.name}</Text>
                )}
              </View>
            )}
          />
          <TouchableOpacity onPress={addParticipantInput}>
          <Entypo name="plus" size={24} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bodyAddCategories}>
          {categories.map((category, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <View style={styles.bodyMoney}>
                <Text style={styles.bodyText}>Tên mục cần chia chi phí </Text>
                <View style={styles.bodyAddMoney1}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => updateCategory(index, 'name', text)}
                    value={category.name}
                    placeholder="Vé xem phim"
                    placeholderTextColor="#CED8E6"
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginLeft: '4%' }}>
                <Text style={styles.bodyText}>Số tiền </Text>
                <View style={styles.bodyAddMoney2}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => updateCategory(index, 'value', text)}
                    value={category.value}
                    placeholder="100.000"
                    keyboardType="numeric"
                    placeholderTextColor="#CED8E6"
                  />
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={addCategoryInput}>
            <Entypo name="plus" size={24} style={styles.MoneyIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/moneySharingTable',
              params: {
                participants: JSON.stringify(participants),
                categories: JSON.stringify(categories)
              }
           })
          }}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>
            Tiếp tục
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}
