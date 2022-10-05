import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    newMessage: {
        width: Dimensions.get('screen').width / 5,
        height: Dimensions.get('screen').width / 5,
        borderRadius: Dimensions.get('screen').width / 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: '80%',
        left: '75%'
    }
})