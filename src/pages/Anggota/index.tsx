import { Container, ISchema, Table } from "crudone"
import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import { Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { PesertaService } from "../../services/PesertaService"

interface IState {
  peserta: IPeserta[]
  loading: boolean
  error?: Error
}

export default class Anggota extends Component<RouteComponentProps, IState> {
  public state: IState = {
    peserta: [],
    loading: false,
  }

  public pesertaService = new PesertaService()

  public componentDidMount() {
    this.getPeserta()
  }

  public getPeserta = () => {
    this.setState({ loading: true })
    this.pesertaService
      .getAnggotaTim(this.props.location.state._id)
      .then((peserta) => this.setState({ peserta }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nim: {
        label: "NIM",
      },
      nama: {
        label: "Nama",
      },
    }

    return (
      <Fragment>
        <Header content="Anggota" subheader="Kumpulan data anggota tim" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <Table.Container
            data={this.state.peserta}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
        </Container>
      </Fragment>
    )
  }
}
