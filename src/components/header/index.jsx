// import * as React from 'react';
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { Button, Menu as MuiMenu, ListItemText } from '@mui/material';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../Redux/actions/authActions';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// import Layout from '../Layout'
// import PrivateRoute from '../../Redux/PrivateRoute'

// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#548713', // Change this to your desired color
//     },
//   },
// })

// export default function Header() {
//   const [auth, setAuth] = React.useState(true);
//   const token = useSelector((state) => state.authentication.token);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [addressAnchorEl, setAddressAnchorEl] = React.useState(null);
//   const [addresses, setAddresses] = React.useState([]);
//   const [selectedAddress, setSelectedAddress] = React.useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     // Fetch addresses from the API
//     const fetchAddresses = async () => {
//       const token = await localStorage.getItem('token');
//       const response = await fetch('http://localhost:9000/api/getAddresses', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }); // Replace 1 with actual user ID
//       const data = await response.json();
//       setAddresses(data);
//       setSelectedAddress(data[0]?.full_address); // Set the first address as default
//     };
//     fetchAddresses();
//   }, []);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleAddressMenu = (event) => {
//     setAddressAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAddressAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   const handleAddressChange = (address) => {
//     setSelectedAddress(address);
//     handleClose();
//   };

//   return (
//     <ThemeProvider theme={customTheme}>
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
//         <AppBar position="absolute">
//           <Toolbar>
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               CaterOrange
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Button
//                 aria-controls="address-menu"
//                 aria-haspopup="true"
//                 onClick={handleAddressMenu}
//                 sx={{ color: 'white', textTransform: 'none' }}
//                 endIcon={<ArrowDropDownIcon />}
//               >
//                 <LocationOnIcon />
//                 {selectedAddress || 'Select Address'}
//               </Button>
//               <MuiMenu
//                 id="address-menu"
//                 anchorEl={addressAnchorEl}
//                 keepMounted
//                 open={Boolean(addressAnchorEl)}
//                 onClose={handleClose}
//               >
//                 {addresses.map((address) => (
//                   <MenuItem
//                     key={address.id}
//                     onClick={() => handleAddressChange(address.full_address)}
//                   >
//                     <ListItemText primary={address.full_address} secondary={`${address.nearby_location}, ${address.state}`} />
//                   </MenuItem>
//                 ))}
//                 <MenuItem onClick={() => navigate('/addAddress')}>
//                   <ListItemText primary="Add New Address" />
//                 </MenuItem>
//               </MuiMenu>
//             </Box>
//             {token ? ( // Check if token exists
//               <div>
//                 <IconButton onClick={handleLogout} color="inherit">
//                   <LogoutIcon />
//                 </IconButton>
//                 <IconButton
//                   size="large"
//                   aria-label="account of current user"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                   onClick={handleMenu}
//                   color="inherit"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem onClick={handleClose}>Profile</MenuItem>
//                   <MenuItem onClick={handleClose}>My account</MenuItem>
//                 </Menu>
//               </div>
//             ) : (
//               <div >
//                 <MenuItem onClick={() => navigate('/Signin')}>Login</MenuItem>
//                 <MenuItem onClick={() => navigate('/signup')}>Signup</MenuItem>
//               </div>
//             )}
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="main"
//           sx={{
//             backgroundColor: (theme) =>
//               theme.palette.mode === 'light'
//                 ? theme.palette.grey[100]
//                 : theme.palette.grey[900],
//             flexGrow: 1,
//             height: '100vh',
//             overflow: 'auto',
//           }}
//         >
//           <Toolbar />
//           <Routes >
//             <Route path='/' element={<Layout />} />
//             <Route element={<PrivateRoute />}>
//               <Route path="/test" element={<Header />} />
//             </Route>
//             {/* <Route path='/productmanagement' element={<Productmanagement />} />
//             <Route path='/categorymanagement' element={<AddCategoryAndSubcategory />} />
//             <Route path='/Orders' element={<OrderCard />} />
//             <Route path='/Roles' element={<Roles />} /> */}
//           </Routes>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/actions/authActions';
import LogoutIcon from '@mui/icons-material/Logout';

import Layout from '../Layout'
import PrivateRoute from '../../Redux/PrivateRoute'
import AddressSelector from '../AddressSlector'
import Cart from '../supriya/Cart'
import { Link } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#548713', // Change this to your desired color
    },
  },
})

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const token = useSelector((state) => state.authentication.token);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };


  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" >
          <Toolbar >
            <Typography
              component={Link} 
              to="/" 
              // component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              CaterOrange
            </Typography>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon />
            </IconButton>
            <AddressSelector />
            {token ? ( // Check if token exists
              <div>
                <IconButton onClick={handleLogout} color="inherit">
                  <LogoutIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            ) : (
              <div >
                <MenuItem onClick={() => navigate('/Signin')}>Login</MenuItem>
                <MenuItem onClick={() => navigate('/signup')}>Signup</MenuItem>
              </div>
            )}

          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Routes >
            <Route path='/' element={<Layout />} />
            <Route element={<PrivateRoute />}>
              <Route path="/Cart" element={<Cart />} />
            </Route>
            {/* <Route path='/productmanagement' element={<Productmanagement />} />
            <Route path='/categorymanagement' element={<AddCategoryAndSubcategory />} />
            <Route path='/Orders' element={<OrderCard />} />
            <Route path='/Roles' element={<Roles />} /> */}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}