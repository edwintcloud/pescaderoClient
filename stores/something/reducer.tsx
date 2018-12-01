import { ISomething } from './state'
import * as somethingActions from './actions'

const initialState: ISomething = {
  message: 'No something...'
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case somethingActions.UPDATE_SOMETHING:
      return Object.assign({}, state, { message: action.message })
    default: return state
  }
}