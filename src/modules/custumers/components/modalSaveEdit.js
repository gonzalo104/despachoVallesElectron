import React, { Component } from 'react';
import { Modal , Form, Button, Icon} from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
  ]

class ModalSaveEdit extends Component {  
            
        state = {
            type         : this.props.type,
            open         : false,
            name         : this.props.custumer.dataValues ? this.props.custumer.dataValues.name                                                          : '',
            email        : this.props.custumer.dataValues && this.props.custumer.dataValues.phone != null ? this.props.custumer.dataValues.email         : '',
            phone        : this.props.custumer.dataValues  && this.props.custumer.dataValues.phone != null ? this.props.custumer.dataValues.phone        : '',
            movil        : this.props.custumer.dataValues && this.props.custumer.dataValues.movil != null ? this.props.custumer.dataValues.movil         : '',
            type_custumer: this.props.custumer.dataValues ? this.props.custumer.dataValues.type_custumer                                                 : '',
            lawyer_id    : this.props.custumer.dataValues ? this.props.custumer.dataValues.lawyer_id                                                     : '',
            comments     : this.props.custumer.dataValues &&  this.props.custumer.dataValues.comments   != null ? this.props.custumer.dataValues.comments: '',
        }    
    


  
    typeButton() {
        let button = this.props.type === 'new' ? <Button positive onClick={this.openModal}>Nuevo Cliente</Button> : <Icon color="blue" name="edit" onClick={this.openModal}></Icon>;
        return button;
    }

  
    openModal  = () => this.setState({ open: true })
    closeModal = () => this.setState({ open: false })

    handleChange = (e,{value}) => {         
            let name = e.target.name
            this.setState({[name]: e.target.value})                                     
    }    

    validateForm = () => {
        //this.props.handleApi(this.state)
        
    }
        
    render(){  
        const { value } = this.state
        return (
            <Modal trigger={this.typeButton()} open={this.state.open}>
            <Modal.Header >{this.props.type === 'new' ? "Nuevo cliente" : "Editar cliente"}</Modal.Header>
            <Modal.Content>            
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Nombre completo' placeholder='Nombre completo' name="name" value={this.state.name} error onChange={this.handleChange} />
                    <Form.Input fluid label='Correo' placeholder='ejemplo@email.com' name="email" value={this.state.email} onChange={this.handleChange} />                   
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Télefono' placeholder='Télefono' name="phone" value={this.state.phone} onChange={this.handleChange}/>
                    <Form.Input fluid label='Celular' placeholder='Celular' name="movil" value={this.state.movil} onChange={this.handleChange} />                  
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Select fluid label='Tipo' options={options} placeholder='Tipo' name="type_custumer" onChange={(e,{value}) => { this.setState({type_custumer: value})}}/>   
                    <Form.Select fluid label='Abogado' options={options} placeholder='Abogado' name="lawyer_id"  onChange={(e,{value}) => { this.setState({lawyer_id: value})}}/>             
                </Form.Group>             
                <Form.TextArea label='Comentarios' placeholder='Escrine unos commentario para el nuevo cliente' value={this.state.comments} name="comments" onChange={this.handleChange} />                                
            </Form>            
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' floated="left" onClick={this.closeModal}>Cerrar</Button>
                <Button primary onClick={this.validateForm}>Guardar</Button>
            </Modal.Actions>
            </Modal>
        ); 
    }
     
}

export default ModalSaveEdit;