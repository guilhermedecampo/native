export const APP_LAUNCHED = 'screens/APP_LAUNCHED'
export const SCREEN_APPEARED = 'screens/SCREEN_APPEARED'
export const SCREEN_DISAPPEARED = 'screens/SCREEN_DISAPPEARED'
export const TAB_SELECTED = 'screens/TAB_SELECTED'
export const SWITCH_TAB = 'screens/SWITCH_TAB'
export const UPDATE_STACK_ROOT = 'screens/UPDATE_STACK_ROOT'

const uniqId = (prefix = '') =>
  prefix +
  Math.random()
    .toString(36)
    .substr(2, 9)

export const screenAppeared = ({componentId: id, componentName: name}) => ({
  type: SCREEN_APPEARED,
  id,
  name
})
export const screenDisappeared = ({componentId: id, componentName: name}) => ({
  type: SCREEN_DISAPPEARED,
  id,
  name
})
export const tabSelected = ({
  selectedTabIndex: tabIndex,
  unselectedTabIndex: previousTabIndex
}) => ({
  type: TAB_SELECTED,
  tabIndex,
  previousTabIndex
})
export const updateStackRoot = ({rootId, tabIndex, children} = {}) => ({
  type: UPDATE_STACK_ROOT,
  rootId: rootId || uniqId('bottom_tabs-'),
  tabIndex: tabIndex || 0,
  children: children || []
})
export const switchTab = (tabIndex) => ({type: SWITCH_TAB, tabIndex})

const initialState = {
  rootId: undefined,
  tabIndex: undefined,
  screen: {id: undefined, name: undefined}
}

export default function screenReducer(state = initialState, action) {
  switch (action.type) {
    case APP_LAUNCHED:
      return initialState
    case TAB_SELECTED:
      return {
        ...state,
        tabIndex: action.tabIndex
      }
    case UPDATE_STACK_ROOT:
      return {
        ...state,
        rootId: action.rootId,
        tabIndex: action.tabIndex
      }
    case SCREEN_APPEARED:
      return {
        ...state,
        screen: {id: action.id, name: action.name}
      }
    default:
      return state
  }
}
