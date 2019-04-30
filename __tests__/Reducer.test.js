import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import ibReducer from '../src/components/ImagesBrowser/imagesbrowserReducer'
jest.mock('@react-native-community/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn()
}))

import {
  fetchImagesBegin,
  fetchImagesSuccess,
  toggleGridView,
  toggleImageDisplay,
  toggleFavorite,
  saveFavorite,
  storeFavorites
} from '../src/components/ImagesBrowser/ImagesBrowserActions'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {
  images: [],
  favorites: [],
  loading: true,
  gridView: true,
  displayImage: false,
  displayFavorites: false,
  image: null
}

describe('Actions functionality', () => {
  test('image loading', () => {
    const store = createStore(ibReducer, initialState, composedEnhancers)
    expect(store.getState()).toHaveProperty('loading', true)
    store.dispatch(fetchImagesBegin())
    expect(store.getState()).toHaveProperty('loading', true)
    store.dispatch(fetchImagesSuccess())
    expect(store.getState()).toHaveProperty('loading', false)
  })

  test('toggle grid view', () => {
    const store = createStore(ibReducer, initialState, composedEnhancers)
    expect(store.getState()).toHaveProperty('gridView', true)
    store.dispatch(toggleGridView(false))
    expect(store.getState()).toHaveProperty('gridView', false)
    store.dispatch(toggleGridView(true))
    expect(store.getState()).toHaveProperty('gridView', true)
  })

  test('toggle image display and add image', () => {
    const store = createStore(ibReducer, initialState, composedEnhancers)
    expect(store.getState()).toHaveProperty('displayImage', false)
    store.dispatch(toggleImageDisplay(true, 'test.png'))
    expect(store.getState()).toHaveProperty('displayImage', true)
    expect(store.getState()).toHaveProperty('image', 'test.png')
    store.dispatch(toggleImageDisplay(false))
    expect(store.getState()).toHaveProperty('displayImage', false)
  })

  test('toggle favorites view', () => {
    const store = createStore(ibReducer, initialState, composedEnhancers)
    expect(store.getState()).toHaveProperty('displayFavorites', false)
    store.dispatch(toggleFavorite(true))
    expect(store.getState()).toHaveProperty('displayFavorites', true)
    store.dispatch(toggleFavorite(false))
    expect(store.getState()).toHaveProperty('displayFavorites', false)
  })

  test('storing favorites', () => {
    const store = createStore(ibReducer, initialState, composedEnhancers)
    expect(store.getState()).toHaveProperty('favorites', [])
    store.dispatch(storeFavorites({ id: 1, previewURL: 'store.png' }))
    expect(store.getState()).toHaveProperty('favorites', [{ id: 1, previewURL: 'store.png' }])
    store.dispatch(saveFavorite({ id: 2, previewURL: 'test.png' }))
    expect(store.getState()).toHaveProperty('favorites', [
      { id: 1, previewURL: 'store.png' },
      { id: 2, previewURL: 'test.png' }
    ])
  })
})
