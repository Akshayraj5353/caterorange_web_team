"use strict"

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Googlesignin() {
    const [alert, setAlert] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('Google login successful:', codeResponse);
            setUser(codeResponse);
        },
        onError: (error) => {
            console.error('Login Failed:', error);
            setAlert({ type: 'error', message: 'Google login failed. Please try again.' });
        }
    });

    useEffect(() => {
        const fetchGoogleProfile = async (accessToken) => {
            try {
                const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        Accept: 'application/json'
                    }
                });
                console.log('Google user profile:', response.data);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch Google profile:', error);
                throw error;
            }
        };

        const createUser = async (userData) => {
            try {
                const response = await axios.post('http://localhost:9000/api/users', userData);
                console.log('User created successfully:', response.data);
                return response.data;
            } catch (error) {
                console.error('User creation failed:', error);
                throw error;
            }
        };

        if (user) {
            (async () => {
                try {
                    const profileData = await fetchGoogleProfile(user.access_token);
                    const userData = {
                        name: profileData.name,
                        email: profileData.email,
                        password: `${profileData.given_name}@123`
                    };
                    await createUser(userData);
                    setAlert({ type: 'success', message: 'Signup successful! Redirecting to login page...' });
                    setTimeout(() => {
                        window.location.href = '/Signin';
                    }, 5000);
                } catch (error) {
                    setAlert({ type: 'error', message: 'Signup failed. Please try again.' });
                }
            })();
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
        console.log('User logged out');
    };

    return (
        <div>
            {alert && (
                <Alert severity={alert.type} sx={{ mt: 3, width: '100%' }}>
                    <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                    {alert.message}
                </Alert>
            )}
            <Button className='primary' onClick={login}>Sign in with Google 🚀 </Button>
        </div>
    );
}


// "use strict"

// import React, { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { Button } from '@mui/material';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// // import SignUpWithGoogle from '../Assets/SignUpWithGoogle.svg'


// export default function Googlesignin() {
//     const [alert, setAlert] = useState(null);
//     const [user, setUser] = useState([]);
//     const [profile, setProfile] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => setUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     useEffect(
//         () => {
//             if (user) {
//                 axios
//                     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                         headers: {
//                             Authorization: `Bearer ${user.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         const userData = {
//                             name: res.data.name,
//                             email: res.data.email,
//                             password: `${res.data.given_name}@123`,
//                         };
//                         axios.post('http://localhost:9000/api/users', userData)
//                             .then((response) => {
//                                 setAlert({ type: 'success', message: 'Signup successful! Redirecting to login page...' });
//                                 setTimeout(() => {
//                                     window.location.href = '/login';
//                                 }, 5000);
//                             })
//                             .catch((error) => setAlert({ type: 'error', message: 'Signup failed. Please try again.' }));
//                     })
//                     .catch((err) => console.log(err));
//             }
//         }, [user]);

//     // log out function to log the user out of google and set the profile array to null
//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//     };

//     return (
//         <div>
//             {alert && (
//                 <Alert severity={alert.type} sx={{ mt: 3, width: '100%' }}>
//                     <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
//                     {alert.message}
//                 </Alert>
//             )}
//             <Button className='primary' onClick={login}>Sign in with Google 🚀 </Button>
//         </div>
//     );
// }
