/**
 * # menuActions.js
 *
 */
'use strict'
/**
 * ## Imports
 *
 * The actions for menu
 */
const {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
  TOGGLE_SIDE_MENU

} = require('../../lib/constants').default

export function open() {
  return {
    type: OPEN_SIDE_MENU
  };
}

export function close() {
  return {
    type: CLOSE_SIDE_MENU
  };
}

export function toggle() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}
