import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker'; // Correct import for DateTimePicker
import { useState } from 'react';

export default function SignIn() {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/images/Login_Page.jpg')} style={styles.SignUpPageBackGround}>
        <View style = {styles.SignUpBox}>

          <Text style={styles.SignUpTitle}>Đăng Ký Tài Khoản</Text>

          <View style={{ marginTop: 15 }}>
            <TextInput style={styles.SignUpTextInput} placeholder="Họ và tên:" placeholderTextColor={'black'} />
            <TextInput style={styles.SignUpTextInput} placeholder="Email:" placeholderTextColor={'black'} />

            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.SignUpTextInput}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {show && (
              <View style = {styles.DatePickerContainer}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChange}
                  textColor='black'
                />
              </View>
            )}

            <TextInput style={styles.SignUpTextInput} placeholder="Tên đăng nhập:" placeholderTextColor={'black'} />
            <TextInput style={styles.SignUpTextInput} placeholder="Mật khẩu:" placeholderTextColor={'black'} secureTextEntry={true}/>
          </View>

        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SignUpPageBackGround: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  SignUpBox: {
    width: '90%',
    height: '70%',
    backgroundColor: Colors.LIGHT_WHITE,
    borderRadius: 25,
  },
  SignUpTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: '10%',
  },
  SignUpTextInput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    fontFamily: 'nunito',
  },
  DatePickerContainer: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
