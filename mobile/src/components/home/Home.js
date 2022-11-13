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
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Switch } from 'react-native-paper';
import CreateCard from './Cards';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

var servicesMap = new Map();

servicesMap.set("Get last race results", ["F1", "racing-helmet", "#FF1801"]);
servicesMap.set("Get last qualifying results", ["F1", "racing-helmet", "#FF1801"]);
servicesMap.set("Astronomy picture of the day is available", ["NASA", "space-station", "navy"]);
servicesMap.set("It starts/stops freezing", ["Weather", "weather-partly-rainy", "green"]);
servicesMap.set("It starts/stops raining", ["Weather", "weather-partly-rainy", "green"]);
servicesMap.set("The wind exceeds/drops below 80 km/h", ["Weather", "weather-partly-rainy", "green"]);
servicesMap.set("The sun rises/sets", ["Weather", "weather-partly-rainy", "green"]);
servicesMap.set("A youtuber posts a new video", ["YouTube", "youtube", "#FF0000"]);

servicesMap.set("Send a message in the general channel with your @", ["Discord", "discord", "#5865F2"]);
servicesMap.set("Send a message in the general channel and ping everyone", ["Discord", "discord", "#5865F2"]);
servicesMap.set("Send you a private message", ["Discord", "discord", "#5865F2"]);
servicesMap.set("Area's bot sends you a message", ["Telegram", "message-processing", "#0088cc"]);

export default function ({ navigation }) {

  const {width} = useWindowDimensions();
  const [loaded, setLoaded] = useState(false);
  const [areas, setAreas] = useState([]);

  const isFocused = useIsFocused();
  const [update_screen, setUpdateScreen] = useState(false);

  const updateScreen = () => {
    setUpdateScreen(!update_screen);
  };


  React.useEffect(() => {
    var aaa = JSON.stringify({"username":"Front"});
    async function fetchData() {
    var tmp_areas = [];

      await axios({
        method: 'post',
        url: "http://" + SyncStorage.get("ip") + ":8080/api/area/get",
        data: { "username": SyncStorage.get("username") }
      }).then((response) => {
        console.log("getAreas response:\n", response.data);
        if (response.data.success === true)
          for (var i = 0; i < response.data.areas.length; i++) {
            const tmp_action = servicesMap.get(response.data.areas[i].action);
            const tmp_reaction = servicesMap.get(response.data.areas[i].reaction);
            var tmp = {
              "_id": response.data.areas[i]._id,
              "status": response.data.areas[i].status,
              "action_name": tmp_action[0],
              "action_logo" : tmp_action[1],
              "action_color" : tmp_action[2],
              "action": response.data.areas[i].action,
              "reaction_name": tmp_reaction[0],
              "reaction_logo" : tmp_reaction[1],
              "reaction_color" : tmp_reaction[2],
              "reaction": response.data.areas[i].reaction,
            }
            tmp_areas.push(tmp);
          }
      }).catch((err) => {
        console.log("ERROR:", err);
      });
      setAreas(tmp_areas);
      console.log("ytufygkuhl", tmp_areas);
      setLoaded(true);
    }
    fetchData();
  }, [isFocused, update_screen]);


  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#020410" />
      <Image style={styles.image} source={require("../../../assets/area_logo.png")} />
      <Text style={styles.title}> Your cards </Text>
      {areas.length === 0 ?
        <>
          <Text style={styles.subtitle}>It's empty there</Text>
          <Text style={styles.subtitle}>Please go to 'New Card' to start creating new cards !</Text>
        </>
      :
        <Animated.FlatList
          onScroll={Animated.event([{nativeEvent:  {contentOffset: {x: scrollX}}}], {useNativeDriver: true})}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          renderItem={({item}) => {
            return (
                <View style={{
                  justifyContent: "center",
                  width,
                  marginTop: "5%",
                  marginBottom: "15%"
                }}>
                  <CreateCard
                    updateScreen={updateScreen}
                    _id= {item._id}
                    status= {item.status}
                    action_name= {item.action_name}
                    action_logo= {item.action_logo}
                    action_color= {item.action_color}
                    action= {item.action}
                    reaction_name= {item.reaction_name}
                    reaction_logo= {item.reaction_logo}
                    reaction_color= {item.reaction_color}
                    reaction= {item.reaction}
                  />
                </View>
            )
          }}
          data={areas}
        />
      }
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

  subtitle: {
    marginTop: "20%",
    marginHorizontal: "15%",
    textAlign: "center",
    fontSize: 20,
    color: "grey",
    fontWeight: "bold"
  }
});
