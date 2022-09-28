import React, { useState } from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import LimConCodes from '../../../LimConCodes.json';
import styles from './GetPhoneNum.style';

const GetPhoneNum = () => {
  const navigation = useNavigation();
  const [selectedConCode, setSelectedConCode] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');

  const goBack = () => {
      navigation.goBack();
  };

  const isOnlyNumber = (str) => {
    return /^[0-9]*$/.test(str);
  };

  const goVerify = () => {
    if (isOnlyNumber(phoneNumber) === false) {
      Alert.alert('Phone numbers must be only numbers!');
      setPhoneNumber('');
    } else {
      const fullPN = selectedConCode.concat(phoneNumber);
      navigation.navigate('VerifyScreen', { phoneNumber: fullPN });
      setPhoneNumber('');
      setSelectedConCode('');
    }
  };

  return (
    <ImageBackground style={styles.container} source={{uri: 'https://img.freepik.com/free-vector/white-gray-geometric-pattern-background_53876-115288.jpg?w=360'}}>
      <View>
        <View style={styles.titleArea}>
          <Text style={styles.title} onPress={goBack}>Enter your phone number</Text>
          <Text style={styles.desciption}>ozWhatsapp will send you a message for verify your phone number</Text>
        </View>
        
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
              style={styles.phoneNum}
              keyboardType='numeric'
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              maxLength={12} // China use 12 number for phone number
              placeholder='your phone number'
              placeholderTextColor='#d3d3d3'
            />
            <View style={styles.underline}/>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={goVerify}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default GetPhoneNum;
