import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.LIGHT_YELLOW,
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
		color: Colors.DARK_GREEN,
    top: -40,
	},
	title_context: {
		fontSize: 14,
		fontFamily: 'nunito-bold',
		color: Colors.LIGHT_GREEN,
		textAlign: 'center',
    top: -40,
	},
	create_account_button: {
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 10,
		top: -25,
	},
	create_account_button_text: {
		color: Colors.LIGHT_YELLOW,
		fontFamily: 'nunito-semibold',
		fontSize: 16
	}
})