import React, { Component } from 'react'
import { Container, Header, Table} from 'semantic-ui-react'

const tableData = [
{ name: undefined, status: undefined, notes: undefined },
{ name: 'Jimmy', status: 'Requires Action', notes: undefined },
{ name: 'Jamie', status: undefined, notes: 'Hostile' },
{ name: 'Jill', status: undefined, notes: undefined },
]

const headerRow = ['Name', 'Status', 'Notes']

const renderBodyRow = ({ name, status, notes }, i) => ({
key: name || `row-${i}`,
warning: !!(status && status.match('Requires Action')),
cells: [
  name || 'No name specified',
  status ? { key: 'status', icon: 'attention', content: status } : 'Unknown',
  notes ? { key: 'notes', icon: 'attention', content: notes, warning: true } : 'None',
],
})

export default class Custumers extends Component {
  render() {
    return (
        <Container text>
    <Header as='h2'>Header</Header>
    <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />
  </Container>
    )
  }
}
