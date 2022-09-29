import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseDurationToTime } from '../../../utils/parseDurationToTime';
function Statistics() {
	const [loading, setLoading] = useState(false);
	const [recordList, setRecordList] = useState();

	useEffect(() => {
		setLoading(true);
		const fetchStudentRecord = async () => {
			try {
				const url = `${process.env.REACT_APP_API_URL}/admin/statistics`;

				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data) {
					setRecordList(res.data);
					setLoading(false);
				}
			} catch (error) {
				console.log('Failed to fetch student record:', error);
			}
		};
		fetchStudentRecord();
	}, []);

	return (
		<div className='flex justify-center mx-auto'>
			<div className='flex justify-center mt-2'>
				<div className='flex flex-col'>
					<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
						<div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
							<div className='overflow-x-auto space-y-5'>
								<div className='flex justify-between'>
									<span className='text-lg font-bold text-red-500 pt-1'>
										Danh sách top 10 học sinh có thành tích cao nhất
									</span>
								</div>

								<table className='min-w-full border border-orange-400'>
									<thead className='border-b bg-orange-400'>
										<tr>
											<th
												scope='col'
												className='text-base font-medium text-white px-6 py-4 text-left'
											>
												STT
											</th>
											<th
												scope='col'
												className='text-base font-medium text-white px-6 py-4 text-left '
											>
												Họ và tên
											</th>
											<th
												scope='col'
												className='text-base font-medium text-white px-6 py-4 text-left '
											>
												Số đề thi đã làm
											</th>
											<th
												scope='col'
												className='text-base font-medium text-white px-6 py-4 text-left'
											>
												Số điểm trung bình
											</th>
											<th
												scope='col'
												className='text-sm font-medium text-white px-6 py-4 text-center'
											>
												Thởi gian làm đề trung bình
											</th>
										</tr>
									</thead>
									<tbody>
										{loading
											? Array(5)
													.fill()
													.map((e, i) => (
														<tr
															className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'
															key={i}
														>
															<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
																<div className='h-10 bg-gray-200 rounded col-span-1'></div>
															</td>

															<td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap w-1/3'>
																<div className='h-10 bg-gray-200 rounded col-span-1'></div>
															</td>
															<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap w-1/5'>
																<div className='h-10 bg-gray-200 rounded col-span-1'></div>
															</td>
															<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap w-1/5'>
																<div className='h-10 bg-gray-200 rounded col-span-1'></div>
															</td>
															<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap w-1/5'>
																<div className='h-10 bg-gray-200 rounded col-span-1'></div>
															</td>
														</tr>
													))
											: recordList?.map((e, i) => (
													<tr
														className='bg-white border-b hover:bg-gray-100'
														key={i}
													>
														<td className='px-6 py-4 whitespace-nowrap text-base font-base text-gray-900'>
															{i + 1}
														</td>
														<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/3'>
															{e.user.name}
														</td>
														<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/5'>
															{e.numberOfTakenExams}
														</td>
														<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/5'>
															{e.averagePoint.toFixed(2)}
														</td>
														<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/5'>
															{parseDurationToTime(e.averageDuration)}
														</td>
													</tr>
											  ))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Statistics;
