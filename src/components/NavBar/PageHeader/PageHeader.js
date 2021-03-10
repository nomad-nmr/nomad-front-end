import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { PageHeader, Switch, Button, DatePicker } from 'antd'

import moment from 'moment'
import 'moment/locale/en-gb'

import {
	toggleCards,
	openDashDrawer,
	toggleShowForm,
	toggleUserForm,
	toggleGroupForm,
	toggleShowInactive,
	toggleShowInactiveInstruments,
	toggleShowInactiveGroups,
	setExpHistoryDate
} from '../../../store/actions/index'

import classes from './PageHeader.module.css'
import StatusButtons from './StatusButtons/StatusButtons'

import dashIcon from '../../../assets/dashboard.svg'
import userIcon from '../../../assets/user.svg'
import groupIcon from '../../../assets/group.svg'
import magnetIcon from '../../../assets/magnet.svg'
import experimentIcon from '../../../assets/lab.svg'
import historyIcon from '../../../assets/history-icon.webp'

const PageHeaderEl = props => {
	moment.locale('en-gb')
	const {
		toggleCards,
		cardSwitchOn,
		statusButtonsData,
		statusButtonClicked,
		showInactiveUsr,
		switchShowInactiveUsr
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
							checked={showInactiveUsr}
							checkedChildren='On'
							unCheckedChildren='Off'
							onChange={switchShowInactiveUsr}
						/>
					</div>
				</div>
			)
			break
		case '/admin/groups':
			headerTitle = 'Manage Groups'
			avatarSrc = groupIcon
			extra = (
				<div className={classes.ExtraContainer}>
					<Button
						className={classes.Button}
						type='primary'
						onClick={props.toggleGrpForm}
						disabled={props.grpFormVisible}>
						Add Group
					</Button>
					<div className={classes.SwitchElement}>
						<label>Show Inactive</label>
						<Switch
							size='small'
							checked={props.showInactiveGrps}
							checkedChildren='On'
							unCheckedChildren='Off'
							onChange={props.toggleShowInactiveGrps}
						/>
					</div>
				</div>
			)
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
		case '/admin/history':
			headerTitle = 'Experiment History'
			avatarSrc = historyIcon
			extra = (
				<DatePicker
					style={{ marginLeft: '10px' }}
					defaultValue={moment()}
					allowClear={false}
					format='DD MMM YYYY'
					onChange={date => props.setExpHistoryDate(moment(date).format('YYYY-MM-DD'))}
				/>
			)
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
		showInactiveUsr: state.users.showInactive,
		showInactiveInst: state.instruments.showInactive,
		grpFormVisible: state.groups.showForm,
		showInactiveGrps: state.groups.showInactive
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleCards: () => dispatch(toggleCards()),
		statusButtonClicked: id => dispatch(openDashDrawer(id)),
		toggleInstForm: () => dispatch(toggleShowForm()),
		toggleUsrDrawer: editing => dispatch(toggleUserForm(editing)),
		switchShowInactiveUsr: () => dispatch(toggleShowInactive()),
		toggleShowInactiveInstr: () => dispatch(toggleShowInactiveInstruments()),
		toggleGrpForm: () => dispatch(toggleGroupForm()),
		toggleShowInactiveGrps: () => dispatch(toggleShowInactiveGroups()),
		setExpHistoryDate: date => dispatch(setExpHistoryDate(date))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHeaderEl))
