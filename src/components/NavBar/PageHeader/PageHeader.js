import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { PageHeader, Switch } from 'antd'
import classes from './PageHeader.module.css'
import NavbarContext from '../../../context/navbar-context'
import StatusButtons from '../StatusButtons/StatusButtons'

import dashIcon from '../../../assets/dashboard.svg'
import userIcon from '../../../assets/user.svg'
import groupIcon from '../../../assets/group.svg'
import magnetIcon from '../../../assets/magnet.svg'
import experimentIcon from '../../../assets/lab.svg'

const PageHeaderEl = (props) => {
  const { toggleCards, cardSwitchOn, statusButtonsData, statusButtonClicked } = useContext(NavbarContext)

  let headerTitle = ''
  let avatarSrc
  let extra = null

  switch (props.location.pathname) {
    case '/dashboard':
      headerTitle = 'Dashboard'
      avatarSrc = dashIcon
      extra = (
        <div className={classes.ExtraContainer}>
          <div className={classes.SwitchElement}>
            <label>Cards</label>
            <Switch
              size='small'
              checked={cardSwitchOn}
              checkedChildren='On'
              unCheckedChildren='Off'
              onChange={toggleCards}
            />
          </div>
          <StatusButtons data={statusButtonsData} click={statusButtonClicked} />
        </div>
      )
      break

    case '/dashboard/users':
      headerTitle = 'Manage Users'
      avatarSrc = userIcon
      break
    case '/dashboard/groups':
      headerTitle = 'Manage Groups'
      avatarSrc = groupIcon
      break

    case '/dashboard/instruments':
      headerTitle = 'Setting Instruments'
      avatarSrc = magnetIcon
      break
    case '/dashboard/experiments':
      headerTitle = 'Setting Experiments'
      avatarSrc = experimentIcon
      break
    default:
      headerTitle = ''
      avatarSrc = ''
  }

  return (
    <PageHeader
      className={classes.PageHeader}
      title={headerTitle}
      avatar={{ src: avatarSrc }}
      extra={extra}
    />
  )
}

export default withRouter(PageHeaderEl)
