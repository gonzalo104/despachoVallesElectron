import React, { Component } from 'react';
import { Container, Header, Table, Grid} from 'semantic-ui-react';
const {ipcRenderer} = window.require('electron')


const headerRow = ['Nombre', 'Status', 'Notes']

const renderBodyRow = ({ name, comments, email }, i) => ({
key  : name || `row-${i}`,
cells: [
  name ,
  comments ? comments: 'None',
  email    ? email   : 'Unknown',
],
})

export default class Custumers extends Component {
  
  state = {
    custumers: [],
  }

 tableData = this.state.custumers;

  componentDidMount(){

    ipcRenderer.on('list-custumers-reply', (event, arg) => {
      console.log(arg)
      this.setState({custumers: arg.dataValues});
    })
    ipcRenderer.send('list-custumers', 'ping')


  }

  render() {
    return (
    <Container>
    <Header as='h2'>Clientes</Header>
     <Grid>
      <Grid.Column width={16}>
        <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={this.tableData} />
      </Grid.Column>
    </Grid>
    </Container>
    )
  }
}
