import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/Colors'

const GAP = Dimensions.get('window').width - 300;
const FRAMEGAP = Dimensions.get('window').width - 315;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D3EC9E',
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

    firstTitle: {
      marginTop: 20,
      marginLeft: 20,
      fontSize: 24,
      fontFamily: 'nunito-bold',
      color: '#0A6138'
    },
    returnButton: {
        position: 'absolute',
        marginTop: '190%',
        marginLeft: '6%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 99,
      },
      nextButton: {
        position: 'absolute',
        marginTop: '190%',
        marginLeft: '80%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 99,
      }
  });