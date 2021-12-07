import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import batchSubmitIcon from '../../../assets/batch-submit.png'

import classes from './MainMenu.module.css'

const MainMenu = props => {
  const navigate = useNavigate()
  const location = useLocation()
  const { accessLevel } = props

  const handleClick = e => {
    if (!props.username) {
      props.openAuthModal(e.keyPath[0])
    } else {
      navigate({ pathname: e.keyPath[0] })
    }
  }

  return (
    <Menu
      mode='horizontal'
      onClick={handleClick}
      selectable={false}
      style={{ marginRight: 30 }}
      selectedKeys={[location.pathname]}
    >
      {process.env.REACT_APP_SUBMIT_ON === 'true' && props.username ? (
        <Menu.Item key='/submit' icon={<DownloadOutlined style={{ fontSize: 20 }} />}>
          <span className={classes.MenuItem}>Book New Job</span>
        </Menu.Item>
      ) : null}
      {process.env.REACT_APP_BATCH_SUBMIT_ON === 'true' &&
      (accessLevel === 'admin' || accessLevel === 'admin-b') ? (
        <Menu.Item
          key='/batch-submit'
          icon={
            <img
              src={batchSubmitIcon}
              style={{ width: '30px', height: '30px', marginBottom: '8px' }}
              alt='batch-submit icon'
            />
          }
        >
          <span className={classes.MenuItem}>Batch Submit</span>
        </Menu.Item>
      ) : null}

      <Menu.Item key='/search' disabled icon={<SearchOutlined style={{ fontSize: 20 }} />}>
        <span className={classes.MenuItem}>Search</span>
      </Menu.Item>
    </Menu>
  )
}

export default MainMenu
