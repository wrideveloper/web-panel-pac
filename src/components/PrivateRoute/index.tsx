import React, { ReactType, SFC } from "react"
import { Redirect, Route } from "react-router-dom"
import { Consumer } from "../../App"

interface IProps {
  name: string
  path: string
  component: ReactType
  exact: boolean
  isAdmin?: boolean
}

const PrivateRoute: SFC<any> = ({
  component: Component,
  isAdmin,
  ...rest
}: any) => (
  <Consumer>
    {(context) => (
      <Route
        {...rest}
        render={(props) => {
          if (!context.isLoggedIn()) {
            return (
              <Redirect
                to={{
                  pathname: `${process.env.PUBLIC_URL}/login`,
                  state: { from: props.location },
                }}
              />
            )
          } else {
            return <Component {...props} />
          }
        }}
      />
    )}
  </Consumer>
)

export default PrivateRoute
