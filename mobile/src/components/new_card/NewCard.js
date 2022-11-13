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
  Button,
  Linking
} from 'react-native';
import ServiceList from './ServiceList';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import Dialog from "react-native-dialog";



export default function ({ navigation }) {

  const [expanded, setExpanded] = React.useState(true);
  const [visibleData, setVisibleData] = React.useState(false);
  const [tmpData, setTmpData] = React.useState(false);

  const [requiredData, setRequiredData] = React.useState("");
  const [actionData, setActionData] = React.useState("");
  const [reactionData, setReactionData] = React.useState("");


  const handlePress = () => setExpanded(!expanded);

  const actions = [
    ["F1", "racing-helmet", "#FF1801", ["Get last race results", "Get last qualifying results"]],
    ["NASA", "space-station", "navy", ["Astronomy picture of the day is available"]],
    ["Weather", "weather-partly-rainy", "green", ["It starts/stops freezing", "It starts/stops raining", "The wind exceeds/drops below 80 km/h", "The sun rises/sets"]],
    ["YouTube", "youtube", "#FF0000", ["A youtuber posts a new video"]]
  ]

  const reactions = [
    ["Discord", "discord", "#5865F2", ["Send a message in the general channel with your @", "Send a message in the general channel and ping everyone", "Send you a private message"]],
    ["Telegram", "message-processing", "#0088cc", ["Area's bot sends you a message"]],
    // ["Twitter", "twitter", "#00acee", ["Tweet a message with your @", "Send you a direct message"]],
  ]

  const [selectedAction, selectAction] = React.useState("");
  const [selectedReaction, selectReaction] = React.useState("");
  const [neededUrl, setNeededUrl] = React.useState(" ");

  const [status, setStatus] = React.useState(false);

  React.useEffect(() => {
    if (!status) {
      if (actions[2][3].includes(selectedAction))
        setRequiredData("Please provide us the city you want to get the weather from.");
      if (actions[3][3].includes(selectedAction))
        setRequiredData("Please provide us the youtuber channel address you want to get the new videos from.");
    } else {
      if (reactions[0][3].includes(selectedReaction)) {
        setRequiredData("Please provide us your Discord user id\n\nJoin our Discord server\n'https://discord.com/invite/mrMZDDQkxA'\nand type '/getmyid' to receive a private message from our bot with your id.");
        setNeededUrl("https://discord.com/invite/mrMZDDQkxA");
      } if (reactions[1][3].includes(selectedReaction)) {
        setRequiredData("Please provide us your Telegram user id\n\nSend a message to our bot\n'https://t.me/area_t3l3gr4m_bot'\nand type '/getmyid' to receive a message from our bot with your id.");
        setNeededUrl("https://t.me/area_t3l3gr4m_bot");
      }
    }
  }), [visibleData];

  const handleDataOk = () => {
    if (!status) {
      setActionData(tmpData);
      setTmpData("");
    } else {
      setReactionData(tmpData);
      setTmpData("");
    }
    setVisibleData(false);
  };

  const handleNext  = () => {
    if (selectedAction) {
      if (actionData === "" && (actions[2][3].includes(selectedAction) || actions[3][3].includes(selectedAction)))
        setVisibleData(true);
      else
        setStatus(true);
    } else
      ToastAndroid.show('Please select an action', ToastAndroid.SHORT);
  };

  const handleCancel = () => {
    setStatus(false);
    selectAction("");
    selectReaction("");
    setActionData("");
    setReactionData("");
    setTmpData("");
  };

  const handleCreate = async () => {
    if (!selectedReaction)
      return ToastAndroid.show('Please select a reaction', ToastAndroid.SHORT);
    else if (reactionData === "" && (reactions[0][3].includes(selectedReaction) || reactions[1][3].includes(selectedReaction)))
      setVisibleData(true);
    else {
      await axios({
        method: 'post',
        url: "http://" + SyncStorage.get("ip") + ":8080/api/area/create",
        data: {
          "username": SyncStorage.get("username"),
          "action": selectedAction,
          "action_data": actionData,
          "reaction": selectedReaction,
          "reaction_data": reactionData
        }
      }).then(() => {
        ToastAndroid.show('Card created !', ToastAndroid.SHORT);
        setStatus(false);
        navigation.navigate('Home');
        selectAction("");
        selectReaction("");
        setActionData("");
        setReactionData("");
      }).catch((err) => {
        ToastAndroid.show('Error while creating area', ToastAndroid.SHORT);
        console.log(err);
      });
    }
  };

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
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={{color: "white"}}>NEXT</Text>
          </TouchableOpacity>
        </View>

        <Dialog.Container visible={visibleData} onRequestClose={() => setVisibleData(false)}>
            <Dialog.Title>{requiredData}</Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <Dialog.Input onChangeText={(tmpData) => setTmpData(tmpData)}/>
            <Dialog.Button label="OK" onPress={handleDataOk} color='green' />
          </Dialog.Container>
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
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={{color: "white"}}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={{color: "white"}}>CREATE</Text>
          </TouchableOpacity>

          <Dialog.Container visible={visibleData} onRequestClose={() => setVisibleData(false)}>
            <Dialog.Title onPress={() => {if(visibleData) Linking.openURL(neededUrl)}}>{requiredData + "\n\n(You can click on the text to open the url)"}</Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <Dialog.Input onChangeText={(tmpData) => setTmpData(tmpData)}/>
            <Dialog.Button label="OK" onPress={handleDataOk} color='green' />
          </Dialog.Container>
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
