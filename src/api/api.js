import { customers } from './mockData';

export const calculateOrderPoints =  (purchase) => {
    if(isNaN(purchase))
        throw new Error('input must be a number');
    let points = 0;
    purchase = Math.floor(purchase);
    if(purchase > 100){
        let twoPoint = purchase - 100;
        points += 50 + (twoPoint * 2);
    } else{
        points = purchase > 50 ? purchase - 50 : 0;
    }
  return points;
}

export const getOrdersInDateRange = (orders, start, end) => {
    return orders.filter((order) => {
        return order.date > start && order.date < end
    })
}

export const delayResponse = async (params) => {
    return new Promise(resolve => {
        setTimeout(function() { resolve(params)}, 1000);
    });
}

export const generateMockOrdersResponse = (params) => {
    let response;
    let customer = customers.find(customer => customer.id === params.customer_id);
    let data;
    let errors = [];
    let ordersInRange;
    if(customer){
        ordersInRange = getOrdersInDateRange(customer.orders, params.date_range_start, params.date_range_end);
        ordersInRange.forEach((order) => {
            order.rewardPoints = calculateOrderPoints(order.total);
        });
       data = {
            customerId: customer.id,
            customerName: customer.name,
            orders: ordersInRange,
        }
    } else {
        errors.push(new Error('Customer not found'));
    }
    response = {
        data,
        errors
    }

    return response;
}

export const generateMockCustomersResponse = () => {
    const data = customers.map((customer) => ({
        id: customer.id,
        name: customer.name
    }))
    return {
        data
    }
}

export const get = async (endpoint, params) => {
    if(endpoint === 'customer-orders')
        return await delayResponse(params).then(generateMockOrdersResponse);
    if(endpoint === 'customers')
        return await delayResponse(params).then(generateMockCustomersResponse);
}
