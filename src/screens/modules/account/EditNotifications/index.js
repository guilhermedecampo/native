import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withUserProfile} from '@/graphql/containers'
import {setContext, clearContext} from '@/screens/modules/context'
import {
  hasPermission,
  getDeviceToken
} from '@/redux/modules/firebase/messaging/selectors'
import {requestPermission} from '@/redux/modules/firebase/messaging'
import {getContext} from '@/screens/modules/context/selectors'
import {withProfileMutation} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import NotificationsForm from '@/components/account/NotificationsForm'

class EditNotificationsScreen extends PureComponent {
  static screenName = 'account.EditNotifications'

  static options = {
    topBar: {
      title: {text: 'Opções de notificações'}
    }
  }

  state = {value: {}}

  form = React.createRef()

  constructor(props) {
    super(props)
    this.state.value = _.omit(props.user.notificationPreferences, '__typename')
  }

  componentDidDisappear() {
    this.props.clearContext()
  }

  onSubmit = _.debounce(async () => {
    const {editUserProfile, setContext} = this.props
    const {value} = this.state
    setContext({loading: true})
    await editUserProfile({variables: {notificationPreferences: value}})
    setContext({loading: false})
  }, 1000)

  onChange = (value) => this.setState({value}, this.onSubmit)

  render() {
    const {user, hasPermission, fcmToken, requestPermission} = this.props
    const {value} = this.state

    return (
      <Shell>
        <Body>
          <NotificationsForm
            formRef={this.form}
            value={value}
            user={user}
            fcmToken={fcmToken}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            hasPermission={hasPermission}
            onRequestPermission={requestPermission}
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withProfileMutation,
  withUserProfile,
  connect(
    (state) => getContext(state, {screen: 'account'}),
    {
      setContext: setContext('account'),
      clearContext: clearContext('account')
    }
  ),
  connect(
    (state) => ({
      fcmToken: getDeviceToken(state),
      hasPermission: hasPermission(state)
    }),
    {requestPermission}
  )
)(EditNotificationsScreen)
