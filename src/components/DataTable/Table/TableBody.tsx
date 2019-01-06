import React, { Component } from "react"
import { Table } from "semantic-ui-react"

interface IProps {
  shownFields: IField[]
  paginatedData: any[]
  startingNumber: number
  onRowClick: (rowData: any) => void
}

export default class TableBody extends Component<IProps> {
  public getCellData(rowData: any, field: IField) {
    const cellData = rowData[field.name]
    return cellData instanceof Object
      ? cellData[field.optionData!.labelKey]
      : cellData
  }

  public renderCell(row: any) {
    return this.props.shownFields.map((field, index) => (
      <Table.Cell key={index}>{this.getCellData(row, field)}</Table.Cell>
    ))
  }

  public renderRow() {
    let { startingNumber } = this.props
    return this.props.paginatedData.map((rowData, index) => (
      <Table.Row key={index} onClick={() => this.props.onRowClick(rowData)}>
        <Table.Cell>{startingNumber++}</Table.Cell>
        {this.renderCell(rowData)}
      </Table.Row>
    ))
  }

  public render() {
    return <Table.Body>{this.renderRow()}</Table.Body>
  }
}