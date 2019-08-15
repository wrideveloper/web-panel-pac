import { Container, Form, ISchema, Table, Validation } from "crudone"
import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { StatusService } from "../../services/StatusService"
import { TimService } from "../../services/TimService"
import { UniversitasService } from "../../services/UniversitasService"

interface IState {
  tim: ITim[]
  universitas: IUniversitas[]
  status: IStatus[]
  loading: boolean
  error?: Error
}

export default class Tim extends Component<RouteComponentProps, IState> {
  public state: IState = {
    tim: [],
    universitas: [],
    status: [],
    loading: false,
  }

  public timService = new TimService()
  public universitasService = new UniversitasService()
  public statusService = new StatusService()

  public componentDidMount() {
    this.getTim()
    this.getUniversitas()
    this.getStatus()
  }

  public getUniversitas() {
    this.universitasService
      .get()
      .then((universitas) => this.setState({ universitas }))
  }

  public getStatus() {
    this.statusService.get().then((status) => this.setState({ status }))
  }

  public getTim = () => {
    this.setState({ loading: true })
    this.timService
      .get()
      .then((tim) => this.setState({ tim }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public updateTim = (input: ITim) => {
    this.setState({ loading: true })
    this.timService
      .update(input, input._id)
      .then(this.getTim)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public renderAdditionalAction = (tim: ITim, isUpdateMode: boolean) => {
    return isUpdateMode ? (
      <>
        <Button
          content="Anggota"
          color="orange"
          onClick={() =>
            this.props.history.push(
              `${process.env.PUBLIC_URL}/tim/anggota`,
              tim,
            )
          }
        />

        <Button
          content="Pengumpulan"
          color="blue"
          onClick={() =>
            this.props.history.push(
              `${process.env.PUBLIC_URL}/tim/pengumpulan`,
              tim,
            )
          }
        />
      </>
    ) : null
  }

  public render() {
    const schema: ISchema = {
      _id: {
        label: "ID",
        hideOnForm: true,
      },
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
      universitas: {
        label: "Universitas",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.universitas,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      telp: {
        label: "Telpon",
      },
      email: {
        label: "Email",
      },
      status: {
        label: "Status",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.status,
          textKey: "nama",
          valueKey: "_id",
        },
      },
    }

    return (
      <Fragment>
        <Header content="Tim" subheader="Kumpulan data tim" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <Table.Container data={this.state.tim} loading={this.state.loading}>
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            updateTitle="Ubah Tim"
            onUpdate={this.updateTim}
            additionalAction={this.renderAdditionalAction}
          />
        </Container>
      </Fragment>
    )
  }
}
