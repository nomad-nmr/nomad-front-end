import React from 'react'
import { Button, Modal } from 'antd'

import classes from '../PageHeader.module.css'

const BatchSubmitControls = props => {
	const { accessLevel, authToken } = props.user

	let activeRack = {}
	let activeRackOpen = true

	if (props.activeRackId) {
		activeRack = props.racksData.find(rack => rack._id === props.activeRackId)
		activeRackOpen = activeRack.isOpen ? true : false
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

	const addSampleHandler = () => {
		if (!authToken) {
			props.openAuthModal('addSampleDrawer')
		} else {
			props.toggleAddSample()
		}
	}

	return (
		<div className={classes.ExtraContainer}>
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
			{activeRack.isOpen && (
				<Button className={classes.Button} type='primary' onClick={() => addSampleHandler()}>
					Add Sample
				</Button>
			)}

			{(accessLevel === 'admin' || accessLevel === 'admin-b') && activeRackOpen ? (
				<Button className={classes.Button} onClick={() => onCloseRack()} danger>
					Close Rack
				</Button>
			) : null}

			{(accessLevel === 'admin' || accessLevel === 'admin-b') && !activeRackOpen ? (
				<Button className={classes.Button} onClick={e => console.log(e.target)}>
					Book Selected
				</Button>
			) : null}

			{(accessLevel === 'admin' || accessLevel === 'admin-b') && !activeRackOpen ? (
				<Button className={classes.Button} type='primary' onClick={onDeleteRack} danger>
					Delete Rack
				</Button>
			) : null}
		</div>
	)
}

export default BatchSubmitControls
