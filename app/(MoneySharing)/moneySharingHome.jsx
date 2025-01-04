import { View, Text, TouchableOpacity, Image, TextInput, Alert, FlatList, Button } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { styles } from '../../styles/moneySharingHome_style';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

export default function MoneySharing() {
  const router = useRouter();
  const [billValue, setBillValue] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      

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

      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.bodyText}>Giá trị hoá đơn </Text>
          <View style={styles.billValue}>
            <TextInput
              style={styles.input}
              onChangeText={setBillValue}
              value={billValue}
              placeholder="1.000.000"
              placeholderTextColor="#CED8E6"
              keyboardType="numeric"
            />
          </View>
        </View>
        
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
          <View style={styles.bodyMoney}>
            <Text style={styles.bodyText}>Tên mục cần chia chi phí </Text>
            <View style={styles.bodyAddMoney1}>
              <TextInput
                style={styles.input}
                onChangeText={setCategoryName}
                value={categoryName}
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
                onChangeText={setCategoryValue}
                value={categoryValue}
                placeholder="100.000"
                keyboardType="numeric"
                placeholderTextColor="#CED8E6"
              />
            </View>
            <TouchableOpacity>
              <Entypo name="plus" size={24} style={styles.MoneyIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
      <TouchableOpacity
        onPress={() => router.push('/moneySharingTable')}
        style={styles.nextButton}>
        <Text style={styles.nextButtonText}>
          Tiếp tục
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
