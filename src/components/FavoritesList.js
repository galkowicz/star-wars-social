import React from 'react'
import { useSelector } from 'react-redux'
import { Header, List } from 'semantic-ui-react'
import { selectFavorites } from '../dataManager/generalSlice'

const FavoritesList = () => {
  const favorites = useSelector(selectFavorites)

  return (
    <>
      <Header as="h1">Favorite People:</Header>
      <List className="favorites-list">
        {Object.entries(favorites).map((item) => {
          const [key, value] = item
          return <List.Item key={key}>{value}</List.Item>
        })}
      </List>
    </>
  )
}

export default FavoritesList
