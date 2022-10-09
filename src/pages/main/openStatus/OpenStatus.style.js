import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButton: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'orange',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 30,
        left: 15
    },
    image: {
        width: Dimensions.get('screen').width / 1,  // Image aspect: [1, 1]
        height: Dimensions.get('screen').width / 1, // Image aspect: [1, 1]
    }
})