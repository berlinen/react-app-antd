/* eslint-disable consistent-return */
import { layoutAction } from '../actions'
import initalState from '../state'

export default function (state = initalState.layoutState, action) {
  switch(action.type) {
     case layoutAction.OPENSPIN:
      return Object.assign({}, state, {
        spinState: true
      })
    case layoutAction.CLOSESPIN:
      return Object.assign({}, state, {
        spinState: false
      })
    case layoutAction.MODIFYIFAJAX:
      return Object.assign({}, state, {
        ifAjax: action.data
      })
    default:
      return state;
  }
}