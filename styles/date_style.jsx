import { Colors } from '../constants/Colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAPE_GREEN,
    display: 'flex',
    flex: 1
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  calendarContainer: {
    marginHorizontal: '6%',
    marginTop: '35%',
  },
  calendarContainerTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 28
  },
  dateInfoContainer: {
    marginTop: '5%',
  },
  dateInfoText: {
    fontFamily: 'nunito',
    fontSize: 18,
  },
  calendarBox: {
    marginTop: '6%',
  },
  calender: {
    borderRadius: 20,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: 'nunito',
    fontSize: 18,
    marginHorizontal: 10,
  },
  continueButton: {
    padding: 15,
    backgroundColor: Colors.DARK_GREEN,
    borderRadius: 30,
    marginLeft: '65%',
    marginRight: '6%',
    marginTop: '5%'
  },
  continueButtonText: {
    textAlign: 'center',
    fontFamily: 'nunito-bold',
    color: Colors.LIME_GREEN
  }

});
