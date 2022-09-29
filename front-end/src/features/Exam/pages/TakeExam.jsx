import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import ExamBody from '../components/ExamBody';
import StateBox from '../components/StateBox';

function TakeExam() {
	// const [exam, setExam] = useState({});
	// const [answers, setAnswers] = useState([]);
	// // const time = useRef(15 * 60);
	// const time = useMemo(() => exam.minuteLimit, [exam]);
	// console.log(time);
	// const [loading, setLoading] = useState(false);
	// const { examId } = useParams();

	// useEffect(() => {
	// 	const fetchedExam = {
	// 		$id: '1',
	// 		id: 16,
	// 		name: 'Đề thi 45 phút Lịch Sử 12',
	// 		maxDuration: 10,
	// 		createdTime: null,
	// 		teacherId: 10,
	// 		subjectId: 6,
	// 		isDeleted: 0,
	// 		isDone: 0,
	// 		numOfQuestions: 0,
	// 		questionList: {
	// 			$id: '2',
	// 			$values: [
	// 				{
	// 					$id: '3',
	// 					id: 16,
	// 					content: 'Câu 1',
	// 					correctAnswerId: 45,
	// 					examId: 16,
	// 					answerList: {
	// 						$id: '4',
	// 						$values: [
	// 							{
	// 								$id: '5',
	// 								id: 45,
	// 								content: 'Đáp án 1',
	// 								questionId: 16,
	// 							},
	// 							{
	// 								$id: '6',
	// 								id: 46,
	// 								content: 'Đáp án 2',
	// 								questionId: 16,
	// 							},
	// 							{
	// 								$id: '7',
	// 								id: 47,
	// 								content: 'Đáp án 3',
	// 								questionId: 16,
	// 							},
	// 							{
	// 								$id: '8',
	// 								id: 48,
	// 								content: 'Đáp án 4',
	// 								questionId: 16,
	// 							},
	// 						],
	// 					},
	// 				},
	// 			],
	// 		},
	// 		teacher: null,
	// 	};
	// 	setExam(fetchedExam);
	// }, [examId]);

	// useEffect(() => {
	// 	if (exam?.questions?.length) setAnswers(new Array(exam.questions.length).fill());
	// }, [exam]);

	// const handleChooseAnswer = (index, answer) => {
	// 	answer = answer === 0 ? 'A' : answer === 1 ? 'B' : answer === 2 ? 'C' : 'D';
	// 	const newAnswers = [...answers];
	// 	newAnswers[index] = answer;
	// 	setAnswers(newAnswers);
	// };

	const { examId } = useParams();
	// console.log(examId);
	const [exam, setExam] = useState();
	const [loading, setLoading] = useState(false);

	//Fetch dữ liệu
	useEffect(() => {
		const fetchExam = async () => {
			try {
				setLoading(true);
				const url = `${process.env.REACT_APP_API_URL}/exam/take/${examId}`;

				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data) {
					setExam(res.data);

					localStorage.setItem(`time_${examId}`, res.data.maxDuration);

					if (!localStorage.getItem(`startTime_${examId}`))
						localStorage.setItem(
							`startTime_${examId}`,
							moment().format('DD/MM/YYYY HH:mm:ss'),
						);
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
				console.log('Failed to fetch exam:', error);
			}
		};
		fetchExam();
	}, [examId]);

	return (
		// <div className="relative">
		// 	<div className="flex-1 flex flex-col mx-6 sm:mx-10 px-2 sm:px-10 py-10 bg-gray-200 bg-opacity-30 shadow-lg">
		// 		<div className="">
		// 			<div>
		// 				<span className="text-3xl font-bold text-green-800">{exam?.subject} |</span>
		// 				<span className="text-yellow-500 text-2xl font-semibold">
		// 					| {exam?.name}
		// 				</span>
		// 			</div>
		// 			<div className="items-center mt-4">
		// 				<span className="text-xl font-semibold ml-12">Lớp: {exam?.grade}</span>
		// 				<span className="text-lg font-semibold ml-5">
		// 					Thời gian: {exam?.minuteLimit} phút
		// 				</span>
		// 				<span className="text-lg font-semibold ml-5">
		// 					Người ra đề: {exam?.creator?.name}
		// 				</span>
		// 			</div>
		// 		</div>
		// 		<ExamForm questions={exam.questions} handleChooseAnswer={handleChooseAnswer} />
		// 	</div>
		// 	<div className="fixed top-28 right-5 bg-indigo-300 bg-opacity-40 rounded-lg p-2 m-10">
		// 		<div className="grid grid-flow-row grid-cols-5 gap-3 p-2">
		// 			{answers?.map((value, index) => (
		// 				<AnswerBox key={index} question={index + 1} answer={value} />
		// 			))}
		// 		</div>
		// 		{/* <StateBox
		// 		// minuteLimit={exam.minuteLimit}
		// 		// handleSaveTime={handleSaveTime}
		// 		// examId={examId}
		// 		/> */}
		// 	</div>
		// </div>
		<div className="min-h-screen">
			{loading ? (
				<Loading />
			) : (
				<div className="flex justify-between my-10 flex-col md:flex-row">
					<ExamBody exam={exam} />
					<StateBox id={examId} />
				</div>
			)}
		</div>
	);
}

export default TakeExam;
