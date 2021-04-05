import { USER_LOGIN, USER_EDIT_PROFILE, USER_LOGOUT } from '../actions/types';

const initState = null;

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload;
        case USER_EDIT_PROFILE:
            return action.payload;
        case USER_LOGOUT:
            return null;
        default:
            return state;
    }
};

export default userReducer;
