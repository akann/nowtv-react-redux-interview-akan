import {
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from '../actions';

const initialState = {
  messages: [],
  members: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA_PENDING:
      return {
        ...state,
        pending: true,
      };

    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }

    case FETCH_DATA_ERROR:
      return {
        ...state,
        pending: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
}

