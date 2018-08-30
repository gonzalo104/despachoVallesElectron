import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import  './styles.css';

export default class Home extends Component {
  state = { activeItem: 'Clientes' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='huge'>
        <Menu.Item name='Clientes' active={activeItem === 'Clientes'} onClick={this.handleItemClick} />
        <Menu.Item name='Citas' active={activeItem === 'Citas'} onClick={this.handleItemClick}/>
        <Menu.Item name='Expedientes' active={activeItem === 'Expedientes'} onClick={this.handleItemClick}/>
        <Menu.Item name='Finanzas' active={activeItem === 'Finanzas'} onClick={this.handleItemClick}/>
        <Menu.Item name='Catálagos' active={activeItem === 'Catálagos'} onClick={this.handleItemClick}/>
        <Menu.Item name='Herramientas' active={activeItem === 'Herramientas'} onClick={this.handleItemClick}/>
        <Menu.Item name='Salir' active={activeItem === 'Salir'} onClick={this.handleItemClick}/>

        <Menu.Menu position='right'>
          <Dropdown item text='Language'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button primary>Salir</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}