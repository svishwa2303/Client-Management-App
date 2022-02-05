import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch}from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import Home from "./components/Home";
import Test from './components/Test';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
            <div className="container">
              <Switch> 
                    <Route exact path = "/" component = {Test}></Route>
                    <Route exact path = "/employees" component = {Test}></Route>
                    <Route exact path = "/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                    <Route exact path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                    
              </Switch>
            </div>
            <FooterComponent />
      </Router>
    </div>
    
  );
}

export default App;
