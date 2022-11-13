import "./App.scss";
import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

// Components
import Register from "./components/register/register";
import Login from "./components/login/login";
import Homepage from "./components/homepage/homepage";
import Linkpage from "./components/linkpage/linkpage";
import Createpage from "./components/createpage/createpage";
import FullSizecards from "./components/homepage/fullSizeCards/fullSizecards";

import PrivateRoute from "./utils/privateRoute";

function App() {
  const [user, setUser] = useState("");

    return (
      <>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/createpage" element={<Createpage />} />
          <Route path="/linkpage" element={<Linkpage />} />
          <Route path="/" element={<Homepage user={user} setUser={setUser}/>}/>
          <Route path="/yougram" element={<FullSizecards />}/>
        </Route>
        <Route path="/login" user={user} setUser={setUser} element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </>
    );
}

export default App;