import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import {Shell, Body} from '@/components/layout'
import {withJwt} from '@/lib/composeWithRef'

import LoginScreen from '@/screens/modules/auth/Login'

class BaseAuthRequired extends PureComponent {
  state = {loginRequested: false}

  requestLogin() {
    const {componentId, notice, onRequestLogin} = this.props
    this.setState({loginRequested: true})
    Navigation.push(componentId, {
      component: {
        id: `${componentId}_login`,
        name: LoginScreen.screenName,
        passProps: {params: {parentId: componentId, notice}}
      }
    })
    if (onRequestLogin) onRequestLogin()
  }

  async componentDidMount() {
    const {jwt, componentId} = this.props
    const registerThisComponentAppearedListener = (fun) =>
      Navigation.events().registerComponentDidAppearListener(
        ({componentId: id}) => id === componentId && fun()
      )
    if (!jwt) {
      await new Promise((resolve) => {
        const subscription = registerThisComponentAppearedListener(() => {
          subscription.remove()
          resolve()
        })
      })
      this.requestLogin()
      this.subscription = registerThisComponentAppearedListener(
        this.componentDidAppear
      )
    }
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.remove()
  }

  componentDidAppear = () => {
    const {componentId, jwt} = this.props
    const {loginRequested} = this.state
    if (!jwt && loginRequested) Navigation.pop(componentId)
  }

  render() {
    const {jwt, children} = this.props
    if (jwt) return children
    return (
      <Shell>
        <Body loading />
      </Shell>
    )
  }
}

const AuthRequired = withJwt(BaseAuthRequired)

export default AuthRequired

export const authRequired = (getOptions) => (Target) => (props) => (
  <AuthRequired
    {...(getOptions ? getOptions(props) : {})}
    componentId={props.componentId}
  >
    <Target {...props} />
  </AuthRequired>
)
