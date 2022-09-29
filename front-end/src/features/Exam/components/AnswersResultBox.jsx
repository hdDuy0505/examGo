import AnswerResultBox from './AnswerResultBox';
function AnswersResultBox({ questionResultList }) {
	console.log(questionResultList);
	return (
		<div className="grid grid-flow-row grid-cols-5 gap-3 p-2 mb-3 px-5">
			{questionResultList?.map((value, index) => (
				<AnswerResultBox
					key={index}
					question={index + 1}
					chosenAnswerId={value.chosenAnswerId}
					correctAnswerId={value.correctAnswerId}
					correctAnswerChar={
						value.chosenAnswerId == value.answerList[0]?.id
							? 'A'
							: value.chosenAnswerId == value.answerList[1]?.id
							? 'B'
							: value.chosenAnswerId == value.answerList[2]?.id
							? 'C'
							: 'D'
					}
				/>
			))}
		</div>
	);
}

export default AnswersResultBox;
