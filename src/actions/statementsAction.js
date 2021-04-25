import { STATEMENTS_FETCH_BY_MONTH, STATEMENTS_SHOW } from './types';

export const statementsFetchByMonth = ({ month, year }) => {
    return async (dispatch) => {
        let statements = [];
        if (month === 1 && year === 2020) {
            statements = [
                {
                    ID: 10001111,
                    pillStoreID: 10000001,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19000,
                },
                {
                    ID: 10001112,
                    pillStoreID: 10000002,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาพิษ bodyslam',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom1477@gmail.com',
                    phone: '0899997333',
                    balance: 31000,
                },
            ];
        }
        if (month === 4 && year === 2021) {
            statements = [
                {
                    ID: 10001111,
                    pillStoreID: 10000001,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19000,
                },
                {
                    ID: 10001112,
                    pillStoreID: 10000002,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาพิษ bodyslam',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom1477@gmail.com',
                    phone: '0899997333',
                    balance: 31000,
                },
                {
                    ID: 10001113,
                    pillStoreID: 10000003,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาดี ยาอี ยาไอซ์',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phukphoomtaphrae@gmail.com',
                    phone: '0891234765',
                    balance: 19600,
                },
                {
                    ID: 10001114,
                    pillStoreID: 10000004,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19555,
                },
                {
                    ID: 10001115,
                    pillStoreID: 10000005,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาพิษ bodyslam',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom1477@gmail.com',
                    phone: '0899997333',
                    balance: 19555,
                },
                {
                    ID: 10001116,
                    pillStoreID: 10000006,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาดี ยาอี ยาไอซ์',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phukphoomtaphrae@gmail.com',
                    phone: '0891234765',
                    balance: 19000,
                },
                {
                    ID: 10001117,
                    pillStoreID: 10000007,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19000,
                },
                {
                    ID: 10001118,
                    pillStoreID: 10000008,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาพิษ bodyslam',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom1477@gmail.com',
                    phone: '0899997333',
                    balance: 21000,
                },
                {
                    ID: 10001119,
                    pillStoreID: 10000009,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาดี ยาอี ยาไอซ์',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phukphoomtaphrae@gmail.com',
                    phone: '0891234765',
                    balance: 19050,
                },
            ];
        }

        dispatch({ type: STATEMENTS_FETCH_BY_MONTH, statements: statements, month: month, year: year });
        dispatch(statementsFilter({ keyword: '', month: month, year: year }));
    };
};

export const statementsFilter = ({ keyword, month, year }) => {
    return async (dispatch, getState) => {
        const { statements } = getState();

        if (statements.month === month && statements.year === year) {
            let IDList = [];
            statements.list.map((statement) => {
                const keys = Object.keys(statement);
                for (let i = 0; i < keys.length; i++) {
                    if (String(statement[keys[i]]).includes(keyword)) {
                        return IDList.push(statement.ID);
                    }
                }
            });
            dispatch({ type: STATEMENTS_SHOW, IDList: IDList, month: month, year: year });
        }
    };
};

/* For Production */
// export const statementsFetchByMonth = ({ month, year }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getAccounts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: {
//                 month,
//                 year,
//             },
//         });

//         if (res.status === 200) {
//             let statements = await res.json();
//             statements = statements.map((statement) => {
//                 return { ...statement, show: true };
//             });
//             dispatch({ type: STATEMENTSLIST_FETCH_BY_MONTH, statements: statements, month: month, year: year });
//             dispatch(statementsFilter({ keyword: '', month: month, year: year }));
//         }
//     };
// };

// export const statementsFilter = ({ keyword, month, year }) => {
//     return async (dispatch, getState) => {
//         const { statements } = getState();

//         if (statement.month == month && statement.year == year) {
//             let IDList = [];
//             statements.list.map((statement) => {
//                 const keys = Object.keys(statement);
//                 for (let i = 0; i < keys.length; i++) {
//                     if (String(statement[keys[i]]).includes(keyword)) {
//                         return IDList.push(statement.ID);
//                     }
//                 }
//             });
//             dispatch({ type: STATEMENTSLIST_SHOW, IDList: IDList, month: month, year: year });
//         }
//     };
// };
