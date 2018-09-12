import React, { Component } from 'react';
import { Container, Header, Table, Grid, Dimmer, Loader, Select, Button, Icon} from 'semantic-ui-react';
import ModalSaveEdit from './components/modalSaveEdit';
const {ipcRenderer} = window.require('electron')


const options = [
  {key: 'n', text: 'Selecciona un abogado', value: ''},
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

export default class Custumers extends Component {
  
  state = {
    custumers : [],
    optLawyers: [],
  }

  componentDidMount(){
    ipcRenderer.on('list-custumers-reply', (event, arg) => {
      console.log(arg)
      this.setState({custumers: arg});
    })
    ipcRenderer.send('list-custumers', 'ping')
  }

  handleApi = (obj) => {
    console.log("jalo: ", obj)
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
        <ModalSaveEdit custumer={'null'} type="new" handleApi={this.handleApi}/>
      </Header>
      <Header as='h5' floated='right'>
      <Select placeholder='Selecciona un abogado' options={options} />
      </Header>        
      </Grid.Column>
    </Grid>
    
     <Grid>
      <Grid.Column width={16}>
        {this.state.custumers.length > 0 ? 
            <Table celled textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Correo</Table.HeaderCell>
                  <Table.HeaderCell>Celular</Table.HeaderCell>
                  <Table.HeaderCell>Télefono</Table.HeaderCell>
                  <Table.HeaderCell>Abogado</Table.HeaderCell>
                  <Table.HeaderCell>Tipo</Table.HeaderCell>
                  <Table.HeaderCell>Comentarios</Table.HeaderCell>
                  <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body> 
                { this.state.custumers.map((obj, i) => {
                   return (
                     <Table.Row key={i}>
                       <Table.Cell>{obj.dataValues.name}</Table.Cell>
                       <Table.Cell>{obj.dataValues.email}</Table.Cell>
                       <Table.Cell>{obj.dataValues.movil}</Table.Cell>
                       <Table.Cell>{obj.dataValues.phone}</Table.Cell>
                       <Table.Cell>{obj.Lawyer.dataValues.name}</Table.Cell>
                       <Table.Cell>{obj.dataValues.type_custumer}</Table.Cell>
                       <Table.Cell>{obj.dataValues.comments}</Table.Cell>
                       <Table.Cell textAlign="center">  
                         <ModalSaveEdit type="edit" handleApi={this.handleApi} custumer={obj}/>                                                                 
                         <Icon name='delete' onClick={()=>{console.log("deleted")}} />
                       </Table.Cell>
                     </Table.Row>
                   )
                    
                  })
                }                                                                    
              </Table.Body>

              <Table.Footer>                                 
              </Table.Footer>
            </Table>
          : 
          <Dimmer active inverted>
            <Loader content="Cargando..." />
          </Dimmer>
        }
        
      </Grid.Column>
    </Grid>
    </Container>
    )
  }
}
