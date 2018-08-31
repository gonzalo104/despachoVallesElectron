import React, { Component } from 'react'
import { Container, Header, Table, Grid} from 'semantic-ui-react'

const tableData = [
{ name: undefined, status: undefined, notes: undefined },
{ name: 'Jimmy', status: 'Requires Action', notes: undefined },
{ name: 'Jamie', status: undefined, notes: 'Hostile' },
{ name: 'Jill', status: undefined, notes: undefined },
]

const headerRow = ['Nombre', 'Status', 'Notes']

const renderBodyRow = ({ name, status, notes }, i) => ({
key: name || `row-${i}`,
warning: !!(status && status.match('Requires Action')),
cells: [
  name || 'No name specified',
  notes ? { key: 'notes', icon: 'attention', content: notes, warning: true } : 'None',
  status ? { key: 'status', icon: 'attention', content: status } : 'Unknown',
],
})

export default class Custumers extends Component {
  render() {
    return (
    <Container>
    <Header as='h2'>Clientes</Header>
     <Grid>
      <Grid.Column width={16}>
        <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />
      </Grid.Column>
    </Grid>
    </Container>
    )
  }
}
