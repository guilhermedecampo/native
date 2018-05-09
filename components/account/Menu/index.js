import {View} from 'react-native'

import Button from '../FormButton'

export default function AccountMenu({onChangeProfile, onSignOut}) {
  return (
    <View>
      <Button onPress={onChangeProfile} icon="chevron-left">
        Editar perfil
      </Button>
      <Button onPress={onSignOut} icon="sign-out">
        Sair
      </Button>
    </View>
  )
}
