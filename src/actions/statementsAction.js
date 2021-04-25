import { STATEMENTS_FETCH_BY_MONTH, STATEMENTS_SHOW } from './types';

export const statementsFetchByMonth = ({ month, year }) => {
    return async (dispatch) => {
        let statements = [];
        if (month === 1 && year === 2020) {
            statements = [
                {
                    _id: 10001111,
                    pillStoreID: 10000001,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19000,
                },
                {
                    _id: 10001112,
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
                    _id: 10001111,
                    pillStoreID: 10000001,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19000,
                },
                {
                    _id: 10001112,
                    pillStoreID: 10000002,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาพิษ bodyslam',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom1477@gmail.com',
                    phone: '0899997333',
                    balance: 31000,
                },
                {
                    _id: 10001113,
                    pillStoreID: 10000003,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาดี ยาอี ยาไอซ์',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phukphoomtaphrae@gmail.com',
                    phone: '0891234765',
                    balance: 19600,
                },
                {
                    _id: 10001114,
                    pillStoreID: 10000004,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19555,
                },
                {
                    _id: 10001115,
                    pillStoreID: 10000005,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาพิษ bodyslam',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom1477@gmail.com',
                    phone: '0899997333',
                    balance: 19555,
                },
                {
                    _id: 10001116,
                    pillStoreID: 10000006,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาดี ยาอี ยาไอซ์',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phukphoomtaphrae@gmail.com',
                    phone: '0891234765',
                    balance: 19000,
                },
                {
                    _id: 10001117,
                    pillStoreID: 10000007,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาอม ยาดม ยาหม่อง',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom0529@gmail.com',
                    phone: '0891234567',
                    balance: 19000,
                },
                {
                    _id: 10001118,
                    pillStoreID: 10000008,
                    name: 'พักตร์ภูมิ ตาแพร่',
                    pharmacy: 'ยาพิษ bodyslam',
                    location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    email: 'phoom1477@gmail.com',
                    phone: '0899997333',
                    balance: 21000,
                },
                {
                    _id: 10001119,
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
            let _idList = [];
            statements.list.map((statement) => {
                const keys = Object.keys(statement).filter((key) => key != '_id');
                for (let i = 0; i < keys.length; i++) {
                    if (String(statement[keys[i]]).includes(keyword)) {
                        return _idList.push(statement._id);
                    }
                }
            });
            dispatch({ type: STATEMENTS_SHOW, _idList: _idList, month: month, year: year });
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

//         if (statements.month === month && statements.year === year) {
//             let _idList = [];
//             statements.list.map((statement) => {
//                 const keys = Object.keys(statement).filter((key) => key != '_id');
//                 for (let i = 0; i < keys.length; i++) {
//                     if (String(statement[keys[i]]).includes(keyword)) {
//                         return _idList.push(statement._id);
//                     }
//                 }
//             });
//             dispatch({ type: STATEMENTS_SHOW, _idList: _idList, month: month, year: year });
//         }
//     };
// };
