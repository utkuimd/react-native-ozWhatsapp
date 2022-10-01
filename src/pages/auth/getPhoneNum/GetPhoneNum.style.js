import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    allAreas: {
        height: Dimensions.get('window').height / 2.5,
        justifyContent: 'space-evenly',
    },
    titleArea: {
        maxWidth: Dimensions.get('screen').width / 1.25,
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        color: 'orange',
        marginBottom: 7,
        fontWeight: 'bold',
    },
    desciption: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
    },
    pickerArea: {
        width: Dimensions.get('screen').width / 1.25,
        alignItems: 'center',
    },
    picker: {
        width: '80%',
        color: 'red'
    },
    pickerUnderline: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'orange',
        bottom: '15%'
    },
    getPhoneNumArea: {
        width: Dimensions.get('screen').width / 1.25,
        height: Dimensions.get('window').height / 12.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    showDialCode: {
        width: '25%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    dialCode: {
        fontSize: 20,
        marginBottom: 1.5,
    },
    underline: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'orange',
    },
    getPhoneNum: {
        width: '65%',
        height: '70%',
        justifyContent: 'flex-end',
    },
    inputPhoneNum: {
        width: '90%',
        fontSize: 20,
        marginLeft: 3,
        marginBottom: 1,
        alignSelf: 'center',
    },
    goUserInfo: {
        fontSize: 16,
        color: '#1e90ff',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    continueBtn: {
        width: Dimensions.get('screen').width / 2,
        height: Dimensions.get('window').height / 16,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    continueText: {
        color: 'white',
        fontSize: 18,
    },
})