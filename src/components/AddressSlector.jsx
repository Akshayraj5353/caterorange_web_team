import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Menu, MenuItem, ListItemText, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddAddressForm from './AddAddressForm'; // Assuming you have this component

const AddressSelection = () => {
  const [addresses, setAddresses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const token = useSelector((state) => state.authentication.token);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/getAddresses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data);
      setSelectedAddress(response.data[0]?.full_address || '');
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDetectCurrentLocation = () => {
    console.log('Detecting current location...');
  };

  const handleAddAddress = async (address) => {
    if (addressToEdit) {
      try {
        await axios.put(`http://localhost:9000/api/updateAddress/${addressToEdit.id}`, address, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(addresses.map((addr) => (addr.id === addressToEdit.id ? { ...addr, ...address } : addr)));
        setAddressToEdit(null);
      } catch (error) {
        console.error('Error updating address:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:9000/api/createAddress', address, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses([...addresses, response.data]);
      } catch (error) {
        console.error('Error adding address:', error);
      }
    }
  };

  const handleEditAddress = (address) => {
    setAddressToEdit(address);
    setOpenForm(true);
  };

  const handleDeleteAddress = (id) => {
    setAddressToDelete(id);
    setOpenConfirmDelete(true);
  };

  const confirmDeleteAddress = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/deleteAddress/${addressToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(addresses.filter((addr) => addr.id !== addressToDelete));
      setOpenConfirmDelete(false);
      setAddressToDelete(null);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSelectAddress = (fullAddress) => {
    setSelectedAddress(fullAddress);
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        aria-controls="address-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ color: 'white', textTransform: 'none' }}
        endIcon={<ArrowDropDownIcon />}
      >
        <LocationOnIcon />
        {selectedAddress || 'Select Address'}
      </Button>
      <Menu
        id="address-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDetectCurrentLocation}>
          <GpsFixedIcon sx={{ mr: 1, color: theme.palette.error.main }} />
          <ListItemText primary="Detect Current Location" secondary="Using GPS" />
        </MenuItem>
        <MenuItem onClick={() => setOpenForm(true)}>
          <AddIcon sx={{ mr: 1 }} />
          <ListItemText primary="Add Address" />
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="subtitle1">Saved Addresses</Typography>
        </MenuItem>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <MenuItem key={address.id} onClick={() => handleSelectAddress(address.full_address)}>
              <ListItemText
                primary={address.full_address}
                secondary={`${address.nearby_location}, ${address.state}`}
              />
              <Button onClick={() => handleEditAddress(address)} color="primary">
                Edit
              </Button>
              <Button onClick={() => handleDeleteAddress(address.id)} color="secondary">
                Delete
              </Button>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <ListItemText primary="No saved addresses" />
          </MenuItem>
        )}
      </Menu>
      <AddAddressForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleSave={handleAddAddress}
        addressToEdit={addressToEdit}
      />
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this address?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button onClick={confirmDeleteAddress} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressSelection;
