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
  Button
} from 'react-native';
import ServiceList from './ServiceList';


export default function ({ navigation }) {

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const actions = [
    ["NASA", "space-station", "darkblue", ["Astronomy picture of the day is available"]],
    ["YouTube", "youtube", "#FF0000", ["A youtuber posts a new video"]],
    ["Weather", "weather-partly-rainy", "green", ["It starts raining", "The temperature drops below 0°c"]]
  ]

  const reactions = [
    ["Discord", "discord", "#5865F2", ["Send you a private message"]],
    ["Telegram", "message-processing", "#0088cc", ["Area's bot sends you a message"]],
    ["Twitter", "twitter", "#00acee", ["Tweet a message on your account"]],
  ]

  const [selectedAction, selectAction] = React.useState("");
  const [selectedReaction, selectReaction] = React.useState("");

  const [status, setStatus] = React.useState(false);

  function displayServices() {
    if (!status) {
      return ( <>
        <Text style={styles.subtitle}>Select an action</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {actions.map(item =>
            <ServiceList key={item} service={item[0]} icon={item[1]} colorOn={item[2]} items={item[3]} selected={selectedAction} select={selectAction} />
          )}
        </ScrollView>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.nextButton} onPress={() => {if(selectedAction) setStatus(!status); else ToastAndroid.show('Please select an action', ToastAndroid.SHORT);}}>
            <Text style={{color: "white"}}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </> );
    } else {
      return ( <>
        <Text style={styles.subtitle}>Select a reaction</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {reactions.map(item =>
            <ServiceList key={item} service={item[0]} icon={item[1]} colorOn={item[2]} items={item[3]} selected={selectedReaction} select={selectReaction} />
          )}
        </ScrollView>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {setStatus(!status); selectAction(""); selectReaction("")}}>
            <Text style={{color: "white"}}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={() => {if(selectedReaction) {setStatus(!status); navigation.navigate('Home'); selectAction(""); selectReaction("")} else ToastAndroid.show('Please select a reaction', ToastAndroid.SHORT);}}>
            <Text style={{color: "white"}}>CREATE</Text>
          </TouchableOpacity>
        </View>
      </> );
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#020410" />
      <Text style={styles.title}>NEW CARD</Text>

      {displayServices()}
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
    marginBottom: "2%"
  },

  buttonView: {
    marginBottom: "19%",
    flexDirection: "row", 
    justifyContent: 'space-between',
    height: "6%"
  },

  nextButton: {
    width: "35%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgreen"
  },

  cancelButton: {
    width: "35%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkred",
    marginRight: "3%"
  },

  createButton: {
    width: "35%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgreen",
    marginLeft: "3%"
  }
});
