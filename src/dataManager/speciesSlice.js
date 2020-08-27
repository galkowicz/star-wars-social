import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL, getUrl } from '../util'

export const fetchSpecies = createAsyncThunk('species/fetchSpecies', async () => {
  const response = await getUrl(`${BASE_URL}/species/`)
  return response.data
})

export const speciesSlice = createSlice({
  name: 'species',
  initialState: {
    species: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [fetchSpecies.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchSpecies.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.species = state.species.concat(action.payload)
    },
    [fetchSpecies.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const selectSpecies = (state) => state.species

export default speciesSlice.reducer
