
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signin from './home/Signin'
import PrivateRoute from './Redux/PrivateRoute'
import SignUp from "./home/Siginup";
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
            {/* <Route path="/home/*" element={<Header />} /> */}
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
