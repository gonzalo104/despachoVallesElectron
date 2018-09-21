import React, { Component } from 'react';
import { Container, Header, Grid, Select, Button,Table, Icon} from 'semantic-ui-react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Modal from './components/modalSaveEdit';
const {ipcRenderer, remote} = window.require('electron');

class Appointments extends Component {

    constructor(){        
        super();   
        moment.lang('es', {
            months       : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort  : 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
            weekdays     : 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
            weekdaysMin  : 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
          });
        
        this.state = {
            date            : new Date(),
            appointments    : [],
            openModal       : false,
            type            : '',
            errorMessages   : [],
            id              : 0,
            custumer_id     : 0,
            lawyer_id       : 0,
            comments        : '',
            date_appointment: '',
          }
    }

    onChange = (date) => {        
        let getAppointments = ipcRenderer.sendSync('list-appointments', {date:date});
        this.setState({appointments: getAppointments.appointments, date:date});          
    }

    componentDidMount(){
        let getAppointments = ipcRenderer.sendSync('list-appointments', {date:this.state.date.setHours(0,0,0,0)});
        this.setState({appointments: getAppointments.appointments});        
    }

    editModal = (obj) => {
        this.setState({
            id              : obj.id,
            custumer_id     : obj.custumer_id,
            lawyer_id       : obj.lawyer_id,
            comments        : obj.comments ? obj.comments   : '',
            openModal       : true,
            type            : 'edit',
            date_appointment: new Date(obj.date_appointment),
        });
    }

    closeModal = () => {
        this.setState({openModal: false});
        this.clearForm();
      }

      clearForm = () => {
        this.setState({
            errorMessages   : [],
            id              : 0,
            custumer_id     : 0,
            lawyer_id       : 0,
            comments        : '',
            date_appointment: '',
        });
      }

      changeCalendar = (date) => {
        this.setState({date_appointment: date});
        console.log(date);
      }

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Column width={16}>
                        <Header as='h1' floated='left'>
                            Citas
                        </Header>
                        <Header floated='right'>                
                            <Button positive onClick={() => {this.setState({openModal: true, type: 'new'})}}>Nueva Cita</Button>      
                        </Header>
                        <Header as='h5' floated='right'>
                            <Select placeholder='Selecciona un abogado' options={[]}  />
                        </Header>        
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column width={4}>
                        <Calendar locale="es-MX" onChange={this.onChange} value={this.state.date}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    {this.state.appointments.length > 0 ? 
                    <Table celled>
                            <Table.Header>
                            <Table.Row>                                
                                <Table.HeaderCell>Cliente</Table.HeaderCell>
                                <Table.HeaderCell>Abogado</Table.HeaderCell>
                                <Table.HeaderCell>Comentarios</Table.HeaderCell>
                                <Table.HeaderCell>Acciones</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>

                            <Table.Body>                            
                             { this.state.appointments.map((obj, i) => {
                                return (
                                    <Table.Row key={i}>                                        
                                        <Table.Cell>{obj.Custumer.name}</Table.Cell>
                                        <Table.Cell>{obj.Lawyer.name}</Table.Cell>
                                        <Table.Cell>{obj.comments}</Table.Cell>
                                        <Table.Cell textAlign="center">                                                                                        
                                            <a href="javascript:void(0)"><Icon color="blue" name='edit' onClick={ () => this.editModal(obj)} /></a>
                                            <a href="javascript:void(0)"><Icon color="red" name='delete' onClick={()=>{console.log("deleted")}} /></a>
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
                        <h4>No hay citas para el {moment(this.state.date).format('Do [de] MMMM [de] YYYY')}</h4>
                    }
                    </Grid.Column>
                </Grid>
                <Modal values={this.state} closeModal={this.closeModal} clendarChange={this.changeCalendar}/>
     
            </Container>   
        );
    }
}

export default Appointments;