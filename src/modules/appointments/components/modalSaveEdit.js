import React from 'react';
import { Form, Modal, Button, Message,Grid} from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import '../styles.css';

const ModalAppointment = (props) => {
    
        return (
            <Modal open={props.values.openModal}>
            <Modal.Header >{props.values.type === 'new' ? 'Nueva Cita' : 'Editar Cita'}</Modal.Header>
            <Modal.Content>   
            {
                props.values.errorMessages.length > 0 ?                 
                <Message error  header = 'Hubo algunos errores con su captura' list   = {props.values.errorMessages}/>: 
                ''
            
            }
            <Grid>                    
                    <Grid.Column width={16} textAlign="center">   
                        <label style={{fontWeight: 700, color: 'rgba(0,0,0,.87)',fontSize: '.92857143em', margin: '0 0 .28571429rem 0'}}>Fecha de la cita* &nbsp;&nbsp;</label>
                        <DatePicker showLeadingZeros={true} locale="es-MX"  onChange={props.clendarChange} value={props.values.date_appointment}  minDate={new Date()}/>                                                                  
                    </Grid.Column>
            </Grid> <br/>
            <Form>                                
                <Form.Group widths='equal'>
                    <Form.Select fluid label='Cliente*' name="custumer_id"  placeholder='Seleccione un cliente' options={[]} />
                    <Form.Select fluid label='Abogado*' name="lawyer_id"  options={[]} placeholder='Seleccione un Abogado'/>
                </Form.Group>    
                <Form.Field label='Comentarios' placeholder='Comentarios para la cita' control='textarea' rows='3' />                
            </Form>               
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' floated="left" onClick={() => props.closeModal()}>Cerrar</Button>
                <Button primary>{props.values.type === 'new' ? 'Guardar' : 'Actualizar'} </Button>
            </Modal.Actions>
            </Modal>
        );
    
}

export default ModalAppointment;