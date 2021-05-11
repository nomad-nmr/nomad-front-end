import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import socket from '../../socketConnection'

import InfoCards from '../../components/InfoCards/InfoCards'
import BookHoldersForm from '../../components/Forms/BookHoldersForm/BookHoldersForm'
import BookExperimentsForm from '../../components/Forms/BookExperimentsForm/BookExperimentsForm'
import {
	fetchInstrumentList,
	bookHolders,
	statusUpdate,
	fetchParamSets,
	cancelHolder,
	signOutHandler,
	cancelBookedHolders,
	bookExperiments
} from '../../store/actions'

const Submit = props => {
	const {
		fetchInstrList,
		fetchParamSets,
		authToken,
		accessLvl,
		instrList,
		bookedSlots,
		cancelBookedHoldersHandler,
		logoutHandler
	} = props

	const history = useHistory()

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

	//Clean up hook that cancels all booked holders after user leaves submit page.
	//Booked holders data are derived from form reference because state (bookedSlots) gives empty array when clean up is run
	const bookExpsFormRef = useRef({})
	useEffect(() => {
		return () => {
			if (bookExpsFormRef.current.getFieldsValue) {
				// eslint-disable-next-line
				const formData = bookExpsFormRef.current.getFieldsValue()
				const keysArr = Object.keys(formData)
				cancelBookedHoldersHandler(authToken, keysArr)
			}

			if (accessLvl !== 'admin') {
				logoutHandler(authToken)
			}
		}
	}, [accessLvl, authToken, cancelBookedHoldersHandler, logoutHandler, bookExpsFormRef, history])

	useEffect(() => {
		fetchInstrList(authToken)
		fetchParamSets(authToken, { instrumentId: null, searchValue: '' })
	}, [fetchInstrList, fetchParamSets, authToken, bookedSlots])

	//form reference used to set instrument by clicking on cards
	const bookHoldersFormRef = useRef({})

	const availableInstrList = accessLvl === 'admin' ? instrList : instrList.filter(i => i.available)

	const onCardClick = key => {
		let instrId = props.statusSummary[key]._id
		if (accessLvl !== 'admin' && !props.statusSummary[key].available) {
			instrId = ''
		}
		bookHoldersFormRef.current.setFieldsValue({ instrumentId: instrId })
	}

	return (
		<div style={{ marginBottom: 70 }}>
			<InfoCards cardsData={props.statusSummary} clicked={onCardClick} />
			<BookHoldersForm
				instruments={availableInstrList}
				formRef={bookHoldersFormRef}
				onSubmit={props.bookSlotsHandler}
				bookedCount={bookedSlots.length}
				token={props.authToken}
			/>
			{bookedSlots.length !== 0 || props.loading ? (
				<BookExperimentsForm
					inputData={bookedSlots}
					formRef={bookExpsFormRef}
					loading={props.loading}
					paramSetsData={props.paramSets}
					onCancelHolder={props.cancelHolderHandler}
					token={props.authToken}
					accessLevel={props.accessLvl}
					bookExpsHandler={props.bookExpsHandler}
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
		fetchParamSets: (token, searchParams) => dispatch(fetchParamSets(token, searchParams)),
		cancelHolderHandler: (token, key) => dispatch(cancelHolder(token, key)),
		logoutHandler: token => dispatch(signOutHandler(token)),
		cancelBookedHoldersHandler: (token, keys) => dispatch(cancelBookedHolders(token, keys)),
		bookExpsHandler: (token, data) => dispatch(bookExperiments(token, data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
