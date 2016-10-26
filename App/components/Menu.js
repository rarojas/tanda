'use strict'

import React, { Component, PropTypes } from 'react';
import { View , StyleSheet, TouchableHighlight, Text } from 'react-native';

import * as sideMenu from '../reducers/menu/menuActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    padding: 5,
    marginTop : 0,
    backgroundColor: '#1EC267'
  },
  titleContainer : {
        marginTop : 2,
       flexDirection: 'row',
       borderWidth: 1,
       borderColor: "#26ad60",
       borderRadius: 5
   },
   title       : {
       padding : 10,
       textAlignVertical: 'center',
       fontWeight:'bold',
       color   : 'white'
   },
   menuView : {
    flexDirection: 'row',
    padding    : 5
   },
   buttonImage : {
       padding : 5,
       color : "white",
       width : 40,
       height: 40,
       textAlign: 'center'
   },
});
import Icon from 'react-native-vector-icons/FontAwesome';
import * as profileActions from '../reducers/profile/profileActions'
import * as globalActions from '../reducers/global/globalActions'
import * as authActions from '../reducers/auth/authActions'




function mapStateToProps (state) {
  return {
    profile: state.profile,
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...profileActions, ...globalActions, ...authActions }, dispatch)
  }
}

class SideMenu extends Component {

  componentWillReceiveProps (props) {
    this.setState({
      formValues: {
        username: props.profile.form.fields.username,
        email: props.profile.form.fields.email
      }
    })
  }
  /**
   * ### componentDidMount
   *
   * During Hot Loading, when the component mounts due the state
   * immediately being in a "logged in" state, we need to just set the
   * form fields.  Otherwise, we need to go fetch the fields
   */
  componentDidMount () {
    if (this.props.profile.form.fields.username === '' && this.props.profile.form.fields.email === '') {
      this.props.actions.getProfile(this.props.global.currentUser)
    } else {
      this.setState({
        formValues: {
          username: this.props.profile.form.fields.username,
          email: this.props.profile.form.fields.email
        }
      })
    }
  }

  function1(){
    SideMenu.drawer.close();
    Actions.Main();
  }


  static contextTypes = {
  		drawer: PropTypes.object.isRequired,
  };


  render() {
    const { drawer } = this.context
    SideMenu.drawer = drawer;
    let self = this
    let onButtonPress = () => {
      this.props.actions.logout()
    }
    return (
      <View style={styles.container}>
      <View style={{ flex: 6 }} >
        <TouchableHighlight style={styles.titleContainer} onPress={this.function1}
        underlayColor="#26ad60">
          <View style={styles.menuView} >
              <Icon style={styles.buttonImage} name={"user"} size={30} />
              <Text style={styles.title}>Hola: {this.props.profile.form.fields.username} </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.titleContainer} onPress={() => { drawer.close(); Actions.Profile.call() }}
          underlayColor="#26ad60">
            <View style={styles.menuView}>
              <Icon style={styles.buttonImage} name={"money"} size={25} />
              <Text style={styles.title}>Mis Pagos</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.titleContainer} onPress={this.function1}
          underlayColor="#26ad60">
            <View style={styles.menuView} >
              <Icon style={styles.buttonImage} name={"user"} size={30} />
              <Text style={styles.title}>Mis Tandas</Text>
            </View>
          </TouchableHighlight>

      </View>
      <View style={{ flex: 1 }}>
        <TouchableHighlight style={styles.titleContainer} onPress={onButtonPress.bind(self)}
          underlayColor="#26ad60">
          <View style={styles.menuView}>
            <Icon style={styles.buttonImage} name={"sign-out"} size={30} />
            <Text style={styles.title}>{I18n.t('Menu.logout')}</Text>
          </View>
        </TouchableHighlight>
      </View>
     </View>
    );
  }
}


SideMenu.propTypes = {
	drawer: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
