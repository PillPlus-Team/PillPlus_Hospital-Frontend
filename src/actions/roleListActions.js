import { ROLELIST_FETCH } from './types';

import { roles } from './ultis';

export const roleListFetch = () => {
    return async (dispatch, getState) => {
        const { user } = getState();

        let roleGroupCanManage = roles.slice(roles.indexOf(roles.find((element) => element.role.includes(user.role))) + 1, roles.length);

        let roleCanManage = []
        roleGroupCanManage.map((element)=>{
            return roleCanManage.push(...element.role)
        })

        dispatch({ type: ROLELIST_FETCH, roleList: roleCanManage });
    };
};
