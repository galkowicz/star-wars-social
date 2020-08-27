import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import './App.scss'
import SearchList from './components/SearchList'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites, removeFromFavorites, selectPeople, selectFavorites } from './dataManager/peopleSlice'
import { selectPlanets } from './dataManager/planetsSlice'
import { selectSpecies } from './dataManager/speciesSlice'
import FavoritesList from './components/FavoritesList'
import SelectedItem from './components/SelectedItem'
import PeopleList from './components/PeopleList'

function App() {
  const favorites = useSelector(selectFavorites)
  const { people, status: peopleStatus } = useSelector(selectPeople)
  const { planets, status: planetsStatus } = useSelector(selectPlanets)
  const { species, status: speciesStatus } = useSelector(selectSpecies)

  const dispatch = useDispatch()

  const handleToggleFavorite = (favorite) => {
    if (favorites[favorite.favUrl]) {
      dispatch(removeFromFavorites(favorite))
    } else {
      dispatch(addToFavorites(favorite))
    }
  }

  return (
    <div className="App" style={{ paddingTop: '4em' }}>
      <Header as="h1" textAlign="center">
        Star Wars Social Media
      </Header>
      <Grid columns="equal" container stackable>
        <Grid.Row columns="equal">
          <Grid.Column>
            <SearchList
              items={people}
              status={peopleStatus}
              listHeader="People"
              onFavoriteClick={({ favUrl, name }) => {
                handleToggleFavorite({ favUrl, name })
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <SearchList items={planets} status={planetsStatus} listHeader="Plants" />
          </Grid.Column>
          <Grid.Column>
            <SearchList items={species} status={speciesStatus} listHeader="Species" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column>
            <SelectedItem />
          </Grid.Column>
          <Grid.Column>
            <PeopleList />
          </Grid.Column>
          <Grid.Column>
            <FavoritesList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default App
