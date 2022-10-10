import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Redirect } from "react-router-dom";

// Components
import Register from "./components/register/register";
import Login from "./components/login/login";
import Homepage from "./components/homepage/homepage";
import FullSizecards from "./components/homepage/fullSizeCards/fullSizecards";

import PrivateRoute from "./utils/privateRoute";

function App() {
    return (
      <>
      {/* <FullSizecards /> */}
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Homepage />}/>
            <Route path="/yougram" element={<FullSizecards />}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>    
        </>
    );
}

export default App;