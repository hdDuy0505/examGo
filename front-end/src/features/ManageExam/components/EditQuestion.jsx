import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';

// Done form: question-answer-rightAnswer - 14-10-2021
// Done form: Validation - 10-30-2021
// Update form: change form using useFormState - 11-07-2021
// Update form: remove yup, use "required" of useForm - 11-07-2021

function EditQuestion({ register, errors, label, content, correctAnswerId, answerList }) {
	// console.log(content, correctAnswerId, answerList);
	const labelQuestion = label + 'content';
	const labelCorrectAnswerId = label + 'correctAnswerId';
	// const labelAnswerList = [
	// 	label + 'answerA',
	// 	label + 'answerB',
	// 	label + 'answerC',
	// 	label + 'answerD',
	// ];
	const labelAnswerList = label + 'answerListChange';
	// const [checkBox, setCheckBox] = useState(false);

	const [questionChange, setQuestionChange] = useState(content);
	const [correctAnswerChange, setCorrectAnswerChange] = useState(correctAnswerId);
	const [answerListChange, setAnswerListChange] = useState([
		answerList !== undefined ? answerList[0]?.content : null,
		answerList !== undefined ? answerList[1]?.content : null,
		answerList !== undefined ? answerList[2]?.content : null,
		answerList !== undefined ? answerList[3]?.content : null,
	]);

	const updateAnswerListChanged = (index) => (e) => {
		let newArr = [...answerListChange];
		newArr[index] = e.target.value;

		setAnswerListChange(newArr);
	};
	return (
		<div className="w-full">
			<ErrorMessage
				errors={errors}
				name={labelQuestion}
				render={() => (
					<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold text-base">
						Hãy thêm nội dung cho câu hỏi.
					</span>
				)}
			/>
			<textarea
				className="w-full h-24 p-2 text-lg border border-gray-600 rounded-lg focus:outline-none"
				{...register(labelQuestion, {
					required: true,
				})}
				type="text"
				value={questionChange}
				onChange={(e) => setQuestionChange(e.target.value)}
			/>
			<ErrorMessage
				errors={errors}
				name={labelCorrectAnswerId}
				render={() => (
					<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold text-base">
						Hãy chọn đáp án đúng.
					</span>
				)}
			/>
			<div className="flex flex-col mt-4">
				{answerList
					? answerList.map((e, i) => (
							<div className="mb-4" key={i}>
								<label className="flex items-center relative mt-2">
									<input
										className="mr-3 h-6 w-6 "
										{...register(labelCorrectAnswerId, {
											required: true,
										})}
										// type={checkBox ? 'checkbox' : 'radio'}
										type="radio"
										value={e.id}
										checked={correctAnswerChange == e.id}
										onClick={(e) => {
											setCorrectAnswerChange(e.target.value);
										}}
									/>
									<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
										Đáp án {i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : 'D'}
									</span>
									<textarea
										className="mx-3 my-1 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
										{...register(`${labelAnswerList}.${i}`, { required: true })}
										type="text"
										value={answerListChange[i]}
										onChange={updateAnswerListChanged(i)}
									/>
								</label>
								<ErrorMessage
									errors={errors}
									name={`${labelAnswerList}.${i}`}
									render={() => (
										<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold text-base">
											Hãy thêm nội dung cho đáp án{' '}
											{i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : 'D'}.
										</span>
									)}
								/>
							</div>
					  ))
					: Array(4)
							.fill()
							.map((e, i) => (
								<div className="mb-4" key={i}>
									<label className="flex items-center relative mt-2">
										<input
											className="mr-3 h-6 w-6 "
											{...register(labelCorrectAnswerId, {
												required: true,
											})}
											// type={checkBox ? 'checkbox' : 'radio'}
											type="radio"
											value={i}
											checked={correctAnswerChange == i}
											onClick={(e) => {
												setCorrectAnswerChange(e.target.value);
											}}
										/>
										<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
											Đáp án{' '}
											{i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : 'D'}
										</span>
										<textarea
											className="mx-3 my-1 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
											{...register(`${labelAnswerList}.${i}`, {
												required: true,
											})}
											type="text"
											value={answerListChange[i]}
											onChange={updateAnswerListChanged(i)}
										/>
									</label>
									<ErrorMessage
										errors={errors}
										name={`${labelAnswerList}.${i}`}
										render={() => (
											<span className="bg-red-200 py-1 px-2 rounded text-red-900 font-semibold text-base">
												Hãy thêm nội dung cho đáp án{' '}
												{i === 0
													? 'A'
													: i === 1
													? 'B'
													: i === 2
													? 'C'
													: 'D'}
												.
											</span>
										)}
									/>
								</div>
							))}

				{/* <div className="mb-4">
					<label className="flex items-center relative mt-2">
						<input
							className="mr-3 h-6 w-6 "
							{...register(labelCorrectAnswerId, {
								required: true,
							})}
							// type={checkBox ? 'checkbox' : 'radio'}
							type="radio"
							value="1"
							checked={correctAnswerChange == '1'}
							onClick={(e) => {
								setCorrectAnswerChange(e.target.value);
							}}
						/>
						<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
							Đáp án B
						</span>
						<textarea
							className="mx-3 my-1 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
							{...register(labelAnswerList[1], { required: true })}
							type="text"
							value={answerListChange[1]}
							onChange={updateAnswerListChanged(1)}
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
							{...register(labelCorrectAnswerId, {
								required: true,
							})}
							// type={checkBox ? 'checkbox' : 'radio'}
							type="radio"
							value="2"
							checked={correctAnswerChange == '2'}
							onClick={(e) => {
								setCorrectAnswerChange(e.target.value);
							}}
						/>
						<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
							Đáp án C
						</span>
						<textarea
							className="mx-3 my-1 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
							{...register(labelAnswerList[2], { required: true })}
							type="text"
							value={answerListChange[2]}
							onChange={updateAnswerListChanged(2)}
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
							{...register(labelCorrectAnswerId, {
								required: true,
							})}
							// type={checkBox ? 'checkbox' : 'radio'}
							type="radio"
							value="3"
							checked={correctAnswerChange == '3'}
							onClick={(e) => {
								setCorrectAnswerChange(e.target.value);
							}}
						/>
						<span className="absolute -top-5 left-14 text-lg px-3 font-semibold">
							Đáp án D
						</span>
						<textarea
							className="mx-3 my-1 h-14 p-2 w-full rounded-xl border border-gray-500 bg-transparent text-lg focus:outline-none"
							{...register(labelAnswerList[3], { required: true })}
							type="text"
							value={answerListChange[3]}
							onChange={updateAnswerListChanged(3)}
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
				</div> */}
			</div>
		</div>
	);
}

export default EditQuestion;
