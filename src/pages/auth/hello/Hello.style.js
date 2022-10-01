import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: 'orange',
        maxWidth: '80%',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 16,
    },
    image: {
        width: Dimensions.get('screen').width / 2,
        height: Dimensions.get('screen').width / 2,
        borderRadius: Dimensions.get('screen').width / 4,
        opacity: 0.8,
    },
    continueBtn: {
        width: '80%',
        height: '8%',
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    continueText: {
        color: 'white',
        fontSize: 18,
    },
    developer: {
        width: '80%',
        alignItems: 'center',
    },
    devText: {
        color: 'orange',
        fontSize: 24,
        fontStyle: 'italic',
    }
});
