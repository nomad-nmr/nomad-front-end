import React from 'react'
import InfoCard from './InfoCard/InfoCard'
import classes from './InfoCards.module.css'

const infoCards = props => {
  return (
    <div className={classes.InfoCards}>
      {props.cardsData.map(card => {
        return (
          <div key={card.id} onClick={() => props.clicked(card.id.toString())}>
            <InfoCard data={card} />
          </div>
        )
      })}
    </div>
  )
}

export default infoCards
