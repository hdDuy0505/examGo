import React from 'react';
import AnswerBox from './AnswerBox';
import Countdown from 'react-countdown';
import { useState } from 'react';
import Timer from './Timer';
import { useEffect } from 'react';
import moment from 'moment';
import AnswersBox from './AnswersBox';
import { useDispatch } from 'react-redux';
import { timeout } from '../../../store/slices/timeSlice';

// function StateBox({ minuteLimit, examId }) {
// 	console.log(minuteLimit);
// 	const [time, setTime] = useState(minuteLimit * 60);
// 	const [timeRemain, setTimeRemain] = useState(minuteLimit * 60);

// 	useEffect(() => {
// 		if (!localStorage.getItem(`startTime_${examId}`))
// 			localStorage.setItem(`startTime_${examId}`, moment().format('DD/MM/YYYY HH:mm:ss'));

// 		const remainTimeLoaded = JSON.parse(localStorage.getItem(`remainTimeSaved_${examId}`));

// 		const currentTimeLoaded = JSON.parse(localStorage.getItem(`currentTimeSaved_${examId}`));

// 		// console.log(remainTimeLoaded, currentTimeLoaded);
// 		// Chỉ tính thời gian còn lại khi bài thi đang được làm
// 		if (remainTimeLoaded != null) {
// 			const now = moment().format('DD/MM/YYYY HH:mm:ss');
// 			const then = moment().format(currentTimeLoaded);
// 			const diff = moment
// 				.utc(moment(now, 'DD/MM/YYYY HH:mm:ss').diff(moment(then, 'DD/MM/YYYY HH:mm:ss')))
// 				.format('HH:mm:ss');

// 			// Tính thời gian làm bài còn lại
// 			const objDiff = {};
// 			const arrDiff = diff.split(':');
// 			objDiff['hours'] = parseInt(arrDiff[0]);
// 			objDiff['minutes'] = parseInt(arrDiff[1]);
// 			objDiff['seconds'] = parseInt(arrDiff[2]);

// 			const remainHours = remainTimeLoaded?.hours - objDiff?.hours;
// 			const remainMinutes = remainTimeLoaded?.minutes - objDiff?.minutes;
// 			const remainSeconds = remainTimeLoaded?.seconds - objDiff?.seconds;

// 			setTimeRemain(remainHours * 3600 + remainMinutes * 60 + remainSeconds);
// 		}
// 	}, [examId]);

// 	// Hàm lưu thời gian
// 	const handleSaveTime = (remainTimeSaved, currentTimeSaved) => {
// 		localStorage.setItem(`remainTimeSaved_${examId}`, JSON.stringify(remainTimeSaved));
// 		localStorage.setItem(`currentTimeSaved_${examId}`, JSON.stringify(currentTimeSaved));
// 	};

// 	const renderer = ({ hours, minutes, seconds, completed }) => {
// 		if (completed) {
// 			// Render a completed state
// 			return (
// 				<div className="py-10 w-52 flex justify-center">
// 					<div className="h-16 w-40 border-2 border-red-500 flex flex-col items-center rounded-xl justify-center">
// 						<h1 className="text-red-600 font-bold text-3xl">HẾT GIỜ</h1>
// 					</div>
// 				</div>
// 			);
// 		} else {
// 			// Render a countdown
// 			return (
// 				<Timer
// 					hours={hours}
// 					minutes={minutes}
// 					seconds={seconds}
// 					handleSaveTime={handleSaveTime}
// 				/>
// 			);
// 		}
// 	};

// 	return (
// 		<div className="">
// 			<Countdown
// 				date={Date.now() + (time != timeRemain ? timeRemain : time) * 1000}
// 				renderer={renderer}
// 				// onComplete={() => dispatch(timeout(true))}
// 			/>
// 		</div>
// 	);
// }
function StateBox({ id }) {
	const dispatch = useDispatch();

	const [time, setTime] = useState(14 * 60);
	const [timeRemain, setTimeRemain] = useState(15 * 60);

	//const id = router.query.idExam;
	useEffect(() => {
		setTime(parseInt(localStorage.getItem(`time_${id}`)) * 60);
		setTimeRemain(parseInt(localStorage.getItem(`time_${id}`)) * 60);
	}, []);

	useEffect(() => {
		const remainTimeLoaded = JSON.parse(localStorage.getItem(`remainTimeSaved_${id}`));

		const currentTimeLoaded = JSON.parse(localStorage.getItem(`currentTimeSaved_${id}`));

		// console.log(remainTimeLoaded, currentTimeLoaded);
		// Chỉ tính thời gian còn lại khi bài thi đang được làm
		if (remainTimeLoaded != null) {
			const now = moment().format('DD/MM/YYYY HH:mm:ss');
			const then = moment().format(currentTimeLoaded);
			const diff = moment
				.utc(moment(now, 'DD/MM/YYYY HH:mm:ss').diff(moment(then, 'DD/MM/YYYY HH:mm:ss')))
				.format('HH:mm:ss');

			// Tính thời gian làm bài còn lại
			const objDiff = {};
			const arrDiff = diff.split(':');
			objDiff['hours'] = parseInt(arrDiff[0]);
			objDiff['minutes'] = parseInt(arrDiff[1]);
			objDiff['seconds'] = parseInt(arrDiff[2]);

			const remainHours = remainTimeLoaded?.hours - objDiff?.hours;
			const remainMinutes = remainTimeLoaded?.minutes - objDiff?.minutes;
			const remainSeconds = remainTimeLoaded?.seconds - objDiff?.seconds;

			setTimeRemain(remainHours * 3600 + remainMinutes * 60 + remainSeconds);
		}
	}, [id]);

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return (
				<div className="py-10 w-52 flex justify-center">
					<div className="h-16 w-40 border-2 border-red-500 flex flex-col items-center rounded-xl justify-center">
						<h1 className="text-red-600 font-bold text-3xl">HẾT GIỜ</h1>
					</div>
				</div>
			);
		} else {
			// Render a countdown
			return <Timer hours={hours} minutes={minutes} seconds={seconds} />;
		}
	};
	return (
		<div className="flex flex-col items-center justify-start md:fixed top-100 right-5 bg-indigo-300 bg-opacity-40 rounded-lg p-2 m-10">
			<AnswersBox />

			<Countdown
				date={Date.now() + (time != timeRemain ? timeRemain : time) * 1000}
				renderer={renderer}
				onComplete={() => dispatch(timeout(true))}
			/>
		</div>
	);
}
export default StateBox;
