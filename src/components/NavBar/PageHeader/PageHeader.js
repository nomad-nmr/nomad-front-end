import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	toggleCards,
	openDashDrawer,
	toggleShowForm,
	toggleUserForm,
	toggleShowInactive,
	toggleShowInactiveInstruments
} from '../../../store/actions/index'

import { PageHeader, Switch, Button } from 'antd'
import classes from './PageHeader.module.css'
import StatusButtons from './StatusButtons/StatusButtons'

import dashIcon from '../../../assets/dashboard.svg'
import userIcon from '../../../assets/user.svg'
import groupIcon from '../../../assets/group.svg'
import magnetIcon from '../../../assets/magnet.svg'
import experimentIcon from '../../../assets/lab.svg'

const PageHeaderEl = props => {
	const {
		toggleCards,
		cardSwitchOn,
		statusButtonsData,
		statusButtonClicked,
		showInactive,
		switchShowInactive
	} = props

	let headerTitle = ''
	let avatarSrc
	let extra = null

	switch (props.location.pathname) {
		case '/dashboard':
			headerTitle = 'Dashboard'
			avatarSrc = dashIcon
			extra = (
				<div className={classes.ExtraContainer}>
					<div className={classes.SwitchElement}>
						<label>Cards</label>
						<Switch
							size='small'
							checked={cardSwitchOn}
							checkedChildren='On'
							unCheckedChildren='Off'
							onChange={toggleCards}
						/>
					</div>
					<StatusButtons data={statusButtonsData} click={statusButtonClicked} />
				</div>
			)
			break

		case '/admin/users':
			headerTitle = 'Manage Users'
			avatarSrc = userIcon
			extra = (
				<div className={classes.ExtraContainer}>
					<Button
						className={classes.Button}
						type='primary'
						onClick={() => {
							props.toggleUsrDrawer(false)
						}}
						disabled={props.formVisible}>
						Add User
					</Button>
					<div className={classes.SwitchElement}>
						<label>Show Inactive</label>
						<Switch
							size='small'
							checked={showInactive}
							checkedChildren='On'
							unCheckedChildren='Off'
							onChange={switchShowInactive}
						/>
					</div>
				</div>
			)
			break
		case '/admin/groups':
			headerTitle = 'Manage Groups'
			avatarSrc = groupIcon
			break

		case '/admin/instruments':
			headerTitle = 'Instruments Settings'
			avatarSrc = magnetIcon
			extra = (
				<div className={classes.ExtraContainer}>
					<Button
						className={classes.Button}
						type='primary'
						onClick={() => props.toggleInstForm()}
						disabled={props.instFormVisible}>
						Add Instrument
					</Button>
					<div className={classes.SwitchElement}>
						<label>Show Inactive</label>
						<Switch
							size='small'
							checked={props.showInactiveInst}
							checkedChildren='On'
							unCheckedChildren='Off'
							onChange={props.toggleShowInactiveInstr}
						/>
					</div>
				</div>
			)
			break
		case '/admin/experiments':
			headerTitle = 'Setting Experiments'
			avatarSrc = experimentIcon
			break
		default:
			headerTitle = ''
			avatarSrc = ''
	}

	return (
		<PageHeader
			className={classes.PageHeader}
			title={headerTitle}
			avatar={{ src: avatarSrc }}
			extra={extra}
		/>
	)
}

const mapStateToProps = state => {
	return {
		cardSwitchOn: state.dash.showCards,
		statusButtonsData: state.dash.statusButtonsData,
		instFormVisible: state.instruments.showForm,
		showInactive: state.users.showInactive,
		showInactiveInst: state.instruments.showInactive
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleCards: () => dispatch(toggleCards()),
		statusButtonClicked: id => dispatch(openDashDrawer(id)),
		toggleInstForm: () => dispatch(toggleShowForm()),
		toggleUsrDrawer: editing => dispatch(toggleUserForm(editing)),
		switchShowInactive: () => dispatch(toggleShowInactive()),
		toggleShowInactiveInstr: () => dispatch(toggleShowInactiveInstruments())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHeaderEl))
