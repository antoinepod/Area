import React  from "react";
import { Text ,View, StyleSheet } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
  
const CreateCard = ({image, title, description}) => {
      
    return(
      <Card style={Styles.container}>
        <Card.Content style={Styles.content} alignItems="center" alignContent="center">
          <Title style={{color: 'white'}}>{title}</Title>
        </Card.Content>
        <Card.Cover style={Styles.cover} resizeMode="cover" source={image} />
        <Card.Content>
          <Paragraph style={{color: 'white'}}>{description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button color='green'>Enable</Button>
          <Button color='red'>Disable</Button>
        </Card.Actions>
      </Card>
    )
}
  
const Styles = StyleSheet.create({
  container :{
    alignContent:'center',
    margin:"8%",
    borderRadius: 25,
    backgroundColor: "#191D32",
  },

  content :{
    paddingBottom:'4%',
  },

  cover :{
    flexDirection: 'column',
    height:'48%',
  },
});

export default CreateCard;
