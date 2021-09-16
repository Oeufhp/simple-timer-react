import styled from "styled-components"

export default styled.div`
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	.main-container {
		width: 100%;
		padding: 20px;
		.timer-container {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(4, 25%);
			grid-template-rows: auto;
			grid-gap: 25px;
			margin-top: 12px;
			.timer {
				place-self: center;
			}
		}
	}
`
