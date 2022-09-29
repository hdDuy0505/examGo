import moment from 'moment';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { countCorrectAnswer } from '../../../utils/countCorrectAnswer';
import { parseDurationToTime } from '../../../utils/parseDurationToTime';
import { subject } from '../../../utils/subject';

function ViewResult({ examReview }) {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center py-20 md:py-14 text-base">
			<div className=" w-full sm:w-2/3 md:w-3/4 lg:w-1/2 mx-3 px-3 py-5 lg:py-12 sm:p-12 md:px-20 bg-gray-300 bg-opacity-25 shadow-lg">
				<div className="mb-3">
					<span className="text-3xl font-bold text-green-800 ">
						{subject(examReview?.subjectId)}
						<span> |</span>
					</span>
					<span className="text-yellow-500 text-2xl font-semibold cursor-pointer my-3">
						<span>| </span>
						{examReview?.name}
					</span>
				</div>

				<div className="border p-2">
					<h4 className="text-md text-gray-600 font-semibold">
						Thời gian:{' '}
						<span className="text-yellow-500 ">{examReview?.maxDuration} phút</span>
					</h4>
					<h4 className="text-md text-gray-600 font-semibold">
						Số câu:{' '}
						<span className="text-yellow-500 ">
							{examReview?.questionResultList?.length}
						</span>
					</h4>
					<h4 className="text-md text-gray-600 font-semibold">
						Người đăng: <span className="text-yellow-500 ">{examReview?.teacher}</span>
					</h4>
					{/* <h4 className="text-md text-gray-600 font-semibold">
						Ngày đăng:{' '}
						<span className="text-yellow-500 ">
							{moment.utc(examReview?.exam?.openedAt).local().format('DD/MM/YYYY')}
						</span>
					</h4> */}
				</div>

				<div className="text-center my-3"></div>
				<div className="flex justify-center my-3 lg:my-10">
					<table className="w-full">
						<tbody className="bg-blue-400 text-white">
							<tr>
								<th className="w-1/2">Trạng thái</th>
								<th className="w-1/4">Thời gian</th>
								<th className="w-1/4">Kết quả</th>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>
									<h5>Hoàn thành</h5>
									<p>
										Nộp lúc{' '}
										{moment
											.utc(examReview?.startTime)
											.local()
											.add(examReview?.duration, 'seconds')
											.format('DD/MM/YYYY h:mm:ss a')}
									</p>
								</td>
								<td className="text-center">
									{parseDurationToTime(examReview?.duration)}
								</td>
								<td className="text-center font-bold">
									<span className="text-red-600">
										{countCorrectAnswer(examReview?.questionResultList)}
									</span>
									/{examReview?.questionResultList?.length}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex justify-center mb-5">
					<button
						className="bg-green-400 py-2 px-8 mt-4 mr-3 font-bold text-gray-50 text-lg rounded-lg"
						onClick={() =>
							navigate({
								pathname: '/exam/resultDetail',
								search: createSearchParams({
									examResult: JSON.stringify(examReview),
								}).toString(),
							})
						}
					>
						Xem đáp án
					</button>
				</div>
			</div>
		</div>
	);
}

export default ViewResult;
