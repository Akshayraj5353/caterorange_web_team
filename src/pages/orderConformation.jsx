import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Link,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from 'axios';
import Cookies from 'js-cookie';

const Order = () => {
  const [orderData, setOrderData] = useState({});
  const navigate = useNavigate();
  // const orderId = Cookies.get('orderId');
  // const merchantTransactionId = Cookies.get('merchantTransactionId');
  // const token = localStorage.getItem('token');
  const merchantTransactionId = localStorage.getItem('merchantTransactionId');
  const orderId = localStorage.getItem('orderId');





  useEffect(() => {
    console.log(orderId, "orderID")
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (!token) {
        return;
      }
      try {
        console.log(merchantTransactionId,orderId)
        const statusResponse = await axios.post(`http://localhost:9000/api/status/${merchantTransactionId}`, {} , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (statusResponse.status === 200) {
          const response = await axios.get(`http://localhost:9000/api/getOrderById/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setOrderData(response.data);
          Cookies.remove('orderId');
          Cookies.remove('merchantTransactionId');
          localStorage.removeItem('orderId');
          localStorage.removeItem('merchantTransactionId');
        }
      } catch (error) {
        console.error("An error occurred while fetching order details", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, merchantTransactionId, navigate]);

  console.log(orderData, "order data")


  const {
    address_details,
    OrderItems = [],
    payment_id,
    payment_status,
    TotalPrice,
    id,
  } = orderData;

  // Conditional styling for payment status
  const getStatusColor = (status) => {
    switch (status) {
      case "PAYMENT_SUCCESS":
        return "green";
      case "FAILURE":
        return "red";
      case "Pending":
        return "orange";
      default:
        return "black";
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          Order #{id}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ marginBottom: 3, color: "#3f51b5" }}
        >
          Thank you!
        </Typography>

        <Grid container spacing={isSmallScreen || isMediumScreen ? 2 : 4}>
          {/* Left Column: Order and Payment Details */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                marginBottom: 4,
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fefefe",
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                Order Updates
              </Typography>
              <Typography variant="body1">
                You will receive order and shipping updates via email.
              </Typography>
            </Box>

            <Box
              sx={{
                marginBottom: 3,
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fefefe",
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                Address Details
              </Typography>
              <Typography>
                Full Address: {address_details?.full_address}
              </Typography>
              <Typography>
                Contact Number: {address_details?.contact_number}
              </Typography>
              <Typography>Pincode: {address_details?.pincode}</Typography>
              <Typography>Latitude: {address_details?.latitude}</Typography>
              <Typography>Longitude: {address_details?.longitude}</Typography>
              <Typography>State: {address_details?.state}</Typography>
              <Typography>
                Nearby Location: {address_details?.nearby_location}
              </Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Payment Details
              </Typography>
              <Grid container spacing={2}>
                {/* <Grid item xs={4}>
                  <Typography>Payment ID: {payment_id}</Typography>
                </Grid> */}
                <Divider orientation="vertical" flexItem />
                <Grid item xs={7}>
                  <Typography>
                    Payment Status:{" "}
                    <span style={{ color: getStatusColor(payment_status) }}>
                      {payment_status}
                    </span>
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={4}>
                  <Typography>Payment Type : { } </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Vertical Divider */}
          <Grid item xs={12} md={1}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ margin: "0 auto", height: "100%" }}
            />
          </Grid>

          {/* Right Column: Item Details */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#f9f1e9",
                padding: 3,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Your Order
              </Typography>

              {OrderItems?.map((item, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Align items in a row
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            backgroundImage: `url(data:image/jpeg;base64,${item.Product.images[0]})`,
                            width: 120,
                            height: 80,
                            backgroundSize: "cover",
                            marginRight: 2,
                          }}
                        />
                        <Box sx={{ flexGrow: 1, marginLeft: "15px" }}>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {item.ProductName}
                          </Typography>
                          <Typography variant="body2">
                            × {item.ProductQuantity}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {(item.ProductPrice * item.ProductQuantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <strong>Delivery Dates:</strong>
                        {item.dates_of_delivery.map((date, idx) => (
                          <Box key={idx} sx={{ paddingTop: 1 }}>
                            {date.split("").map((char, charIdx) => (
                              <span
                                key={charIdx}
                                style={{
                                  fontWeight: char.match(/[a-zA-Z]/)
                                    ? "bold"
                                    : "normal",
                                }}
                              >
                                {char}
                              </span>
                            ))}
                          </Box>
                        ))}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}

              <Divider sx={{ marginY: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                }}
              >
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">
                  {OrderItems
                    .reduce(
                      (acc, item) => acc + item.ProductPrice * item.ProductQuantity,
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ marginY: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="body1">Total</Typography>
                <Typography variant="body1">
                  {OrderItems
                    .reduce(
                      (acc, item) => acc + item.ProductPrice * item.ProductQuantity,
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Grid container for Continue Shopping button and Need Help link */}
        <Grid container sx={{ marginTop: 4 }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              Need Help?{" "}
              <Link
                href="/contact-us"
                sx={{
                  color: "#3f51b5",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Contact Us
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
              href="/"
            >
              Continue Ordering
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Order;
