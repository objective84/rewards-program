import * as api from '../api';


describe('calculateOrderPoints', () => {
    it('returns the correct number of points when the total is between $50 and $100', () =>{
        expect(api.calculateOrderPoints(87)).toEqual(37);
    });
    it('returns the correct number of points when the total is over $100', () => {
        expect(api.calculateOrderPoints(120)).toEqual(90);
    });
    it('returns the correct number of points when the total is exactly $100', () => {
        expect(api.calculateOrderPoints(100)).toEqual(50);
    });
    it('returns the correct number of points when the total rediculously high', () => {
        expect(api.calculateOrderPoints(16864)).toEqual(33578);
    });
    it('returns 0 points when the order is below $50', () => {
        expect(api.calculateOrderPoints(36)).toEqual(0);
    });
    it('returns the correct number of points when the total is a decimal value', () => {
        expect(api.calculateOrderPoints(120.67)).toEqual(90);
    })
    it('throws an error if a non-numeric input is provided', () => {
        expect(() => api.calculateOrderPoints('ABC')).toThrow(Error)
        expect(() => api.calculateOrderPoints()).toThrow(Error)
    });
});

describe('generateMockOrdersResponse', () => {
    it('returns a generated response based on params', () => {
        const start = new Date('1/11/2023');
        start.setMonth(start.getMonth() -3);
        const end = new Date();
        const response = api.generateMockOrdersResponse({
                customer_id: "3", 
                date_range_start: start,
                date_range_end: end, 
            }
        );
        expect(response.data.id).toEqual(3);
        expect(response.data.name).toEqual("Steve Rogers");
        expect(response.data.orders.length).toEqual(5);
    })
    it('throws an error if the requested customer is not found', () => {
        const start = new Date('1/11/2023');
        start.setMonth(start.getMonth() -3);
        const end = new Date();
        const response = api.generateMockOrdersResponse({
                customer_id: 74, 
                date_range_start: start,
                date_range_end: end, 
            }
        );

        expect(response.data).toBeUndefined();
        expect(response.errors.length).toEqual(1);
        expect(response.errors[0].message).toEqual('Customer not found');
    })
});

describe('generateMockCustomersResponse', () => {
    it('returns a full list of customers with their name and id only', () => {
        const response = api.generateMockCustomersResponse();

        expect(response.data.length).toEqual(6);
    })
})