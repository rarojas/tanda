'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as tandaActions from '../reducers/tanda/tandaActions'
import * as globalActions from '../reducers/global/globalActions'


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
import FormButton from '../components/FormButton'


import t from 'tcomb-form-native'

let Form = t.form.Form


const Button = require('apsl-react-native-button')

function mapStateToProps (state) {
  return {
    tanda: state.tanda
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
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## App class
 */
class NewTanda extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formValues: {
        name: '',
        mount: 1000000,
        period: '',
      }
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      formValues: {
        name: props.tanda.form.fields.name,
        mount: props.tanda.form.fields.mount,
        period: props.tanda.form.fields.period
      }
    })
  }
  componentDidMount () {

  }

  handlePress () {

  }

  onChange (value) {
    if (value.name !== '') {
      this.props.actions.onTandaFormFieldChange('name', value.name)
    }
    if (value.mount !== '') {
      this.props.actions.onTandaFormFieldChange('mount', value.mount)
    }
    if (value.period !== '') {
      this.props.actions.onTandaFormFieldChange('period', value.period)
    }
    this.setState({value})
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
      period: Period
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
          nullOption: {value: '', text: 'Escoje el perido de la tanda'}
          //editable: !this.props.profile.form.isFetching,
          //hasError: this.props.profile.form.fields.emailHasError,
          //error: this.props.profile.form.fields.emailErrorMsg
        }
      }
    }

    let onButtonPress = () => {
      this.props.actions.createTanda(){
      name      :   this.props.tanda.form.fields.name,
      mount     :   this.props.tanda.form.fields.mount,
      startDate :   new Date(),
      period    :   this.props.tanda.form.fields.period
      })
    }


    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <Form
            ref='form'
            type={NewTandaForm}
            options={options}
            value={this.state.formValues}
            onChange={this.onChange.bind(self)}
          />
        </View>

        <FormButton onPress={onButtonPress.bind(self)} buttonText={"Crear Tanda"} />

      </View>
    )
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(NewTanda)
