import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer as announcementReducer } from './announcement/reducer'
import { reducer as somethingReducer } from './something/reducer'

export const initStore = (initialState) => {
  return createStore(combineReducers({
    announcement: announcementReducer,
    something: somethingReducer
  }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}