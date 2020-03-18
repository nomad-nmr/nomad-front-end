import React from 'react'
import { Tabs } from 'antd'
import classes from './StatusTabs.module.css'

const { TabPane } = Tabs

const StatusTabs = props => {
	const TabsArr = props.overview.map(tab => {
		return (
			<TabPane tab={tab.name} key={tab.id}>
				{tab.name}
			</TabPane>
		)
	})

	return (
		<Tabs
			type='card'
			className={classes.StatusTabs}
			activeKey={props.activeTab}
			// onChange={activeKey => console.log(activeKey)}
		>
			{TabsArr}
		</Tabs>
	)
}

export default StatusTabs
