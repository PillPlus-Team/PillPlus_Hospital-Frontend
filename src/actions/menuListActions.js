import { MENULIST_FETCH } from './types';

import { menuList } from './ultis';

export const menuListFetch = () => {
    return async (dispatch, getState) => {
        const menuAccessible = [
            {
                role: 'Super Administrator',
                menuIndex: [0, 1, 2, 3, 4, 5, 6],
            },
            {
                role: 'Administrator',
                menuIndex: [0, 1, 2, 3, 4, 5, 6],
            },
            {
                role: 'Staff',
                menuIndex: [0, 1],
            },
            {
                role: 'Cashier',
                menuIndex: [0, 2, 3],
            },
        ];

        try {
            const { user } = getState();

            let userCanAccess = menuAccessible.find((element) => element.role === user.role).menuIndex;
            userCanAccess = userCanAccess.map((index) => {
                return menuList[index];
            });

            dispatch({ type: MENULIST_FETCH, menuList: userCanAccess });
        } catch (error) {
            dispatch({
                type: MENULIST_FETCH,
                menuList: [
                    {
                        title: 'หน้าหลัก',
                        url: '/home',
                    },
                ],
            });
        }
    };
};
