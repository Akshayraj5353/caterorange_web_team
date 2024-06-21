import React, { useContext } from "react";
import { CartContext } from "./Cartcontext.js";
// import "../styles/cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.mealQuantity,
    0
  );

  const updateQuantity = (index, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, mealQuantity: parseInt(item.mealQuantity, 10) + amount }
          : item
      )
    );
  };

  const backgroundImage = "https://wallpapercave.com/wp/wp2800736.jpg";
  const deleteItem = (index) => {
    console.log("Deleting item at index", index);

    setCartItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          padding: "100px",
          textAlign: "center",
          color: "white",
          width: "100%",
        }}
      >
        <Typography variant="h4">ORDER</Typography>
      </Box>
      <Box sx={{ padding: "10px 20px" }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link
            color="inherit"
            sx={{ fontWeight: "bold", color: "black", fontSize: "18px" }}
            href="/"
          >
            HOME
          </Link>
          <Typography
            sx={{ fontWeight: "bold", color: "black", fontSize: "18px" }}
          >
            ORDER
          </Typography>
        </Breadcrumbs>
      </Box>

      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen || isMediumScreen ? "column" : "row",
            margin: "20px",
            columnGap: "100px",
          }}
        >
          <Box
            sx={{
              width: isSmallScreen || isMediumScreen ? "100%" : "70%",
              marginRight: isSmallScreen || isMediumScreen ? "0" : "24px",
              marginBottom: isSmallScreen || isMediumScreen ? "24px" : "0",
            }}
          >
            <TableContainer
              sx={{
                border: "2px solid lightgrey",
                borderRadius: "10px",
                overflowX: "auto", // Enable horizontal scrolling on small screens
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Delivery Dates</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {item.productName}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {item.mealType}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {item.mealPlan}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <Button
                            style={{
                              minWidth: "30px",
                              fontSize: "1rem",
                              
                            }}
                            onClick={() => {
                              updateQuantity(index, -1);
                              
                            }}
                           variant="contained"
                            color="primary" 
                          > 
                            -
                          </Button>
                          <span style={{ fontSize: "1rem" ,marginLeft:'5px'}}>
                            {item.mealQuantity}
                          </span>
                          <Button
                            style={{
                              minWidth: "30px",
                              fontSize: "1rem",
                              marginLeft: "8px",
                            }}
                            onClick={() => {
                              updateQuantity(index, 1);
                              
                            }}
                            variant="contained"
                            color="primary"
                          >
                            +
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {(item.selectedDeliveryDates || []).map((date) => (
                          <div key={date}>
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {(item.price * item.mealQuantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            deleteItem(index);
                            console.log("Item deleted at index", index);
                          }}
                          sx={{ color: "black" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              width: isSmallScreen || isMediumScreen ? "100%" : "300px",
              height: "400px", // Fixed height
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Space out content
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cart Total
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">₹{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ₹{subtotal.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ mt: "16px" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: "16px", backgroundColor: "orange" }}
              >
                PROCEED TO PAY
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: "8px", backgroundColor: "red",  }}
              >
                <Link
                  href="/"
                  sx={{color:'white', textDecoration:'none'}} 
                >
                  CONTINUE ORDERING
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Cart;
