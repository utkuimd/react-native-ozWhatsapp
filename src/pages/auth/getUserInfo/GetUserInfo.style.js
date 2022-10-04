import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    allAreas: {
        alignItems: 'center',
        height: Dimensions.get('window').height / 2,
        justifyContent: 'space-evenly',
    },
    titleArea: {
        width: Dimensions.get('screen').width / 1.25,
        alignItems: 'center',
    },
    title: {
        color: 'orange',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    desciption: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center'
    },
    chooseArea: {
        width: Dimensions.get('screen').width / 2,
        height: Dimensions.get('screen').width / 2,
        borderRadius: Dimensions.get('screen').width / 4,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addProfileImage: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },
    profileImage: {
        width: Dimensions.get('screen').width / 2.2,
        height: Dimensions.get('screen').width / 2.2,
        borderRadius: Dimensions.get('screen').width / 4.4,
    },
    getFullNameArea: {
        width: Dimensions.get('screen').width / 1.25,
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