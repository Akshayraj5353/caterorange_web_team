"use strict";

import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Link, Grid, Box, Typography, Container, Alert, AlertTitle,
    createTheme
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Googlesignin from './googlesignin';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                www.caterorange.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const [alert, setAlert] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else {
            setPasswordError('');
        }

        const values = {
            email: data.get('email'),
            password: data.get('password'),
            confirm_password: data.get('confirmPassword'),
            firstname: data.get('firstName'),
            //   address: data.get('address'),
              phone_number: data.get('phonenumber'),
            lastname: data.get('lastName'),
            role_id: 1
        };

        try {
            await axios.post('http://localhost:9000/api/users', values);
            setAlert({ type: 'success', message: 'Signup successful! Redirecting to login page...' });
            setTimeout(() => {
                window.location.href = '/';
            }, 5000);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Signup failed. Please try again.';
            setAlert({ type: 'error', message: errorMessage });
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {alert && (
                        <Alert severity={alert.type} sx={{ mt: 3, width: '100%' }}>
                            <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                            {alert.message}
                        </Alert>
                    )}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phonenumber"
                                    label="Phone Number"
                                    id="phonenumber"
                                    autoComplete="new-phonenumber"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={passwordError !== ''}
                                    helperText={passwordError}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    label="Full Address"
                                    id="address"
                                    autoComplete="new-address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="pincode"
                                    label="Pincode"
                                    id="pincode"
                                    autoComplete="new-pincode"
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>

                        <Googlesignin />

                        {/* <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        /> */}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/Signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

// "use strict";

// import {
//     Avatar, Button, CssBaseline, TextField, FormControlLabel,
//     Checkbox, Link, Grid, Box, Typography, Container, Alert, AlertTitle,
//     createTheme
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import Googlesignin from './googlesignin';
// import { useState } from 'react';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="/">
//                 www.caterorange.com
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const defaultTheme = createTheme();

// export default function SignUp() {
//     const [alert, setAlert] = useState(null);
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);

//         if (password !== confirmPassword) {
//             setPasswordError("Passwords do not match");
//             return;
//         } else {
//             setPasswordError('');
//         }

//         const values = {
//             email: data.get('email'),
//             password: data.get('password'),
//             name: data.get('firstName'),
//             address: data.get('address'),
//             phone_number: data.get('phonenumber'),
//             pincode: data.get('pincode')
//         };

//         try {
//             await axios.post('http://localhost:9000/api/users', values);
//             setAlert({ type: 'success', message: 'Signup successful! Redirecting to login page...' });
//             setTimeout(() => {
//                 window.location.href = '/';
//             }, 5000);
//         } catch (error) {
//             setAlert({ type: 'error', message: 'Signup failed. Please try again.' });
//         }
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign up
//                     </Typography>
//                     {alert && (
//                         <Alert severity={alert.type} sx={{ mt: 3, width: '100%' }}>
//                             <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
//                             {alert.message}
//                         </Alert>
//                     )}
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     autoComplete="given-name"
//                                     name="firstName"
//                                     required
//                                     fullWidth
//                                     id="firstName"
//                                     label="First Name"
//                                     autoFocus
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="lastName"
//                                     label="Last Name"
//                                     name="lastName"
//                                     autoComplete="family-name"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="phonenumber"
//                                     label="Phone Number"
//                                     id="phonenumber"
//                                     autoComplete="new-phonenumber"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Email Address"
//                                     name="email"
//                                     autoComplete="email"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     id="password"
//                                     autoComplete="new-password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="confirmPassword"
//                                     label="Confirm Password"
//                                     type="password"
//                                     id="confirmPassword"
//                                     autoComplete="new-password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     error={passwordError !== ''}
//                                     helperText={passwordError}
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="address"
//                                     label="Full Address"
//                                     id="address"
//                                     autoComplete="new-address"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="pincode"
//                                     label="Pincode"
//                                     id="pincode"
//                                     autoComplete="new-pincode"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <FormControlLabel
//                                     control={<Checkbox value="allowExtraEmails" color="primary" />}
//                                     label="I want to receive inspiration, marketing promotions and updates via email."
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Sign Up
//                         </Button>

//                         {/* <Googlesignin /> */}

//                         {/* <GoogleLogin
//                 onSuccess={credentialResponse => {
//                     console.log(credentialResponse);
//                 }}
//                 onError={() => {
//                     console.log('Login Failed');
//                 }}
//             /> */}
//                         <Grid container justifyContent="flex-end">
//                             <Grid item>
//                                 <Link href="/" variant="body2">
//                                     Already have an account? Sign in
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//                 <Copyright sx={{ mt: 5 }} />
//             </Container>
//         </ThemeProvider>
//     );
// }