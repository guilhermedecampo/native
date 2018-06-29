import {input} from '../shared/selectors'

export const addressScreen = () => by.id('@listingForm.Address')

export const propertiesScreen = () => by.id('@listingForm.Properties')

export const successScreen = () => by.id('@listingForm.Created')

export const galleryScreen = () => by.id('@listingForm.Gallery')

export const autoComplete = () => by.id('address_auto_complete')

export const autoCompleteOptions = () =>
  by.type('RCTView').withAncestor(autoComplete())

export const autoCompleteInput = () => input('Endereço autocomplete')
