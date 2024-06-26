
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signin from './Screens/login/Signin'
import PrivateRoute from './Redux/PrivateRoute'
import SignUp from "./Screens/login/Siginup";
import Header from "./components/header/index";


function App() {
  return (
    <React.Fragment >
      <Router>
        <Routes>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/*" element={<Header />} />
          <Route element={<PrivateRoute />}>
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
