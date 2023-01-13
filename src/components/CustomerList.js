import React, {useState} from "react";
import { getOrders } from '../services/customers';
import CustomerModal from './CustomerModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const styles = { 
    position: 'absolute', 
    left: '38%', 
    width: 450, 
    height: 300, 
    maxWidth: 500, 
    bgcolor: 'background.paper',
    border: '1px black solid'
}

const CustomerList = ({ customers }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState();

    const openCustomerModal = ({currentTarget}) => {
        setSelectedCustomer(getOrders(currentTarget.id, new Date('10/12/2022'), new Date('1/12/2023')));
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);


    return (<>
        <Box sx={styles}>
            <List>
                {customers.map(customer => (
                    <ListItem class='customer' key={customer.id} disablePadding>
                        <ListItemButton onClick={openCustomerModal} id={customer.id}>
                            <ListItemText sx={{width: '80%'}} primary={customer.name} />
                            <ListItemText sx={{width: '20%'}} primary={customer.rewardPointTotal} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
        <CustomerModal 
            showModal={showModal} 
            customer= {selectedCustomer} 
            handleCloseModal= {handleCloseModal}
        />
     </>
    )
}

export default CustomerList;