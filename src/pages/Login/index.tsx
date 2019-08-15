import jwt from "jsonwebtoken"
import React, { Component } from "react"
import { RouteComponentProps } from "react-router"
import { Button, Card, Form, Header, Input, Loader } from "semantic-ui-react"
import { Consumer } from "../../App"
import { AdminService } from "../../services/AdminService"

interface IState {
  input: {
    username: string
    password: string,
  }
  loading: boolean
}

export default class Login extends Component<RouteComponentProps, IState> {
  public state: IState = {
    input: {
      username: "",
      password: "",
    },
    loading: false,
  }

  public userService = new AdminService()

  public redirectIfAuthenticated(isLoggedIn: boolean) {
    if (isLoggedIn) this.props.history.push(`${process.env.PUBLIC_URL}/`)
  }

  public changeValue(value: string, name: "username" | "password") {
    const { input } = this.state
    input[name] = value
    this.setState({ input })
  }

  public resetValue() {
    const { input } = this.state
    input.password = ""
    this.setState({ input })
  }

  public login(context: IAppContext) {
    const { username, password } = this.state.input

    this.setState({ loading: true })
    this.userService.login(username, password).then((data) => {
      this.setState({ loading: false })
      if (data.success && data.token) {
        context.login(data.token, (jwt.decode(data.token) as any).data, () => {
          this.props.history.push(`${process.env.PUBLIC_URL}/`)
        })
      } else {
        this.resetValue()
        alert("username atau password salah")
      }
    })
  }

  public getLoginButtonText() {
    return this.state.loading ? (
      <Loader active inline inverted size="small" />
    ) : (
      "Masuk"
    )
  }

  public render() {
    return (
      <Consumer>
        {(context) => {
          this.redirectIfAuthenticated(context.isLoggedIn())
          return (
            <div style={styles.container}>
              <Card>
                <Card.Content>
                  <Card.Header textAlign="center">
                    <Header content="Admin PAC" icon="user circle outline" />
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Form style={styles.form}>
                    <Form.Field>
                      <Input
                        label="Username"
                        value={this.state.input.username}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "username")
                        }
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Password"
                        type="password"
                        value={this.state.input.password}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "password")
                        }
                      />
                    </Form.Field>
                  </Form>
                </Card.Content>
                <Card.Content>
                  <Button
                    color="green"
                    fluid
                    content={this.getLoginButtonText()}
                    onClick={() => this.login(context)}
                  />
                </Card.Content>
              </Card>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginTop: 15,
  },
}
