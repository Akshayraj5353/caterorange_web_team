import React, { useEffect, useState } from 'react';
import { 
    Box, 
    CircularProgress, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    IconButton 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token'); // assuming token is stored in localStorage
            try {
                const response = await axios.get('http://localhost:9000/api/getOrders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data.reverse());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <TableRow>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.TotalPrice}</TableCell>
                                    <TableCell>{order.payment_status}</TableCell>
                                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.address_details.full_address}</TableCell>
                                    <TableCell>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`order-${order.id}-content`}
                                                id={`order-${order.id}-header`}
                                            >
                                                <Typography>Expand</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Product Name</TableCell>
                                                            <TableCell>Quantity</TableCell>
                                                            <TableCell>Price</TableCell>
                                                            <TableCell>Delivery Dates</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {order.OrderItems.map((item) => (
                                                            <TableRow key={item.id}>
                                                                <TableCell>{item.ProductName}</TableCell>
                                                                <TableCell>{item.ProductQuantity}</TableCell>
                                                                <TableCell>${item.ProductPrice}</TableCell>
                                                                <TableCell>{item.dates_of_delivery.join(', ')}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </AccordionDetails>
                                        </Accordion>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderHistory;
