import {Colors} from '../constants/Colors'
import { StyleSheet, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width - 20;

export const styles = StyleSheet.create({
  ImageBackGroundContainer: {
    flex: 1,
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  reviewContainer: {
    justifyContent: 'center',
    marginTop: '50%',
    marginHorizontal: '2%',
    width: WIDTH,
    backgroundColor: Colors.LIGHT_WHITE,
    borderRadius: 20
  },
  reviewContainerTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 26,
    textAlign: 'center',
    marginTop: '5%'
  },

  reviewDestination: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginTop: '5%'
  },
  reviewDestinationBox: {
    marginTop: -5,
    marginLeft: 10
  },
  reviewDestinationTitle: {
    fontFamily: 'nunito'
  },
  reviewDestinationText: {
    fontFamily: 'nunito-bold',
    color: Colors.DARK_GREEN
  },

  reviewDate: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginTop: '10%'
  },
  reviewDateBox: {
    marginTop: -16,
    marginLeft: 10
  },
  reviewDateTitle: {
    fontFamily: 'nunito'
  },
  reviewDateText: {
    fontFamily: 'nunito-bold',
    color: Colors.DARK_GREEN
  },
  iconTextContainer: {
    flexDirection: 'row',
  },
  iconText: {
    fontFamily: 'nunito',
    fontSize: 18,
    marginHorizontal: 10,
  },

  reviewWhoTravel: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginTop: '6%'
  },
  reviewWhoTravelBox: {
    marginTop: -6,
    marginLeft: 10
  },
  reviewWhoTravelTitle: {
    fontFamily: 'nunito'
  },
  reviewWhoTravelText: {
    fontFamily: 'nunito-bold',
    color: Colors.DARK_GREEN
  },

  reviewBugget: {
    flexDirection: 'row',
    marginHorizontal: '1%',
    marginVertical: '8%'
  },
  reviewBuggetBox: {
    marginTop: -6,
    marginLeft: 10
  },
  reviewBuggetBoxTitle: {
    fontFamily: 'nunito'
  },
  reviewBuggetBoxText: {
    fontFamily: 'nunito-bold',
    color: Colors.DARK_GREEN
  },

  continueButton: {
    padding: 15,
    backgroundColor: Colors.DARK_YELLOW,
    borderRadius: 30,
    marginLeft: '60%',
    marginRight: '3%',
    marginTop: '5%'
  },
  continueButtonText: {
    textAlign: 'center',
    fontFamily: 'nunito-bold',
    color: Colors.DARK_GREEN
  }
})