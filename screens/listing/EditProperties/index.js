import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import * as listingsApi from '@/lib/services/listings'
import {
  withUserListings,
  withProfileMutation
} from '@/graphql/modules/user/containers'
import {getToken, getData} from '@/redux/modules/auth/selectors'
import {setStack} from '@/screens/module/navigation'
import {Shell, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import PropertiesForm from '@/components/newListing/Properties'

class EditPropertiesScreen extends PureComponent {
  static defaultProps = {
    params: {}
  }

  static screenName = 'listing.EditProperties'

  static options = {
    topBar: {
      title: {text: 'Dados principais'},
      backButtonTitle: ''
    }
  }

  state = {
    value: {}
  }

  form = React.createRef()

  get value() {
    const {params: {address, complement}} = this.props
    const {value} = this.state
    return {
      address,
      listing: {
        ...value,
        complement,
        price: 0
      }
    }
  }

  navigateToListing = ({id}) => {
    this.props.setStack([
      {name: 'account.Menu'},
      {name: 'account.Listings'},
      {name: 'listing.Listing', passProps: {params: {id, editing: true}}}
    ])
  }

  openSuccessModal({listing, address}) {
    const {componentId} = this.props
    Navigation.showModal({
      component: {
        id: `${componentId}_success`,
        name: 'listing.Created',
        passProps: {
          params: {listing, address},
          onDismiss: () => {
            Navigation.dismissModal(`${componentId}_success`)
            this.navigateToListing(listing)
          }
        }
      }
    })
  }

  onChange = (value) => this.setState({value})

  onSubmit = async () => {
    const {editUserProfile, userListings, jwt} = this.props
    const {phone} = this.state.value
    const {listing, address} = this.value
    if (!this.form.current.onValidate()) return
    this.setState({loading: true})
    try {
      if (phone) editUserProfile({variables: {phone}})
      const response = await listingsApi.create({listing, address}, {jwt})
      userListings.refetch()
      this.setState({loading: false})
      this.openSuccessModal({listing: response.listing, address})
    } catch (error) {
      this.setState({errors: error.errors, loading: false})
    }
  }

  render() {
    const {user} = this.props
    const {loading, value} = this.state

    return (
      <Shell>
        <Body scroll>
          <PropertiesForm
            formRef={this.form}
            value={value}
            requirePhone={!user.phone}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Body>
        <Footer style={{padding: 15}}>
          <Button disabled={loading} onPress={this.onSubmit}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      jwt: getToken(state),
      user: getData(state)
    }),
    {setStack}
  ),
  withProfileMutation,
  withUserListings
)(EditPropertiesScreen)
