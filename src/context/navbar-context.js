import React from 'react'

const navBarContext = React.createContext({
  currentUser: null,
  adminAccess: false,
  onSignOut: () => {},
  authAvatarClicked: () => {}
})

export default navBarContext
