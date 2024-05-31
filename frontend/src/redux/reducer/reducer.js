import { UPDATE_DATA } from '../action/action';

const initialState = {
  data: {
    USERNAME: 'sa',
    PASSWORD: '123',
    SERVERNAME: 'DESKTOP-ENIOI3O\CINEMA_N19',
  },
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case 'SET_USER': 
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;