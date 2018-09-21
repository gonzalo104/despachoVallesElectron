import React, { Component } from 'react';
import { Container, Header, Grid, Select, Button,Table, Icon} from 'semantic-ui-react';

class CaseFile extends Component {
    render() {
        return (                            
            <Container>
                <Grid>
                    <Grid.Column width={16}>
                        <Header as='h1' floated='left'>
                            Expedientes
                        </Header>
                        <Header floated='right'>                
                            <Button positive>Nueva expediente</Button>      
                        </Header>
                        <Header as='h5' floated='right'>
                            <Select placeholder='Selecciona un abogado' options={[]}  />
                        </Header>        
                    </Grid.Column>
                </Grid>
                <Grid>                   
                    <Grid.Column width={16}>
                    <Table celled>
                            <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Fecha de cita</Table.HeaderCell>
                                <Table.HeaderCell>Cliente</Table.HeaderCell>
                                <Table.HeaderCell>Abogado</Table.HeaderCell>
                                <Table.HeaderCell>Comentarios</Table.HeaderCell>
                                <Table.HeaderCell>Acciones</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            <Table.Row>
                                <Table.Cell>First</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell textAlign="center">                                                                                        
                                    <a href="javascript:void(0)"><Icon color="blue" name='edit' onClick={ () => {console.log("Edit")}} /></a>
                                    <a href="javascript:void(0)"><Icon color="red" name='delete' onClick={()=>{console.log("deleted")}} /></a>
                                </Table.Cell>
                            </Table.Row>                           
                            </Table.Body>

                            <Table.Footer>                            
                            </Table.Footer>
                        </Table>
                    </Grid.Column>
                </Grid>
     
            </Container>   
        );
    }
}

export default CaseFile;