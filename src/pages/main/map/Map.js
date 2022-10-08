import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import styles from './Map.style';

const Map = () => {
  const route = useRoute();
  const message = route.params.message;
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{latitude: message.latitude, longitude: message.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}}
        >
        <MapView.Marker
            coordinate={{latitude: message.latitude, longitude: message.longitude}}
        />
      </MapView>
      <Pressable style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </Pressable>
    </View>
  )
}

export default Map;
