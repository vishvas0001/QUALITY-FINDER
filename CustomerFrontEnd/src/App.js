import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import ContactUs from "./Components/ContactUs/ContactUs";
import About from "./Components/About/About";
import AdPost from "./Components/AdPost/AdPost";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserMaster from "./Components/UserMaster/UserMaster";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Web404 from "./Components/404/Web404";
import Profile from "./Components/Profile/Profile";
import ItemByCategory from "./Components/ItemByCategory/ItemByCategory";
// import Temp from "./Components/Temp/Temp";


import AdView from "./Components/AdView/AdView";
import ItemByTitle from "./Components/ItemByCategory/itembytitle";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserMaster />}>
            <Route index element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/adPost" element={<AdPost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/:name/:id" element={<ItemByCategory />} />
            <Route path ="/adview/:id" element={<AdView/>} />
            <Route path ="/s/:title/:cId" element={<ItemByTitle/>} />
            <Route path ="/s/:title" element={<ItemByTitle/>} />
          </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          <Route path="*" element={<Web404/>}/>  
          {/* <Route path="/temp" element={<Temp/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
