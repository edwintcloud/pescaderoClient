export const UPDATE_SOMETHING = '[Something] update'

export const updateSomething = (message: string) => dispatch => {
  return dispatch({ type: UPDATE_SOMETHING, message })
}