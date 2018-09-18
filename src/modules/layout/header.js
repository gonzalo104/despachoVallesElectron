import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';
import  './styles.css';

 class Home extends Component {
  state = { activeItem: 'Clientes' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    switch (name) {
      case 'Clientes': 
            this.props.history.push('/')   
        break;
      case 'Citas': 
            this.props.history.push('/appointments')
      default: 
        break;
    }    
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='huge'>
        <Menu.Item name='Clientes' active={activeItem === 'Clientes'} onClick={this.handleItemClick} />
        <Menu.Item name='Citas' active={activeItem === 'Citas'} onClick={this.handleItemClick}/>
        <Menu.Item name='Expedientes' active={activeItem === 'Expedientes'} onClick={this.handleItemClick}/>
        <Menu.Item name='Finanzas' active={activeItem === 'Finanzas'} onClick={this.handleItemClick}/>
        <Menu.Item name='Catálagos' active={activeItem === 'Catálagos'} onClick={this.handleItemClick}/>      
        <Dropdown item text='Herramientas'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        <Menu.Menu position='right'>        
          <Menu.Item>
            <Button primary>Salir</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
export default withRouter(Home);