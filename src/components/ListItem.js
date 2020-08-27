import React from 'react'
import { Icon } from 'semantic-ui-react'

import './ListItem.scss'

const ListItem = ({
  name,
  isFavorite,
  isSelected,
  onFavoriteClick,
  isWithFavorite,
  index,
  onItemSelected,
  favoriteAmount = 0,
}) => {
  const iconName = isFavorite ? 'star' : 'star outline'
  const iconColor = isFavorite ? 'yellow' : 'black'
  const className = isSelected ? 'selected' : ''

  return (
    <div className={`list-item ${className}`} onClick={onItemSelected}>
      <span className="list-item__name">{name}</span>
      {isWithFavorite && (
        <div
          className="list-item__icon"
          onClick={(e) => {
            onFavoriteClick(index)
            e.stopPropagation()
          }}
        >
          <Icon name={iconName} color={iconColor} />
        </div>
      )}
      <div className="favorite-amount" style={{ float: 'right', paddingRight: '25px' }}>
        {favoriteAmount ? `(${favoriteAmount})` : ''}
      </div>
    </div>
  )
}

export default ListItem
