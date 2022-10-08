import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import styles from './Message.style';

const Message = ({message}) => {
  const userInRedux = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const date = new Date(message.date);
  const navigation = useNavigation();

  const getMinutes = () => {
    const min = date.getUTCMinutes();
    if(min < 10) { return "0".concat(min) }
    else { return min }
  };

  const gotoMap = () => {
    navigation.navigate('MapScreen', {message});
  }

  const renderSMSGBasedOnType = () => {
    if(message.type === 'text') {
      return  <View style={[styles.sendedMessage, {backgroundColor: theme.smsgDivColor}]}>
                <Text style={[styles.text, {color: theme.color}]}>{message.text}</Text>
                <Text style={[styles.date, {color: theme.color}]}>{date.getUTCHours()}:{getMinutes()}</Text>
              </View>
    }
    else if(message.type === 'location') {
      return  <Pressable style={[styles.sendedMessage, {backgroundColor: theme.smsgDivColor}]} onPress={gotoMap}>
                <MapView
                  style={styles.map}
                  initialRegion={{latitude: message.latitude, longitude: message.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}}
                  maxZoomLevel={16} minZoomLevel={16}
                  scrollEnabled={false} zoomTapEnabled={false}
                  >
                  <MapView.Marker
                    coordinate={{latitude: message.latitude, longitude: message.longitude}}
                  />
                </MapView>
                <Text style={[styles.date, {color: theme.color}]}>{date.getUTCHours()}:{getMinutes()}</Text>
              </Pressable>
    }
  };

  const renderRMSGBasedOnType = () => {
    if(message.type === 'text') {
      return  <View style={[styles.receivedMessage, {backgroundColor: theme.rmsgDivColor}]}>
                <Text style={[styles.text, {color: theme.color}]}>{message.text}</Text>
                <Text style={[styles.date, {color: theme.color}]}>{date.getUTCHours()}:{getMinutes()}</Text>
              </View>
    }
    else if(message.type === 'location') {
      return  <Pressable style={[styles.receivedMessage, {backgroundColor: theme.rmsgDivColor}]} onPress={gotoMap}>
                <MapView
                  style={styles.map}
                  initialRegion={{latitude: message.latitude, longitude: message.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}}
                  maxZoomLevel={16} minZoomLevel={16}
                  scrollEnabled={false} zoomTapEnabled={false}
                  >
                  <MapView.Marker
                    coordinate={{latitude: message.latitude, longitude: message.longitude}}
                  />
                </MapView>
                <Text style={[styles.date, {color: theme.color}]}>{date.getUTCHours()}:{getMinutes()}</Text>
              </Pressable>
    }
  };

  return (
    (message.senderID === userInRedux.user.phoneNumber) ? ( // If senderID of message is equal to user phone number, this message sended by user.
      renderSMSGBasedOnType()
    ) : ( // If senderID of message is not equal to user phone number, this message received by user.
      renderRMSGBasedOnType()
    )
  )
}

export default Message;
