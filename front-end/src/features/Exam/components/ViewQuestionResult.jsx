function ViewQuestionResult({ index, content, chosenAnswerId, correctAnswerId, answerList }) {
	return (
		<div className="flex my-4 text-base">
			<div className="text-lg text-green-800 font-bold bg-green-50 border-2 border-blue-200 h-1/2 px-2 sm:px-3 py-2 text-center">
				<h4>Câu {index + 1}</h4>
				{chosenAnswerId === correctAnswerId ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10"
						fill="none"
						viewBox="0 0 18 24"
						color="green"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10"
						fill="none"
						viewBox="0 0 18 24"
						color="red"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				)}
			</div>
			<div className="flex-1 ml-5 ">
				<div className="bg-blue-100 items-center pt-2">
					<h4 className="text-lg font-bold px-5 py-2">{content}</h4>
					<div>
						<div className="font-medium">
							<p
								className={`px-4 py-2 ${
									chosenAnswerId == answerList[0]?.id
										? answerList[0]?.id == correctAnswerId
											? 'bg-green-300'
											: 'bg-red-300'
										: null
								}`}
							>
								A. {answerList[0]?.content}
							</p>
							<p
								className={`px-4 py-2 ${
									chosenAnswerId == answerList[1]?.id
										? answerList[1]?.id == correctAnswerId
											? 'bg-green-300'
											: 'bg-red-300'
										: null
								}`}
							>
								B. {answerList[1]?.content}
							</p>
							<p
								className={`px-4 py-2 ${
									chosenAnswerId == answerList[2]?.id
										? answerList[2]?.id == correctAnswerId
											? 'bg-green-300'
											: 'bg-red-300'
										: null
								}`}
							>
								C. {answerList[2]?.content}
							</p>
							<p
								className={`px-4 py-2 ${
									chosenAnswerId == answerList[3]?.id
										? answerList[3]?.id == correctAnswerId
											? 'bg-green-300'
											: 'bg-red-300'
										: null
								}`}
							>
								D. {answerList[3]?.content}
							</p>
						</div>
					</div>
				</div>
				<div className="mt-2 p-2 bg-blue-200 text-lg text-blue-700 font-semibold">
					Đáp án đúng:{' '}
					<span className="text-blue-800 font-bold">
						{answerList.find((e) => e.id === correctAnswerId).content}
					</span>
				</div>
			</div>
		</div>
	);
}

export default ViewQuestionResult;
