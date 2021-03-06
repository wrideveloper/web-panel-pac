import {
  Container,
  CreateButton,
  Form,
  ISchema,
  Table,
  Validation,
} from "crudone"
import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { AdminService } from "../../services/AdminService"

interface IState {
  admin: IAdmin[]
  loading: boolean
  error?: Error
}

export default class Admin extends Component<{}, IState> {
  public state: IState = {
    admin: [],
    loading: false,
  }

  public adminService = new AdminService()

  public componentDidMount() {
    this.getAdmin()
  }

  public getAdmin = () => {
    this.setState({ loading: true })
    this.adminService
      .get()
      .then((admin) => this.setState({ admin }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createAdmin = (input: IAdmin) => {
    this.setState({ loading: true })
    this.adminService
      .create(input)
      .then(this.getAdmin)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteAdmin = (input: IAdmin) => {
    this.setState({ loading: true })
    this.adminService
      .delete(input._id)
      .then(this.getAdmin)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      username: {
        label: "Username",
        validations: [Validation.required],
      },
      password: {
        label: "Password",
        type: "password",
        validations: [Validation.required],
        hideOnTable: true,
      },
    }

    return (
      <Fragment>
        <Header content="Admin" subheader="Kumpulan data admin" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container data={this.state.admin} loading={this.state.loading}>
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Admin"
            updateTitle="Ubah Admin"
            onCreate={this.createAdmin}
            onDelete={this.deleteAdmin}
          />
        </Container>
      </Fragment>
    )
  }
}
