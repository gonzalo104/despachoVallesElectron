import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react'


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
  ]


 const ModalSaveEdit = (props) => {      

    return (
            <Modal open={props.openM}>
            <Modal.Header >{props.type === 'new' ? 'Nuevo Cliente' : 'Editar Cliente'}</Modal.Header>
            <Modal.Content>   

            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Nombre' placeholder='Nombre' value={props.values.name} name="name"   onChange={ props.handleChange} />
                    <Form.Input fluid label='Correo' placeholder='Correo' value={props.values.email} name="email"  onChange={ props.handleChange}/>                   
                </Form.Group> 
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Celular' placeholder='Celular' value={props.values.movil} name="movil" onChange={ props.handleChange}/>
                    <Form.Input fluid label='Télefono' placeholder='Télefono' value={props.values.phone} name="phone" onChange={ props.handleChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Select fluid label='Abogado' name="lawyer_id" options={options} placeholder='Seleccione un abogado' onChange={ props.handleChange} />
                    <Form.Select fluid label='Tipo de cliente' name="type_custumer" options={options} placeholder='Seleccione un tipo de cliente' onChange={ props.handleChange}/>
                </Form.Group>          
                <Form.TextArea label='Commentarios' name="comments" value={props.values.comments}placeholder='Escribir algunos commentarios para el cliente' onChange={ props.handleChange}/>           
            </Form>         
                  
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' floated="left" onClick={() => props.closeModal('perro')}>Cerrar</Button>
                <Button primary >{props.type === 'new' ? 'Guardar' : 'Actualizar'}</Button>
            </Modal.Actions>
            </Modal>
        ); 
         
}

export default ModalSaveEdit;