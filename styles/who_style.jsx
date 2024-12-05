import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.AVOCADO_GREEN,
    },
    returnButton: {
        position: 'absolute',
        marginTop: '15%',
        marginLeft: '6%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 99
    },
    selectOptionsContainer: {
        marginTop: '35%',
        marginHorizontal: '6%'
    },
    selectOptionsTitle: {
        fontFamily: 'nunito-bold',
        fontSize: 32,
        marginBottom: '6%'
    },
    selectOptionsCard: { 
        backgroundColor: 'white', 
        marginBottom: '10%',
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90
    },
    selectOptionsCardTitle: {
        fontFamily: 'nunito',
    },
    selectOptionsCardDescription: {
        fontFamily: 'nunito',
        color: Colors.LIGHT_GRAY,
    },
    continueButton: {
        padding: 15,
        backgroundColor: Colors.DARK_YELLOW,
        borderRadius: 30,
        marginLeft: '65%',
        marginRight: '6%',
    },
    continueButtonText: {
        textAlign: 'center',
        fontFamily: 'nunito-bold',
        color: Colors.DARK_GREEN
    }   
});