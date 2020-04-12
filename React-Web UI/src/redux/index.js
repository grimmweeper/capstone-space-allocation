import { combineReducers } from 'redux';

import { authentication } from './AuthReducer';
import { registration } from './RegistrationReducer';
import { alert } from './AlertReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert
});

export default rootReducer;