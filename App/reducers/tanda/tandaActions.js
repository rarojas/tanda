'use strict'

const {

  ON_TANDA_FORM_FIELD_CHANGE

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


export function createTanda (tanda) {
  return dispatch => {
    dispatch(createTandaRequest())
    return appAuthToken.getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).createTanda(tanda)
      })
      .then(() => {
        dispatch(createTandaSuccess(json))
        Actions.Main()
      })
      .catch((error) => {
        dispatch(createTandaFauilere(error))
      })
  }
}
