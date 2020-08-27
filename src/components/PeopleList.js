import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Dimmer, Header, List, Loader, Segment } from 'semantic-ui-react'
import { selectedItem } from '../dataManager/generalSlice'
import { getAllPeople } from '../util'

const getPeopleUrlArray = (objectItem) => {
  let urlArray = []
  if (objectItem.residents) {
    urlArray = objectItem.residents
  }
  if (objectItem.people) {
    urlArray = objectItem.people
  }

  return urlArray
}

const PeopleList = () => {
  const objectItem = useSelector(selectedItem) || {}
  const isSelectedPeople = objectItem.url && objectItem.url.includes('people')
  const peopleUrlArray = React.useMemo(() => getPeopleUrlArray(objectItem), [objectItem])
  const { isLoading, data = [] } = useQuery([objectItem.url, { peopleUrlArray }], getAllPeople, {
    staleTime: Infinity,
  })

  if (isSelectedPeople) {
    return null
  }

  return (
    <>
      <Header as="h1">{`${objectItem.name || ''} Characters:`}</Header>
      <Segment style={{ height: '20rem' }}>
        <List className="items-people-list">
          {isLoading && (
            <Dimmer active inverted>
              <Loader indeterminate>Loading List</Loader>
            </Dimmer>
          )}
          {data.map((item) => {
            return <List.Item key={item.url}>{item.name}</List.Item>
          })}
        </List>
      </Segment>
    </>
  )
}

export default PeopleList
