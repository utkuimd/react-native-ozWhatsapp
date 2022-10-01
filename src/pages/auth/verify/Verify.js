import React, { useEffect, useState, useRef} from 'react';
import { ImageBackground, View, Text, Alert, Button, TextInput, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';
import { auth } from '../../../utils/firebase';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

import { AntDesign } from '@expo/vector-icons';
import styles from './Verify.style';

const app = getApp();

const Verify = () => {

  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const navigation = useNavigation();
  const userInRedux = useSelector(state => state.user);

  const phoneNumber = userInRedux.user.phoneNumber;
  const firebaseConfig = app ? app.options : undefined;

  const sendVerifyCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const _verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(_verificationId);
      console.log(_verificationId);
    } catch (err) {
      Alert.alert('Error', err.message);
    };
  };

  const confirmVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      console.log('Sign In Success! :)');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    sendVerifyCode()
  }, []);

  /*useEffect(() => {
    // This code can be use for preventing user go back.
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);*/

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground style={styles.container} source={{uri: 'https://img.freepik.com/free-vector/white-gray-geometric-pattern-background_53876-115288.jpg?w=360'}}>
      
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={false}
      />

      <View style={styles.titleArea}>
        <Text style={styles.title}>Verifying {phoneNumber}</Text>
        <Text style={styles.desciption}>We are trying to sent verification code to {phoneNumber}. <Text onPress={goBack} style={styles.wrongNumber}>This number is wrong?</Text></Text>
      </View>
      
      <View style={styles.body}>
        <View style={styles.enterVerCodeArea}>
          <TextInput
            placeholder="- - -  - - - "
            placeholderTextColor={"#bdbebd"}
            onChangeText={setVerificationCode}
            editable={!!verificationId}
            style={styles.inputVerCode}
            maxLength={6}
          />
          <View style={styles.underline}/>
          <Text style={styles.warning}>Please enter 6-digit code.</Text>
        </View>

        <Button
          title="Confirm Verification Code"
          onPress={confirmVerifyCode}
          disabled={!verificationId}
          color="orange"
        />

        <TouchableOpacity onPress={sendVerifyCode} style={styles.sendAgain}>
          <AntDesign name="message1" size={30} color="#bdbebd" />
          <Text style={styles.sendText}>Send SMS again</Text>
        </TouchableOpacity>
      </View>

      <FirebaseRecaptchaBanner />

    </ImageBackground>
  )
}

export default Verify;
