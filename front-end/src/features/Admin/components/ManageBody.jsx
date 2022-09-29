import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function ManageBody({ examList, handleDeleteExam, pageIndex, handlePaging, loading }) {
	const navigate = useNavigate();
	return (
		<div className='flex-1 lg:flex-[0.8] text-lg'>
			<div className='flex flex-col m-10 border shadow-md'>
				<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='overflow-hidden'>
							<table className='min-w-full'>
								<thead className='bg-white border-b'>
									<tr>
										<th
											scope='col'
											className='text-sm font-medium text-gray-900 px-6 py-4 text-center'
										>
											#
										</th>

										<th
											scope='col'
											className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											Thông tin đề thi
										</th>
										<th
											scope='col'
											className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											Số lần làm đề
										</th>

										<th
											scope='col'
											className='text-sm font-medium text-gray-900 px-6 py-4 text-center'
										>
											Xử lý
										</th>
									</tr>
								</thead>
								{loading ? (
									<tbody>
										<tr className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>

											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
										</tr>
										<tr className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>

											<td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap w-9/12'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
										</tr>
										<tr className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>

											<td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap w-9/12'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
										</tr>
										<tr className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>

											<td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap w-9/12'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
										</tr>
										<tr className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>

											<td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap w-9/12'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
											<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap'>
												<div className='h-10 bg-gray-200 rounded col-span-1'></div>
											</td>
										</tr>
									</tbody>
								) : (
									examList &&
									examList.map((e, i) => (
										<tbody key={e.id}>
											<tr className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'>
												<td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
													{i + 1}
												</td>

												<td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap w-9/12'>
													<div className='mr-4 w-full'>
														<h5 className='text-lg font-semibold '>
															{e.name}
															{/* {'Đề ôn thi THPT Quốc gia môn Lịch Sử năm 2021 có đáp án (Đề 1) Đề ôn thi THPT Quốc gia môn'
														.length > 50
														? 'Đề ôn thi THPT Quốc gia môn Lịch Sử năm 2021 có đáp án (Đề 1) Đề ôn thi THPT Quốc gia môn'.slice(
																0,
																50 - 1,
														  ) + '…'
														: 'Đề ôn thi THPT Quốc gia môn Lịch Sử năm 2021 có đáp án (Đề 1) Đề ôn thi THPT Quốc gia môn'} */}
														</h5>
														<div className='flex lg:w-4/5 xl:w-3/5 justify-start'>
															<span className='text-sm'>
																Giáo viên: {e.teacher.name}
															</span>
															<span className='text-sm ml-10'>
																Thời gian: {e.maxDuration} phút
															</span>
															<span className='text-sm ml-10'>
																Ngày tạo:{' '}
																{moment
																	.utc(e?.createdTime)
																	.local()
																	.format('DD/MM/YYYY')}
															</span>
														</div>
													</div>
												</td>
												<td className='text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap text-center'>
													<div className='mr-4 w-full'>
														<h5 className='text-lg font-semibold '>
															{e.takenCount}
															{/* {'Đề ôn thi THPT Quốc gia môn Lịch Sử năm 2021 có đáp án (Đề 1) Đề ôn thi THPT Quốc gia môn'
														.length > 50
														? 'Đề ôn thi THPT Quốc gia môn Lịch Sử năm 2021 có đáp án (Đề 1) Đề ôn thi THPT Quốc gia môn'.slice(
																0,
																50 - 1,
														  ) + '…'
														: 'Đề ôn thi THPT Quốc gia môn Lịch Sử năm 2021 có đáp án (Đề 1) Đề ôn thi THPT Quốc gia môn'} */}
														</h5>
													</div>
												</td>
												<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap'>
													<div className='flex flex-col items-center'>
														<svg
															onClick={() => navigate(`edit/${e.id}`)}
															xmlns='http://www.w3.org/2000/svg'
															className='h-5 w-5 inline-block hover:scale-125 mb-2 cursor-pointer'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'
															strokeWidth={2}
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
															/>
														</svg>

														<svg
															onClick={() => handleDeleteExam(e.id)}
															xmlns='http://www.w3.org/2000/svg'
															className='h-5 w-5 inline-block hover:scale-125 mb-2 cursor-pointer'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'
															strokeWidth={2}
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
															/>
														</svg>
													</div>
												</td>
											</tr>
										</tbody>
									))
								)}
							</table>
						</div>
					</div>
				</div>
				<div>
					<div className='flex items-center justify-center mb-2 text-base'>
						<div
							className={`${
								pageIndex == 1
									? 'text-gray-400'
									: 'cursor-pointer hover:border-gray-800'
							} border-2 rounded-full p-1 mr-2`}
							onClick={() => handlePaging(pageIndex - 1)}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 19l-7-7 7-7'
								/>
							</svg>
						</div>
						<span>Trang {pageIndex ? pageIndex : 1}</span>
						<div
							className={`${
								!examList || examList.length === 0
									? 'text-gray-400'
									: 'cursor-pointer hover:border-gray-800'
							} border-2 rounded-full p-1 ml-2`}
							onClick={() => {
								if (examList && examList.length != 0)
									handlePaging(parseInt(pageIndex) + 1);
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageBody;
