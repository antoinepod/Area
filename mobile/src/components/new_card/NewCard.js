import React, {Node, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import ServiceList from './ServiceList';


export default function ({ navigation }) {

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const youtubeItems = [
    "A youtuber posts a new video",
    "A comment is posted on a video",
    "A youtuber goes live",
    "You have a new follower"
  ]
  
  const weatherItems = [
    "It is raining",
    "The temperature drops below ...°c",
    "The temperature goes above ...°c"
  ]

  const teamsItems = [
    "A new message is posted in a channel",
    "A new message is posted in a chat"
  ]

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#020410" />

      <Text style={styles.title}>NEW CARD</Text>
      <Text style={styles.subtitle}>Select an action</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <ServiceList service="YouTube" icon="youtube" colorOn='#FF0000' items={youtubeItems} />
        <ServiceList service="Weather" icon="weather-partly-rainy" colorOn='green' items={weatherItems} />
        <ServiceList service="Microsoft Teams" icon="microsoft-teams" colorOn='#7B83EB' items={teamsItems} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#020410"
  },

  title: {
    marginTop: "20%",
    fontSize: 50,
    color: "#3A4065",
    fontWeight: "bold"
  },

  subtitle: {
    marginTop: "10%",
    marginBottom: "10%",
    fontSize: 30,
    color: "#3A4065"
  },

  scrollView: {
    width: "92%",
    marginBottom: "18%"
  },
});
