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

export default function ({ navigation }) {

  const {width} = useWindowDimensions();

  const areas = React.useMemo(() => ([
    require('../../../assets/YouGram.png'),
    require('../../../assets/YouGram.png'),
    require('../../../assets/YouGram.png'),
    require('../../../assets/YouGram.png'),
    require('../../../assets/YouGram.png'),
    require('../../../assets/YouGram.png')
  ]), []);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#020410" />
      <Image style={styles.image} source={require("../../../assets/area_logo.png")} />
      <Text style={styles.title}> Your cards </Text>
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
                  action_name="YouTube"
                  action_description="A youtuber posts a new video"
                  reaction_name="Telegram"
                  reaction_description="Area's bot sends you a message"
                />
              </View>
          )
        }}
        data={areas}
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
  }
});
