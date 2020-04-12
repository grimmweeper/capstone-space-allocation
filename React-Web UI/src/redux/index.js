import { combineReducers } from 'redux';

import { registration } from './RegistrationReducer';
import { alert } from './AlertReducer';
import { login } from './AuthReducer';

const rootReducer = combineReducers({
  registration,
  alert,
  login
});

export default rootReducer;