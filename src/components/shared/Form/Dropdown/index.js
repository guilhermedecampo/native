import React, {PureComponent} from 'react'
import {View, TouchableHighlight} from 'react-native'
import Dropdown from 'react-native-modal-dropdown'

import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import {field} from '../Field'
import $styles, {buttonIconColor, underlayColor} from './styles'

const buttonText = ({placeholder, value}) => (value ? value.label : placeholder)

const renderOption = (value) => (
  <TouchableHighlight underlayColor={underlayColor}>
    <View style={[$styles.option]}>
      <Text style={$styles.optionText} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </Text>
    </View>
  </TouchableHighlight>
)

const StyledDropdown = $styles.inject()(
  ({styles, width, height, dropdownRef, ...props}) => (
    <Dropdown
      accessible
      accessibilityLabel={props.placeholder + ' dropdown'}
      ref={dropdownRef}
      style={[styles.container, {width}]}
      dropdownStyle={[styles.dropdown, {width, height}]}
      renderRow={renderOption}
      {...props}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
          {buttonText(props)}
        </Text>
        <Icon name="caret-down" type="solid" color={buttonIconColor(props)} />
      </View>
    </Dropdown>
  )
)

export class ControlledDropdown extends PureComponent {
  static defaultProps = {
    width: null
  }

  state = {
    active: false,
    width: null
  }

  dropdown = React.createRef()

  static getDerivedStateFromProps({width}) {
    if (width) return {width}
    return null
  }

  componentDidUpdate(prev) {
    const {value} = this.props
    if (value !== prev.value && this.dropdown.value)
      this.dropdown.value.select(this.selectedId)
  }

  onChange = (i) =>
    this.props.onChange(this.props.options[i].value, this.props.onValidate)

  onToggle = (active) => () => this.setState({active})

  onLayout = ({
    nativeEvent: {
      layout: {width}
    }
  }) => this.setState({width})

  get selectedId() {
    const {value, options} = this.props
    if (!value) return null
    return options.findIndex((opt) => opt.value === value)
  }

  get value() {
    return this.props.options[this.selectedId]
  }

  get options() {
    return this.props.options.map((opt) => opt.label)
  }

  get height() {
    return this.props.options.length * 50
  }

  render() {
    const {width} = this.state

    return (
      <View onLayout={width ? undefined : this.onLayout}>
        <StyledDropdown
          {...this.props}
          {...this.state}
          dropdownRef={this.dropdown}
          options={this.options}
          value={this.value}
          height={this.height}
          onSelect={this.onChange}
          onDropdownWillShow={this.onToggle(true)}
          onDropdownWillHide={this.onToggle(false)}
        />
      </View>
    )
  }
}

export default field()(ControlledDropdown)
