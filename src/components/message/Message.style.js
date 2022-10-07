import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    sendedMessage: {
        maxWidth: Dimensions.get('screen').width / 1.4,
        paddingVertical: 7,
        paddingHorizontal: 14,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'flex-end'
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
    sDate: {
        fontSize: 13,
        alignSelf: 'flex-end',
    },
    rDate: {
        fontSize: 13,
        alignSelf: 'flex-start',
    }
})