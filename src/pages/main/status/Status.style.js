import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    addStatusBtn: {
        width: Dimensions.get('screen').width / 1,
        height: Dimensions.get('window').height / 6,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    addStatusIcon: {
        width: Dimensions.get('screen').width / 5,
        height: Dimensions.get('screen').width / 5,
        borderRadius: Dimensions.get('screen').width / 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '5%'
    },
    myStatus: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    tapToAdd: {
        color: 'gray',
    },
    separatorHeader: {
        flex: 1,
        borderWidth: 2,
    }
})