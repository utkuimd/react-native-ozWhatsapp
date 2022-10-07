import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    sendingArea: {
        width: Dimensions.get('screen').width / 1,
        height: Dimensions.get('window').height / 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
      },
      sendMessage: {
        flex: 1,
        height: '70%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginHorizontal: 15,
      },
      textInput: {
        maxWidth: '80%',
        fontSize: 16
      },
})