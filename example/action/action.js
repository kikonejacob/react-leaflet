export function AddShape (type, properties) {
  return {
    type: 'ADD_NEW_SHAPE',
    component: type,
    properties
  }
}
