import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OrderData from './DataCollection'; // Assuming you have an OrderData array

const ProductCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [mealType, setMealType] = useState('Lunch');
  const [mealPlan, setMealPlan] = useState('Single Day');
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealQuantity, setMealQuantity] = useState(1);
  const [addOns, setAddOns] = useState({ gulabJamoon: 0 });
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    setAddOns(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    // Handle adding to cart logic here
  };

  const orderDetails = (index) => {
    setSelectedItemIndex(index);
    setShowDetails(true);
  };

  const closeOrderDetails = () => {
    setShowDetails(false);
    setSelectedItemIndex(null);
  };

  return (
    <Box>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" component="p">Delight your taste buds with our tasty</Typography>
        <Typography variant="h5" component="p">Meal Options</Typography>
        <Typography variant="h6" component="p">Lunch & Dinner</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {OrderData.map((item, index) => (
          <Card key={index} sx={{ width: 300, cursor: 'pointer' }} onClick={() => orderDetails(index)}>
            <CardMedia
              component="img"
              height="140"
              image={item.itemImage}
              alt={item.itemName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.itemName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.itemDetails}
              </Typography>
              <Typography variant="h6" component="div">
                {item.itemPrice}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Modal open={showDetails} onClose={closeOrderDetails}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 0
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              {OrderData[selectedItemIndex]?.itemName}
            </Typography>
            <IconButton onClick={closeOrderDetails}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <img
              src={OrderData[selectedItemIndex]?.itemImage}
              alt="mealbox"
              style={{ width: '50%', height: 'auto' }}
            />
            <Box>
              <Typography variant="h6">{`Rs. ${OrderData[selectedItemIndex]?.itemPrice}`}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', my: 2 }}>
                {OrderData[selectedItemIndex]?.itemDetails}
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>MEAL TYPE</InputLabel>
                <Select value={mealType} onChange={handleMealTypeChange}>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>MEAL PLAN</InputLabel>
                <Select value={mealPlan} onChange={handleMealPlanChange}>
                  <MenuItem value="Single Day">Single Day</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Delivery Date"
                type="date"
                value={deliveryDate}
                onChange={handleDateChange}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
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
                onChange={(e) => handleAddOnsChange('gulabJamoon', e.target.value)}
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

      <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 0
        }}>
          <Typography variant="h6" component="p" sx={{ mb: 2 }}>
            Please login to continue order
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductCard;
// // ProductModal.js
// import React from 'react';
// import { Modal, Box, Typography, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const ProductModal = ({ open, onClose, product }) => {
//   if (!product) return null;

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="product-modal-title"
//       aria-describedby="product-modal-description"
//     >
//       <Box sx={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         boxShadow: 24,
//         p: 4,
//         outline: 0,
//       }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography id="product-modal-title" variant="h6" component="h2">
//             {product.product_name}
//           </Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <img
//           src={`data:image/jpeg;base64,${product.images[0]}`}
//           alt={product.product_name}
//           style={{ width: '100%', height: 'auto', marginBottom: 16 }}
//         />
//         <Typography id="product-modal-description" variant="body2" color="text.secondary">
//           {product.description}
//         </Typography>
//         <Typography variant="body1" color="text.primary">
//           Price: {product.price}
//         </Typography>
//       </Box>
//     </Modal>
//   );
// };

// export default ProductModal;
