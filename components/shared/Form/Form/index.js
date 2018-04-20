import {PureComponent} from 'react'
import {View} from 'react-native'
import {Gateway} from 'react-gateway'

import {Footer} from '@/components/shared/Shell'
import {form} from './Provider'
import styles from './styles'

@form
export default class FormView extends PureComponent {
  static defaultProps = {
    label: 'Enviar'
  }

  onSubmit = () => {
    const {onValidate, onSubmit} = this.props
    if (onValidate()) onSubmit(this.props.value)
  }

  render() {
    const {children, label, style} = this.props
    return (
      <View style={[styles.container].concat(style)}>
        {children}
        <Gateway into="footer">
          <Footer label={label} onPress={this.onSubmit} />
        </Gateway>
      </View>
    )
  }
}