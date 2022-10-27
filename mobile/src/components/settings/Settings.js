import React, {Node, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import { FAB } from "react-native-paper";


export default function ({ navigation }) { 

  const handleLogout = () => {
    navigation.navigate("Login")
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#020410" />
      <Image style={styles.image} source={require("../../../assets/area_logo.png")} />
      <Text style={styles.title}> Settings </Text>
      <FAB
        icon="logout"
        label="LOG OUT"
        style={styles.fab}
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#020410",
  },

  image: {
    width: "70%",
    marginTop: "5%",
    resizeMode: 'contain',
  },

  title: {
    fontSize: 35,
    color: "#3A4065",
    fontWeight: "bold"
  },

  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    margin: 10,
    marginTop: 100,
  },

  logoutText: {
    color: "yellow"
  },

  fab: {
    position: 'absolute',
    right: "5%",
    bottom: "10%",
    backgroundColor: 'darkred'
  }
});