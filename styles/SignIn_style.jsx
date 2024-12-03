import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

export const styles = StyleSheet.create({
	SignInPageBackGround: {
	  height: '100%',
	  width: '100%',
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	SignInBox: {
	  backgroundColor: Colors.LIGHT_WHITE,
	  paddingVertical: '30%',
	  borderRadius: 25,
	},
	SignInTitle: {
	  fontFamily: 'nunito-bold',
	  fontSize: 24,
	  textAlign: 'center',
	  marginTop: '-25%'
	},
	SignInTextInput: {
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
	SignInBoxGoogleText: {
	  fontFamily: 'nunito-bold',
	  fontSize: 20,
	  textAlign: 'center',
	  marginTop: 25
	},
	SignInButton: {
		backgroundColor: Colors.DARK_GREEN,
		marginHorizontal: '5%',
		marginTop: '3%',
		justifyContent:'center',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 10
	},
	SignInButtonText: {
		color: Colors.DARK_YELLOW,
		fontFamily: 'nunito',
		fontSize: 18,
	},
	SignInGoogleButton: {
	  backgroundColor: 'white',
	  alignItems: 'center',
	  paddingVertical: 10,
	  marginHorizontal: '10%',
	  marginBottom: '5%',
	  marginTop: '2%',
	  borderRadius: 10
	},
	ReturnButton: {
		position: 'absolute',
		// backgroundColor: 'white',
		left: '7%',
		top: 100,
		// padding: 10,
		// borderRadius: 30
	}
});