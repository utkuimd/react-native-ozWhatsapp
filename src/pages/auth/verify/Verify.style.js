import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleArea: {
        width: Dimensions.get('screen').width / 1.1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: 'orange',
    },
    desciption: {
        fontSize: 17,
        textAlign: 'center',
        marginVertical: 5,
    },
    wrongNumber: {
        color: '#1e90ff',
    },
    body: {
        alignItems: 'center',
        height: Dimensions.get('window').height / 3.5,
        justifyContent: 'space-around',
    },
    enterVerCodeArea: {
        width: Dimensions.get('screen').width / 1.66,
        alignItems: 'center',
    },
    inputVerCode: {
        fontSize: 22,
        marginVertical: 7,
        textAlign: 'center',
    },
    underline: {
        borderWidth: 1.5,
        borderColor: 'orange',
        width: '50%',
    },
    warning: {
        color: '#bdbebd',
        fontSize: 16,
        marginVertical: 3,
    },
    sendAgain: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width / 1.25,
        height: Dimensions.get('window').height / 10,
        alignItems: 'center',
    },
    sendText: {
        color: '#bdbebd',
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 20,
    },
})