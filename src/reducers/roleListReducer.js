import { ROLELIST_FETCH } from '../actions/types';

const initState = [];

const roleListReducer = (state = initState, action) => {
    switch (action.type) {
        case ROLELIST_FETCH:
            return action.roleList;

        default:
            return state;
    }
};

export default roleListReducer;
