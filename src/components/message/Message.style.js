import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    sendedMessage: {
        maxWidth: Dimensions.get('screen').width / 1.4,
        paddingVertical: 7,
        paddingHorizontal: 14,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'flex-end',
    },
    receivedMessage:{
        maxWidth: Dimensions.get('screen').width / 1.4,
        paddingVertical: 7,
        paddingHorizontal: 14,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 18
    },
    date: {
        fontSize: 13,
        alignSelf: 'flex-end',
    },
    map: {
        width: Dimensions.get('screen').width / 2,
        height: Dimensions.get('window').height / 5,
        marginBottom: 4,
    },
})