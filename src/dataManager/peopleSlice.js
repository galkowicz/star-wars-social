import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL, getUrl } from '../util'

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
  const response = await getUrl(`${BASE_URL}/people/`)
  return response.data
})

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    people: [],
    favorites: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const { favUrl, name } = action.payload

      state.favorites = { ...state.favorites, [favUrl]: name }
    },
    removeFromFavorites: (state, action) => {
      const { favUrl } = action.payload

      state.favorites = { ...state.favorites, [favUrl]: false }
    },
  },
  extraReducers: {
    [fetchPeople.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPeople.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.people = state.people.concat(action.payload)
    },
    [fetchPeople.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { addToFavorites, removeFromFavorites } = peopleSlice.actions

export const selectPeople = (state) => state.people
export const selectFavorites = (state) => state.people.favorites

export default peopleSlice.reducer
