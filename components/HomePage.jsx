import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { styles } from '../styles/HomePage_style'
import { useRouter } from 'expo-router'

export default function HomePage() {
  
  const router = useRouter();

  return (
    <View>
      <View style={{backgroundColor: Colors.LIGHT_YELLOW, height: '75%'}}>
				<Image source={require('../assets/images/Login_Page.jpg')}
					style={styles.image}/>
      </View>
      
      <View style={styles.container}>
        <Text style={styles.title}>
					AI TRAVEL
        </Text>

        <Text style={styles.title_context}>
					{`Bạn cần lập kế hoạch du lịch?
Hãy trải nghiệm ngay cùng chúng tôi nào!`}
        </Text>
        
        <TouchableOpacity style={styles.create_account_button} onPress={() => router.push('/auth/sign-up')}>
            <Text style={styles.create_account_button_text}>Tạo tài khoản</Text>
        </TouchableOpacity>

        <View style = {styles.signInContainer}>
          <Text style = {styles.signInText}>
            Bạn đã có tài khoản ? {' '}
          </Text>

          <TouchableOpacity>
            <Text style = {styles.signInButton}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

