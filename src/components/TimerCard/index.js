import React, { useState, useEffect } from "react"
import TimerCardStyled from "./styled"
import TextField from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/DeleteOutline"
import usePrevious from "../../hooks/usePrevious"

const TimerCard = props => {
	const [isEditMode, setEditMode] = useState(true)
	const [title, setTitle] = useState("")
	const [project, setProject] = useState("")
	const [isCounting, setIsCounting] = useState(false)
	const [second, setSecond] = useState(0)
	const [minute, setMinute] = useState(0)
	const [hour, setHour] = useState(0)

	const prevProps = usePrevious(props.id)

	useEffect(() => {
		if (prevProps?.id !== props.id) {
			setTitle(props.title)
			setProject(props.project)
		}
	}, [props.title, props.project, props.timer, props.isCounting, prevProps?.id, props.id])

	useEffect(() => {
		const myInterval = setInterval(() => {
			let tempHour = hour
			let tempMinute = minute
			let tempSecond = second
			if (isCounting) {
				tempSecond++
				setSecond(tempSecond)
				if (tempSecond === 60) {
					tempMinute++
					tempSecond = 0
					setMinute(tempMinute)
					setSecond(tempSecond)
					if (minute === 60) {
						tempHour++
						tempMinute = 0
						tempSecond = 0
						setHour(tempHour)
						setMinute(tempMinute)
						setSecond(tempSecond)
					}
				}
			} else {
				clearInterval(myInterval)
			}
		}, 1000)
		return () => clearInterval(myInterval)
	}, [hour, isCounting, minute, project, props, second, title])

	const onCreateButtonClick = () => {
		setEditMode(false)
		props.onCreateTimer(props.id, { title, project })
	}

	const onCancelButtonClick = () => {
		setEditMode(false)
		if (title === "" || project === "") {
			props.onDeleteTimer(props.id)
		}
	}

	const onToggleTimer = () => {
		setIsCounting(!isCounting)
	}

	const renderTitleAndProject = () => {
		let output = (
			<div className='title-proj-wrapper'>
				<p className='title-wrapper'>{title}</p>
				<p className='project-wrapper'>{project}</p>
				<p className='timer-wrapper'>
					{hour}:{minute}:{second}
				</p>
				<span className=''>
					<IconButton onClick={() => setEditMode(true)}>
						<EditIcon />
					</IconButton>
					<IconButton onClick={() => props.onDeleteTimer(props.id)}>
						<DeleteIcon />
					</IconButton>
				</span>
			</div>
		)
		if (isEditMode) {
			output = (
				<div className='input-wrapper'>
					<label>Title</label>
					<TextField label='Title' variant='outlined' value={title} onChange={e => setTitle(e.target.value)} />
					<label>project</label>
					<TextField label='Title' variant='outlined' value={project} onChange={e => setProject(e.target.value)} />
				</div>
			)
		}
		return output
	}

	const renderButton = () => {
		let output = (
			<Button variant='outlined' onClick={onToggleTimer}>
				{isCounting ? "Stop" : "Start"}
			</Button>
		)
		if (isEditMode) {
			output = (
				<div className='button-wrapper'>
					<Button variant='outlined' color='primary' onClick={onCreateButtonClick}>
						Create
					</Button>
					<Button variant='outlined' color='secondary' onClick={onCancelButtonClick}>
						Cancel
					</Button>
				</div>
			)
		}
		return output
	}

	return (
		<TimerCardStyled className={props.className}>
			{renderTitleAndProject()}
			{renderButton()}
		</TimerCardStyled>
	)
}

export default TimerCard
