import React, { Component } from 'react';
import { Container, Header, Table, Grid} from 'semantic-ui-react';
const {ipcRenderer} = window.require('electron')


const headerRow = ['Nombre', 'Correo', 'Télefono', 'Celular', 'Tipo','Comentarios', 'Acciones']

const renderBodyRow = (data, i) => {
  return ({
    key  : data.dataValues.name || `row-${i}`,
    cells: [
      data.dataValues.name ,
      data.dataValues.email    ? data.dataValues.email   : 'N/A',
      data.dataValues.phone ? data.dataValues.phone: 'N/A',
      data.dataValues.movil ? data.dataValues.movil: 'N/A',
      data.dataValues.type_custumer ? data.dataValues.type_custumer: 'N/A',
      data.dataValues.comments ? data.dataValues.comments: 'N/A',
      'Editar, Eliminar'
    ],
    });
} 

export default class Custumers extends Component {
  
  state = {
    custumers: [],
  }

  componentDidMount(){

    ipcRenderer.on('list-custumers-reply', (event, arg) => {
      this.setState({custumers: arg});
    })
    ipcRenderer.send('list-custumers', 'ping')
  }

  render() {
    return (
    <Container>
    <Header as='h2'>Clientes</Header>
     <Grid>
      <Grid.Column width={16}>
        <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={this.state.custumers} />
      </Grid.Column>
    </Grid>
    </Container>
    )
  }
}
