import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    image: {
        width: Dimensions.get('screen').width / 8,
        height: Dimensions.get('screen').width / 8,
        borderRadius: Dimensions.get('screen').width / 16,
    },
    details: {
        flex: 1,
        marginLeft: 15,
    },
    pN: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    about: {
        color: 'gray',
    },
})