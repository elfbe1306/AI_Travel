import { View, Text, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { useState } from 'react';
import { styles } from '../../../styles/SignIn_style';
import { useRouter } from 'expo-router'

export default function SignIn() {

  const router = useRouter();

  return (
    <ImageBackground source={require('../../../assets/images/Login_Page.jpg')} style={styles.SignInPageBackGround}>

        <TouchableOpacity style = {styles.ReturnButton} onPress={() => router.back()}>
          <Image source={require('../../../assets/images/arrow-left-s-line.png')}/>
        </TouchableOpacity>

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

        </KeyboardAvoidingView>
    </ImageBackground>
  )
}