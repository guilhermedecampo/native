import React, {Component} from 'react'

import Shell, {Footer} from '@/containers/shared/Shell'
import Login from '@/containers/auth/Login'

export default class LoginScreen extends Component {
  state = {
    valid: true
  }

  form = React.createRef()

  onValidate = (valid) => this.setState({valid})

  onSubmit = (...args) => {
    const {valid} = this.state
    const form = this.form.value
    if (valid) form.onSubmit(...args)
  }

  onSignUp = () => {
    // const {navigation} = this.props
    // navigation.navigate('signUp')
  }

  onPasswordRecovery = () => {
    // const {navigation} = this.props
    // navigation.navigate('passwordReset')
  }

  render() {
    return (
      <Shell
        scroll
        title="Login"
        footer={<Footer label="Enviar" onPress={this.onSubmit} />}
      >
        <Login
          innerRef={this.form}
          onSignUp={this.onSignUp}
          onPasswordRecovery={this.onPasswordRecovery}
          onValidate={this.onValidate}
        />
      </Shell>
    )
  }
}

export const screen = LoginScreen
