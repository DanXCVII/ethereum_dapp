import React from "react";

import { Redirect } from "react-router";

interface LoginPageState {
  redirect: boolean;
}

interface LoginPageProps {}

/**
 * This component implements and renders the connection page
 */
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  /**
   * Constructor receives ConnectPage's properties and sets initial state values
   * @param props ConnectPage's properties
   */
  constructor(props: any) {
    super(props);
  }

  /**
   * This method will be executed, when the user clicks the 'connect' button
   */
  handleLogin = () => {
    this.setState({
      redirect: true
    });
  };

  /**
   * This method is executed on every state change.
   * It describes/renders the appearance of the ConnectPage.
   */
  render() {
    // if redirect is set (, which means, that we probably have a connection), we will redirect the user to the main page.
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        
      </div>
    );
  }
}
export default LoginPage;
