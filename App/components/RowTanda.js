import React from 'react';
import { View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
 } from 'react-native';



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

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations


var RowTanda = React.createClass({
  render() {
    var props = this.props;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return(
      <TouchableNativeFeedback onPress={this.props.onSelect} >
        <View style={styles.row}>
          <Text>{I18n.t('Tanda.name')}: {props.name}</Text>
          <Text>{I18n.t('Tanda.mount')}: $ {props.mount}</Text>
          <Text>{I18n.t('Tanda.startDate')}: {props.startDate }</Text>
          <Text>{I18n.t('Tanda.period')} : {props.period }</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
});

export default RowTanda;
