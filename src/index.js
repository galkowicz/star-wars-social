import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './app/store'
import * as serviceWorker from './serviceWorker'
import { fetchPeople } from './dataManager/peopleSlice'
import { fetchPlanets } from './dataManager/planetsSlice'
import { fetchSpecies } from './dataManager/speciesSlice'

store.dispatch(fetchPeople())
store.dispatch(fetchPlanets())
store.dispatch(fetchSpecies())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
