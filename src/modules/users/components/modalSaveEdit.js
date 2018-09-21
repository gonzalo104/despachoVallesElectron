import React from 'react';
import { Form, Modal, Button, Message} from 'semantic-ui-react';

const ModalAppointment = (props) => {
    
        return (
            <Modal open={props.values.openModal}>
            <Modal.Header >{props.values.type === 'new' ? 'Nuevo usuario' : 'Editar usuario'}</Modal.Header>
            <Modal.Content>   
            {
                props.values.errorMessages.length > 0 ?                 
                <Message error  header = 'Hubo algunos errores con su captura' list   = {props.values.errorMessages}/>: 
                ''
            
            }
            
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