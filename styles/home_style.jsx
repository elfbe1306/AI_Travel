import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/Colors'

const GAP = Dimensions.get('window').width - 300;


export const styles = StyleSheet.create({
    headerContainer: {
      flex: 3.5
    },
    bodyContainer: {
      flex: 6.5
    },
    firstHeaderContainer: {
      gap: GAP,
      marginTop: '15%',
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
      width: 200,
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
      marginLeft: 10,
      fontFamily: 'nunito-bold',
      textAlign:'center'
    },

    notificationButton: {
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 99,
    },

    secondHeaderContainer: {
      marginTop: '15%',
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