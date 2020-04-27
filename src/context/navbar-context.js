import React from 'react'

const navBarContext = React.createContext({
  //currentUser: null,
  //adminAccess: false,
  //onSignOut: () => {},
  //authAvatarClicked: () => {},
  cardSwitchOn: false,
  toggleCards: () => {},
  statusButtonsData: [],
  statusButtonClicked: () => {},
})

export default navBarContext
