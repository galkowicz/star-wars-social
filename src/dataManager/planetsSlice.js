import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL, getUrl } from "../util";

export const fetchPlanets = createAsyncThunk('planets/fetchPlanets', async () => {
  const response = await getUrl(`${BASE_URL}/planets/`)
  return response.data
})

export const planetsSlice = createSlice({
  name: 'planets',
  initialState: {
    planets: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [fetchPlanets.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPlanets.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.planets = state.planets.concat(action.payload)
    },
    [fetchPlanets.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const selectPlanets = (state) => state.planets

export default planetsSlice.reducer
