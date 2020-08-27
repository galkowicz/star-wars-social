import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    selectedItem: null,
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload
    },
  }
})

export const { setSelectedItem } = generalSlice.actions

export const selectedItem = (state) => state.general.selectedItem || {}

export default generalSlice.reducer
