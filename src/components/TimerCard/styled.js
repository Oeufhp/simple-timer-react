import styled from "styled-components"

export default styled.div`
	width: 250px;
	height: 250px;
	border: 1px solid #000;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.title-proj-wrapper {
		p {
			margin: 0;
		}
		.title-wrapper,
		.project-wrapper {
			text-align: left;
			margin-left: 8px;
		}

		.timer-wrapper {
			font-size: 40px;
			font-weight: bold;
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}
	.input-wrapper {
		display: flex;
		flex-direction: column;
		.MuiInput-input {
			flex: 2;
		}
	}
	.button-wrapper {
		margin-top: auto;
		display: flex;
		button {
			flex: 1;
		}
	}
`
