import { combineReducers } from 'redux';

import userReducer from './userReducer';
import menuListReducer from './menuListReducer';

export default combineReducers({ user: userReducer, menuList: menuListReducer });
