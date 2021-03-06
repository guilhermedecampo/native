import {login} from '../auth/interactions'
import {loginScreen} from '../auth/selectors'
import {addressScreen} from './selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe.skip('listingForm', () => {
  beforeAll(actions.navigate)

  it('redirects to login screen', async () => {
    await expect(element(loginScreen())).toBeVisible()
  })

  it('redirects to new listing screen after user logs in', async () => {
    await login()
    await expect(element(addressScreen())).toBeVisible()
  })

  it('shows a modal when "learn more" is pressed', async () => {
    await element(by.id('learn_more_button')).tap()
    await expect(element(select.learnMoreScreen())).toBeVisible()
    await element(by.id('close_modal_button')).tap()
    await waitFor(element(select.learnMoreScreen())).toBeNotVisible()
  })

  // require('./Address')
  // require('./Properties')
})
