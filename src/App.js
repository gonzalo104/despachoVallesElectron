import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './modules/layout/header';
import Custumers from './modules/custumers/custumers';

class App extends Component {

   render() {    
    return (
      <div className="App">
        <Header/>
        <Custumers/>
      </div>
    );
  }
}

export default App;
