import React, { Component } from 'react';
import { Container, Header, Table, Grid, Dimmer, Loader, Button, Select} from 'semantic-ui-react';
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

const options = [
  {key: 'n', text: 'Selecciona un abogado', value: ''},
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

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
      <Grid>
      <Grid.Column width={16}>
      <Header as='h1' floated='left'>
        Clientes
      </Header>
      <Header floated='right'>
        <Button positive>Nuevo Cliente</Button>
      </Header>
      <Header as='h5' floated='right'>
      <Select placeholder='Selecciona un abogado' options={options} />
      </Header>        
      </Grid.Column>
    </Grid>
    
     <Grid>
      <Grid.Column width={16}>
        {this.state.custumers.length > 0 ? 
          <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={this.state.custumers} />
          :
          <Dimmer active inverted>
            <Loader content="Cargando..."  inline='centered' />
          </Dimmer>
        }
        
      </Grid.Column>
    </Grid>
    </Container>
    )
  }
}
