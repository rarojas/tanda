'use strict'

export default function formValidation (state) {
  if (state.form.fields.name !== '' &&
        state.form.fields.mount > 0  &&
        !state.form.fields.nameHasError &&
        !state.form.fields.mountHasError)
     {
    return state.setIn(['form', 'isValid'], true)
  } else {
    return state.setIn(['form', 'isValid'], false)
  }
}
