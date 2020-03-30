import React from 'react'
import TrafficLightsContext from '../../context/trafficLights-context'
import InfoCard from './InfoCard/InfoCard'
import classes from './InfoCards.module.css'

const infoCards = props => {
  // const cardArr =
  return (
    <div className={classes.InfoCards}>
      {props.cardsData.map(card => {
        const { errors, running, availableHolders } = card
        return (
          <TrafficLightsContext.Provider
            key={card.id}
            value={{ errors: errors, running: running, availableHolders: availableHolders }}
          >
            <div onClick={() => props.clicked(card.id.toString())}>
              <InfoCard data={card} />
            </div>
          </TrafficLightsContext.Provider>
        )
      })}
    </div>
  )
}

export default infoCards
