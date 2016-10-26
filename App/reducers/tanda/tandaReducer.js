'use strict'
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./tandaFormValidation').default

import {Actions} from 'react-native-router-flux'
var Immutable = require('immutable')

const {
  ON_TANDA_FORM_FIELD_CHANGE,
  CREATE_TANDA_REQUEST,
  CREATE_TANDA_SUCCESS,
  CREATE_TANDA_FAILURE
} = require('../../lib/constants').default


const InitialState = require('./tandaInitialState').default
const initialState = new InitialState()

export default function tandaReducer(state = initialState,  action) {
  let nextProfileState = null

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {

    case ON_TANDA_FORM_FIELD_CHANGE:
      const {field, value} = action.payload
      let nextState = state.setIn(['form', 'fields', field], value)
          .setIn(['form', 'error'], null)
      return formValidation(fieldValidation(nextState, action), action)


  case CREATE_TANDA_FAILURE:
        return state.setIn(['form', 'isFetching'], false)
        .setIn(['form', 'error'], "Hubo un  errorrr")

  case CREATE_TANDA_REQUEST:
    return state.setIn(['form', 'isFetching'], true)
          .setIn(['form', 'error'], null)

  case CREATE_TANDA_SUCCESS:
    var tanda = Immutable.fromJS(action.payload);
    return state.setIn(['form', 'isFetching'], false)
    .setIn(['form', 'tanda' ], tanda)
    .setIn(['form', 'error'], null)

  }

  return state
}
