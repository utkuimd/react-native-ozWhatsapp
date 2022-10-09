import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingVertical: 10
    },
    statusPreview: {
        width: Dimensions.get('screen').width / 5,
        height: Dimensions.get('screen').width / 5,
        borderRadius: Dimensions.get('screen').width / 10,
        marginRight: '5%'
    },
    senderID: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        color: 'gray',
        fontStyle: 'italic'
    }
})