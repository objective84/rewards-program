import * as api from './api';



export const getOders = async (customerId, dateRangeStart, dateRangeEnd) => {
    const { response } = await api.get('customer-orders', {
        params: {
            customer_id: customerId, 
            date_range_start: dateRangeStart,
            date_range_end: dateRangeEnd, 
        }
    });

    return response.data;
}