import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Colors } from '../constants/Colors'

export default function Login() {
  return (
    <View>
      <View style={{backgroundColor: Colors.YELLOW, height: '80%'}}>
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


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.YELLOW,
		height: '20%',
		alignItems: "center",
	},
	image: {
		width: '100%', height: '100%', 
		borderBottomLeftRadius: 25, 
		borderBottomRightRadius: 25,
		top: -50,
	},
	title: {
		fontSize: 32, 
		fontFamily: 'nunito-extrabold', 
		color: Colors.GREEN_TITLE,
    top: -40,
	},
	title_context: {
		fontSize: 14,
		fontFamily: 'nunito-bold',
		color: Colors.GREEN_CONTEXT,
		textAlign: 'center',
    top: -40,
	}
})