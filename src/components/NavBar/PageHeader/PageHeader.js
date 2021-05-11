import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { PageHeader, Switch, Button, DatePicker, Input, Select } from 'antd'

import moment from 'moment'

import {
	toggleCards,
	openDashDrawer,
	toggleShowForm,
	toggleUserForm,
	toggleGroupForm,
	toggleShowInactive,
	toggleShowInactiveInstruments,
	toggleShowInactiveGroups,
	setExpHistoryDate,
	searchUser,
	setInstrumentId,
	searchParamSets,
	toggleParamsForm
} from '../../../store/actions/index'

import classes from './PageHeader.module.css'
import StatusButtons from './StatusButtons/StatusButtons'

import dashIcon from '../../../assets/dashboard.svg'
import userIcon from '../../../assets/user.svg'
import groupIcon from '../../../assets/group.svg'
import magnetIcon from '../../../assets/magnet.svg'
import experimentIcon from '../../../assets/lab.svg'
import historyIcon from '../../../assets/history-icon.webp'
import submitIcon from '../../../assets/submit.png'

const PageHeaderEl = props => {
	const { Search } = Input
	const { Option } = Select
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
						Add
					</Button>
					<Search
						placeholder='search name'
						allowClear
						onSearch={props.userSearchHandler}
						style={{ width: 160, marginLeft: '20px' }}
						defaultValue={props.usrSearchValue}
					/>
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
						onClick={() => props.toggleGrpForm(false)}
						disabled={props.grpFormVisible}>
						Add
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
						onClick={() => props.toggleInstForm(false)}
						disabled={props.instFormVisible}>
						Add
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

		case '/admin/parameter-sets':
			headerTitle = 'Parameter Sets'
			avatarSrc = experimentIcon

			const instrOptionArr = props.instrList.map(i => (
				<Option value={i.id} key={i.id}>
					{i.name}
				</Option>
			))
			instrOptionArr.unshift(
				<Option key='all' value={null}>
					All instruments
				</Option>
			)
			extra = (
				<div className={classes.ExtraContainer}>
					<Button
						className={classes.Button}
						type='primary'
						onClick={() => props.tglParamsForm(false)}
						disabled={props.paramsFormVisible}>
						Add
					</Button>
					<Select
						defaultValue={props.instrId}
						style={{ width: 140, marginLeft: '15px' }}
						onChange={props.setInstrId}>
						{instrOptionArr}
					</Select>
					<Search
						placeholder='search name'
						allowClear
						onSearch={props.onSearchHandler}
						style={{ width: 155, marginLeft: '15px' }}
						defaultValue={props.paramsSearchValue}
					/>
				</div>
			)
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

		case '/submit':
			headerTitle = 'Book New Job'
			avatarSrc = submitIcon
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
		showInactiveGrps: state.groups.showInactive,
		instrList: state.instruments.instrumentList,
		instrId: state.paramSets.instrumentId,
		paramsSearchValue: state.paramSets.searchValue,
		usrSearchValue: state.users.searchUserValue,
		paramsFormVisible: state.paramSets.formVisible
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleCards: () => dispatch(toggleCards()),
		statusButtonClicked: id => dispatch(openDashDrawer(id)),
		toggleInstForm: editing => dispatch(toggleShowForm(editing)),
		toggleUsrDrawer: editing => dispatch(toggleUserForm(editing)),
		switchShowInactiveUsr: () => dispatch(toggleShowInactive()),
		toggleShowInactiveInstr: () => dispatch(toggleShowInactiveInstruments()),
		toggleGrpForm: editing => dispatch(toggleGroupForm(editing)),
		toggleShowInactiveGrps: () => dispatch(toggleShowInactiveGroups()),
		setExpHistoryDate: date => dispatch(setExpHistoryDate(date)),
		userSearchHandler: value => dispatch(searchUser(value)),
		setInstrId: id => dispatch(setInstrumentId(id)),
		onSearchHandler: value => dispatch(searchParamSets(value)),
		tglParamsForm: editing => dispatch(toggleParamsForm(editing))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHeaderEl))
