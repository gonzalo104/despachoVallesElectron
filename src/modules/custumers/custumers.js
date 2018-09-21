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
      paginate         : 30,
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
    this.setState({overlay: true});
    this.ipcRenderReply();    
   
    let getCustumers = ipcRenderer.sendSync('list-custumers', {page: this.state.page, paginate: this.state.paginate});
    this.setState({custumers: getCustumers.pagination.docs, optLawyers: getCustumers.lawyers, totalpages: getCustumers.pagination.pages, overlay:false});

  } 

  componentWillUnmount(){
    this.mounted = false;
  }


  ipcRenderReply(){

   
    
   
   

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
      id           : obj.id,
      name         : obj.name,
      email        : obj.email ? obj.email      : '',
      movil        : obj.movil ? obj.movil      : '',
      phone        : obj.phone ? obj.phone      : '',
      lawyer_id    : obj.lawyer_id,
      type_custumer: obj.type_custumer,
      comments     : obj.comments ? obj.comments: '',
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

      if (messages.length === 0) {
          this.setState({overlay:true});
          this.closeModal();
          const {id, name, email, movil, phone, lawyer_id, type_custumer, comments, typeModal, page, paginate } = this.state;
          let   saveEdit                                                                                        = ipcRenderer.sendSync('saveEdit-custumer', {id, name, email, movil, phone, lawyer_id, type_custumer, comments, type: typeModal, page, paginate } );
          this.setState({custumers: saveEdit.custumers.docs, overlay:false, totalpages: saveEdit.custumers.pages}); 
          let message = saveEdit.success ? 'Se registro correctamente el cliente' : 'Problemas para registrar el cliente, Intente más tarde';
          let notify  = new remote.Notification({title:'¡Atención!' ,body: message});
          notify.show();                    
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
    this.setState({page: activePage, overlay:true});
    let pagination = ipcRenderer.sendSync('pagination-custumers',{page: activePage, paginate: this.state.paginate});
     this.setState({custumers: pagination.custumers.docs, overlay: false, totalpages: pagination.custumers.pages});
    
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
      <Select placeholder='Selecciona un abogado' options={this.state.optLawyers.map( obj => {return {key: obj.id, text: obj.name, value: obj.id}})}  />
      </Header>        
      </Grid.Column>
    </Grid>
    
     <Grid>
      <Grid.Column width={16}>
        {this.state.custumers.length > 0 ? 
            <Table celled >
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
                       <Table.Cell>{obj.name}</Table.Cell>
                       <Table.Cell>{obj.email}</Table.Cell>
                       <Table.Cell>{obj.movil}</Table.Cell>
                       <Table.Cell>{obj.phone}</Table.Cell>
                       <Table.Cell>{obj.Lawyer.name}</Table.Cell>
                       <Table.Cell>{obj.type_custumer}</Table.Cell>
                       <Table.Cell>{obj.comments}</Table.Cell>
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
                  {
                    this.state.totalpages > 1 ?
                    <Pagination  onPageChange={this.handlePaginationChange}  defaultActivePage={this.state.page} totalPages={this.state.totalpages} />: 
                    ""
                  }                  
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
