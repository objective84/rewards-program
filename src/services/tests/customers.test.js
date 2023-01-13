import { getOrders } from "../customers";

describe('getOrders', () => {
    it('gets a list of customer orders with the name and id of the customer', () => {
        const customer = getOrders("3", new Date('10/12/2022'), new Date('1/12/2023'));

        expect(customer.id).toEqual(3);
        expect(customer.name).toEqual("Steve Rogers");
        expect(customer.rewardPointTotal).toEqual(199);
        expect(customer.orders.length).toEqual(4);
    })
})