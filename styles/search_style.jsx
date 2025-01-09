import {Colors} from '../constants/Colors'
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIME_GREEN
  },
  returnButton: {
    position: 'absolute',
    marginTop: '15%',
    marginLeft: '6%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  SearchContainer: {
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchBox: {
    backgroundColor: 'white',
    marginTop: '5%',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
  },
  SearchBoxTitle: {
    fontFamily: 'nunito-semibold',
    fontSize: 28
  },
  continueButton: {
    padding: 15,
    backgroundColor: Colors.DARK_GREEN,
    borderRadius: 30,
    marginLeft: '65%',
    marginRight: '5%',
    marginTop: '5%'
  },
  continueButtonText: {
    textAlign: 'center',
    fontFamily: 'nunito-bold',
    color: Colors.LIME_GREEN
  },
  imagePic: {
    
  }
});