import React from 'react'
import { Divider } from 'antd'
import reactLogo from '../../assets/react-logo.png'
import antdLogo from '../../assets/antd-logo.png'
import classes from './Credits.module.css'

const Credits = () => {
	return (
		<div className={classes.Credits}>
			Powered by
			<a href='https://reactjs.org/'>
				<img src={reactLogo} alt='React Logo' />
			</a>
			<Divider type='vertical' />
			<a href='https://ant.design/'>
				<img src={antdLogo} alt='Ant Design Logo' />
			</a>
		</div>
	)
}

export default Credits
