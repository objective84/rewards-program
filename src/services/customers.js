import * as api from '../api/api';

export const getCustomers = () => {
    const response  = api.get('customers');
    return response.data;
}

export const getOrders = (customerId, dateRangeStart, dateRangeEnd) => {
    const response = api.get('customer-orders', {
        customer_id: customerId, 
        date_range_start: dateRangeStart,
        date_range_end: dateRangeEnd, 
    });

    return response.data;
}