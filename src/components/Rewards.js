import React from "react";
import { getCustomers } from "../services/customers";
import CustomerList from "./CustomerList";

export const Rewards = (props) => {
    const customers = getCustomers();

    return (
        <CustomerList customers={customers} />
    );

}