import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
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
        <KeyboardAvoidingView behavior='padding' style = {styles.SignUpBox}>

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

          <TouchableOpacity style = {styles.SignUpButton}>
            <Text style = {styles.SignUpButtonText}>Lưu</Text>
          </TouchableOpacity>

          <Text style = {styles.SignUpBoxGoogleText}>or continue with</Text>

          <TouchableOpacity style = {styles.SignUpGoogleButton}>
            <Image source={require('../../../assets/images/Google_Icon.png')}/>
          </TouchableOpacity>

        </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SignUpPageBackGround: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignUpBox: {
    backgroundColor: Colors.LIGHT_WHITE,
    paddingVertical: '30%',
    borderRadius: 25,
  },
  SignUpTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: '-25%'
  },
  SignUpTextInput: {
    paddingLeft: 10,
    paddingRight: '45%',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    fontFamily: 'nunito',
  },
  SignUpButton: {
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 45,
    paddingVertical: 10,
    backgroundColor: Colors.DARK_GREEN,
    borderRadius: 20,
    marginLeft: '60%',
    marginRight: '5%',
  },
  SignUpButtonText: {
    textAlign:'right',
    color: Colors.DARK_YELLOW,
    fontFamily: 'nunito-bold'
  },
  SignUpBoxGoogleText: {
    fontFamily: 'nunito-bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25
  },
  SignUpGoogleButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: '10%',
    marginBottom: '5%',
    marginTop: '2%',
    borderRadius: 10
  },
});


