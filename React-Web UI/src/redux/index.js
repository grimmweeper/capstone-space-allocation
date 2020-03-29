import { combineReducers } from 'redux';

import { authentication } from './AuthReducer';
import { registration } from './RegistrationReducer';
import { users } from './UserReducer';
import { alert } from './AlertReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;