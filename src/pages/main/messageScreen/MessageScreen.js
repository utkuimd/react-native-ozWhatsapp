import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../../../utils/slices/messagesSlice';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { db } from '../../../utils/firebase';
import { Message } from '../../../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import styles from './MessageScreen.style';

const MessageScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const chosenUser = useSelector(state => state.chosenContact);
  const messages = useSelector(state => state.messages);
  const { theme } = useSelector(state => state.theme);
  const [ messageText, setMessageText ] = useState('');

  const phoneNumberS = user.user.phoneNumber;
  const phoneNumberR = chosenUser.chosenContact.phoneNumber;
  // Get messages between these two users and order messages by creation date.
  const q = query(collection(db, "messages"), where("users", "in", [[phoneNumberS, phoneNumberR], [phoneNumberR, phoneNumberS]]), orderBy("date", "asc") );

  const sendMessage = async () => {
    setMessageText('');
    await addDoc(collection(db, "messages"), { // Add message to "messages" collection.
      type: 'text',
      text: messageText,
      senderID: phoneNumberS,
      receiverID: phoneNumberR,
      date: serverTimestamp(),
      users: [phoneNumberS, phoneNumberR]
    });
    console.log('sending message is success');
    getAllMessages(); // After sending message, you can see your message on the screen immediately through calling this function.
  };

  const getAllMessages = async () => {
    const querySnapshot = await getDocs(q); // Get all messages that matching query above.
    const _messages = [];
    querySnapshot.forEach((message) => {
      // Change type of message date Timestamp to JS Date object.
      const ts = new Timestamp(message.data().date.seconds, message.data().date.nanoseconds).toDate();
      // Convert this date to turkish standard time(GMT+0300) manually and change this date type to string for be able to write in redux.
      const date = new Date(ts.getUTCFullYear(), ts.getUTCMonth(), ts.getUTCDate(), ts.getUTCHours() + 3, ts.getUTCMinutes(), ts.getUTCSeconds()).toISOString();
      const neededData = {
        type: message.data().type,
        text: message.data().text,
        senderID: message.data().senderID,
        receiverID: message.data().receiverID,
        date: date
      };
      _messages.push(neededData); // Push the data we need into the empty array.
    });
    dispatch(setMessages(_messages)); // Write all data into the array to redux. 
    console.log('getting all messages is success')
  };

  const show = () => {
    console.log('-------------------------------------------------------------------');
    console.log(JSON.stringify(messages));
  };

  useEffect(() => {
    getAllMessages()
  }, []);

  const renderMessages = ({item}) => <Message message={item} /> // Send messages to message component for better rendering.

  return (
    <ImageBackground style={styles.container} source={{uri: theme.backgroundImage}}>

      <Text onPress={show}>SHOW ALL MESSAGE FROM REDUX</Text>

      <FlatList 
        data={messages.messages}
        renderItem={renderMessages}
      />

      <View style={[styles.sendingArea, {backgroundColor: theme.headerColor}]}>
        <MaterialCommunityIcons name="map-marker-radius-outline" size={30} color="#949494" />
        <View style={[styles.sendMessage, {backgroundColor: theme.textInputColor}]}>
          <TextInput
            style={[styles.textInput, {color: theme.color}]}
            placeholder="Message"
            placeholderTextColor="#949494"
            value={messageText}
            onChangeText={setMessageText}
          />
          <AntDesign name="paperclip" size={30} color="#949494" />
        </View>
        <MaterialCommunityIcons
          name="send"
          size={30}
          color="#949494"
          onPress={messageText !== '' ? sendMessage : null}
          style={messageText !== '' ? {opacity: 1} : {opacity: 0.2}}
        />
      </View>

    </ImageBackground>
  )
}

export default MessageScreen;
