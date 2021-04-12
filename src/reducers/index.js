import { combineReducers } from 'redux';

import userReducer from './userReducer';
import menuListReducer from './menuListReducer';
import accountsReducer from './accountsReducer';
import pillStoresReducer from './pillStoresReducer';
import pillsReducer from './pillsReducer';
import roleListReducer from './roleListReducer';

export default combineReducers({
    user: userReducer,
    menuList: menuListReducer,
    roleList: roleListReducer,
    accounts: accountsReducer,
    pillStores: pillStoresReducer,
    pills: pillsReducer,
});
