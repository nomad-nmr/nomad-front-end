import React from 'react'
import { Button, Modal } from 'antd'

import classes from '../PageHeader.module.css'

const BatchSubmitControls = props => {
	const { accessLevel, authToken } = props.user

	let activeRack = {}
	let closeRackBtnInactive = false

	if (props.activeRackId) {
		activeRack = props.racksData.find(rack => rack._id === props.activeRackId)
		closeRackBtnInactive = activeRack.isOpen ? false : true
	}

	const onCloseRack = () => {
		Modal.confirm({
			title: `Close Rack ${activeRack.title}`,
			content: <p>{`Are you sure that you want to close the active rack`}</p>,
			onOk() {
				props.closeRackHandler(props.activeRackId, authToken)
			}
		})
	}
	const onDeleteRack = () => {
		Modal.confirm({
			title: `Delete Rack ${activeRack.title}`,
			content: <p>{`Are you sure that you want to delete the rack`}</p>,
			onOk() {
				props.deleteRackHandler(props.activeRackId, authToken)
			}
		})
	}

	return (
		<div className={classes.ExtraContainer}>
			<Button className={classes.Button} type='primary'>
				Add Sample
			</Button>
			{(accessLevel === 'admin' || accessLevel === 'admin-b') && (
				<Button
					className={classes.Button}
					type='primary'
					onClick={() => {
						props.toggleAddRackModal()
					}}>
					Open New Rack
				</Button>
			)}
			{(accessLevel === 'admin' || accessLevel === 'admin-b') && (
				<Button
					className={classes.Button}
					onClick={() => onCloseRack()}
					loading={props.closeRackLoading}
					disabled={closeRackBtnInactive || !props.activeRackId}
					danger>
					Close Rack
				</Button>
			)}
			{(accessLevel === 'admin' || accessLevel === 'admin-b') && (
				<Button
					className={classes.Button}
					type='primary'
					onClick={onDeleteRack}
					loading={props.deleteRackLoading}
					disabled={!closeRackBtnInactive}
					danger>
					Delete Rack
				</Button>
			)}
		</div>
	)
}

export default BatchSubmitControls
