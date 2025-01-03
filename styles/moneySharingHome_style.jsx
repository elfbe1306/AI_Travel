import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/Colors'

const GAP = Dimensions.get('window').width - 320;
const FRAMEGAP = Dimensions.get('window').width - 315;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.PASTEL_GREEN,
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
      width: 220,
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
      marginBottom: 4,
      fontSize: 24,
      fontFamily: 'nunito-bold',
      color: '#0A6138'
    },

    bodyText: {
      marginVertical: 20,
      marginLeft: 20,
      marginRight:12,
      fontSize: 14,
      fontFamily: 'nunito-bold',
      color: '#0A6138',
    },

    billValue: {
      height: 32,
      marginVertical: 12,
      borderWidth: 1,
      padding: 10,
      width: 273,
      backgroundColor: 'white',
      borderColor:'#DCD7D7',
      borderRadius:16,
    },

    bodyAddCategories: {
      flexDirection:'row',
      gap: FRAMEGAP,
      marginVertical: 12,
    },

    bodyMoney: {
      flexDirection: 'row',
      width:120,
    },

    bodyAddMoney1: {
      height: 32,
      marginVertical: 18,
      marginLeft: 16,
      marginRight:8,
      borderWidth: 1,
      padding: 7,
      width: 128,
      backgroundColor: 'white',
      borderColor:'#DCD7D7',
      borderRadius:16,
    },

    bodyAddMoney2: {
      height: 32,
      marginVertical: 18,
      marginRight:8,
      borderWidth: 1,
      padding: 8,
      width: 78,
      backgroundColor: 'white',
      borderColor:'#DCD7D7',
      borderRadius:16,
    },

    // Nguoi ung tien
    
    plusIcon: {
      color:'#0A6138',
      position: 'absolute',
      marginLeft: 385,
      marginTop: -74,
    },

    input: {
      fontFamily: 'nunito',
      fontSize: 12,
      
    },

    nameBox: {
      fontSize: 12,
      fontFamily: 'nunito-bold',
      marginVertical: 8,
      marginHorizontal: 10,
      textAlign:'center'
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
    },
 
});