import {View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {styles} from '../../styles/bugget_style'
import { Colors } from '../../constants/Colors'

export default function Bugget() {
  const { WhoTravel, StartDate, EndDate } = useLocalSearchParams();
  const router = useRouter();

  // State for slider values
  const [budgetRange, setBudgetRange] = useState([200000, 20000000]);

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const parseFormattedNumber = (formattedValue) => {
    return parseInt(formattedValue.replace(/,/g, ''), 10) || 0;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.selectBugget}>
          <Text style={styles.selectBuggetTitle}>Chi phí của bạn</Text>

          <View style={styles.MinMaxBuggetBox}>
            <View style={styles.MinBuggetBox}>
              <TextInput
                value={formatNumber(budgetRange[0])}
                onChangeText={(value) => {
                  const parsedValue = parseFormattedNumber(value);
                  setBudgetRange([parsedValue, budgetRange[1]]);
                }}
                keyboardType="numeric"
                placeholderTextColor="black"
                placeholder="Tối thiểu"
              />
            </View>

            <View style={styles.MaxBuggetBox}>
              <TextInput
                value={formatNumber(budgetRange[1])}
                onChangeText={(value) => {
                  const parsedValue = parseFormattedNumber(value);
                  setBudgetRange([budgetRange[0], parsedValue]);
                }}
                keyboardType="numeric"
                placeholderTextColor="black"
                placeholder="Tối đa"
              />
            </View>
          </View>

          <View style={styles.labelMinMaxValue}>
            <Text style={styles.labelMinMaxText}>{formatNumber(budgetRange[0])} VNĐ</Text>
            <Text style={styles.labelMinMaxText}>{formatNumber(budgetRange[1])} VNĐ</Text>
          </View>

          {/* MultiSlider for adjusting budget */}
          <View style={styles.sliderContainer}>
            <MultiSlider
              values={budgetRange}
              onValuesChange={(values) => setBudgetRange(values)}
              min={1000000}
              max={20000000}
              step={500000}
              sliderLength={300}
              selectedStyle={{ backgroundColor: Colors.DARK_GREEN }}
              unselectedStyle={{ backgroundColor: Colors.LIGHT_YELLOW }}
              trackStyle={{ height: 8 }}
              markerStyle={{
                backgroundColor: Colors.DARK_GREEN,
                height: 20,
                width: 20,
                borderColor: 'black',
                borderWidth: 2,
                top: 5,
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            router.push({
              pathname: 'search',
              params: {
                WhoTravel : WhoTravel, 
                StartDate: StartDate, 
                EndDate: EndDate, 
                MinBugget: formatNumber(budgetRange[0]), 
                MaxBugget: formatNumber(budgetRange[1])}
            });
          }}
        >
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  );
}