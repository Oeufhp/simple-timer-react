import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@material-ui/core/Button"
import AddOutlinedIcon from "@material-ui/icons/AddOutlined"
import { v4 as uuidv4 } from 'uuid';
import { addNewTimer, updatedTimer } from "../../store/slice/timer/api"
import AppLayoutStyled from "./styled"
import TimerCard from "../../components/TimerCard/loadable"

function ApplicationLayout() {
	const listTimer = useSelector(state => state.timer.listTimer)

	const dispatch = useDispatch()

	const deleteTimer = id => {
		const remainTimer = listTimer.filter(timer => timer.id !== id)
		dispatch(updatedTimer(remainTimer))
	}

	const addTimerCardClick = () => {
		let id = uuidv4()
		dispatch(
			addNewTimer({
				title: "",
				project: "",
				timer: "00:00:00",
				id
			})
		)
	}

	const onCreateTimer = (id, data) => {
		let willBeUpdateTimer = listTimer.find(timer => timer.id === id)
		if (typeof willBeUpdateTimer !== "undefined") {
			willBeUpdateTimer = Object.assign({ ...willBeUpdateTimer, title: data.title, project: data.project, timer: data.timer })
		} else {
			willBeUpdateTimer = { title: data.title, project: data.project, id }
		}

		const tempList = listTimer.map(timer => {
			if (timer.id === id) {
				return willBeUpdateTimer
			}
			return timer
		})
		dispatch(updatedTimer(tempList))
	}

	const renderTimer = () => {
		return listTimer.map(timer => {
			return (
				<TimerCard
					key={timer.id}
					title={timer.title}
					project={timer.project}
					id={timer.id}
					timer={timer.timer}
					onCreateTimer={onCreateTimer}
					onDeleteTimer={deleteTimer}
				/>
			)
		})
	}

	const getContent = () => {
		return (
			<div className='main-container'>
				<h1>Timers</h1>
				<Button variant='outlined' onClick={addTimerCardClick}>
					<AddOutlinedIcon />
				</Button>
				{renderTimer()}
			</div>
		)
	}
	return <AppLayoutStyled className='App'>{getContent()}</AppLayoutStyled>
}

export default ApplicationLayout
