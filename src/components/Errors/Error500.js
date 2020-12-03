import React from 'react'
import { withRouter } from 'react-router-dom'
import { Result, Button } from 'antd'

const error500 = props => (
	<Result
		status='500'
		title='500'
		subTitle='Sorry, something went wrong on the server.'
		extra={
			<Button type='primary' onClick={() => props.history.push({ pathname: '/' })}>
				Back Home
			</Button>
		}
	/>
)

export default withRouter(error500)
