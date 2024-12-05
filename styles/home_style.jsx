import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

export const styles = StyleSheet.create({
    headerContainer: {
      flex: 3.5
    },
    bodyContainer: {
      flex: 6.5
    },
    firstHeaderContainer: {
      position: 'absolute',
      marginTop: '15%',
      justifyContent:'space-between=',
      alignItems: 'center',
      alignContent: 'center',
      gap: '30%',
      flexDirection:'row',
    },
    userNameBox: {
      backgroundColor: 'white',
      paddingLeft: 5,
      paddingRight: 30,
      paddingVertical: 5,
      borderRadius: 40,
      marginLeft: '5%',
      flexDirection:'row',
    },
    imageBox: {
      backgroundColor: 'pink', 
      borderRadius: 99,
      height: 50,
    },
    userImage : {
      top: -30,
      width: 50, 
      height: 75,
    },
    userName: {
      marginTop: 16,
      marginLeft: 15,
      fontFamily: 'nunito-bold'
    },
    notificationButton: {
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 99
    },
    secondHeaderContainer: {
      marginTop: '40%',
      marginLeft: '5%'
    },
    secondHeaderContainerTitleText: {
      fontFamily: 'nunito-bold',
      fontSize: 30
    },
    firstBodyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: '5%',
      alignItems: 'center',
    }
});