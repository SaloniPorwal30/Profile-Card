import React from "react";
import { Routes, Route } from "react-router-dom";
import Directory from "../Pages/Directory/UserDirectory";
import Profile from "../Pages/Profile/UserProfile";

const Routers = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Directory />} />
      <Route exact path="/user/:id" element={<Profile />} />
    </Routes>
  );
};

export default Routers;
