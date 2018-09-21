import React, { Component } from 'react';
import { Container, Header, Table, Grid, Select, Button, Icon, Pagination, GridColumn} from 'semantic-ui-react';
import Modal from './components/modalSaveEdit';
const {ipcRenderer, remote} = window.require('electron');


class Users extends Component {

    constructor(){
        super();
        this.state ={
            users        : [],
            openModal    : false,
            type         : '',
            errorMessages: [],
            name         : '',
            username     : '',
            email        : '',
            rol          : '',
        }
    }

    componentDidMount(){
        let getUsers = ipcRenderer.sendSync('list-users', "Ping");
        this.setState({users: getUsers.users.docs});        
    }

    closeModal = () => {
        this.setState({openModal: false});
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Column width={16}>
                        <Header as='h1' floated='left'>Usuarios</Header>
                        <Header floated='right'>                
                            <Button positive onClick={()=>this.setState({type: 'new', openModal: true})}>Nuevo Usuario</Button>      
                        </Header>
                        <Header as='h5' floated='right'>
                            <Select placeholder='Selecciona un abogado' options={[]}/>
                        </Header>   
                    </Grid.Column>
                </Grid>
                <Grid>
                    <GridColumn width={16}>
                    {this.state.users.length > 0 ?
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Usuario</Table.HeaderCell>
                                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                                    <Table.HeaderCell>Correo</Table.HeaderCell>
                                    <Table.HeaderCell>Rol</Table.HeaderCell>
                                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                { this.state.users.map((obj, i) => {
                                    return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{obj.username}</Table.Cell>
                                        <Table.Cell>{obj.name}</Table.Cell>
                                        <Table.Cell>{obj.email}</Table.Cell>
                                        <Table.Cell>{obj.rol}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <a href="javascript:void(0)"><Icon color="blue" name='edit' onClick={ () => console.log("edit")} /></a>
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
                                    <Pagination  onPageChange={()=>console.log("change")}  defaultActivePage={1} totalPages={3} />                                                                                
                                </Table.HeaderCell>
                                </Table.Row>  
                            </Table.Footer>
                        </Table>
                    : 
                    ""
                    }                       
                    </GridColumn>
                    <Modal values={this.state} closeModal={this.closeModal}></Modal>
                </Grid>
            </Container>
                
            
        );
    }
}

export default Users;