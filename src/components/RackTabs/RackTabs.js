import React, { useEffect } from 'react'
import { Tabs } from 'antd'

import RackTable from './RackTable/RackTable'

const { TabPane } = Tabs

const RackTabs = props => {
	const { data, setActiveTabId } = props

	//Hook setting active tabId when tabs are reloaded
	useEffect(() => {
		if (data.length > 0) {
			setActiveTabId(data[0]._id)
		}
	}, [data, setActiveTabId])

	const racksTabArr = data.map(rack => {
		const fontColor = rack.isOpen ? '#52c41a' : '#fa8c16'
		return (
			<TabPane
				tab={<div style={{ fontSize: '1rem', color: fontColor, padding: '0px 5px' }}>{rack.title}</div>}
				key={rack._id}>
				<div>
					<RackTable data={rack.samples} />
				</div>
			</TabPane>
		)
	})
	return (
		<div style={{ margin: '20px 40px' }}>
			<Tabs
				tabBarGutter={15}
				activeKey={props.activeTabId}
				animated={false}
				centered
				onChange={activeKey => setActiveTabId(activeKey)}>
				{racksTabArr}
			</Tabs>
		</div>
	)
}

export default RackTabs
