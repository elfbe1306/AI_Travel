import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function Bugget() {
  const { WhoTravel, StartDate, EndDate } = useLocalSearchParams();
  const router = useRouter();

  // State for slider values
  const [budgetRange, setBudgetRange] = useState([200000, 20000000]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.selectBugget}>
        <Text style={styles.selectBuggetTitle}>Chi phí của bạn</Text>

        <View style={styles.MinMaxBuggetBox}>
          <View style={styles.MinBuggetBox}>
            <TextInput
              value={budgetRange[0].toString()}
              onChangeText={(value) => {
                const parsedValue = parseInt(value, 10) || 0;
                setBudgetRange([parsedValue, budgetRange[1]]);
              }}
              keyboardType="numeric"
              placeholderTextColor="black"
              placeholder="Tối thiểu"
            />
          </View>

          <View style={styles.MaxBuggetBox}>
            <TextInput
              value={budgetRange[1].toString()}
              onChangeText={(value) => {
                const parsedValue = parseInt(value, 10) || 0;
                setBudgetRange([budgetRange[0], parsedValue]);
              }}
              keyboardType="numeric"
              placeholderTextColor="black"
              placeholder="Tối đa"
            />
          </View>
        </View>

        <View style={styles.labelMinMaxValue}>
          <Text style={styles.labelMinMaxText}>{budgetRange[0]}</Text>
          <Text style={styles.labelMinMaxText}>{budgetRange[1]}</Text>
        </View>

        {/* MultiSlider for adjusting budget */}
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={budgetRange}
            onValuesChange={(values) => setBudgetRange(values)}
            min={200000}
            max={20000000}
            step={100000}
            sliderLength={300}
            selectedStyle={{ backgroundColor: Colors.DARK_GREEN }}
            unselectedStyle={{ backgroundColor: '#ccc' }}
            trackStyle={{ height: 8 }}
            markerStyle={{
              backgroundColor: Colors.AVOCADO_GREEN,
              height: 20,
              width: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.AVOCADO_GREEN,
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  selectBugget: {
    marginTop: '40%',
    marginHorizontal: '6%',
  },
  selectBuggetTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 28,
  },
  MinMaxBuggetBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  MinBuggetBox: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  MaxBuggetBox: {
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  labelMinMaxValue: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'nunito-bold',
  },
  labelMinMaxText: {
    fontFamily: 'nunito-bold',
    color: Colors.DARK_GREEN,
  },
  sliderContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
});
