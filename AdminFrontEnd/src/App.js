import logo from './logo.svg';
import react from 'react';
import AdminMaster from './Components/AdminMaster/AdminMaster';
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import ListUsers from "./Components/ListUser/ListUser";
import BlockedUsers from "./Components/BlockedUsers/BlockedUsers";
import AddCategories from "./Components/AddCategories/AddCategories";
import ListCategories from "./Components/ListCategories/ListCategories";
import ListSubCategories from "./Components/ListSubCategories/ListSubCategories";
import AddSubCategory from "./Components/AddSubCategory/AddSubCategory";
import Page404 from "./Components/Page404/Page404";
import ListPosts from "./Components/ListPosts/ListPosts";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import './App.css';

export default class App extends react.Component {
  constructor(props){
    super(props);
  }
  render(){
  return (
    <Router>

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route  path="/" element={<AdminMaster />}>
        <Route index element={<Dashboard/>}/>
        <Route path="listusers" element={<ListUsers/>}/>     
        <Route path="blockedusers" element={<BlockedUsers/>}/>  
        <Route path="addcategories" element={<AddCategories/>} />    
        <Route path="listcategories" element={<ListCategories/>}/> 
        <Route path="listsubcategory/:id/:cat" element={<ListSubCategories />}/> 
        <Route path="addSubCategory/:id/:cat" element={<AddSubCategory/>}/>
        <Route path="listPosts" element={<ListPosts />}/>
        
   

      </Route>  
      <Route path="*" element={<Page404/>} />
    </Routes>

    </Router>
    
  );
}
}

