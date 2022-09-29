function AnswerResultBox({ question, chosenAnswerId, correctAnswerId, correctAnswerChar }) {
	return (
		<div
			className={`${
				chosenAnswerId == correctAnswerId ? 'bg-green-400' : 'bg-red-500'
			} relative flex justify-center w-8 h-8 rounded-lg transition delay-50 ease-in`}
		>
			<span className="block text-sm text-black font-bold bg-white shadow-sm rounded-full w-5 h-5 leading-5 text-center absolute -top-2 -left-2 ">
				{question}
			</span>
			<span className="text-xl font-bold text-white pt-0.5">{correctAnswerChar}</span>
		</div>
	);
}

export default AnswerResultBox;
