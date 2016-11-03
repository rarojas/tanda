'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tandaActions from '../../reducers/tanda/tandaActions'
import * as globalActions from '../../reducers/global/globalActions'
import {Actions} from 'react-native-router-flux'
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  ListView,
  Text
}
from 'react-native'
import FormButton from '../../components/FormButton'
import t from 'tcomb-form-native'
let Form = t.form.Form
const Button = require('apsl-react-native-button')


function mapStateToProps (state) {
  return {
    tanda : state.tanda,
    user  : state.global.currentUser
  }
};

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...globalActions, ...tandaActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../../lib/Translations'
I18n.translations = Translations


class Members extends Component {

  constructor(props) {
    super(props)
    let tanda =  this.props.tanda.form.tanda.toJS();
    this.state = { }
  }


  render () {
    let self = this
    return (
      <View style={styles.container}>

      </View>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Members)
