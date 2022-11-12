import React  from "react";
import { Text ,View, StyleSheet, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import {Card, Button, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  
const CreateCard = ({ action_name, reaction_name, action_description, reaction_description }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const getText = () => {
    if (isSwitchOn)
      return "Card is enabled";
    else
      return "Card is disabled";
  }

  const title = action_name + " to " + reaction_name;

  const deleteArea = () => {
    console.log('Deleting ' + title);
  };

  const enableArea = () => {
    setIsLoading(!isLoading);
    setIsSwitchOn(!isSwitchOn);
  };

  const loading = () => {
    if (isLoading)
      return <ActivityIndicator style={styles.switchButton} size="large" color="grey" onTouchStart={() => setIsLoading(!isLoading)}/>
    else
      return <Switch style={styles.switchButton} trackColor={{ false: "grey", true: "#3A4065" }} thumbColor={isSwitchOn ? "#3A4065" : "darkgrey"} value={isSwitchOn} onValueChange={enableArea}/>
  };
      
  return(
    <Card style={styles.container}>
      <Card.Content style={{paddingBottom:'2%'}} alignItems="center" alignContent="center">
        <Title style={{color: 'white'}}>{title}</Title>
      </Card.Content>
      <View style={{flexDirection: "row", justifyContent: 'space-between', margin: "5%"}}>
        <Icon name="youtube" size={120} color="#FF0000"/>
        <Icon name="message-processing" size={120} color="#0088cc"/>
      </View>
      <Card.Content>
        <View style={{flexDirection: "row", justifyContent: 'space-around', width: "100%"}}>
          <Paragraph style={{color: 'white', marginRight: "10%", width: "40%", textAlign: 'center'}}>{action_description}</Paragraph>
        <Paragraph style={{color: 'white', marginLeft: "10%",  width: "40%", textAlign: 'center'}}>{reaction_description}</Paragraph>
        </View>
      </Card.Content>
        <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteArea}>
          <Icon name="delete" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={{color: "white", alignItems: "center"}}>{getText()}</Text>
        {loading()}
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
