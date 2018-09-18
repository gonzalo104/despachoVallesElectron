import React from 'react';
import { Form, Modal, Button, Message } from 'semantic-ui-react';
import Dropdowns from '../../../utiles/dropdowns';

 const ModalSaveEdit = (props) => {  
    
    return (
            <Modal open={props.openM}>
            <Modal.Header >{props.type === 'new' ? 'Nuevo Cliente' : 'Editar Cliente'}</Modal.Header>
            <Modal.Content>   
            {
                props.values.errorMessages.length > 0 ?                 
                <Message
                    error
                    header = 'Hubo algunos errores con su captura'
                    list   = {props.values.errorMessages}
                />  : 
                ''
            
            }

            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Nombre*' error={props.values.nameError} placeholder='Nombre' value={props.values.name} name="name"   onChange={ props.handleChange} />                    
                    <Form.Input fluid label='Correo' placeholder='Correo' error={props.values.emailError} value={props.values.email} name="email"  onChange={ props.handleChange}/>                   
                </Form.Group> 
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Celular' placeholder='Celular' error={props.values.movilError} value={props.values.movil} name="movil" onChange={ props.handleChange}/>
                    <Form.Input fluid label='Télefono' placeholder='Télefono' error={props.values.phoneError} value={props.values.phone} name="phone" onChange={ props.handleChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Select fluid label='Abogado*' name="lawyer_id" value={props.values.lawyer_id} options={props.values.optLawyers.map(obj => {return {key: obj.dataValues.id, text: obj.dataValues.name, value: obj.dataValues.id}})} placeholder='Seleccione un abogado' onChange={ props.handleChange} />
                    <Form.Select fluid label='Tipo de cliente*' name="type_custumer" value={props.values.type_custumer} options={Dropdowns.TYPES_CUSTUMERS()} placeholder='Seleccione un tipo de cliente' onChange={ props.handleChange}/>
                </Form.Group>          
                <Form.TextArea label='Commentarios' name="comments" value={props.values.comments} placeholder='Escribir algunos commentarios para el cliente' onChange={ props.handleChange}/>           
            </Form>                          
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' floated="left" onClick={() => props.closeModal('perro')}>Cerrar</Button>
                <Button onClick={props.validateFields} primary disabled={!props.values.name || !props.values.lawyer_id || !props.values.type_custumer} >{props.type === 'new' ? 'Guardar' : 'Actualizar'}</Button>
            </Modal.Actions>
            </Modal>
        ); 
         
}

export default ModalSaveEdit;