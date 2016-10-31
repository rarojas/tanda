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

/**
 * ## App class
 */
class AddPerson extends Component {

  constructor(props) {
    super(props)
    let tanda =  this.props.tanda.form.tanda.toJS();
    this.state = {
      formValues: {
        name   : tanda.name,
        mount  : tanda.mount,
        period : tanda.period,
        startDate : new Date(tanda.startDate)
      }
    }
  }


  render () {
    let self = this

    var Period = t.enums({
        Daily : 'Daily',
        Week  : 'Week',
        Month : 'Month'
      });

    let NewTandaForm = t.struct({
      name: t.String,
      mount: t.Number,
      period: Period,
      startDate :  t.Date
    });

    let options = {
      auto: 'placeholders',
      fields: {
        name: {
          label: I18n.t('Tanda.name'),
          maxLength: 12,
          editable: !this.props.tanda.form.isFetching,
          hasError: this.props.tanda.form.fields.nameHasError,
          error: this.props.tanda.form.fields.nameErrorMsg
        },
        mount: {
          label: I18n.t('Tanda.mount'),
          keyboardType: 'numeric',
          editable: !this.props.tanda.form.isFetching,
          hasError: this.props.tanda.form.fields.mountHasError,
          error: this.props.tanda.form.fields.mountErrorMsg
        },
        period: {
          label: I18n.t('Tanda.period'),
          nullOption: {value: '', text: 'Escoje el perido de la tanda'},
          editable: !this.props.tanda.form.isFetching
        },
        startDate : {
          label   : I18n.t('Tanda.startDate'),
          editable: false,
          config: {
            format: date => date.yyyymmdd()
          }
        }
      }
    }
    let onButtonPress = () => {

    }


    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <Form
            ref='form'
            type={NewTandaForm}
            options={options}
            value={this.state.formValues}
          />
        </View>

        <FormButton onPress={onButtonPress.bind(self)} buttonText={"Guardar"} />

      </View>
    )
  }
};

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),"/", mm,"/", dd].join(''); // padding
};


/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(AddPerson)
