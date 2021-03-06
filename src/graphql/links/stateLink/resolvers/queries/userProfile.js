import {getFavorites} from '../mutations/favorites'
import {getBlacklist} from '../mutations/blacklist'

export default async function userProfile(prev = {}) {
  return {
    __typename: 'User',
    id: null,
    role: null,
    name: null,
    email: null,
    phone: null,
    listings: [],
    favorites: await getFavorites(),
    blacklists: await getBlacklist(),
    notificationPreferences: {
      __typename: 'NotificationPreferences',
      app: true,
      email: true
    },
    ...prev
  }
}
