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

describe('actions functionality', () => {
  it('should create an action with correct type', () => {
    expect(fetchImagesBegin().type).toEqual('FETCH_IMAGES_BEGIN')
    expect(fetchImagesSuccess().type).toEqual('FETCH_IMAGES_SUCCESS')
    expect(toggleGridView().type).toEqual('TOGGLE_GRID_VIEW')
    expect(toggleImageDisplay().type).toEqual('TOGGLE_IMAGE_DISPLAY')
    expect(toggleFavorite().type).toEqual('TOGGLE_FAVORITE')
    expect(saveFavorite().type).toEqual('SAVE_FAVORITE')
    expect(storeFavorites().type).toEqual('STORE_FAVORITES')
  })
})
