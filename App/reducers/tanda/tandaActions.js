'use strict'

const {

  ON_TANDA_FORM_FIELD_CHANGE,
  CREATE_TANDA_REQUEST,
  CREATE_TANDA_SUCCESS,
  CREATE_TANDA_FAILURE

} = require('../../lib/constants').default

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'
import { Actions } from 'react-native-router-flux'


export function onTandaFormFieldChange (field, value) {
  return {
    type: ON_TANDA_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

export function createTandaRequest () {
  return {
    type: CREATE_TANDA_REQUEST
  }
}
export function createTandaSuccess (json) {
  return {
    type: CREATE_TANDA_SUCCESS,
    payload: json
  }
}
export function createTandaFailure (json) {
  return {
    type: CREATE_TANDA_FAILURE,
    payload: json
  }
}


export function createTanda (request) {
  return dispatch => {
    dispatch(createTandaRequest())
    return appAuthToken.getSessionToken()
      .then((token) => {
        return BackendFactory(token).createTanda(request.tanda)
      })
      .then((json) => {
        dispatch(createTandaSuccess(json))
        Actions.pop()
        Actions.Main({type: 'refresh'})
      })
      .catch((error) => {
        dispatch(createTandaFailure(error))
      })
  }
}
