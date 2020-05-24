import React from 'react'
import TweenOne from 'rc-tween-one'

const AnimateFlash = props => {
  return (
    <TweenOne
      animation={{
        opacity: 1,
        scale: 1,
        yoyo: true,
        repeat: -1,
        duration: 500
      }}
      style={{ opacity: 0.5, transform: 'scale(0.8)' }}
    >
      {props.children}
    </TweenOne>
  )
}

export default AnimateFlash
