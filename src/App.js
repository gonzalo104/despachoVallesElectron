import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {HashRouter, Route, BrowserRouter} from "react-router-dom";
import Header from './modules/layout/header';
import Custumers from './modules/custumers/custumers'
import Appointments from './modules/appointments/appointments';
import CaseFile from './modules/caseFile/caseFile';
import Users from './modules/users/users';



class App extends Component {

   render() {    
    return (
      <div className="App">
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact path = "/" component = { Custumers }/>      
          <Route exact path = "/appointments" component={Appointments}/>      
          <Route exact path="/casefile" component={CaseFile}/> 
          <Route exact path="/users" component={Users}/>
        </div>
      </BrowserRouter>      
      
      </div>
    );
  }
}

export default App;
