import {TouchableOpacity, Image} from 'react-native'

import styles from './styles'

export default function ListingMapButton({style, onPress}) {
  return (
    <TouchableOpacity style={style} activeOpacity={0.8} onPress={onPress}>
      <Image
        source={require('@/assets/img/map_button.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}
