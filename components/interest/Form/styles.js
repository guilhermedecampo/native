import StyleSheet from '@/assets/StyleSheet'
import {padding} from '@/assets/styles'

export default StyleSheet({
  container: {
    padding: 20
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    ...padding(10, 40)
  },
  field: {
    paddingTop: 20
  },
  separator: {
    marginTop: 20
  }
})
