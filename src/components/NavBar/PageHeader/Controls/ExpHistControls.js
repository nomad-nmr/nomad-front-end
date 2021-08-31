import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

const ExpHistControls = props => {
	return (
		<DatePicker
			style={{ marginLeft: '10px' }}
			defaultValue={moment()}
			allowClear={false}
			format='DD MMM YYYY'
			onChange={date => props.dateHandler(moment(date).format('YYYY-MM-DD'))}
		/>
	)
}

export default ExpHistControls
