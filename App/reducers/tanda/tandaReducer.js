'use strict'
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./tandaFormValidation').default

import {Actions} from 'react-native-router-flux'
var Immutable = require('immutable')

const {
  ON_TANDA_FORM_FIELD_CHANGE
} = require('../../lib/constants').default


const InitialState = require('./tandaInitialState').default
const initialState = new InitialState()

export default function profileReducer (state = initialState, action) {
  let nextProfileState = null

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {

    case ON_TANDA_FORM_FIELD_CHANGE:
      const {field, value} = action.payload
      let nextState = state.setIn(['form', 'fields', field], value)
          .setIn(['form', 'error'], null)
      return formValidation(fieldValidation(nextState, action), action)


  }

  return state
}
