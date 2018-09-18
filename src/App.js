import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {HashRouter, Route, BrowserRouter} from "react-router-dom";
import Header from './modules/layout/header';
import Custumers from './modules/custumers/custumers'
import Appointments from './modules/appointments/appointments';



class App extends Component {

   render() {    
    return (
      <div className="App">
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact path = "/" component = { Custumers }/>      
          <Route exact path = "/appointments" component={Appointments}/>       
        </div>
      </BrowserRouter>      
      
      </div>
    );
  }
}

export default App;
