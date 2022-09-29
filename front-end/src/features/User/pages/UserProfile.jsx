import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { parseDurationToTime } from '../../../utils/parseDurationToTime';
import { roundPoint } from '../../../utils/roundPoint';
import { subject } from '../../../utils/subject';

function UserProfile(props) {
	const navigate = useNavigate();
	const styleTableHeader = 'px-2 py-1';
	const styleTableData = 'py-1 px-2 border-b';

	const userInfo = useSelector((state) => state.user);

	const [examList, setExamList] = useState();
	const [record, setRecord] = useState();
	const [loading, setLoading] = useState(false);

	const [subjectFilter, setSubjectFilter] = useState(0);
	const [sortFilter, setSortFilter] = useState('point');
	const [pageIndex, setPageIndex] = useState(1);

	useEffect(() => {
		const fetchRecord = async () => {
			try {
				const url = `${process.env.REACT_APP_API_URL}/user/studentRecord`;
				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data) {
					console.log(res.data);
					setRecord(res.data);
				}
			} catch (error) {
				console.log('Fail to fetch exam', error);
			}
		};
		fetchRecord();
	}, []);

	useEffect(() => {
		const fetchExam = async () => {
			try {
				setLoading(true);
				const url = `${process.env.REACT_APP_API_URL}/user/takenExamList?subject=${subjectFilter}&sort=${sortFilter}&page=${pageIndex}`;
				console.log(url);
				// const url = `${process.env.REACT_APP_API_URL}/manageexam${subjectFilter ? `?subjectId=${subjectFilter}` : ''	}${pageParam ? (searchExam ? `&page=${pageParam}` : `?page=${pageParam}`) : ''}`;
				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data) {
					console.log(res.data);
					setExamList(res.data);
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
				console.log('Fail to fetch exam', error);
			}
		};
		fetchExam();
	}, [subjectFilter, sortFilter, pageIndex]);

	const handlePaging = (page) => {
		if (page < 1) return;
		// navigate({
		// 	search: createSearchParams({
		// 		page: page,
		// 	}).toString(),
		// });
		setPageIndex(page);
	};
	return (
		<div className='px-12 flex flex-col sm:text-[16px] bg-[#ECF0F4] py-6'>
			<div className='flex flex-wrap justify-between w-full'>
				<div className='flex flex-col basis-[30%] md:min-h-full'>
					<p className='font-bold text-red-400 mb-2'>Sơ lược</p>
					<div className='rounded-lg shadow-lg p-8 bg-white'>
						<div className='text-center mb-4'>
							<div className='relative inline-flex justify-center'>
								<img
									className='h-full rounded-full border-4'
									src='/images/avatar.jpg'
									height={150}
									width={150}
									alt='avatar'
								/>
								{/* <div className="absolute top-[10%] right-[5%] px-2 py-1 rounded-full bg-purple-400 border-2 border-black text-white">
									{userInfo.grade}
								</div>
								<div className="absolute top-[80%] right-[5%] px-2 py-2 rounded-full bg-orange-400 border-2 border-black text-purple-800">
									<img
										src={
											userInfo.gender
												? '/images/icon-male.png'
												: '/images/icon-female.png'
										}
										alt="gender"
									/>
								</div> */}
							</div>
							<p className='font-bold text-2xl'>
								{userInfo?.name ? userInfo?.name : 'Chưa cập nhật'}
							</p>
							{/* <p className="italic text-red-500">{userInfo.quote}</p> */}
						</div>
						<div>
							<div className='flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
									<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
								</svg>
								<span className='ml-8'>
									{userInfo?.email ? userInfo?.email : 'Chưa cập nhật'}
								</span>
							</div>
							<div className='flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path d='M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z' />
									<path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
								</svg>
								<span className='ml-8'>
									{userInfo?.phone ? userInfo?.phone : 'Chưa cập nhật'}
								</span>
							</div>
							<div className='flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
								</svg>
								<span className='ml-8'>
									{userInfo?.address ? userInfo?.address : 'Chưa cập nhật'}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col md:basis-[64%] md:min-h-full '>
					<p className='font-bold text-red-400 mb-2'>Thông tin cá nhân</p>
					<ul className='rounded-lg shadow-lg bg-white'>
						<li className='flex py-4 px-8 border-b'>
							<div className='basis-[30%] font-semibold'>Họ và tên:</div>
							<div className='basis-[70%]'>
								{userInfo?.name ? userInfo?.name : 'Chưa cập nhật'}
							</div>
						</li>
						<li className='flex py-4 px-8 border-b'>
							<div className='basis-[30%] font-semibold'>Email</div>
							<div className='basis-[70%]'>
								{userInfo?.email ? userInfo?.email : 'Chưa cập nhật'}
							</div>
						</li>
						<li className='flex py-4 px-8 border-b'>
							<div className='basis-[30%] font-semibold'>Điện thoại:</div>
							<div className='basis-[70%]'>
								{userInfo?.phone ? userInfo?.phone : 'Chưa cập nhật'}
							</div>
						</li>
						{/* <li className="flex py-4 px-8 border-b">
							<div className="basis-[30%] font-semibold">Giới tính:</div>
							<div className="basis-[70%]">{userInfo.gender ? 'Nam' : 'Nữ'}</div>
						</li>
						<li className="flex py-4 px-8 border-b">
							<div className="basis-[30%] font-semibold">Khối:</div>
							<div className="basis-[70%]">{userInfo.grade}</div>
						</li> */}
						<li className='flex py-4 px-8 border-b'>
							<div className='basis-[30%] font-semibold'>Địa chỉ:</div>
							<div className='basis-[70%]'>
								{userInfo?.address ? userInfo?.address : 'Chưa cập nhật'}
							</div>
						</li>
						{/* <li className="flex py-4 px-8 border-b">
							<div className="basis-[30%] font-semibold">Mô tả:</div>
							<div className="basis-[70%]">{userInfo.quote}</div>
						</li> */}
					</ul>
					<button
						className='flex ml-auto mt-2 px-4 py-2 rounded bg-blue-500 text-white'
						onClick={() => {
							navigate('/user/edit');
						}}
					>
						Chỉnh sửa hồ sơ
					</button>
				</div>
			</div>
			<div className='flex flex-wrap justify-between mt-8 w-full '>
				<div className='basis-[30%]'>
					<p className='font-bold text-red-400 mb-2'>Thành tích cá nhân</p>
					<ul className='rounded-lg shadow-lg p-8 bg-white'>
						<li className='flex my-2'>
							<p className='basis-[60%] font-semibold'>Số đề thi đã làm được:</p>
							<p>
								{record?.numberOfTakenExams === 0
									? '0'
									: record?.numberOfTakenExams
									? record?.numberOfTakenExams
									: '...'}
							</p>
						</li>
						<li className='flex my-2'>
							<p className='basis-[60%] font-semibold'>Điểm trung bình:</p>
							<p>
								{record?.averagePoint === 0
									? '0'
									: record?.averagePoint
									? (record?.averagePoint).toFixed(2)
									: '...'}
							</p>
						</li>
						<li className='flex my-2'>
							<p className='basis-[60%] font-semibold'>Thời gian trung bình:</p>
							<p>
								{record?.averageDuration === 0
									? '0'
									: record?.averageDuration
									? parseDurationToTime(record?.averageDuration)
									: '...'}
							</p>
						</li>
					</ul>
				</div>

				<div className='basis-[64%] min-h-full'>
					<div className='flex'>
						<p className='font-bold text-red-400 mb-2'>Danh sách đề thi đã làm</p>
						<ul className='flex flex-wrap ml-auto'>
							<li>
								Môn học:
								<select
									className='ml-2'
									onChange={(e) => setSubjectFilter(e.target.value)}
								>
									<option value='0' label='Tất cả'></option>
									<option value='1'>Toán</option>
									<option value='2'>Tiếng Anh</option>
									<option value='3'>Vật Lý</option>
									<option value='4'>Hóa Học</option>
									<option value='5'>Sinh Học</option>
									<option value='6'>Lịch sử</option>
									<option value='7'>Địa lý</option>
									<option value='8'>GDCD</option>
								</select>
							</li>
							<li className='ml-4'>
								Sắp xếp theo:
								<select
									className='ml-2 outline-none'
									onChange={(e) => setSortFilter(e.target.value)}
								>
									<option value='point'>Điểm số</option>{' '}
									<option value='duration'>Thời gian làm bài</option>
								</select>
							</li>
						</ul>
					</div>
					<table className='shadow-lg bg-white rounded-lg overflow-hidden w-full'>
						<thead className='bg-[#FFDE8A] rounded-lg'>
							<tr>
								<th className={styleTableHeader}>STT</th>
								<th className={styleTableHeader}>Đề thi</th>
								<th className={styleTableHeader}>Môn học</th>
								<th className={styleTableHeader}>Thời gian làm bài</th>
								<th className={styleTableHeader}>Kết quả</th>
								<th className={styleTableHeader}>Xử lý</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<>
									{Array(5)
										.fill(0)
										.map((e, i) => (
											<tr
												className='bg-white border-b transition duration-200 ease-in-out hover:bg-gray-100'
												key={i}
											>
												<td className={`${styleTableData} text-center`}>
													<div className='h-6 bg-gray-200 rounded col-span-1'></div>
												</td>
												<td className={styleTableData}>
													<div className='h-6 bg-gray-200 rounded col-span-1'></div>
												</td>
												<td className={styleTableData}>
													<div className='h-6 bg-gray-200 rounded col-span-1'></div>
												</td>
												<td className={styleTableData}>
													<div className='h-6 bg-gray-200 rounded col-span-1'></div>
												</td>
												<td className={styleTableData}>
													<div className='h-6 bg-gray-200 rounded col-span-1'></div>
												</td>
												<td className={styleTableData}>
													<div className='h-6 bg-gray-200 rounded col-span-3'></div>
												</td>
											</tr>
										))}
								</>
							) : (
								examList?.length > 0 &&
								examList.map((exam, index) => {
									return (
										<tr key={exam.id}>
											<td className={`${styleTableData} text-center`}>
												{index + 1}
											</td>
											<td className={styleTableData}>{exam?.name}</td>
											<td className={`${styleTableData} text-center`}>
												{subject(exam?.subjectId)}
											</td>
											<td className={`${styleTableData} text-center`}>
												{parseDurationToTime(exam?.studentExam?.duration)}
											</td>
											<td className={`${styleTableData} text-center`}>
												{roundPoint(exam?.studentExam?.point, 0.25)}
											</td>
											<td className={`${styleTableData} text-center`}>
												<button
													className='bg-green-500 px-2 py-1 rounded-lg text-white text-base'
													onClick={() =>
														navigate({
															pathname: `/exam/result/${exam.id}`,
														})
													}
												>
													Xem chi tiết
												</button>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
					{!loading && (
						<div>
							<div className='flex items-center justify-center mt-5 mb-2 text-base'>
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
					)}
					{/* {examList.length > 5 && (
						<div className="flex items-center justify-center mt-6">
							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 text-sky-600 font-semibold">
								Prev
							</button>
							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold bg-indigo-600 text-white">
								1
							</button>
							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold">
								2
							</button>
							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold">
								3
							</button>
							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold">
								4
							</button>
							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded text-sky-600 font-semibold">
								Next
							</button>
						</div>
					)} */}
				</div>
			</div>
		</div>
	);
}
// {
// 	/* <div className="flex items-center justify-center mt-6">
// 							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 text-sky-600 font-semibold">Prev</button>
// 							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold bg-indigo-600 text-white">1</button>
// 							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold">2</button>
// 							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold">3</button>
// 							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded mr-1 font-bold">4</button>
// 							<button className="border-3 border-stone-400 px-3 py-1 bg-white border rounded text-sky-600 font-semibold">Next</button>
// 						</div> */
// }
export default UserProfile;
