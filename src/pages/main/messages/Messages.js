import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { Contacts } from '../../../components';
import { Entypo } from '@expo/vector-icons';
import styles from './Messages.style';

const Messages = () => {
  const navigation = useNavigation();
  const { theme } = useSelector(state => state.theme);
  const userInRedux = useSelector(state => state.user);
  const [ contacts, setContacts ] = useState([]);

  const phoneNumber = userInRedux.user.phoneNumber;
  // Get messages including user
  const _query = query(collection(db, 'messages'), where('users', 'array-contains', phoneNumber));

  const gotoContacts = () => {
    navigation.navigate('ContactListScreen');
  };

  // The goal of function is getting contacts from contact list in firebase who you messaging.
  const contactsDidYouMessage = async () => { 
    const querySnapshot = await getDocs(_query);
    const _usersPhoneNumbers = [];
    querySnapshot.forEach((doc) => {
      _usersPhoneNumbers.push(doc.data().users); // _usersPhoneNumbers = [[pn1,pn2],[pn1,pn2]...]
    });
    const usersPhoneNumbers = [];
    for(var i = 0; i < _usersPhoneNumbers.length; i++) {
      for(var j = 0; j < _usersPhoneNumbers[i].length; j++) {
        usersPhoneNumbers.push(_usersPhoneNumbers[i][j]); // usersPhoneNumbers = [pn1,pn2,pn1,pn3,pn2,pn1...]
      }
    }
    // Remove repeating phone numbers and user phone number from usersPhoneNumbers.
    // fUsersPhoneNumbers = [pn2,pn3...]
    const fUsersPhoneNumbers = usersPhoneNumbers.filter((pN, index) => {return usersPhoneNumbers.indexOf(pN) === index}).filter(pN => pN !== phoneNumber)
    
    const querySnapshot1 = await getDocs(collection(db, 'contacts'));
    const contactList = [];
    querySnapshot1.forEach((doc) => { 
      contactList.push(doc.data()); // Get contact list from firebase.
    })
    // Get contacts did user messaging and write to state.
    const _contacts = contactList.filter((contact) => {return fUsersPhoneNumbers.includes(contact.phoneNumber)})
    setContacts(_contacts);
  }

  useEffect(() => {
    contactsDidYouMessage()
  }, []);

  const renderContacts = ({item}) => <Contacts contact={item} />
  const separator = () => <View style={styles.separator}/>
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

      <FlatList
        data={contacts}
        renderItem={renderContacts}
        ItemSeparatorComponent={separator}
        ListFooterComponent={separator}
        style={styles.list}
      />

      <TouchableOpacity style={[styles.newMessage, {backgroundColor: theme.divColor}]} onPress={gotoContacts}>
        <Entypo name="new-message" size={28} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Messages;
