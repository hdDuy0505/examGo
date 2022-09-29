import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { countCorrectAnswer } from '../../../utils/countCorrectAnswer';
import { parseDurationToTime } from '../../../utils/parseDurationToTime';
import { roundPoint } from '../../../utils/roundPoint';
import AnswersResultBox from '../components/AnswersResultBox';
import ViewQuestionResult from '../components/ViewQuestionResult';

function ExamResultDetail() {
	const [exam, setExam] = useState();
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		setExam(JSON.parse(searchParams.get('examResult')));
	}, [searchParams]);

	// useEffect(() => {
	// 	// console.log(JSON.parse(location.search.slice(1)));
	// 	// console.log(location.search.slice(1));
	// 	// setExam(JSON.parse(location.search.slice(10)));
	// }, [location]);

	return (
		<div>
			<div className='min-h-screen flex-1 flex flex-col ml-8 md:ml-40 mr-8 md:mr-20 my-10 py-10 px-4 md:px-10 bg-gray-200 bg-opacity-25'>
				<div className='mb-6 md:mb-0'>
					<span className='text-3xl font-bold text-green-800'>{exam?.subject} |</span>

					<span className='text-yellow-500 text-2xl font-semibold  mt-3'>
						| {exam?.name}
					</span>
					<div className='w-full lg:w-3/5 mt-5'>
						<div className='py-0.5 text-lg bg-blue-50'>
							<div className='flex py-0.5 text-lg bg-blue-100'>
								<h3 className='text-right w-1/3 pr-2 font-bold'>Trạng thái</h3>
								<h3 className=' w-2/3 pl-2'>Hoàn thành</h3>
							</div>
							<div className='flex py-0.5 text-lg bg-blue-50'>
								<h3 className='text-right w-1/3 pr-2 font-bold'>Kết thúc</h3>
								<h3 className=' w-2/3 pl-2'>
									{moment
										.utc(exam?.submitTime)
										.local()
										.format('DD/MM/YYYY h:mm:ss a')}
								</h3>
							</div>
							<div className='flex py-0.5 text-lg bg-blue-100'>
								<h3 className='text-right w-1/3 pr-2 font-bold'>Thời gian</h3>
								<h3 className=' w-2/3 pl-2'>
									{parseDurationToTime(exam?.duration)}
								</h3>
							</div>
							<div className='flex py-0.5 text-lg bg-blue-50'>
								<h3 className='text-right w-1/3 pr-2 font-bold'>Số câu đúng</h3>
								<h3 className=' w-2/3 pl-2'>
									{countCorrectAnswer(exam?.questionResultList)}/
									{exam?.questionResultList?.length}
								</h3>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col items-center justify-start lg:fixed top-24 right-20 p-2 m-2 md:m-10 shadow-lg rounded-lg bg-indigo-600 bg-opacity-20'>
					<h1 className='text-3xl text-indigo-500 font-bold mb-3 p-2'>Kết quả</h1>
					<AnswersResultBox questionResultList={exam?.questionResultList} />
					<div className='w-full border-t-2 border-indigo-300 flex flex-col items-center'>
						<h1 className='text-3xl text-indigo-500 font-bold pt-2'>Điểm số</h1>
						<h1 className='text-[50px] text-red-500 font-bold my-3 w-28 h-28  flex justify-center items-center rounded-full border-red-500 border-2'>
							{roundPoint(exam?.point, 0.25)}
						</h1>
					</div>
				</div>

				<div className='mt-5 flex-1 w-full lg:w-3/5'>
					{exam?.questionResultList?.map((e, i) => (
						<ViewQuestionResult
							key={i}
							index={i}
							content={e.content}
							chosenAnswerId={e?.chosenAnswerId}
							correctAnswerId={e?.correctAnswerId}
							answerList={e?.answerList}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ExamResultDetail;
