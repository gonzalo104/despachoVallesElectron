import React, { Component } from 'react';
import { Container, Header, Table, Grid, Select, Button, Icon, Pagination} from 'semantic-ui-react';
import ModalSaveEdit from './components/modalSaveEdit';
import Loading from 'react-fullscreen-loading';
const {ipcRenderer, remote} = window.require('electron');


export default class Custumers extends Component {


  constructor(){
    super()
    this.state = {
      page             : 1,
      paginate         : 2,
      totalpages       : 0,
      overlay          : false,
      openModal        : false,
      typeModal        : '',
      custumers        : [],
      optLawyers       : [],
      id               : 0,
      name             : '',
      email            : '',
      movil            : '',
      phone            : '',
      lawyer_id        : '',
      type_custumer    : '',
      comments         : '',
      errorMessages    : [],
      movilError       : false,
      phoneError       : false,
      nameError        : false,
      emailError       : false,
      lawyerError      : false,
      typeCustumerError: false,
    }
  }
  
 
  

  componentDidMount(){
    this.ipcRenderReply();    
    ipcRenderer.send('list-custumers', {page: this.state.page, paginate: this.state.paginate})
  } 


  ipcRenderReply(){

    ipcRenderer.on('list-custumers-reply', (event, arg) => {      
      this.setState({custumers: arg.pagination.docs, optLawyers: arg.lawyers, totalpages: arg.pagination.pages});
      console.log(arg);
    })
    
    ipcRenderer.on('saveEdit-custumer-reply',(event, arg) => {        
        this.setState({custumers: arg.custumers.docs, overlay:false});     
        let message = arg.success ? 'Se registro correctamente el cliente' : 'Problemas para registrar el cliente, Intente más tarde';
        let notify  = new remote.Notification({title:'¡Atención!' ,body: message});
        notify.show();  
        console.log(arg)        
    })  

    ipcRenderer.on('pagination-custumers-reply', (event, arg) => {      
      this.setState({custumers: arg.custumers.docs});
    });

  }

  closeModal = () => {
    this.setState({openModal: false});
    this.clearForm();
  }


  handleChangeForm = (e, {value ,name}) => {    
    this.setState({[name]: value,});    
  }

  clearForm = () =>{
    this.setState({  
      id               : 0,
      name             : '',
      email            : '',
      movil            : '',
      phone            : '',
      lawyer_id        : '',
      type_custumer    : '',
      comments         : '',
      errorMessages    : [],
      movilError       : false,
      phoneError       : false,
      nameError        : false,
      emailError       : false,
      lawyerError      : false,
      typeCustumerError: false,
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

  validateFields = () => {
    this.removeErrors();
    let messages = [];
    /****VAlidate Name****/
    if (this.state.name.length < 8) {
        messages.push('El nombre debe tener al menos 8 caracteres');
        this.setState({nameError: true});
    }
    /****VAlidate EMAIL****/
    if (this.state.email.length > 0) {
      let expEmail = /\S+@\S+\.\S+/;
      if(!expEmail.test(this.state.email)){
        messages.push('El correo no es válido');
        this.setState({emailError: true})
      }
    }
    /****VAlidate MOVIL****/
    if (this.state.movil.length > 0) {
      let expMovil = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!expMovil.test(this.state.movil)) {
          messages.push('Ingrese un celular válido, (ejemplo: (481)9873519 )');
          this.setState({movilError: true})
        }
    }

      /****VAlidate PHONE****/
      if (this.state.phone.length > 0) {
        let expPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          if (!expPhone.test(this.state.phone)) {
            messages.push('Ingrese un télefono válido, (ejemplo: (481)9873519 )');
            this.setState({phoneError: true})
          }
      }
      this.setState({errorMessages: messages});

      if (this.state.errorMessages.length === 0) {
          this.setState({overlay:true});
          this.closeModal();
          const {id, name, email, movil, phone, lawyer_id, type_custumer, comments, typeModal, page, paginate } = this.state;
          ipcRenderer.send('saveEdit-custumer', {id, name, email, movil, phone, lawyer_id, type_custumer, comments, type: typeModal, page, paginate } );
        
      }
  }

  removeErrors = () =>{
    this.setState({
      errorMessages    : [],
      movilError       : false,
      phoneError       : false,
      nameError        : false,
      emailError       : false,
      lawyerError      : false,
      typeCustumerError: false,
    });
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({page: activePage});
    ipcRenderer.send('pagination-custumers',{page: activePage, paginate: this.state.paginate});
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
      <Select placeholder='Selecciona un abogado' options={this.state.optLawyers.map( obj => {return {key: obj.dataValues.id, text: obj.dataValues.name, value: obj.dataValues.id}})}  />
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
                         <a href="javascript:void(0)"><Icon color="blue" name='edit' onClick={ () => this.prepareModal(obj)} /></a>
                         <a href="javascript:void(0)"><Icon color="red" name='delete' onClick={()=>{console.log("deleted")}} /></a>
                       </Table.Cell>
                     </Table.Row>
                   )
                    
                  })  
                }                                                                    
              </Table.Body>

              <Table.Footer>  
                <Table.Row>
                  <Table.HeaderCell colSpan='8' textAlign="right">
                  <Pagination  onPageChange={this.handlePaginationChange}  defaultActivePage={this.state.page} totalPages={this.state.totalpages} />    
                  </Table.HeaderCell>
                </Table.Row>              
              </Table.Footer>              
            </Table>            
          : 
          <h4>No hay clientes para mostrar</h4>
          
        }
        
      </Grid.Column>
    </Grid>
       <ModalSaveEdit openM={this.state.openModal} type={this.state.typeModal} closeModal={this.closeModal} handleChange={this.handleChangeForm} values={this.state} validateFields={this.validateFields}/>                   
       <Loading loading={this.state.overlay} background="rgba(33, 133, 208, 0.7" loaderColor="white" />
    </Container>        

    )
  }
}
