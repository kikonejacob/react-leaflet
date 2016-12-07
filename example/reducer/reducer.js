export function shapes (state=[], action) {
  switch (action) {
    case 'ADD_NEW_SHAPE':
      return [
        ...state, {component: action.component, status: 'new', properties: action.properties}
      ]
    default:
      return state
  }
}
