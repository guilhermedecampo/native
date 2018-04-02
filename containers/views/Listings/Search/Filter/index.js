import _ from 'lodash/fp'
import {Component} from 'react'

import Field, {Button} from '@/components/listings/Search/Field'
import {Price, Area, Rooms} from './filters'
import Screen from '../Screen'

const activeParams = _.flow(_.omitBy(_.isEmpty), _.keys)

export default class MenuScreen extends Component {
  onSelect = (name) => () => {
    const {navigation} = this.props
    navigation.navigate(name, navigation.state.params)
  }

  onDismiss = () => {
    this.props.navigation.goBack(null)
  }

  get active() {
    const {navigation} = this.props
    return activeParams(navigation.state.params)
  }

  render() {
    return (
      <Screen {...this.props} onNavigate={this.onDismiss}>
        <Field title="Bairros">
          <Button onPress={this.onSelect('neighborhoods')}>Ver bairros</Button>
        </Field>
        <Field title="Preço">
          <Price />
        </Field>
        <Field title="Área">
          <Area />
        </Field>
        <Field title="Quartos">
          <Rooms />
        </Field>
      </Screen>
    )
  }
}

export const screen = MenuScreen
