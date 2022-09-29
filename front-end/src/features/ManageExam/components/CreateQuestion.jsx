import { ErrorMessage } from '@hookform/error-message';

function CreateQuestion({ register, errors, label }) {
	const labelQuestion = label + 'content';
	const labelCorrectAnswer = label + 'correctAnswerId';
	const labelAnswerList = [
		label + 'answerList.0.',
		label + 'answerList.1.',
		label + 'answerList.2.',
		label + 'answerList.3.',
	];
	// const [checkBox, setCheckBox] = useState(false);

	return (
		<div className="w-full">
			<ErrorMessage
				errors={errors}
				name={labelQuestion}
				render={() => (
					<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold">
						Hãy thêm nội dung cho câu hỏi.
					</span>
				)}
			/>
			<textarea
				className="w-full h-24 p-2 text-lg border border-gray-600 rounded-lg focus:outline-none"
				placeholder="Nhập nội dung câu hỏi"
				{...register(labelQuestion, {
					required: true,
				})}
				type="text"
			/>
			<ErrorMessage
				errors={errors}
				name={labelCorrectAnswer}
				render={() => (
					<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold">
						Hãy chọn đáp án đúng.
					</span>
				)}
			/>
			<div className="flex flex-col mt-4">
				<div className="mb-4">
					<label className="flex items-center relative mt-2">
						<input
							className="mr-3 h-6 w-6 "
							{...register(labelCorrectAnswer, {
								required: true,
							})}
							// type={checkBox ? 'checkbox' : 'radio'}
							type="radio"
							value="0"
						/>
						<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
							Đáp án A
						</span>
						<textarea
							className="mx-3 mb-3 mt-3 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
							{...register(labelAnswerList[0], { required: true })}
							type="text"
						/>
					</label>
					<ErrorMessage
						errors={errors}
						name={labelAnswerList[0]}
						render={() => (
							<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold">
								Hãy thêm nội dung cho đáp án A.
							</span>
						)}
					/>
				</div>
				<div className="mb-4">
					<label className="flex items-center relative mt-2">
						<input
							className="mr-3 h-6 w-6 "
							{...register(labelCorrectAnswer, {
								required: true,
							})}
							// type={checkBox ? 'checkbox' : 'radio'}
							type="radio"
							value="1"
						/>
						<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
							Đáp án B
						</span>
						<textarea
							className="mx-3 mb-3 mt-3 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
							{...register(labelAnswerList[1], { required: true })}
							type="text"
						/>
					</label>
					<ErrorMessage
						errors={errors}
						name={labelAnswerList[1]}
						render={() => (
							<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold">
								Hãy thêm nội dung cho đáp án B.
							</span>
						)}
					/>
				</div>
				<div className="mb-4">
					<label className="flex items-center relative mt-2">
						<input
							className="mr-3 h-6 w-6 "
							{...register(labelCorrectAnswer, {
								required: true,
							})}
							// type={checkBox ? 'checkbox' : 'radio'}
							type="radio"
							value="2"
						/>
						<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
							Đáp án C
						</span>
						<textarea
							className="mx-3 mb-3 mt-3 h-14 p-2 w-full rounded-xl border  border-gray-500 bg-transparent text-lg focus:outline-none"
							{...register(labelAnswerList[2], {
								required: 'Hãy thêm đáp án C',
							})}
							type="text"
						/>
					</label>
					<ErrorMessage
						errors={errors}
						name={labelAnswerList[2]}
						render={() => (
							<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold">
								Hãy thêm nội dung cho đáp án C.
							</span>
						)}
					/>
				</div>
				<div className="mb-4">
					<label className="flex items-center relative mt-2">
						<input
							className="mr-3 h-6 w-6 "
							{...register(labelCorrectAnswer, {
								required: true,
							})}
							// type={checkBox ? 'checkbox' : 'radio'}
							type="radio"
							value="3"
						/>
						<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
							Đáp án D
						</span>
						<textarea
							className="mx-3 mb-3 mt-3 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
							{...register(labelAnswerList[3], { required: true })}
						/>
					</label>
					<ErrorMessage
						errors={errors}
						name={labelAnswerList[3]}
						render={() => (
							<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold">
								Hãy thêm nội dung cho đáp án D.
							</span>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

export default CreateQuestion;
