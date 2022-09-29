import axios from 'axios';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { initAnswers } from '../../../store/slices/answerSlice';
import diffTime from '../../../utils/diffTime';
import { modifiedSubmitForm } from '../../../utils/modifiedSubmitForm';
import Question from './Question';

const customStyles = {
	content: {
		textAlign: 'center',
		padding: '30px 60px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export default function ExamForm({ timeout, questionList, idExam }) {
	const navigate = useNavigate();
	const { examId } = useParams();
	const [loading, setLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [submit, setSubmit] = useState(false); // Xử lý hết thời gian

	const dispatch = useDispatch();

	const { register, handleSubmit, watch, setValue } = useForm();

	const setValueRadioButton = (fields) => {
		const fieldsArray = Object.entries(fields);
		fieldsArray.forEach((e) => {
			setValue(e[0], e[1]);
		});
	};

	useEffect(() => {
		const fields = JSON.parse(localStorage.getItem(idExam)); // Lấy dữ liệu "idExam" (idExam là 1 object chứa các đáp án được chọn) từ localStorage
		if (fields) setValueRadioButton(fields); // set các đáp án được chọn vào đề thì băng hàm setValue của React Hook Form
		const selectedAnswers = []; // tạo mảng selectedAnswers để lưu vào Redux
		// Chuyển thành 1 mảng option dạng ["A", "B",...]
		questionList?.forEach((e, i) => {
			if (fields && fields[`answer${i}`])
				selectedAnswers.push(
					fields[`answer${i}`] == e.answerList[0]?.id
						? 'A'
						: fields[`answer${i}`] == e.answerList[1]?.id
						? 'B'
						: fields[`answer${i}`] == e.answerList[2]?.id
						? 'C'
						: fields[`answer${i}`] == e.answerList[3]?.id
						? 'D'
						: null
				);
			else selectedAnswers.push(null);
		});
		// Tạo action để dispatch vào Redux (mục đích để tạo mảng đáp án truyền qua component StateBox)
		const action =
			questionList?.length != null
				? selectedAnswers.some((e) => e === 'A' || e === 'B' || e === 'C' || e === 'D')
					? initAnswers(selectedAnswers)
					: initAnswers(questionList?.length)
				: initAnswers(0);
		dispatch(action);
	}, [idExam]);

	const watchAllFields = watch(); // trạng thái hiện tại của đề thi

	// Khi thay đổi trạng thái đề thi (chọn hoặc thay đổi đáp án) thì sẽ lưu lại vào localStorage
	useEffect(() => {
		localStorage.setItem(idExam, JSON.stringify(watchAllFields));
	}, [watchAllFields]);

	const onSubmit = (data) => {
		const startTime = localStorage.getItem(`startTime_${idExam}`);
		const takingTime = diffTime(startTime);
		data = modifiedSubmitForm(questionList, data, takingTime);

		setLoading(true);
		const handleSubmitExam = async () => {
			try {
				const token = localStorage.getItem('TOKEN');
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/exam/take/${examId}`,
					data,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (res.data) {
					setIsSuccess(true);
					setTimeout(() => {
						localStorage.removeItem(examId);

						navigate({
							pathname: `/exam/result/${examId}`,
						});
					}, 1000);
				}
			} catch (error) {
				console.log('Failed to submit exam:', error);
			}
		};

		handleSubmitExam();
		// Submit thành công thì xóa các field trong localStorage
		localStorage.removeItem(`remainTimeSaved_${examId}`);
		localStorage.removeItem(`currentTimeSaved_${examId}`);
		localStorage.removeItem(`time_${examId}`);
		localStorage.removeItem(`startTime_${examId}`);
		localStorage.removeItem('undefined');
	};

	const checkKeyDown = (e) => {
		if (e.code === 'Enter') e.preventDefault();
	};

	const buttonSubmit = useRef(); // sử dụng useRef để lấy ra button submit (tương tự document.getElement...)

	// Xử lý hết thời gian làm bài
	useEffect(() => {
		if (timeout == true) {
			buttonSubmit.current.click(); // Hết thời gian thì sẽ click vào button Submit
			setSubmit(false);
		}
	}, [timeout]);

	return (
		<div className='mt-5 flex-1'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => checkKeyDown(e)} // Chặn user ấn Enter
			>
				{questionList?.map((e, i) => (
					<Question
						key={e.id}
						index={i}
						register={register}
						label={`answer${i}`}
						content={e?.content}
						idContent={e?.id}
						answerList={e?.answerList}
					/>
				))}
				{/* button thật để submit form, user sẽ không click được, khi nào xác nhận
                nộp bài (button Modal) hoặc hết giờ làm bài thì mới gọi ref để click */}
				<button className='hidden' ref={buttonSubmit} type='submit'>
					Submit
				</button>
			</form>
			{/* button submit giả cho user click để hiện Modal xác nhận nộp bài*/}
			<div className='flex justify-center mr-44'>
				<button
					className='bg-blue-400 py-2 px-8 mt-4 font-bold text-gray-50 text-xl rounded-lg'
					onClick={() => setSubmit(true)}
				>
					NỘP BÀI
				</button>
			</div>
			<Modal isOpen={submit} style={customStyles} contentLabel='Modal' ariaHideApp={false}>
				{loading ? (
					isSuccess ? (
						<h2 className='font-bold text-xl text-green-500'>Thành công</h2>
					) : (
						<div className='flex items-center'>
							<h2 className='font-bold text-xl text-blue-600 mr-3 '>
								Đang nộp bài ...
							</h2>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='animate-bounce h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
								/>
							</svg>
						</div>
					)
				) : (
					<>
						<h2 className='font-bold text-xl text-red-500'>Xác nhận nộp bài</h2>
						{/* nếu click thì gọi ref của button submit thật để submit */}

						<div className='flex justify-around mt-5'>
							<button
								className='bg-blue-400 py-2 px-8 mt-4 mr-3 font-bold text-gray-50 text-lg rounded-lg'
								onClick={() => buttonSubmit.current.click()}
							>
								Nộp bài
							</button>
							<button
								className='bg-yellow-400 py-2 px-8 mt-4 ml-3 font-bold text-gray-50 text-lg rounded-lg'
								onClick={() => setSubmit(false)}
							>
								Làm bài tiếp
							</button>
						</div>
					</>
				)}
			</Modal>
		</div>
	);
}
