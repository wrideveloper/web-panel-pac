import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import { DivisiService } from "../../services/DivisiService"
import { MiniclassService } from "../../services/MiniclassService"

interface IState {
  miniclass: IMiniclass[]
  divisi: IDivisi[]
}

const fields: IField[] = [
  {
    name: "nama",
    label: "Nama Miniclass",
  },
  {
    name: "divisi",
    label: "Divisi",
    type: "option",
    optionData: {
      data: [],
      labelKey: "nama",
      valueKey: "_id",
    },
  },
]

export default class Miniclass extends Component<{}, IState> {
  public state: IState = {
    miniclass: [],
    divisi: [],
  }

  public miniclassService = new MiniclassService()
  public divisiService = new DivisiService()

  public componentDidMount() {
    this.getMiniclass()
    this.getDivisi()
  }

  public getDivisi() {
    this.divisiService.get().then((divisi) => this.setState({ divisi }))
  }

  public getMiniclass() {
    this.miniclassService.get().then((miniclass) => this.setState({ miniclass }))
  }

  public async createMiniclass(input: IMiniclassInput) {
    console.log("input miniclass : ", input)
    await this.miniclassService.create(input)
    this.getMiniclass()
  }

  public async updateMiniclass(input: IMiniclassInput, id: string) {
    await this.miniclassService.update(input, id)
    this.getMiniclass()
    console.log("miniclass input ", input)
  }

  public deleteMiniclass(id: string) {
    this.miniclassService.delete(id).then(() => this.getMiniclass())
  }

  public setOptionsData() {
    fields[1].optionData!.data = this.state.divisi
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Miniclass" subheader="Kumpulan data miniclass" />
        <DataTable<IMiniclass, IMiniclassInput>
          data={this.state.miniclass}
          fields={fields}
          onCreate={(input) => this.createMiniclass(input)}
          onUpdate={(input) => this.updateMiniclass(input, input._id)}
          onDelete={(input) => this.deleteMiniclass(input._id)}
        />
      </Fragment>
    )
  }
}
