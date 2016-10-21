import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },row :{
    flex: 1,
    borderRadius : 5,
    borderWidth : 2,
    borderColor : '#1EC267',
    padding : 5,
    marginTop : 5
  }
});

const RowTanda = (props) => (
  <View style={styles.row}>
    <Text>Nombre: {props.name}</Text>
    <Text>Cantidad Meta: $ {props.mount}</Text>
    <Text>Fecha Creación: {props.startDate }</Text>
    <Text>Periodo : {props.period }</Text>
  </View>
);

export default RowTanda;
