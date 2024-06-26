import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DateComponent from "./datecomponent";
import { addToCart } from "../Redux/actions/CartActions";
import { useDispatch } from "react-redux";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mealType, setMealType] = useState("Lunch");
  const [mealPlan, setMealPlan] = useState("Single Day");
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [mealQuantity, setMealQuantity] = useState(1);
  const [addOns, setAddOns] = useState({ gulabJamoon: 0 });
  const [selectedDeliveryDates, setSelectedDeliveryDates] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const foodScrollContainerRef = useRef(null);
  const drinksScrollContainerRef = useRef(null);
  const foodScrollContainerRef1 = useRef(null);
  const drinksScrollContainerRef1 = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };
  const handleAddToCart = () => {
    if (
      !mealType ||
      !mealPlan ||
      mealQuantity < 1 ||
      selectedDeliveryDates.length === 0
    ) {
      alert("Please fill in all fields and select a delivery date.");
      return;
    }
    const cartItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.product_name,
      price: selectedProduct.price,
      mealQuantity,
      mealType,
      mealPlan,
      selectedDeliveryDates: selectedDeliveryDates.map((date) =>
        dayjs(date).format("YYYY-MM-DD")
      ),
      addOns,
    };
    console.log("Adding to cart:", cartItem);
    dispatch(addToCart(cartItem));
    alert("Added to cart successfully");
  };

  const handleDateSelection = (dates) => {
    setSelectedDeliveryDates(dates);
    setShowDatePicker(false);
  };
  const handleDateRemove = (dateToRemove) => {
    setSelectedDeliveryDates(
      selectedDeliveryDates.filter((date) => date !== dateToRemove)
    );
  };

  const handleCalendarClick = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await axios.get("http://localhost:9000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        const initialQuantities = response.data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const incrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, prevQuantities[id] - 1),
    }));
  };

  // const handleAddToCart = (product) => {
  //     const quantity = quantities[product.id];
  //     dispatch(addToCart({
  //         product,
  //         quantity,
  //         mealType,
  //         mealPlan,
  //         deliveryDate,
  //         addOns,
  //     }));
  //     closeOrderDetails();
  // };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handleMealPlanChange = (event) => {
    setMealPlan(event.target.value);
  };

  const handleDateChange = (event) => {
    setDeliveryDate(event.target.value);
  };

  const handleMealQuantityChange = (event) => {
    setMealQuantity(event.target.value);
  };

  const handleAddOnsChange = (name, value) => {
    setAddOns((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const closeOrderDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4">
          Delight your taste buds with our tasty
        </Typography>
        <Typography variant="h5">Meal Options</Typography>
        <Typography variant="h6">Lunch & Dinner</Typography>
      </Box>
      <Box>
        <Typography
          sx={{ textAlign: "center", my: 4, backgroundColor: "#f0f0f0" }}
          variant="h4"
        >
          Event Orders
        </Typography>
        <Typography
          sx={{
            textAlign: "start",
            my: 4,
            marginLeft: "25px",
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "24px",
          }}
          variant="h5"
        >
          Food
        </Typography>
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <IconButton
            sx={{ position: "absolute", left: 0, zIndex: 1 }}
            onClick={() => scrollLeft(foodScrollContainerRef)}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Box
            ref={foodScrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "hidden",
              gap: 2,
              padding: 2,
              backgroundColor: "#f0f0f0",
            }}
          >
            {products.map((product) => (
              <Card key={product.id} sx={{ minWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${product.images[0]}`}
                  alt={product.product_name}
                  onClick={() => handleImageClick(product)}
                  sx={{ cursor: "pointer" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Price: {product.price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <IconButton onClick={() => decrementQuantity(product.id)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2 }}>
                      {quantities[product.id]}
                    </Typography>
                    <IconButton onClick={() => incrementQuantity(product.id)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          <IconButton
            sx={{ position: "absolute", right: 0, zIndex: 1 }}
            onClick={() => scrollRight(foodScrollContainerRef)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Drinks Section */}
        <Typography
          sx={{
            textAlign: "start",
            my: 4,
            marginLeft: "25px",
            color: "#333",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "24px",
          }}
          variant="h5"
        >
          Drinks
        </Typography>
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <IconButton
            sx={{ position: "absolute", left: 0, zIndex: 1 }}
            onClick={() => scrollLeft(drinksScrollContainerRef)}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Box
            ref={drinksScrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "hidden",
              gap: 2,
              padding: 2,
              backgroundColor: "#f0f0f0",
            }}
          >
            {products.map((product) => (
              <Card key={product.id} sx={{ minWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${product.images[0]}`}
                  alt={product.product_name}
                  onClick={() => handleImageClick(product)}
                  sx={{ cursor: "pointer" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Price: {product.price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <IconButton onClick={() => decrementQuantity(product.id)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2 }}>
                      {quantities[product.id]}
                    </Typography>
                    <IconButton onClick={() => incrementQuantity(product.id)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          <IconButton
            sx={{ position: "absolute", right: 0, zIndex: 1 }}
            onClick={() => scrollRight(drinksScrollContainerRef)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Box>
          <Typography
            sx={{ textAlign: "center", my: 4, backgroundColor: "#f0f0f0" }}
            variant="h4"
          >
            Corporate Orders
          </Typography>
          <Typography
            sx={{
              textAlign: "start",
              my: 4,
              marginLeft: "25px",
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "24px",
            }}
            variant="h5"
          >
            Food
          </Typography>
          <Box
            sx={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <IconButton
              sx={{ position: "absolute", left: 0, zIndex: 1 }}
              onClick={() => scrollLeft(foodScrollContainerRef1)}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box
              ref={foodScrollContainerRef1}
              sx={{
                display: "flex",
                overflowX: "hidden",
                gap: 2,
                padding: 2,
                backgroundColor: "#f0f0f0",
              }}
            >
              {products.map((product) => (
                <Card key={product.id} sx={{ minWidth: 300 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/jpeg;base64,${product.images[0]}`}
                    alt={product.product_name}
                    onClick={() => handleImageClick(product)}
                    sx={{ cursor: "pointer" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      Price: {product.price}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <IconButton onClick={() => decrementQuantity(product.id)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 2 }}>
                        {quantities[product.id]}
                      </Typography>
                      <IconButton onClick={() => incrementQuantity(product.id)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ mt: 2 }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <IconButton
              sx={{ position: "absolute", right: 0, zIndex: 1 }}
              onClick={() => scrollRight(foodScrollContainerRef1)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {/* Drinks Section */}
          <Typography
            sx={{
              textAlign: "start",
              my: 4,
              marginLeft: "25px",
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "24px",
            }}
            variant="h5"
          >
            Drinks
          </Typography>
          <Box
            sx={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <IconButton
              sx={{ position: "absolute", left: 0, zIndex: 1 }}
              onClick={() => scrollLeft(drinksScrollContainerRef1)}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box
              ref={drinksScrollContainerRef1}
              sx={{
                display: "flex",
                overflowX: "hidden",
                gap: 2,
                padding: 2,
                backgroundColor: "#f0f0f0",
              }}
            >
              {products.map((product) => (
                <Card key={product.id} sx={{ minWidth: 300 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/jpeg;base64,${product.images[0]}`}
                    alt={product.product_name}
                    onClick={() => handleImageClick(product)}
                    sx={{ cursor: "pointer" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      Price: {product.price}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <IconButton onClick={() => decrementQuantity(product.id)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 2 }}>
                        {quantities[product.id]}
                      </Typography>
                      <IconButton onClick={() => incrementQuantity(product.id)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ mt: 2 }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <IconButton
              sx={{ position: "absolute", right: 0, zIndex: 1 }}
              onClick={() => scrollRight(drinksScrollContainerRef1)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>

        {selectedProduct && (
          <Modal open={showDetails} onClose={closeOrderDetails}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 1500,
                bgcolor: "background.paper",
                boxShadow: 24,
                maxHeight: "90vh",
                overflowY: "auto", 
                p: 4,
                outline: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" component="h2">
                  {selectedProduct.product_name}
                </Typography>
                <IconButton onClick={closeOrderDetails}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64,${selectedProduct.images[0]}`}
                    alt="mealbox"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      maxHeight: "500px", // Ensures the image does not exceed a certain height
                    }}
                  />
                </Box>
                <Box sx={{ width: "50%" }}>
                  <Typography variant="h6">{`Price: ${selectedProduct.price}`}</Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", my: 2 }}
                  >
                    {selectedProduct.description}
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel shrink>MEAL TYPE</InputLabel>
                    <Select
                      value={mealType}
                      onChange={handleMealTypeChange}
                      displayEmpty
                      label="MEAL TYPE"
                    >
                      <MenuItem value="" disabled>
                        Select Meal Type
                      </MenuItem>
                      <MenuItem value="Lunch">Lunch</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel shrink>MEAL PLAN</InputLabel>
                    <Select
                      value={mealPlan}
                      onChange={handleMealPlanChange}
                      displayEmpty
                      label="MEAL PLAN"
                    >
                      <MenuItem value="" disabled>
                        Select Meal Plan
                      </MenuItem>
                      <MenuItem value="Single Day">Single Day</MenuItem>
                    </Select>
                  </FormControl>
                  <div>
                    <TextField
                      label="Delivery Date"
                      type="text"
                      value={selectedDeliveryDates
                        .map((date) => dayjs(date).format("YYYY-MM-DD"))
                        .join(", ")}
                      fullWidth
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                            onClick={handleCalendarClick}
                          >
                            📅
                          </span>
                        ),
                      }}
                    />
                    {showDatePicker && (
                      <DateComponent onSelect={handleDateSelection} />
                    )}
                  </div>
                  <TextField
                    label="Meal Quantity"
                    type="number"
                    value={mealQuantity}
                    onChange={handleMealQuantityChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h6">Add-ons</Typography>
                  <Typography variant="body2">GULAB JAMOON</Typography>
                  <TextField
                    type="number"
                    value={addOns.gulabJamoon}
                    onChange={(e) =>
                      handleAddOnsChange("gulabJamoon", e.target.value)
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
