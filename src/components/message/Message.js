import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './Message.style';

const Message = ({message}) => {
  const userInRedux = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const date = new Date(message.date);

  return (
    (message.senderID === userInRedux.user.phoneNumber) ? ( // If senderID of message is equal to user phone number, this message sended by user.

      <View style={[styles.sendedMessage, {backgroundColor: theme.smsgDivColor}]}>
        <Text style={[styles.text, {color: theme.color}]}>{message.text}</Text>
        <Text style={[styles.sDate, {color: theme.color}]}>{date.getUTCHours()}:{date.getUTCMinutes()}</Text>
      </View>

    ) : ( // If senderID of message is not equal to user phone number, this message received by user.

      <View style={[styles.receivedMessage, {backgroundColor: theme.rmsgDivColor}]}>
        <Text style={[styles.text, {color: theme.color}]}>{message.text}</Text>
        <Text style={[styles.rDate, {color: theme.color}]}>{date.getUTCHours()}:{date.getUTCMinutes()}</Text>
      </View>

    )
  )
}

export default Message;
