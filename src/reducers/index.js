import { combineReducers } from 'redux';

import TransactionsReducer from './reducer_transactions';

const rootReducer = combineReducers({
  transactions: TransactionsReducer
});

export default rootReducer;
