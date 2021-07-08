import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import RackTabs from '../../components/RackTabs/RackTabs'
import AddRackModal from '../../components/Modals/AddRackModal/AddRackModal'
import { addRack, fetchGroupList, toggleAddRack, getRacks, setActiveRackId } from '../../store/actions'

const BatchSubmit = props => {
	const { fetchGrpList, authToken, accessLevel, fetchRacks, racksData, setActiveTabId } = props

	useEffect(() => {
		if (authToken) {
			fetchGrpList(authToken)
		}
		fetchRacks()
	}, [fetchGrpList, fetchRacks, authToken])

	let filteredRacks = []
	if (accessLevel === 'admin' || accessLevel === 'admin-b') {
		filteredRacks = [...racksData]
	} else {
		filteredRacks = racksData.filter(rack => rack.isOpen)
	}

	return (
		<div>
			{filteredRacks.length === 0 ? (
				<h1 style={{ marginTop: 30 }}>No Racks Open</h1>
			) : (
				<RackTabs data={filteredRacks} setActiveTabId={setActiveTabId} activeTabId={props.activeTabId} />
			)}
			<AddRackModal
				visible={props.addRackVis}
				toggleHandler={props.tglAddRack}
				groupList={props.grpList}
				onSubmit={props.addRackHandler}
				token={authToken}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		addRackVis: state.batchSubmit.addRackVisible,
		grpList: state.groups.groupList,
		authToken: state.auth.token,
		accessLevel: state.auth.accessLevel,
		racksData: state.batchSubmit.racks,
		activeTabId: state.batchSubmit.setActiveRackId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		tglAddRack: () => dispatch(toggleAddRack()),
		fetchGrpList: token => dispatch(fetchGroupList(token)),
		addRackHandler: (data, token) => dispatch(addRack(data, token)),
		fetchRacks: () => dispatch(getRacks()),
		setActiveTabId: id => dispatch(setActiveRackId(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchSubmit)
