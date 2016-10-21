'use strict'


const {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
  TOGGLE_SIDE_MENU,
  LOGOUT_SUCCESS
} = require('../../lib/constants').default

import {Actions} from 'react-native-router-flux'


const InitialState = require('./menuInitialState').default
const initialState = new InitialState()


export default function sideMenu(state = initialState, action = {}) {
  let status;

  switch(action.type) {
  case OPEN_SIDE_MENU:
      return {
        ...state,
        open: true
      };
    case CLOSE_SIDE_MENU:
      return {
        ...state,
        open: false
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
