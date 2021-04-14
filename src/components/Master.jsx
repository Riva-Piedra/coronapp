import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Formlogin from "./formLogin";
import Register from "./formRegister";
import Dashboard from "./dashboard";


const Master = () => {
    return (
        <Router>
            <div className="box">
                 <Switch>
                     <Route path="/" exact> <Formlogin /> </Route>
                     <Route path="/registro" exact> <Register /> </Route>
                     <Route path="/dashboard/"> <Dashboard/> </Route> 
                 </Switch>       
            </div>
        </Router>        
    )
}


export default Master