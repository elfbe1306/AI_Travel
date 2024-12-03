import { View, Text, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { styles } from '../../../style/SignUp_style';

export default function SignUp() {

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


