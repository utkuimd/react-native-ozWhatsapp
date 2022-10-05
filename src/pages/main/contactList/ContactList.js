import React, { useEffect } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../utils/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { setContactList } from '../../../utils/slices/contactListSlice';

import { Contacts } from '../../../components';
import styles from './ContactList.style';

const ContactList = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contactList);
  const { theme } = useSelector(state => state.theme);

  const getContactsList = async () => {
    const querySnapshot = await getDocs(collection(db, 'contacts')); // Get documents from firestore collection which named 'contacts'.
    const _contactList = []; // Create empty array.
    querySnapshot.forEach((contact) => { 
      _contactList.push(contact.data()); // Push every document(contact) to empty array.
    })
    dispatch(setContactList(_contactList)); // Write this array to redux(contactList).
  };

  useEffect(() => {
    getContactsList(); // When this page first loaded, take contact list from firestore.
    console.log('Contact list taken');
  }, []);

  const show = () => {
    console.log(JSON.stringify(contactList));
  };

  const renderContacts = ({item}) => <Contacts contact={item}/>

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text onPress={show}>SHOW CONTACT LIST IN REDUX</Text>
      <FlatList
        data={contactList.contactList}
        renderItem={renderContacts}
      />
    </SafeAreaView>
  )
}

export default ContactList;
