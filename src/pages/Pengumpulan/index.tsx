import { Container, ISchema, Table } from "crudone"
import React, { Component, Fragment } from "react"
import { RouteComponentProps } from "react-router"
import { Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { JenisPengumpulanService } from "../../services/JenisPengumpulanService"
import { PengumpulanService } from "../../services/PengumpulanService"

interface IState {
  pengumpulan: IPengumpulan[]
  jenisPengumpulan: IJenisPengumpulan[]
  loading: boolean
  error?: Error
}

export default class Pengumpulan extends Component<
  RouteComponentProps,
  IState
> {
  public state: IState = {
    pengumpulan: [],
    jenisPengumpulan: [],
    loading: false,
  }

  public pengumpulanService = new PengumpulanService()
  public jenisPengumpulanService = new JenisPengumpulanService()

  public componentDidMount() {
    this.getPengumpulan()
    this.getJenisPengumpulan()
  }

  public getJenisPengumpulan = () => {
    this.jenisPengumpulanService
      .get()
      .then((jenisPengumpulan) => this.setState({ jenisPengumpulan }))
  }

  public getPengumpulan = () => {
    this.setState({ loading: true })
    this.pengumpulanService
      .getPengumpulanTim(this.props.location.state._id)
      .then((pengumpulan) => this.setState({ pengumpulan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public render() {
    const schema: ISchema = {
      jenisPengumpulan: {
        label: "Jenis Pengumpulan",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.jenisPengumpulan,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      file: {
        label: "URL File",
      },
    }

    return (
      <Fragment>
        <Header
          content="Pengumpulan"
          subheader="Kumpulan data pengumpulan tim"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <Table.Container
            data={this.state.pengumpulan}
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
