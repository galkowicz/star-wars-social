import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Header, Input, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { List } from 'react-virtualized'
import ListItem from './ListItem'
import { calculateFavoritesAmount } from '../util'
import { selectedItem, setSelectedItem, selectFavorites } from '../dataManager/generalSlice'

const SearchList = ({ items = [], listHeader = '', onFavoriteClick = false, status }) => {
  const objectItem = useSelector(selectedItem)
  const favorites = useSelector(selectFavorites)
  const dispatch = useDispatch()

  const [searchString, setSearchString] = React.useState('')
  const [list, setList] = React.useState(items)

  const isWithFavorite = typeof onFavoriteClick === 'function'
  const isDoneLoading = status === 'succeeded' || status === 'failed'

  React.useEffect(() => {
    let updatedList
    if (searchString !== '') {
      updatedList = items.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()))
    } else {
      updatedList = items
    }

    setList(updatedList)
  }, [items, searchString])

  const handleInputChange = (e) => {
    setSearchString(e.currentTarget.value)
  }

  const rowRenderer = ({ key, index, style }) => {
    const { name, url } = list[index]
    const isFavorite = favorites[url]
    const isSelected = objectItem && url === objectItem.url
    const favoriteAmount = calculateFavoritesAmount(list[index], favorites)

    return (
      <div key={key} style={style}>
        <ListItem
          name={name}
          isFavorite={isFavorite}
          isSelected={isSelected}
          index={index}
          onItemSelected={() => {
            dispatch(setSelectedItem(list[index]))
          }}
          onFavoriteClick={() => {
            onFavoriteClick({ favUrl: list[index].url, name: list[index].name })
          }}
          isWithFavorite={isWithFavorite}
          favoriteAmount={favoriteAmount}
        />
      </div>
    )
  }

  return (
    <Container style={{ marginTop: '2em', cursor: 'default' }}>
      <Header as="h2">{listHeader}</Header>
      <Input onChange={handleInputChange} placeholder="Search..." />
      <Segment style={{ height: '16rem' }}>
        {isDoneLoading ? (
          <List rowRenderer={rowRenderer} rowCount={list.length} width={300} height={200} rowHeight={20} />
        ) : (
          <Dimmer active inverted>
            <Loader indeterminate>Loading List</Loader>
          </Dimmer>
        )}
      </Segment>
    </Container>
  )
}

export default SearchList
