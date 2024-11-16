import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Colors } from '../constants/Colors'
import { styles } from '../style/Login_style'

export default function Login() {
  return (
    <View>
      <View style={{backgroundColor: Colors.LIGHT_YELLOW, height: '80%'}}>
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
        
        <TouchableOpacity style={styles.create_account_button}>
            <Text style={styles.create_account_button_text}>Tạo tài khoản</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

