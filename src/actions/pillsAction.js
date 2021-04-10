import { PILLS_FETCH, PILLS_ADD_TOGGLE, PILLS_ADD, PILLS_EDIT_TOGGLE, PILLS_UPDATE, PILLS_DELETE } from './types';

export const pillsFetch = () => {
    return async (dispatch) => {
        const pills = [
            {
                ID: 10000001,
                sn: 10225463,
                name: 'ยา A',
                description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
                price: 150.0,
                type: 'in',
            },
            {
                ID: 10000002,
                sn: 10225480,
                name: 'ยา B',
                description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
                price: 159.0,
                type: 'out',
            },
            {
                ID: 10000003,
                sn: 10225888,
                name: 'ยา C',
                description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
                price: 12.0,
                type: 'in',
            },
        ];

        dispatch({ type: PILLS_FETCH, pills: pills });
    };
};

export const pillsAddToggle = () => {
    return {
        type: PILLS_ADD_TOGGLE,
    };
};

export const pillsAdd = ({ sn, name, description, price, type }) => {
    return async (dispatch) => {
        const pill = {
            ID: Math.floor(Math.random() * 100000000),
            sn,
            name,
            description,
            price,
            type,
        };

        dispatch({ type: PILLS_ADD, pill: pill });
    };
};

export const pillsEditToggle = ({ ID }) => {
    return {
        type: PILLS_EDIT_TOGGLE,
        ID: ID,
    };
};

export const pillsUpdate = ({ sn, name, description, price, type }) => {
    return async (dispatch, getState) => {
        const { pills } = getState();
        const pill = pills.list.find((pill) => pill.ID === ID);
        dispatch({ type: PILLS_UPDATE, pill: { ...pill, sn, name, description, price, type } });
    };
};

export const pillsDelete = ({ ID }) => {
    return async (dispatch) => {
        dispatch({ type: PILLS_DELETE, ID: ID });
    };
};

/* For Production */
// export const pillsFetch = () => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getPills', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status === 200) {
//             const pills = await res.json();
//             dispatch({ type: PILLS_FETCH, pills: pills });
//         }
//     };
// };

// export const pillsAddToggle = () => {
//     return {
//         type: PILLS_ADD_TOGGLE,
//     };
// };

// export const pillsAdd = ({ sn, name, description, price, type }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/addPill', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ sn, name, description, price, type }),
//         });

//         if (res.status === 200) {
//             const pill = await res.json();
//             dispatch({ type: PILLS_ADD, pill: pill });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };

// export const pillsEditToggle = ({ ID }) => {
//     return {
//         type: PILLS_EDIT_TOGGLE,
//         ID: ID,
//     };
// };

// export const pillsUpdate = ({ ID, sn, name, description, price, type }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/editPill', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ ID, sn, name, description, price, type }),
//         });

//         if (res.status === 200) {
//             const editedPill = await res.json();
//             dispatch({ type: PILLS_UPDATE, pill: { ...editedPill } });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };

// export const pillsDelete = ({ ID }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/deletePill', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ID,
//             }),
//         });

//         if (res.status === 200) {
//             dispatch({ type: PILLS_DELETE, ID: ID });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };
