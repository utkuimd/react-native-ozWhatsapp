import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    userDetailsArea: {
        height: Dimensions.get('window').height / 3,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profileImage: {
        width: Dimensions.get('screen').width / 2.5,
        height: Dimensions.get('screen').width / 2.5,
        borderRadius: Dimensions.get('screen').width / 5,
    },
    getFullNameArea: {
        width: Dimensions.get('screen').width / 1.4,
    },
    getFullName: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    fullName: {
        width: '90%',
        fontSize: 20,
    },
    remainLetter: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    underline: {
        borderWidth: 1.5,
        borderColor: 'orange',
    },
    buttonsArea: {
        height: Dimensions.get('window').height / 6,
        justifyContent: 'space-between',
    },
    saveChangesBtn: {
        width: Dimensions.get('screen').width / 1.4,
        height: Dimensions.get('window').height / 16,
        backgroundColor: 'orange',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveChangesText: {
        color: 'white',
        fontSize: 18,
    },
    dontSaveBtn: {
        width: Dimensions.get('screen').width / 1.4,
        height: Dimensions.get('window').height / 16,
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dontSaveText: {
        fontSize: 18,
    },

})