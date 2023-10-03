import { AnyAction } from 'redux';
import { REGISTER_USER } from '../../constants';

const INITIAL_STATE = {
  email: '',
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        email: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
