import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleCards, openDashDrawer, toggleShowForm } from '../../../store/actions/index'

import { PageHeader, Switch, Button } from 'antd'
import classes from './PageHeader.module.css'
import StatusButtons from './StatusButtons/StatusButtons'

import dashIcon from '../../../assets/dashboard.svg'
import userIcon from '../../../assets/user.svg'
import groupIcon from '../../../assets/group.svg'
import magnetIcon from '../../../assets/magnet.svg'
import experimentIcon from '../../../assets/lab.svg'

const PageHeaderEl = props => {
	const { toggleCards, cardSwitchOn, statusButtonsData, statusButtonClicked } = props

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
					{/* <StatusButtons data={statusButtonsData} click={statusButtonClicked} /> */}
				</div>
			)
			break

		case '/dashboard/users':
			headerTitle = 'Manage Users'
			avatarSrc = userIcon
			break
		case '/dashboard/groups':
			headerTitle = 'Manage Groups'
			avatarSrc = groupIcon
			break

		case '/dashboard/instruments':
			headerTitle = 'Instruments Settings'
			avatarSrc = magnetIcon
			extra = (
				<div className={classes.ExtraContainer}>
					<Button
						className={classes.Button}
						type='primary'
						onClick={props.toggleForm}
						disabled={props.formVisible}>
						Add Instrument
					</Button>
				</div>
			)
			break
		case '/dashboard/experiments':
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
		formVisible: state.instruments.showForm
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleCards: () => dispatch(toggleCards()),
		statusButtonClicked: id => dispatch(openDashDrawer(id)),
		toggleForm: () => dispatch(toggleShowForm())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageHeaderEl))
