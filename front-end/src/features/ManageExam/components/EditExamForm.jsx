import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Modal from 'react-modal/lib/components/Modal';
import { useNavigate } from 'react-router-dom';
import { modifiedEditForm } from '../../../utils/modifiedEditForm';
import EditQuestion from './EditQuestion';

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

function EditExamForm({ examId, exam }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const [name, setName] = useState('');
	const [maxDuration, setMaxDuration] = useState('');
	const [subjectId, setSubjectId] = useState();
	// const [grade, setGrade] = useState('');

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			questionList: [],
		},
	});

	const { fields, append, remove, move, insert } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'questionList', // unique name for your Field Array
		// keyName: "id", default to "id", you can change the key name
	});

	useEffect(() => {
		setName(exam?.name);
		setMaxDuration(exam?.maxDuration);
		setSubjectId(exam?.subjectId);
		// setGrade(exam.grade);

		exam?.questionList?.forEach((e) => {
			append({
				id: e.id,
				content: e.content,
				correctAnswerId: e.correctAnswerId,
				answerList: e.answerList,
			});
		});
	}, [exam]);

	useEffect(() => {
		setValue('name', name);
		setValue('maxDuration', maxDuration);
		setValue('subjectId', subjectId);
		// setValue('grade', grade);
	}, [name]);

	const onSubmit = (data) => {
		data = modifiedEditForm(data, exam);
		console.log(data);
		const updateExam = async () => {
			setIsSuccess(false);
			setLoading(true);
			try {
				const url = `${process.env.REACT_APP_API_URL}/manageexam/${examId}`;
				const token = localStorage.getItem('TOKEN');
				const res = await axios.put(url, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data == 'Success') {
					setIsSuccess(true);
					setTimeout(() => {
						navigate({
							pathname: '/manageexam?page=1',
						});
					}, 1000);
				}
			} catch (error) {
				setLoading(false);
				console.log('Failed to update exam:', error);
			}
		};
		updateExam();
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="p-10 border rounded flex flex-col xl:flex-row items-center bg-green-50 text-base">
					<div className="w-full xl:w-2/3 flex flex-col relative mx-1">
						<input
							className="w-full mb-2 xl:mb-0 border-2 bg-transparent text-xl py-1 pl-2 focus:outline-none rounded peer"
							required
							{...register('name')}
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label
							className="absolute top-2 left-2 duration-200 font-medium text-gray-400 transition ease transform peer-valid:-translate-y-8 peer-focus:-translate-y-8 peer-valid:text-gray-700
                        peer-focus:text-gray-700"
						>
							Tên Đề Thi
						</label>
					</div>

					<div className="mt-8 xl:mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:ml-2">
						<div className="mt-8 sm:mt-0 flex flex-col relative mx-2 w-ms-40">
							<select
								required
								{...register('maxDuration')}
								className="mb-1 md:mb-0 border-2 bg-transparent text-lg py-1 pl-2 focus:outline-none rounded peer"
								value={maxDuration}
								onChange={(e) => setMaxDuration(e.target.value)}
							>
								<option value=""></option>
								<option value="15">15 phút</option>
								<option value="30">30 phút</option>
								<option value="45">45 phút</option>
								<option value="60">60 phút</option>
								<option value="90">90 phút</option>
								<option value="120">120 phút</option>
							</select>
							<label className="absolute top-2 left-2 duration-200 font-medium text-gray-400 transition ease transform peer-focus:-translate-y-8 peer-valid:-translate-y-8 peer-valid:text-gray-700 peer-focus:text-gray-700">
								Thời gian (phút)
							</label>
						</div>

						<div className="mt-8 sm:mt-0 flex flex-col relative mx-2 w-ms-40">
							<select
								required
								{...register('subjectId')}
								className="mb-1 md:mb-0 border-2 bg-transparent text-lg py-1 pl-2 focus:outline-none rounded peer"
								value={subjectId}
								onChange={(e) => setSubjectId(e.target.value)}
							>
								<option></option>
								<option value="1">Toán</option>
								{/* <option value="2">Ngữ Văn</option> */}
								<option value="2">Tiếng Anh</option>
								<option value="3">Vật Lý</option>
								<option value="4">Hóa Học</option>
								<option value="5">Sinh Học</option>
								<option value="6">Lịch Sử</option>
								<option value="7">Địa Lý</option>
								<option value="8">Giáo Dục Công Dân</option>
							</select>
							<label className="absolute top-2 left-2 duration-200 font-medium text-gray-400 transition ease transform peer-valid:-translate-y-8 peer-focus:-translate-y-8 peer-valid:text-gray-700 peer-focus:text-gray-700">
								Môn thi
							</label>
						</div>

						{/* <div className="mt-8 md:mt-0 flex flex-col relative mx-2 w-ms-40">
						<select
							required
							{...register('grade')}
							className="mb-1 md:mb-0 border-2 bg-transparent text-lg py-1 pl-2 focus:outline-none rounded peer"
							value={grade}
							onChange={(e) => setGrade(e.target.value)}
						>
							<option></option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
						<label className="absolute top-2 left-2 duration-200 font-medium text-gray-400 transition ease transform peer-focus:-translate-y-8 peer-valid:-translate-y-8 peer-valid:text-gray-700 peer-focus:text-gray-700">
							Lớp
						</label>
					</div> */}
					</div>
				</div>
				<ul className="w-full flex flex-col items-center b">
					{fields?.map((item, index) => (
						<li
							className="w-full lg:w-2/3 xl:w-1/2 flex border py-2 px-5 mt-2 rounded shadow-sm"
							key={item.id}
							{...register(`questionList.${index}.id`)}
							value={item.id}
						>
							<div className="flex-1">
								<span className="inline-block mt-3 mb-1 rounded p-2 bg-green-300 text-xl font-semibold">
									Câu hỏi {index + 1}
								</span>

								<EditQuestion
									register={register}
									errors={errors}
									label={`questionList.${index}.`}
									content={item.content}
									// correctAnswerId={
									// 	item.correctAnswerId == ''
									// 		? ''
									// 		: item.correctAnswerId == item.answerList[0]?.id
									// 		? '0'
									// 		: item.correctAnswerId == item.answerList[1]?.id
									// 		? '1'
									// 		: item.correctAnswerId == item.answerList[2]?.id
									// 		? '2'
									// 		: '3'
									// }
									correctAnswerId={item.correctAnswerId}
									answerList={item.answerList}
								/>

								<div className="text-center">
									<button
										className="m-2 p-1 bg-red-400 rounded-full relative group"
										type="button"
										onClick={() => remove(index)}
									>
										{/* Delete icon */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											color="white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
										<span className="invisible w-28 bg-gray-500 text-white text-center rounded absolute z-10 top-1 right-[120%] after:absolute after:top-1/2 after:left-[96%] after:-mt-1 after:border-4 after:border-gray-500 after:rotate-45 group-hover:visible">
											Xóa câu hỏi
										</span>
									</button>

									<button
										className="m-2 p-1 bg-indigo-400 rounded-full relative group"
										type="button"
										onClick={() =>
											insert(index + 1, {
												id: -1,
												content: '',
												correctAnswerId: -1,
												answerList: '',
											})
										}
									>
										{/* Insert icon */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											color="white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
											/>
										</svg>
										<span className="invisible w-28 bg-gray-500 text-white text-center rounded absolute z-10 -top-2 left-[120%] after:absolute after:top-1/2 after:right-[96%] after:-mt-1 after:border-4 after:border-gray-500 after:rotate-45 group-hover:visible">
											Chèn câu hỏi mới ở dưới
										</span>
									</button>
								</div>
							</div>
							<div className="flex flex-col justify-between">
								<button
									className="m-2 p-1 bg-blue-400 rounded-full relative group"
									type="button"
									onClick={() => move(index, index - 1)}
								>
									{/* Move Up icon */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										color="white"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 10l7-7m0 0l7 7m-7-7v18"
										/>
									</svg>
									<span className="invisible w-36 bg-gray-500 text-white text-center rounded absolute z-10 -top-2 right-[120%] lg:left-[120%] after:absolute after:top-1/2 after:left-[96%] lg:after:right-[96%] after:-mt-1 after:border-4 after:border-gray-500 after:rotate-45 group-hover:visible">
										Di chuyển câu hỏi lên trên
									</span>
								</button>

								<button
									className="m-2 p-1 bg-yellow-400 rounded-full relative group"
									type="button"
									onClick={() => move(index, index + 1)}
								>
									{/* Move Down icon*/}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										color="white"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 14l-7 7m0 0l-7-7m7 7V3"
										/>
									</svg>
									<span className="invisible w-36 bg-gray-500 text-white text-center rounded absolute z-10 -top-2 right-[120%] lg:left-[120%] after:absolute after:top-1/2 after:left-[96%] lg:after:right-[96%] after:-mt-1 after:border-4 after:border-gray-500 after:rotate-45 group-hover:visible">
										Di chuyển câu hỏi xuống dưới
									</span>
								</button>
							</div>
						</li>
					))}
					<div className="text-center">
						<button
							className="m-2 p-1 bg-green-400 rounded-full relative group"
							type="button"
							onClick={() => {
								append({
									id: -1,
									content: '',
									correctAnswerId: -1,
									answerList: '',
								});
							}}
						>
							{/* Add icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								color="white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4v16m8-8H4"
								/>
							</svg>
							<span className="invisible w-28 bg-gray-500 text-white text-center rounded absolute z-10 top-0.5 left-[120%] after:absolute after:top-1/2 after:right-[96%] after:-mt-1 after:border-4 after:border-gray-500 after:rotate-45 group-hover:visible">
								Thêm câu hỏi
							</span>
						</button>

						<button
							className="block px-2 py-1 bg-blue-400 rounded text-xl text-white font-semibold"
							type="submit"
						>
							Cập Nhật Đề
						</button>
					</div>
				</ul>
			</form>
			<Modal isOpen={loading} style={customStyles} contentLabel="Modal" ariaHideApp={false}>
				{loading ? (
					isSuccess ? (
						<h2 className="font-bold text-xl text-green-500">Thành công</h2>
					) : (
						<div className="flex items-center">
							<h2 className="font-bold text-xl text-blue-600 mr-3 ">
								Đang cập nhật đề ...
							</h2>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="animate-bounce h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
						</div>
					)
				) : null}
			</Modal>
		</>
	);
}

export default EditExamForm;
