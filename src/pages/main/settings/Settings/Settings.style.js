import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'space-evenly',
    },
    userArea: {
        height: Dimensions.get('window').height / 3.5,
        justifyContent: 'space-evenly',
    },
    profileImage: {
        width: Dimensions.get('screen').width / 2.5,
        height: Dimensions.get('screen').width / 2.5,
        borderRadius: Dimensions.get('screen').width / 5,
    },
    fullName: {
        maxWidth: Dimensions.get('screen').width / 1.25,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center',
    },
    buttonArea: {
        height: Dimensions.get('window').height / 2.8,
        justifyContent: 'space-evenly',
    },
    button: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width / 1,
        height: Dimensions.get('window').height / 10,
        backgroundColor: '#e9e9e9',
        alignItems: 'center',
        paddingLeft: '10%',
    },
    buttonText: {
        fontSize: 18,
        color: 'gray',
        marginLeft: '10%',
    },
    logOutBtn: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width / 1,
        height: Dimensions.get('window').height / 10,
        alignItems: 'center',
        paddingLeft: '10%',
        backgroundColor: '#ffdfd4'
    },
    logOutBtnText: {
        fontSize: 18,
        color: 'red',
        marginLeft: '10%',
    }
});
