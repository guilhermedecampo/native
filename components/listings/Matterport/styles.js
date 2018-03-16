import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'relative'
  },
  content: {
    position: 'absolute',
    zIndex: 100
  },
  webview: {
    width: '100%',
    height: '100%'
  },
  fallback: {
    position: 'absolute',
    display: 'none',
    zIndex: 0
  }
})
