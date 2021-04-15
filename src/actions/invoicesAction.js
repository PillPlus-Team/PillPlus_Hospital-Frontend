import { INVOICES_FETCH, INVOICES_SELECT, INVOICES_PAY } from './types';

export const invoicesFetch = () => {
    return async (dispatch) => {
        let invoices = [
            {
                ID: 10000001,
                hn: '10225463',
                name: 'พักตร์ภูมิ ตาแพร่',
                startTime: 1618415601123,
                queueNo: 1,
                pillStorePhamacy: 'ร้าน A',
                pillStoreLocation: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                pills: [],
                serviceCharge: 30.0,
                total: 30.0,
            },
            {
                ID: 10000002,
                hn: '10225464',
                name: 'พักตร์ภูมิ ตาแพร่',
                startTime: 1618415651123,
                queueNo: 2,
                pillStorePhamacy: 'ร้าน A',
                pillStoreLocation: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                pills: [
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10, price: 159.0 },
                    { name: 'ยา B', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'ขวด', amount: 2, price: 159.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10, price: 159.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10, price: 159.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10, price: 159.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10, price: 159.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10, price: 159.0 },
                ],
                serviceCharge: 50.0,
                total: 9908.0,
            },
            {
                ID: 10000003,
                hn: '10225465',
                name: 'พักตร์ภูมิ ตาแพร่',
                startTime: 1618415661123,
                queueNo: 3,
                pillStorePhamacy: 'ร้าน A',
                pillStoreLocation: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                pills: [{ name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', unit: 'เม็ด', amount: 10, price: 159.0 }],
                serviceCharge: 50.0,
                total: 1640.0,
            },
        ];

        invoices = invoices.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
        dispatch({ type: INVOICES_FETCH, invoices: invoices });
    };
};

export const invoicesSelect = ({ ID }) => {
    return {
        type: INVOICES_SELECT,
        ID: ID,
    };
};

export const invoicesPay = ({ ID }) => {
    return {
        type: INVOICES_PAY,
        ID: ID,
    };
};

/* For Production */
// export const invoicesFetch = () => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getInvoices', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status === 200) {
//             let invoices = await res.json();
//             invoices = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
//             dispatch({ type: INVOICES_FETCH, invoices: invoices });
//         }
//     };
// };

// export const invoicesSelect = ({ ID }) => {
//     return {
//         type: INVOICES_SELECT,
//         ID: ID,
//     };
// };

// export const invoicesPay = ({ ID }) => {
//     return async (dispatch, getState) => {
//         const { invoices } = getState();

//         const invoice = invoices.list.find((element) => element.ID === ID);

//         const res = await fetch('/api/v1/invoicePay', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ID,
//             }),
//         });

//         if (res.status === 200) {
//             dispatch({ type: INVOICES_PAY, ID: ID });
//         } else {
//             //Swal.fire (SweetAlert2) Here
//         }
//     };
// };
