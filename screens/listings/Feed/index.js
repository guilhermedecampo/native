import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {loadMore} from '@/redux/modules/listings/feed'
import {getListings, isLoading} from '@/redux/modules/listings/feed/selectors'
import {Shell, Body, Header, Footer} from '@/components/layout'
import MapButton from '@/components/listings/Map/Button'
import ListingFeed from '@/components/listings/Feed/Listing'
import BottomTabs from '@/screens/containers/BottomTabs'
import Feed from '@/screens/listings/shared/Feed'
import Card from '@/screens/listings/shared/Card'
import SearchHeader from './Header'
import ListEmpty from './ListEmpty'
import ListHeader from './ListHeader'
import styles from './styles'

import MapScreen from '@/screens/listings/Map'
import SearchScreen from '@/screens/listings/Search'

@connect(
  (state) => ({
    data: getListings(state, {type: 'search'}),
    loading: isLoading(state, {type: 'search'})
  }),
  {loadMore: loadMore('search')},
  null,
  {withRef: true}
)
export default class ListingsFeedScreen extends PureComponent {
  static screenName = 'listings.Feed'

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      translucent: true,
      height: 0,
      backButtonTitle: 'Imóveis'
    }
  }

  componentDidAppear() {
    const {data, loading, loadMore} = this.props
    if (_.isEmpty(data) && !loading) loadMore(15)
  }

  onOpenMap = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: MapScreen.screenName,
        passProps: this.props
      }
    })
  }

  onOpenSearch = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SearchScreen.screenName,
        passProps: this.props
      }
    })
  }

  render() {
    const {loading, componentId} = this.props
    return (
      <Shell>
        <Header>
          <SearchHeader onPress={this.onOpenSearch} />
        </Header>
        <Body style={styles.container}>
          <Feed
            as={ListingFeed}
            target={componentId}
            Card={Card}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={loading ? undefined : ListEmpty}
          />
          <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
        </Body>
        <Footer>
          <BottomTabs />
        </Footer>
      </Shell>
    )
  }
}
