import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

export const styles = StyleSheet.create({
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
	signInContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: -5,
		marginBottom: 15
	},
	signInText: {
		fontFamily: 'nunito',
	},
	signInButton: {
		fontFamily: 'nunito-extrabold',
	}
});