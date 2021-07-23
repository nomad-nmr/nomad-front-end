import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import RackTabs from '../../components/RackTabs/RackTabs'
import AddRackModal from '../../components/Modals/AddRackModal/AddRackModal'
import AddSampleDrawer from '../../components/AddSampleDrawer/AddSampleDrawer'
import {
	addRack,
	fetchGroupList,
	fetchParamSets,
	toggleAddRack,
	getRacks,
	setActiveRackId,
	toggleAddSample,
	signOutHandler,
	addSample
} from '../../store/actions'

const BatchSubmit = props => {
	const {
		fetchGrpList,
		authToken,
		accessLevel,
		username,
		fetchRacks,
		racksData,
		setActiveTabId,
		activeTabId,
		fetchParamSets
	} = props

	useEffect(() => {
		if (authToken && (accessLevel === 'admin' || accessLevel === 'admin-b')) {
			fetchGrpList(authToken)
		}
		if (authToken) {
			fetchParamSets(authToken, { instrumentId: null, searchValue: '', list: true })
		}
		fetchRacks()
	}, [fetchGrpList, fetchRacks, authToken, accessLevel, fetchParamSets])

	//Hook setting active tabId when tabs are reloaded
	useEffect(() => {
		if (!activeTabId && racksData.length > 0) {
			setActiveTabId(racksData[0]._id)
		}
	}, [racksData, activeTabId, setActiveTabId])

	const activeRack = racksData.find(rack => rack._id === props.activeTabId)

	let filteredRacks = []
	if (accessLevel === 'admin' || accessLevel === 'admin-b') {
		filteredRacks = [...racksData]
	} else {
		if (!authToken) {
			filteredRacks = racksData.filter(rack => rack.isOpen)
		} else {
			filteredRacks = racksData.filter(rack => rack.isOpen && rack.group.groupName === props.grpName)
		}
	}

	//setting error that disables to user-b to add sample to a rack that does not belong to his group
	let drawerError = false
	if (accessLevel !== 'admin' && accessLevel !== 'admin-b') {
		drawerError = activeRack ? activeRack.group.groupName !== props.grpName : true
	}

	return (
		<div>
			<Spin size='large' spinning={props.loading}>
				{filteredRacks.length === 0 ? (
					<h1 style={{ marginTop: 30 }}>No Racks Open</h1>
				) : (
					<RackTabs data={filteredRacks} setActiveTabId={setActiveTabId} activeTabId={activeTabId} />
				)}
			</Spin>

			<AddRackModal
				visible={props.addRackVis}
				toggleHandler={props.tglAddRack}
				groupList={props.grpList}
				onSubmit={props.addRackHandler}
				token={authToken}
			/>
			<AddSampleDrawer
				visible={props.addSampleVis}
				toggleHandler={props.tglAddSample}
				rackTitle={activeRack && activeRack.title}
				error={drawerError}
				user={{ username, accessLevel, authToken }}
				signOutHandler={props.logOutHandler}
				paramSets={props.paramSetsList}
				activeRackId={activeTabId}
				onAddSample={props.addSampleHandler}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		addRackVis: state.batchSubmit.addRackVisible,
		addSampleVis: state.batchSubmit.addSampleVisible,
		grpList: state.groups.groupList,
		racksData: state.batchSubmit.racks,
		activeTabId: state.batchSubmit.activeRackId,
		username: state.auth.username,
		authToken: state.auth.token,
		accessLevel: state.auth.accessLevel,
		grpName: state.auth.groupName,
		paramSetsList: state.paramSets.paramSetsData,
		loading: state.batchSubmit.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		tglAddRack: () => dispatch(toggleAddRack()),
		tglAddSample: () => dispatch(toggleAddSample()),
		fetchGrpList: token => dispatch(fetchGroupList(token)),
		addRackHandler: (data, token) => dispatch(addRack(data, token)),
		fetchRacks: () => dispatch(getRacks()),
		setActiveTabId: id => dispatch(setActiveRackId(id)),
		logOutHandler: token => dispatch(signOutHandler(token)),
		fetchParamSets: (token, searchParams) => dispatch(fetchParamSets(token, searchParams)),
		addSampleHandler: (data, rackId, token) => dispatch(addSample(data, rackId, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchSubmit)
