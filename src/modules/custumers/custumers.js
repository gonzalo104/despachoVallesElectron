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


  constructor(){
    super()
    this.state = {
      openModal    : false,
      typeModal    : '',
      custumers    : [],
      optLawyers   : [],
      id           : 0,
      name         : '',
      email        : '',
      movil        : '',
      phone        : '',
      lawyer_id    : '',
      type_custumer: '',
      comments     : '',
    }
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

  closeModal = () => {
    this.setState({openModal: false});
    this.clearForm();
  }


  handleChangeForm = (e, {value ,name}) => {
    console.log(name, value)
    this.setState({[name]: value,});    
  }

  clearForm = () =>{
    this.setState({  
      id           : 0,
      name         : '',
      email        : '',
      movil        : '',
      phone        : '',
      lawyer_id    : '',
      type_custumer: '',
      comments     : '',
    });
  }

  prepareModal = (obj) => {
    this.setState({
      openModal    : true,
      typeModal    : 'edit',
      id           : obj.dataValues.id,
      name         : obj.dataValues.name,
      email        : obj.dataValues.email ? obj.dataValues.email      : '',
      movil        : obj.dataValues.movil ? obj.dataValues.movil      : '',
      phone        : obj.dataValues.phone ? obj.dataValues.phone      : '',
      lawyer_id    : obj.dataValues.lawyer_id,
      type_custumer: obj.dataValues.type_custumer,
      comments     : obj.dataValues.comments ? obj.dataValues.comments: '',
    });
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
          <Button positive onClick={ () => {this.setState({openModal: true, typeModal: 'new'})}} >Nuevo Cliente</Button>      
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
                         <Icon color="blue" name='edit' onClick={ () => this.prepareModal(obj)} />
                         <Icon color="red" name='delete' onClick={()=>{console.log("deleted")}} />
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
       <ModalSaveEdit openM={this.state.openModal} type={this.state.typeModal} closeModal={this.closeModal} handleChange={this.handleChangeForm} values={this.state}/>
    </Container>        

    )
  }
}
