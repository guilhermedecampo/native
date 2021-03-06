import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: colors.gray.darker,
    flex: 1
  },
  image: {
    backgroundColor: colors.gray.darker
  },
  gallery: {
    flex: 1,
    width: '100%'
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    width: '100%'
  }
})
