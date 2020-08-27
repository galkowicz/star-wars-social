import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import peopleReducer from '../dataManager/peopleSlice'
import planetsReducer from '../dataManager/planetsSlice'
import speciesReducer from '../dataManager/speciesSlice'
import generalReducer from '../dataManager/generalSlice'

const rootReducer = combineReducers({
  people: peopleReducer,
  planets: planetsReducer,
  species: speciesReducer,
  general: generalReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['species', 'people', 'planets'],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export let persistor = persistStore(store)
