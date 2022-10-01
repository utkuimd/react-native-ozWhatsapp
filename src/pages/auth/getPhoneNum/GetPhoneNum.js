import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../utils/slices/userSlice';

import LimConCodes from '../../../LimConCodes.json';
import styles from './GetPhoneNum.style';

const GetPhoneNum = () => {
  const [selectedConCode, setSelectedConCode] = useState('+1');
  const [ phoneNumber, setPhoneNumber ] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInRedux = useSelector(state => state.user);

  const isOnlyNumberDash = (str) => {
    return /^[0-9-]*$/.test(str);
  };

  const goVerify = () => {
    if (phoneNumber !== '' && isOnlyNumberDash(phoneNumber) !== false) {
      const fullPN = selectedConCode.concat(" ",phoneNumber);
      Alert.alert(fullPN, `Do you confirm or do you want to edit your phone number?\n\nIf you press okey, you will direct to recapctha screens.`, [
        {
          text: 'Edit'
        },
        {}, // Add this invisible alert button for adding spaces between OK and Edit.
        {
          text: 'OK',
          onPress: () => {
            dispatch(updateUser({phoneNumber: fullPN}));
            console.log(JSON.stringify(userInRedux));
            navigation.navigate('VerifyScreen');
          }
        }
      ])
    } else {
      Alert.alert('Warning','You must enter your phone number and your phone number must be only numbers.');
      setPhoneNumber('');
    }
  };

  useEffect(() => { // For user experince, I want to add dashes between numbers.
    const phoneNumberC = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters.

    if(phoneNumberC.length > 0 && phoneNumberC.length <= 3) { // For 555, 55, 5
      const _phoneNumber = phoneNumberC.replace(/(\d{1})/, '$1'); // Result: 555, 55, 5
      setPhoneNumber(_phoneNumber);
    }
    else if(phoneNumberC.length > 3 && phoneNumberC.length < 7) { // For 5555, 55555, 555555
      const _phoneNumber = phoneNumberC.replace(/(\d{3})\-?(\d{1})/,'$1-$2'); // Result  555-5, 555-55, 555-555
      setPhoneNumber(_phoneNumber);
    }
    else if(phoneNumberC.length >= 7) { // For 5555555, ...
      const _phoneNumber = phoneNumberC.replace(/(\d{3})\-?(\d{3})\-?(\d{1})/,'$1-$2-$3'); // Result 555-555-5, ...
      setPhoneNumber(_phoneNumber);
    }

  }, [phoneNumber]);

  const goUserInfo = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground style={styles.container} source={{uri: 'https://img.freepik.com/free-vector/white-gray-geometric-pattern-background_53876-115288.jpg?w=360'}}>
      
      <View style={styles.allAreas}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Enter your phone number</Text>
          <Text style={styles.desciption}>ozWhatsapp will send you a message for verify your phone number</Text>
        </View>
        
        <View>
          <View style={styles.pickerArea}>
            <Picker
              style={styles.picker}
              selectedValue={selectedConCode}
              dropdownIconColor='red' // Only for Android
              onValueChange={(itemValue) =>
                setSelectedConCode(itemValue)}>
              {LimConCodes.map(country => (
                <Picker.Item 
                  key={country.code}
                  label={country.name}
                  value={country.dial_code}
                />
              ))}
            </Picker>
            <View style={styles.pickerUnderline}/>
          </View>

          <View style={styles.getPhoneNumArea}>
            <View style={styles.showDialCode}>
              <Text style={styles.dialCode}>{selectedConCode}</Text>
              <View style={styles.underline}/>
            </View>

            <View style={styles.getPhoneNum}>
              <TextInput 
                style={styles.inputPhoneNum}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                maxLength={14} // China use 12 number for phone number "12 + 2(dashes) = 14"
                placeholder='your phone number'
                placeholderTextColor='#d3d3d3'
                textAlign='center'
                multiline={true} // I use this property because when user clear input textInput cursor should be center, not should be right.
              />
              <View style={styles.underline}/>
            </View>
          </View>
        </View>

        <Text style={styles.goUserInfo} onPress={goUserInfo}>I want to edit my name or profile image again.</Text>
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={goVerify}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}

export default GetPhoneNum;
