import React  from "react";
import { Text ,View, StyleSheet, TouchableOpacity, Switch, ActivityIndicator, ToastAndroid } from 'react-native';
import {Card, Button, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import SyncStorage from 'sync-storage';
  
const CreateCard = ({ updateScreen, _id, status,
    action_name, action_logo, action_color, action,
    reaction_name, reaction_logo, reaction_color, reaction
  }) => {
    console.log(status);
  const [isSwitchOn, setIsSwitchOn] = React.useState(status);
  const [isLoading, setIsLoading] = React.useState(false);

  const id = _id;
  const [action_data, setActionData] = React.useState({});
  const [reaction_data, setReactionData] = React.useState({});

  const getText = () => {
    if (isSwitchOn)
      return "Card is enabled";
    else
      return "Card is disabled";
  }

  const title = action_name + " to " + reaction_name;

  const deleteArea = async () => {
    await axios({
      method: 'delete',
      url: "http://" + SyncStorage.get("ip") + ":8080/api/area/delete",
      data: {
        "username": SyncStorage.get("username"),
        "_id": id
      }
    }).then((response) => {
      console.log("deleteArea response:\n", response.data);
      ToastAndroid.show('Card deleted', ToastAndroid.SHORT);
    }).catch((err) => {
      console.log("ERROR:", err);
    });
    updateScreen();
  };

  const enableArea = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: "http://" + SyncStorage.get("ip") + ":8080/api/area/update",
      data: {
        "username": SyncStorage.get("username"),
        "_id": id,
        "status": !isSwitchOn
      }
    }).then((response) => {
      console.log("enableArea response:\n", response.data);
      if (response.data.success === true)
        setIsSwitchOn(!isSwitchOn);
    }).catch((err) => {
      console.log("ERROR:", err);
    });
    setIsLoading(false);
    updateScreen();
  };

  console.log("jtrhegqrhtjdhrs", action_name);
      
  return(
    <Card style={styles.container}>
      <Card.Content style={{paddingBottom:'2%'}} alignItems="center" alignContent="center">
        <Title style={{color: 'white'}}>{title}</Title>
      </Card.Content>
      <View style={{flexDirection: "row", justifyContent: 'space-between', margin: "5%"}}>
        <Icon name={action_logo} size={120} color={action_color}/>
        <Icon name={reaction_logo} size={120} color={reaction_color}/>
      </View>
      <Card.Content>
        <View style={{flexDirection: "row", justifyContent: 'space-around', width: "100%"}}>
          <Paragraph style={{color: 'white', marginRight: "10%", width: "40%", textAlign: 'center'}}>{action}</Paragraph>
        <Paragraph style={{color: 'white', marginLeft: "10%",  width: "40%", textAlign: 'center'}}>{reaction}</Paragraph>
        </View>
      </Card.Content>
        <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteArea}>
          <Icon name="delete" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={{color: "white", alignItems: "center"}}>{getText()}</Text>
        {isLoading ? <ActivityIndicator style={styles.switchButton} size="large" color="grey" onTouchStart={() => setIsLoading(!isLoading)}/>
        :
          <Switch style={styles.switchButton} trackColor={{ false: "grey", true: "#3A4065" }} thumbColor={isSwitchOn ? "#3A4065" : "darkgrey"} value={isSwitchOn} onValueChange={enableArea}/>
        }
        </View>
    </Card>
  )
}

  
const styles = StyleSheet.create({
  container :{
    alignContent:'center',
    margin:"8%",
    borderRadius: 25,
    backgroundColor: "#191D32",
  },

  cover :{
    flexDirection: 'column',
    height:'48%',
  },

  buttonsView: {
    flexDirection: "row", 
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    height: "20%",
    marginTop: "2%",
  },

  deleteButton: {
    width: "15%",
    height: "70%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkred",
    marginLeft: "5%",
  },

  switchButton: {
    width: "15%",
    height: "60%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5%"
  }
});

export default CreateCard;
