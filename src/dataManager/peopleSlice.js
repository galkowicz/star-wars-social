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

export const selectPeople = (state) => state.people

export default peopleSlice.reducer
