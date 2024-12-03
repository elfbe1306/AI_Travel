import { View, Text, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { styles } from '../../../styles/SignUp_style';
import { auth } from '../../../configs/FireBaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'expo-router'

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

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [loginName, setLoginName] = useState();

  const router = useRouter();

  const OnCreateAccount = () => {
    // Check if all fields are filled
    if (!email || !password || !fullName || !loginName) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Email không đúng định dạng");
      return;
    }
  
    // Validate password length
    if (password.length < 6) {
      Alert.alert("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
  
    // Create account using Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        router.replace('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Đăng ký thất bại", errorMessage);
      });
    };
  
  return (
    <ImageBackground source={require('../../../assets/images/Login_Page.jpg')} style={styles.SignUpPageBackGround}>
        <KeyboardAvoidingView behavior='padding' style = {styles.SignUpBox}>

          <Text style={styles.SignUpTitle}>Đăng Ký Tài Khoản</Text>

          <View style={{ marginTop: 15 }}>
            <TextInput style={styles.SignUpTextInput} placeholder="Họ và tên:" placeholderTextColor={'black'} onChangeText={(value) => setFullName(value)}/>
 
            <TextInput style={styles.SignUpTextInput} placeholder="Email:" placeholderTextColor={'black'} onChangeText={(value) => setEmail(value)}/>

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

            <TextInput style={styles.SignUpTextInput} placeholder="Tên đăng nhập:" placeholderTextColor={'black'} onChangeText={(value) => setLoginName(value)}/>

            <TextInput style={styles.SignUpTextInput} placeholder="Mật khẩu:" placeholderTextColor={'black'} secureTextEntry={true} onChangeText={(value) => setPassword(value)}/>
          </View>

          <TouchableOpacity style = {styles.SignUpButton} onPress={OnCreateAccount}>
            <Text style = {styles.SignUpButtonText}>Lưu</Text>
          </TouchableOpacity>

          <Text style = {styles.SignUpBoxGoogleText}>or continue with</Text>

          <TouchableOpacity style = {styles.SignUpGoogleButton}>
            <Image source={require('../../../assets/images/Google_Icon.png')}/>
          </TouchableOpacity>

          <View style = {styles.signInContainer}>
            <Text style = {styles.signInText}>
              Bạn đã có tài khoản ? {' '}
            </Text>

            <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
              <Text style = {styles.signInButton}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
    </ImageBackground>
  );
}


