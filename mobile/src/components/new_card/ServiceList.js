import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';


const ServiceList = ({service, icon, colorOn, items, selected, select}) => {
  var color = 'grey';

  const changeColor = () => {
    if (color == 'grey')
      color = colorOn;
    else
      color = 'grey';
  };

  function getIcon(item) {
    if (selected == item)
      return "circle-slice-8";
    else
      return "circle-outline";
  }

  return (
    <>
      <List.Accordion
        theme={{colors: {background: '#020410'}}}
        onPress={changeColor}
        style={styles.accordion}
        title={service}
        titleStyle={styles.accordionTitle}
        left={props => <List.Icon icon={icon} color={colorOn}/>}>
        {items.map(item =>
          <List.Item
            key={item}
            style={{backgroundColor: "#191D32", width: "96%", left: "2%", borderRadius: 25, marginTop: "1%"}}
            title={item}
            titleNumberOfLines={10}
            titleStyle={{ color: "white", fontSize:18 }}
            right={props => <List.Icon {...props} icon= {getIcon(item)} color="white" />}
            onPress={() => {select(item)}}
          />
        )}
      </List.Accordion>
    </>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#3A4065",
    width: "100%",
    borderRadius: 25,
    marginTop: "2%",
  },
  
  accordionTitle: {
    color: "white",
    fontSize:20,
    width: "100%"
  }
});

export default ServiceList;