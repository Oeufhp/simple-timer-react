import React, { useState, useEffect } from "react"
import TimerCardStyled from "./styled"
import TextField from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/DeleteOutline"

const TimerCard = props => {
	const [isEditMode, setEditMode] = useState(true)
	const [title, setTitle] = useState("")
	const [project, setProject] = useState("")
	const [isCounting, setIsCounting] = useState(false)
	let [second, setSecond] = useState("0")
	let [minute, setMinute] = useState("0")
	let [hour, setHour] = useState("0")

	function pad(val) {
		const valStr = val.toString()
		if (valStr.length < 2) {
			return `0${valStr}`
		} else {
			return valStr
		}
	}

	useEffect(() => {
		setTitle(props.title)
		setProject(props.project)
		const splittedTimer = props.timer.split(":")
		setSecond(pad(splittedTimer[2]))
		setMinute(pad(splittedTimer[1]))
		setHour(pad(splittedTimer[0]))
	}, [props.title, props.project, props.timer])

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (isCounting) {
				second++
				setSecond(pad(second))
				if (second === "60") {
					minute++
					setMinute(pad(minute))
					setSecond("0")
					if (minute === "60") {
						hour++
						setHour(pad(hour))
						setMinute("0")
						setSecond("0")
					}
				}
				props.onCreateTimer(props.id, { title, project, timer: `${hour}:${minute}:${second}` })
			} else {
				clearInterval(myInterval)
			}
		}, 1000)
		return () => clearInterval(myInterval)
	}, [hour, isCounting, minute, project, props, second, title])

	const onCreateButtonClick = e => {
		e.preventDefault()
		setEditMode(false)
		props.onCreateTimer(props.id, { title, project, timer: `${hour}:${minute}:${second}` })
	}

	const onCancelButtonClick = e => {
		e.preventDefault()
		setEditMode(false)
	}

	const onToggleTimer = e => {
		e.preventDefault()
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
			<Button variant='outlined' onClick={e => onToggleTimer(e)}>
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
		<TimerCardStyled>
			{renderTitleAndProject()}
			{renderButton()}
		</TimerCardStyled>
	)
}

export default TimerCard
