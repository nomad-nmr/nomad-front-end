import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import socket from '../../socketConnection'

import InfoCards from '../../components/InfoCards/InfoCards'
import BookHoldersForm from '../../components/Forms/BookHoldersForm/BookHoldersForm'
import BookExperimentsForm from '../../components/Forms/BookExperimentsForm/BookExperimentsForm'
import { fetchInstrumentList, bookHolders, statusUpdate, fetchParamSets } from '../../store/actions'

const Submit = props => {
	const { fetchInstrList, fetchParamSets, authToken, accessLvl, instrList, bookedSlots } = props
	// const formInputData = { bookedSlots, username, groupName }

	useEffect(() => {
		fetchInstrList(authToken)
		fetchParamSets(authToken, { instrumentId: null, searchValue: '' })
	}, [fetchInstrList, fetchParamSets, authToken])

	//Hook for socket.io to update status on InfoCards
	useEffect(() => {
		socket.on('statusUpdate', data => {
			props.statUpdate(data)
		})
		return () => {
			socket.removeAllListeners('statusUpdate')
		}
		// useEffect for socket.io function must have empty dependency array otherwise the triggers infinite loop!!!
		// eslint-disable-next-line
	}, [])

	const bookHoldersFormRef = useRef({})

	const availableInstrList = accessLvl === 'admin' ? instrList : instrList.filter(i => i.available)
	const onCardClick = key => {
		let instrId = props.statusSummary[key]._id
		if (accessLvl !== 'admin' && !props.statusSummary[key].available) {
			instrId = ''
		}
		bookHoldersFormRef.current.setFieldsValue({ instrumentId: instrId })
	}

	//Setting app an array of data that is going to be used for rendering dynamic form items
	const formInputData = []
	bookedSlots.forEach(inst => {
		inst.holders.forEach(holder => {
			formInputData.push({
				instrument: inst.instrumentName,
				holder,
				instId: inst.instrumentId,
				key: inst.instrumentId + '-' + holder
			})
		})
	})

	return (
		<div style={{ marginBottom: 70 }}>
			<InfoCards cardsData={props.statusSummary} clicked={onCardClick} />
			<BookHoldersForm
				instruments={availableInstrList}
				formRef={bookHoldersFormRef}
				onSubmit={props.bookSlotsHandler}
				bookedCount={formInputData.length}
			/>
			{formInputData.length !== 0 || props.loading ? (
				<BookExperimentsForm
					inputData={formInputData}
					loading={props.loading}
					paramSetsData={props.paramSets}
				/>
			) : null}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token,
		accessLvl: state.auth.accessLevel,
		statusSummary: state.dash.statusSummaryData,
		instrList: state.instruments.instrumentList,
		paramSets: state.paramSets.paramSetsData,
		loading: state.submit.loading,
		bookedSlots: state.submit.bookedHolders
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchInstrList: token => dispatch(fetchInstrumentList(token)),
		bookSlotsHandler: (token, formData) => dispatch(bookHolders(token, formData)),
		statUpdate: data => dispatch(statusUpdate(data)),
		fetchParamSets: (token, searchParams) => dispatch(fetchParamSets(token, searchParams))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
