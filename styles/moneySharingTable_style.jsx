import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/Colors'

const GAP = Dimensions.get('window').width - 300;
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

    tableFrame: {
      backgroundColor: '#EBF7D4',
      borderRadius:10,
      width: 370,
      marginVertical:'5%',
      shadowColor: '#000',  // Shadow color
      shadowOffset: { width: 0, height: 4 },  
      shadowOpacity: 0.25, 
      shadowRadius: 6,   
      justifyContent: 'center',  // Centers vertically
      alignSelf:'center',
      paddingBottom:'4%'
    },

    tableHeader: {
      flexDirection:'row',
      paddingVertical: 12,
      paddingHorizontal: 12,
      backgroundColor: '#FFE68A',
      borderBlockColor:'#0A6138',
      borderWidth:1, 
      marginTop:'4%',
      marginHorizontal:'2%'
    },

    tableHeaderText1: {
      fontFamily: 'nunito-bold',
      fontSize: 10,
      color:'#0A6138',
      width:60,
      paddingRight:'2%',
      textAlign:'center'
    },

    tableHeaderText2: {
      fontFamily: 'nunito-bold',
      fontSize: 10,
      color:'#0A6138',
      width:95,
      textAlign:'center',
      marginLeft:'3%'
    },

    tableContent: {
      flexDirection:'row',
      padding: 10,
      borderBlockColor:'#0A6138', 
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:1,
      marginHorizontal:'2%'
    },

    tableContentText: {
      fontFamily: 'nunito-medium',
      fontSize: 10,
      color:'#000000',
      width:55,
      marginRight:'2%',
      alignSelf:'center',
      textAlign:'center'
    },

    collapsibleContainer: {
      flex: 1,
      marginVertical: 4, 
    },
    
    collapsibleIcon: {
      marginLeft: '5%', 
      width: 68,
      paddingLeft:'90%'
    },

    participantBox: {
      marginTop: 8, 
      backgroundColor: '#A1D599', 
      borderRadius: 6, 
      width:62,
      height: 52,
      marginRight:'8%',
      alignSelf:'flex-end'
    },
    
    returnButton: {
        backgroundColor: '#FFE68A',
        marginLeft: '12%',
        width: 75,
        height:30,
        borderRadius: 16,
      },
      
      Footer: {
        flexDirection:'row'
      },

      nextButton: {
        backgroundColor: '#FFE68A',
        marginLeft: '42%',
        width: 75,
        height:30,
        borderRadius: 16,
      },
  
      nextButtonText: {
        color: '#0A6138',
        fontSize: 10,
        fontFamily: 'nunito-bold',
        textAlign:'center',
        paddingVertical:'10%'
      },
  });