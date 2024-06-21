import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GoogleMap, MarkerF, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import AddressModel from './AddressModel';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter = {
    lat: 17.440801,
    lng: 78.383119
};

const AddAddressForm = ({ open, handleClose, handleSave, addressToEdit }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCs1DjlgxoFAi1HJpqFrL6bto3KYHg0I7I"
    });

    const [address, setAddress] = useState(new AddressModel());
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    useEffect(() => {
        if (addressToEdit) {
            setAddress(addressToEdit);
            setCenter({ lat: addressToEdit.latitude, lng: addressToEdit.longitude });
            setMarkerPosition({ lat: addressToEdit.latitude, lng: addressToEdit.longitude });
        } else {
            setAddress(new AddressModel());
            setCenter(defaultCenter);
            setMarkerPosition(defaultCenter);
        }
    }, [addressToEdit]);

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const handleCenterChanged = useCallback(() => {
        if (map) {
            const newCenter = map.getCenter();
            setMarkerPosition({
                lat: newCenter.lat(),
                lng: newCenter.lng()
            });
            setAddress((prevAddress) => ({
                ...prevAddress,
                latitude: newCenter.lat(),
                longitude: newCenter.lng()
            }));
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            map.addListener('center_changed', handleCenterChanged);
            return () => {
                window.google.maps.event.clearListeners(map, 'center_changed');
            };
        }
    }, [map, handleCenterChanged]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    };

    const handleSubmit = () => {
        handleSave(address);
        handleClose();
    };

    const handleMarkerClick = () => {
        setShowInfoWindow(true);
    };

    const handleInfoWindowCloseClick = () => {
        setShowInfoWindow(false);
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                    setMarkerPosition({ lat: latitude, lng: longitude });
                    if (map) {
                        map.panTo({ lat: latitude, lng: longitude });
                    }
                    setAddress((prevAddress) => ({
                        ...prevAddress,
                        latitude: latitude,
                        longitude: longitude
                    }));
                },
                () => {
                    alert('Failed to get current location.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>{addressToEdit ? 'Edit Address' : 'Add Address'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="full_address"
                    label="Full Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.full_address}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="pincode"
                    label="Pincode"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.pincode}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="latitude"
                    label="Latitude"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.latitude}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="longitude"
                    label="Longitude"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.longitude}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="contact_number"
                    label="Contact Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.contact_number}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="state"
                    label="State"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.state}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="nearby_location"
                    label="Nearby Location"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.nearby_location}
                    onChange={handleChange}
                />
                {isLoaded && (
                    <div style={{ position: 'relative' }}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={14}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            options={{ draggableCursor: 'crosshair' }}
                        >
                            <MarkerF
                                position={markerPosition}
                                onClick={handleMarkerClick}
                            />
                            {showInfoWindow && (
                                <InfoWindowF
                                    position={markerPosition}
                                    onCloseClick={handleInfoWindowCloseClick}
                                >
                                    <div>
                                        <h3>Location Info</h3>
                                        <p>Latitude: {markerPosition.lat}</p>
                                        <p>Longitude: {markerPosition.lng}</p>
                                    </div>
                                </InfoWindowF>
                            )}
                        </GoogleMap>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGetCurrentLocation}
                            style={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                zIndex: 1
                            }}
                        >
                            <LocationOnIcon />
                            Use My Location
                        </Button>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAddressForm;


// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import AddressModel from './AddressModel';

// const AddAddressForm = ({ open, handleClose, handleSave, addressToEdit }) => {
//     const [address, setAddress] = useState(new AddressModel('', '', '', '', '', '', ''));

//     useEffect(() => {
//         if (addressToEdit) {
//             setAddress(addressToEdit);
//         } else {
//             setAddress(new AddressModel('', '', '', '', '', '', ''));
//         }
//     }, [addressToEdit]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddress({ ...address, [name]: value });
//     };

//     const handleSubmit = () => {
//         handleSave(address);
//         handleClose();
//     };

//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>{addressToEdit ? 'Edit Address' : 'Add Address'}</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     name="fullAddress"
//                     label="Full Address"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={address.full_Address}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     margin="dense"
//                     name="pincode"
//                     label="Pincode"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={address.pincode}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     margin="dense"
//                     name="latitude"
//                     label="Latitude"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={address.latitude}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     margin="dense"
//                     name="longitude"
//                     label="Longitude"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={address.longitude}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     margin="dense"
//                     name="contactNumber"
//                     label="Contact Number"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={address.contact_number}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     margin="dense"
//                     name="state"
//                     label="State"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={address.state}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     margin="dense"
//                     name="nearbyLocation"
//                     label="Land Mark"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={address.nearby_location}
//                     onChange={handleChange}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button onClick={handleSubmit}>Save</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default AddAddressForm;
