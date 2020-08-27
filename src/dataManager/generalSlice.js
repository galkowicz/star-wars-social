import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    selectedItem: null,
    favorites: {},
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload
    },
    addToFavorites: (state, action) => {
      const { favUrl, name } = action.payload

      state.favorites = { ...state.favorites, [favUrl]: name }
    },
    removeFromFavorites: (state, action) => {
      const { favUrl } = action.payload

      state.favorites = { ...state.favorites, [favUrl]: false }
    },
  },
})

export const { setSelectedItem, addToFavorites, removeFromFavorites } = generalSlice.actions

export const selectedItem = (state) => state.general.selectedItem || {}
export const selectFavorites = (state) => state.general.favorites

export default generalSlice.reducer
