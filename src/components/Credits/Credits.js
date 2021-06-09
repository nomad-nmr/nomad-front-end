import React from 'react'
import { Divider } from 'antd'
import reactLogo from '../../assets/react-logo.png'
import antdLogo from '../../assets/antd-logo.png'
import reduxLogo from '../../assets/redux-logo.png'
import nodeLogo from '../../assets/node-logo.svg'
import mongoLogo from '../../assets/mongoDB-logo.png'
import socketIO from '../../assets/websocket.png'
import nginxLogo from '../../assets/nginx.png'
import classes from './Credits.module.css'

const credits = () => {
	return (
		<div className={classes.Credits}>
			<span className={classes.Text}>Powered by</span>
			<a href='https://reactjs.org/'>
				<img src={reactLogo} alt='React Logo' />
			</a>
			<Divider type='vertical' />
			<a href='https://ant.design/'>
				<img src={antdLogo} alt='Ant Design Logo' />
			</a>
			<Divider type='vertical' />
			<a href='https://redux.js.org/'>
				<img src={reduxLogo} alt='Redux Logo' />
			</a>
			<Divider type='vertical' />
			<a href='https://nodejs.org/'>
				<img src={nodeLogo} alt='Node.js Logo' />
			</a>
			<Divider type='vertical' />
			<a href='https://socket.io/'>
				<img src={socketIO} alt='Socket.io Logo' />
			</a>
			<Divider type='vertical' />
			<a href='https://www.mongodb.com/'>
				<img src={mongoLogo} alt='Node.js Logo' />
			</a>
			<Divider type='vertical' />
			<a href='https://www.nginx.com/'>
				<img src={nginxLogo} alt='Nginx Logo' />
			</a>
		</div>
	)
}

export default credits
