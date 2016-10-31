'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as profileActions from '../reducers/profile/profileActions'
import * as tandaActions from '../reducers/tanda/tandaActions'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  ListView,
  Text
}
from 'react-native'
import RowTanda from '../components/RowTanda'

const Button = require('apsl-react-native-button')

function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    profile: state.profile,
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
};

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...profileActions, ...tandaActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  button: {
    backgroundColor: '#1EC267',
    borderColor: '#1EC267',
    marginLeft: 10,
    marginRight: 10
  },
  row :{
    flex: 1,
    borderRadius : 5,
    borderWidth : 2,
    borderColor : '#1EC267',
    padding : 5,
    marginTop : 5
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
class Main extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tandas : this.props.profile.form.tandas.toArray(),
      dataSource: ds.cloneWithRows(this.props.profile.form.tandas.toArray()),
    };
  }

  componentWillReceiveProps (props) {
    if(props.profile.form.tandas)
      this.setState({
          tandas : props.profile.form.tandas.toArray(),
          dataSource : this.state.dataSource.cloneWithRows(props.profile.form.tandas.toArray())
      });
  }
  componentDidMount () {
    this.props.actions.getTandas()
  }

  handlePress () {
    Actions.NewTanda();
  }

  selectTanda(data) {
    this.props.actions.selectTanda(data);
  }

  _renderRow(rowData){
    return <RowTanda {...rowData.toJS()  } onSelect={() => this.selectTanda(rowData)} />;
  }

  render () {
    return (
      <View style={styles.container}>
          <ListView style={{ margin : 5 }} enableEmptySections = {true}
          dataSource={this.state.dataSource}  renderRow={(rowData) =>  this._renderRow(rowData) } />
          <Button style={styles.button} onPress={this.handlePress.bind(this)} textStyle={{color:"white"}}>
            {I18n.t('Main.newTanda')}
          </Button>
      </View>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main)
