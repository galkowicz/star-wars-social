import React from 'react'
import { useSelector } from 'react-redux'
import { Header, List } from 'semantic-ui-react'
import { selectedItem } from '../dataManager/generalSlice'

const SelectedItem = () => {
  const objectItem = useSelector(selectedItem)

  return (
    <>
      <Header as="h1">Selected Item:</Header>
      {objectItem && (
        <List className="favorites-list">
          {Object.entries(objectItem).map((item) => {
            const [key, value] = item
            return (
              <List.Item key={key}>
                <List.Content>
                  <List.Header>{key}</List.Header>
                  <List.Description>{value}</List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      )}
    </>
  )
}

export default SelectedItem
