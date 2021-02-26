import React from 'react'
import { withRouter } from 'react-router-dom'
import { Result, Button } from 'antd'

const error403 = props => (
	<Result
		status='403'
		title='403'
		subTitle='Sorry, you are not authorized to access this resource. Please, login'
		extra={
			<Button type='primary' onClick={() => props.history.push({ pathname: '/' })}>
				Back Home
			</Button>
		}
	/>
)

export default withRouter(error403)
