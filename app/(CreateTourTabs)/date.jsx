import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DateOptions() {
  const { WhoTravel } = useLocalSearchParams()
  const router = useRouter();

  // State to store the start and end date
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectDate, setSelectDate] = useState(false); // Add selectDate state

  // Function to handle day press and store start and end date
  const handleDayPress = (day) => {
    if (!startDate) {
      // Set the start date
      setStartDate(day.dateString);
    } else if (!endDate && day.dateString > startDate) {
      // Set the end date only if it's after the start date
      setEndDate(day.dateString);
      setSelectDate(true); // Set selectDate to true when dates are selected
    } else if (startDate && endDate) {
      // Reset both dates if user selects a new date
      setStartDate(day.dateString);
      setEndDate('');
      setSelectDate(false); // Reset selectDate to false
    }
  }

  // Helper function to generate marked dates for the range
  const generateMarkedDates = () => {
    if (!startDate || !endDate) return {}; // If both dates are not selected, return an empty object

    let markedDates = {};
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Mark the period
    while (start <= end) {
      const dateString = start.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
      markedDates[dateString] = { 
        color: '#50cebb', 
        textColor: 'white' 
      };
      start.setDate(start.getDate() + 1); // Move to the next day
    }

    return markedDates;
  }

  // Function to calculate the number of days and nights
  const calculateDaysAndNights = () => {
    if (!startDate || !endDate) return { days: 0, nights: 0 };

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in time (in milliseconds)
    const timeDiff = end - start;

    // Convert the time difference into days (divide by milliseconds per day)
    const days = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1 to include both the start and end day
    const nights = days - 1; // Nights are one less than the days

    return { days, nights };
  }

  const { days, nights } = calculateDaysAndNights();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.calendarContainer}>
        <Text style={styles.calendarContainerTitle}>
          Thời gian du lịch
        </Text>

        <View style={styles.dateInfoContainer}>
          {startDate && endDate ? (
            <Text style={styles.dateInfoText}>
              <View style={styles.iconTextContainer}>
                <MaterialIcons name="sunny" size={24} color="yellow" />
                <Text style={styles.iconText}>{days}</Text>
                <Ionicons name="moon" size={24} color="gray" />
                <Text style={styles.iconText}>{nights}</Text>
              </View>
            </Text>
          ) : (
            <Text style={styles.dateInfoText}>Vui chọn khoảng thời gian muốn đi</Text>
          )}
        </View>

        <View style={styles.calendarBox}>
          <Calendar
            style={styles.calender}
            markingType={'period'}
            markedDates={{
              ...generateMarkedDates(),
              [startDate]: { startingDay: true, color: '#50cebb', textColor: 'white' },
              [endDate]: { endingDay: true, color: '#50cebb', textColor: 'white' },
            }}
            onDayPress={handleDayPress} // Handle day press
            theme={{
              textDayFontFamily: 'nunito',
              textMonthFontFamily: 'nunito-bold',
              monthTextColor: 'black',
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !selectDate && { opacity: 0.5 }]} // Changed to selectDate
        disabled={!selectDate} // Changed to selectDate
        onPress={() => {
          router.push({
            pathname: 'bugget',
            params: {WhoTravel : WhoTravel, StartDate: startDate, EndDate: endDate}
          });
        }}
      >
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAPE_GREEN,
    display: 'flex',
    flex: 1
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  calendarContainer: {
    marginHorizontal: '6%',
    marginTop: '35%',
  },
  calendarContainerTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 28
  },
  dateInfoContainer: {
    marginTop: '5%',
  },
  dateInfoText: {
    fontFamily: 'nunito',
    fontSize: 18,
  },
  calendarBox: {
    marginTop: '6%',
  },
  calender: {
    borderRadius: 20,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: 'nunito',
    fontSize: 18,
    marginHorizontal: 10,
  },
  continueButton: {
    padding: 15,
    backgroundColor: Colors.DARK_GREEN,
    borderRadius: 30,
    marginLeft: '65%',
    marginRight: '6%',
    marginTop: '5%'
  },
  continueButtonText: {
    textAlign: 'center',
    fontFamily: 'nunito-bold',
    color: Colors.LIME_GREEN
  }

});
