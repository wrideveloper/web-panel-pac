import React, { Component } from "react"
import { Header, Menu } from "semantic-ui-react"

class NavigationHeader extends Component {
  public render() {
    return (
      <Menu.Item>
        <Header inverted>
          <Header.Content>Admin PAC</Header.Content>
        </Header>
      </Menu.Item>
    )
  }
}

export default NavigationHeader
