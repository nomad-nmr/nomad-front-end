import React from 'react'
import { withRouter } from 'react-router-dom'
import { Result, Button } from 'antd'

const error404 = props => (
	<Result
		status='404'
		title='404'
		subTitle='Sorry, the resource that you have tried to access does not exist.'
		extra={
			<Button type='primary' onClick={() => props.history.push({ pathname: '/' })}>
				Back Home
			</Button>
		}
	/>
)

export default withRouter(error404)
