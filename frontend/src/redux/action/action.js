export const UPDATE_DATA = 'UPDATE_DATA';

export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: data,
});

export const setUser = user => ({
  type: 'SET_USER',
  payload: user,
});