import _ from 'lodash'
import React, {PureComponent} from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

import {GOOGLE_PLACES_API_KEY} from '@/lib/config'
import styles from './styles'

export default class AddressAutoComplete extends PureComponent {
  static defaultProps = {
    value: {}
  }

  state = {
    selection: {start: 0, end: 0}
  }

  autoComplete = React.createRef()

  get input() {
    return this.autoComplete.current.refs.textInput
  }

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.value, this.props.value) && this.props.value) {
      const {street, streetNumber, secondaryAddress} = this.props.value
      let text = street
      if (streetNumber) text += ', ' + streetNumber
      if (secondaryAddress) text += ' - ' + secondaryAddress
      this.autoComplete.current.setAddressText(text)
    }
  }

  onSelectionChange = ({nativeEvent: {selection}}) => this.setState({selection})

  onChange = (place) => {
    const {onChange} = this.props
    const streetAddress = place.structured_formatting.main_text.split(',')
    const secondaryAddress = place.structured_formatting.secondary_text
    if (!streetAddress[1]) {
      const start = streetAddress[0].length + 2
      this.setState({
        selection: {
          start,
          end: start + 6
        }
      })
      requestAnimationFrame(() =>
        this.autoComplete.current.refs.textInput.focus()
      )
      streetAddress[1] = 'número'
    }
    onChange({
      street: streetAddress[0],
      streetNumber: streetAddress[1],
      secondaryAddress
    })
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        {...this.props}
        fetchDefails
        ref={this.autoComplete}
        autoFocus={false}
        horizontal={false}
        enablePoweredByContainer={false}
        styles={styles}
        minLength={3}
        getDefaultValue={() => ''}
        onPress={this.onChange}
        filterReverseGeocodingByTypes={['geocode', 'street_address']}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'pt-BR',
          types: 'address'
        }}
        textInputProps={{
          onSelectionChange: this.onSelectionChange,
          onChangeText: this.props.onChangeText,
          selection: this.state.selection
        }}
      />
    )
  }
}
