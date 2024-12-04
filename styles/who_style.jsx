import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.AVOCADO_GREEN,
    },
    returnButton: {
        position: 'absolute',
        marginTop: '20%',
        marginLeft: '6%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 99
    },
    selectOptionsContainer: {
        marginTop: '45%',
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
        alignItems: 'center'
    },
    selectOptionsCardTitle: {
        fontFamily: 'nunito',
    },
    selectOptionsCardDescription: {
        fontFamily: 'nunito',
        color: Colors.LIGHT_GRAY,
    }
});