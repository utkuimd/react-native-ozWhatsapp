import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loadingScreen: {
        backgroundColor: '#e9e9e9',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingScreenDiv: {
        maxWidth: '60%',
        alignItems: 'center',
    },
    loadingScreenText: {
        fontSize: 28,
        color: 'black',
        fontStyle: 'italic',
        marginBottom: 10,
    }
})