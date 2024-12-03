import { View, Text, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { useState } from 'react';
import { styles } from '../../../styles/SignIn_style';
import { useRouter } from 'expo-router'
import { auth } from '../../../configs/FireBaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  
  const OnSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  
  const router = useRouter();

  return (
    <ImageBackground source={require('../../../assets/images/Login_Page.jpg')} style={styles.SignInPageBackGround}>
        <KeyboardAvoidingView behavior='padding' style = {styles.SignInBox}>

          <Text style={styles.SignInTitle}>Đăng nhập</Text>

          <View style={{ marginTop: 15 }}>
            <TextInput style={styles.SignInTextInput} placeholder="Tên đăng nhập:" placeholderTextColor={'black'} onChangeText={(value) => setLoginName(value)}/>

            <TextInput style={styles.SignInTextInput} placeholder="Mật khẩu:" placeholderTextColor={'black'} secureTextEntry={true} onChangeText={(value) => setPassword(value)}/>
          </View>

          <TouchableOpacity style = {styles.SignInButton}>
            <Text style = {styles.SignInButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <Text style = {styles.SignInBoxGoogleText}>or continue with</Text>

          <TouchableOpacity style = {styles.SignInGoogleButton}>
            <Image source={require('../../../assets/images/Google_Icon.png')}/>
          </TouchableOpacity>

          <View style = {styles.signUpContainer}>
            <Text style = {styles.signUpText}>
              Bạn đã có tài khoản ? {' '}
            </Text>

            <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
              <Text style = {styles.signUpButton}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
    </ImageBackground>
  )
}