'use strict'

const {Record,List} = require('immutable')

const Form = Record({
  tanda: new (Record({
    name: null,
    mount: null,
    objectId: null,
    startDate: null
  })),
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  tandas: new List(),
  fields: new (Record({
    name: '',
    nameHasError: false,
    nameErrorMsg: '',
    mount: '',
    mountHasError: false,
    mountErrorMsg: '',
    period: '',
    periodHasError: false,
    periodErrorMsg: '',
  }))
})

var InitialState = Record({
  form: new Form()
})

export default InitialState
