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
         break;
      case 'Expedientes': 
            this.props.history.push('/casefile');
         break;
      case 'Usuarios': 
            this.props.history.push('/users');
        break;
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
        <Dropdown item text='Herramientas'>
            <Dropdown.Menu>
              <Dropdown.Item name="Usuarios" onClick={this.handleItemClick}>Usuarios</Dropdown.Item>
              <Dropdown.Item>Respaldo DB</Dropdown.Item>
              <Dropdown.Item>Ayuda</Dropdown.Item>
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