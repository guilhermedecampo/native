import {StyleSheet} from 'react-native'

import NestedStyleSheet from '@/assets/StyleSheet'
import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

export default NestedStyleSheet({
  container: {
    padding: 15,
    paddingTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray.lighter,
    borderRadius: 5,
    ':small': {
      borderRadius: 3
    },
    ':active': {
      backgroundColor: colors.gray.offWhite
    },
    ':raised': {
      padding: 0,
      paddingTop: 0,
      margin: 10,
      backgroundColor: 'white',
      ...elevation(5)
    }
  },
  thumbnail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 5,
    ':small': {
      borderRadius: 3
    },
    ':primary': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopWidth: 4,
      borderColor: colors.blue.medium,
      backgroundColor: colors.blue.medium,
      marginTop: -4
    }
  },
  image: {
    width: '100%',
    borderRadius: 5,
    ':small': {
      borderRadius: 3
    },
    ':primary': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  },
  body: {
    padding: 15,
    ':small': {
      padding: 20
    },
    ':raised': {
      padding: 15,
      paddingTop: 10
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    ':small': {
      marginBottom: 5
    }
  },
  street: {
    color: colors.gray.darker,
    flex: 1,
    fontSize: 20,
    marginRight: 15,
    ':small': {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 10
    }
  },
  neighborhood: {
    color: colors.gray.medium,
    fontWeight: '600'
  },
  priceText: {
    fontWeight: '300',
    color: colors.gray.darker
  }
})
