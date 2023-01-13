import React from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CustomerModal = (props) => {
    const {customer, showModal, handleCloseModal} = props;

    //I would notmally use something like moment.js here, but this will do.
    const formatDate = (date) => {
        var year = date.getFullYear();
        
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }

    return (
        <>
        {customer &&
        <Modal 
            open={showModal} 
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                
            <Box sx={styles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {customer.name}
                </Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Purchase Total</TableCell>
                        <TableCell align="right">Reward Points</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {customer.orders.map((order) => (
                        <TableRow
                        key={order.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {formatDate(order.date)}
                        </TableCell>
                        <TableCell align="right">${(order.total.toFixed(2))}</TableCell>
                        <TableCell align="right">{order.rewardPoints}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
            
        </Modal>
}
        </>
    )
}

export default CustomerModal;