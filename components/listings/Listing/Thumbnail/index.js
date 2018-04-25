import _ from 'lodash'
import {Component} from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Matterport from '@/components/listings/Matterport'
import Image from '../../Image'
import styles from './styles'

const ActionButton = ({title, icon, onPress}) => (
  <View style={styles.button}>
    <TouchableOpacity
      accessible
      accessibilityLabel={title}
      accessibilityTraits="button"
      onPress={onPress}
    >
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  </View>
)

export default class ListingThumbnail extends Component {
  onOpenGallery = () => this.props.onOpen('gallery')

  onOpenTour = () => {
    this.props.onOpen('matterport')
    this.props.onViewTour()
  }

  onViewTour = _.after(50, _.once(this.props.onViewTour))

  render() {
    const {images, matterport_code} = this.props
    const image = images[0] || {}
    let {width, height} = Dimensions.get('window')
    height = width * 0.64

    return (
      <View style={styles.container}>
        <View
          onMoveShouldSetResponder={() => true}
          onStartShouldSetResponder={() => true}
          onResponderMove={this.onViewTour}
        >
          <Matterport code={matterport_code} width={width} height={height}>
            <Image thumbnail {...image} width={width} height={height} />
          </Matterport>
        </View>
        <View style={styles.actions}>
          <ActionButton
            title="Ver Imagens"
            icon="camera"
            onPress={this.onOpenGallery}
          />
          {matterport_code && (
            <ActionButton
              title="Ver em Tela Cheia"
              icon="fullscreen"
              onPress={this.onOpenTour}
            />
          )}
        </View>
      </View>
    )
  }
}
