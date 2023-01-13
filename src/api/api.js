import { customers } from './mockData';

export const calculateOrderPoints =  (transaction) => {
    if(isNaN(transaction))
        throw new Error('input must be a number');
    let points = 0;
    transaction = Math.floor(transaction);
    if(transaction > 100){
        points = 50 + ((transaction - 100) * 2);
    } else{
        points = transaction > 50 ? transaction - 50 : 0;
    }
  return points;
}

export const calculateRewardPointTotal = (orders) => {
    let rewardPointTotal = 0;
    orders.forEach((order) => {
        order.rewardPoints = calculateOrderPoints(order.total);
        rewardPointTotal += order.rewardPoints;
    });
    return {
        orders,
        rewardPointTotal
    }
}

export const getOrdersInDateRange = (orders, start, end) => {
    return orders.filter((order) => {
        return order.date > start && order.date < end
    })
}

export const delayResponse = async (params) => {
    return new Promise(resolve => {
        setTimeout(function() { resolve(params) }, 1000);
    });
}

export const generateMockOrdersResponse = ({ customer_id, date_range_start, date_range_end }) => {
    let response;
    // eslint-disable-next-line eqeqeq
    let customer = customers.find(customer => customer.id == customer_id);
    let data;
    let errors = [];
    let ordersInRange;
    if(customer){
        ordersInRange = getOrdersInDateRange(customer.orders, date_range_start, date_range_end);
        const {orders, rewardPointTotal} = calculateRewardPointTotal(ordersInRange)
       data = {
            id: customer.id,
            name: customer.name,
            orders,
            rewardPointTotal
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
    const data = customers.map((customer) => (
        {
            id: customer.id,
            name: customer.name,
            rewardPointTotal: calculateRewardPointTotal(
                getOrdersInDateRange(customer.orders, new Date('10/12/2022'), new Date('1/12/2023'))).rewardPointTotal
        }
    ));
    return {
        data
    }
}

export const get = (endpoint, params) => {
    if(endpoint === 'customer-orders')
        return generateMockOrdersResponse(params);
    if(endpoint === 'customers')
        return generateMockCustomersResponse(params);
}
