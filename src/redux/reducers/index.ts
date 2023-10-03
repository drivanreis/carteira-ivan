import { combineReducers } from 'redux';
import { userReducer } from './user';
import { walletReducer } from './wallet';

const combinedReducers = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

export default combinedReducers;
