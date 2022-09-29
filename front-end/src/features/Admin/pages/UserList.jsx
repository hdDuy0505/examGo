import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { createSearchParams, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import EditUser from './EditUser';

const customStyles = {
	content: {
		// textAlign: 'center',
		padding: '20px 10px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

function UserList() {
	const navigate = useNavigate();
	const [pdf, setPdf] = useState();
	const [loading, setLoading] = useState(false);
	const [loadingPdf, setLoadingPdf] = useState(false);
	const [userList, setUserList] = useState();
	const [userDelete, setUserDelete] = useState();
	const [userEdit, setUserEdit] = useState();
	const [editPopup, setEditPopup] = useState(false);
	const [deleteIndex, setDeleteIndex] = useState();
	const [searchParams, setSearchParams] = useSearchParams();
	const pageParam = searchParams.get('page');

	const [pageIndex, setPageIndex] = useState(pageParam || 1);
	const [userTypeFilter, setUserTypeFilter] = useState(0);

	useEffect(() => {
		setLoading(true);
		const fetchUser = async () => {
			try {
				// const pageParam = searchParams.get('page');
				const url = `${process.env.REACT_APP_API_URL}/admin/userlist?role=${userTypeFilter}&page=${pageIndex}`;

				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res) {
					setUserList(res.data);
					setLoading(false);
				}
			} catch (error) {
				console.log('Failed to fetch User:', error);
			}
		};
		fetchUser();
	}, [userTypeFilter, pageIndex]);

	const exportPDF = async () => {
		setLoadingPdf(true);
		try {
			const url = `${process.env.REACT_APP_API_URL}/admin/createUserListPDF?role=${userTypeFilter}`;

			const token = localStorage.getItem('TOKEN');
			const res = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				responseType: 'arraybuffer',
			});
			if (res.data) {
				console.log(res.data);
				const file = new Blob([res.data], { type: 'application/pdf' });
				console.log(file);
				const fileURL = URL.createObjectURL(file);
				setLoadingPdf(false);
				window.open(fileURL);
			}
		} catch (error) {
			console.log('Failed to fetch user list:', error);
		}
	};

	const handleChangeUserState = async (userId) => {
		const idxUser = userList.findIndex((e) => e.id === userId);
		const newUserList = [...userList];
		newUserList[idxUser].isDeleted = 1 - newUserList[idxUser].isDeleted; // 0->1 and vice versa
		setUserList([...newUserList]);
		try {
			const url = `${process.env.REACT_APP_API_URL}/admin/changeUserState1/${userId}`;

			const token = localStorage.getItem('TOKEN');
			const res = await axios.put(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.data) {
				console.log(res.data);
			}
		} catch (error) {
			console.log('Failed to delete user:', error);
		}
	};

	const handlePaging = (page) => {
		if (page < 1) return;
		navigate({
			pathname: '/admin/users',
			search: createSearchParams({
				page: page,
			}).toString(),
		});
		setPageIndex(page);
	};

	const [confirmDeleteState, setConfirmDeleteState] = useState(false);
	return (
		<div className='flex justify-center ml-80 mt-2'>
			<div className='flex flex-col'>
				<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='overflow-x-auto space-y-5'>
							<div className='flex justify-between'>
								<span className='text-lg font-bold text-red-500 pt-1'>
									Danh sách người dùng
								</span>

								<div className='flex justify-around space-x-10'>
									<div className='space-x-2'>
										<span className='text-base font-bold'>Vai trò:</span>
										<select
											className='text-base border border-gray-200 rounded'
											onChange={(e) => setUserTypeFilter(e.target.value)}
										>
											<option value='0' selected>
												Tất cả
											</option>
											<option value='1'>Học sinh</option>
											<option value='2'>Giáo viên</option>
											<option value='3'>Quản trị viên</option>
										</select>
									</div>
								</div>
							</div>
							<div className='flex'>
								{/*<div className=''>
									<NavLink to='/admin/users/add'>
										<button className='bg-blue-500 hover:bg-blue-400 text-white text-base font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
											Thêm tài khoản
										</button>
									</NavLink>
								</div>*/}
								<div className='ml-5 flex'>
									<button
										className='bg-blue-500 hover:bg-blue-400 text-white text-base font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded'
										onClick={() => exportPDF()}
									>
										Xuất danh sách PDF
									</button>
									{loadingPdf && (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='animate-ping h-5 w-5 ml-5 mt-2'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth={2}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
											/>
										</svg>
									)}
								</div>
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
											Email
										</th>
										<th
											scope='col'
											className='text-base font-medium text-white px-6 py-4 text-left'
										>
											Vai trò
										</th>
										<th
											scope='col'
											className='text-base font-medium text-white px-6 py-4 text-left'
										>
											Tình trạng
										</th>
										<th
											scope='col'
											className='text-sm font-medium text-white px-6 py-4 text-center'
										>
											Xử lý
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
														<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap w-1/3'>
															<div className='h-10 bg-gray-200 rounded col-span-1'></div>
														</td>
														<td className='text-sm text-gray-900 font-light py-2 whitespace-nowrap w-1/5'>
															<div className='h-10 bg-gray-200 rounded col-span-1'></div>
														</td>
													</tr>
												))
										: userList?.map((e, i) => (
												<tr
													className='bg-white border-b hover:bg-gray-100'
													key={i}
												>
													<td className='px-6 py-4 whitespace-nowrap text-base font-base text-gray-900'>
														{i + 5 * pageIndex - 4}
													</td>
													<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/3'>
														{e.name}
													</td>
													<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/3'>
														{e.email}
													</td>
													<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/5'>
														{e?.userTypeId === 1
															? 'Học Sinh'
															: e?.userTypeId === 2
															? 'Giáo Viên'
															: 'Quản Trị Viên'}
													</td>
													<td className='text-base text-gray-900 font-base px-6 py-4 whitespace-nowrap w-1/5'>
														{e?.isDeleted === 1
															? 'Đã khóa'
															: 'Hoạt động'}
													</td>
													<td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
														{e?.userTypeId !== 3 && (
															<div className='flex items-center justify-center space-x-4'>
																<button
																	className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-green-700 hover:border-green-500 rounded-lg'
																	onClick={() => {
																		setUserEdit(e);
																		setEditPopup(true);
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
																			d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
																		/>
																	</svg>
																</button>
																<button
																	className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-red-700 hover:border-red-500 rounded-lg'
																	type='button'
																	onClick={() => {
																		setUserDelete(e.id);
																		setDeleteIndex(
																			userList.findIndex(
																				(user) =>
																					user.id === e.id
																			)
																		);
																		setConfirmDeleteState(true);
																	}}
																>
																	{e?.isDeleted === 1 ? (
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
																				d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
																			/>
																		</svg>
																	) : (
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
																				d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
																			/>
																		</svg>
																	)}
																</button>
															</div>
														)}
													</td>
												</tr>
										  ))}
								</tbody>
							</table>
							{/* <div className="flex items-center justify-center">
                                <a
                                    href="#top"
                                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <svg
                                        className="mr-2 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    Previous
                                </a>
                                <a
                                    href="#top"
                                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-blue-400 bg-white rounded border border-blue-400 hover:bg-blue-400 hover:text-white"
                                >
                                    1
                                </a>
                                <a
                                    href="#top"
                                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    2
                                </a>
                                <a
                                    href="#top"
                                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Next
                                    <svg
                                        className="ml-2 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </div> */}
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
											!userList || userList.length === 0
												? 'text-gray-400'
												: 'cursor-pointer hover:border-gray-800'
										} border-2 rounded-full p-1 ml-2`}
										onClick={() => {
											if (userList && userList.length != 0)
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
				</div>
			</div>
			{editPopup && (
				<Modal
					isOpen={editPopup}
					style={customStyles}
					contentLabel='Modal'
					ariaHideApp={false}
				>
					<EditUser userEdit={userEdit} setEditPopup={setEditPopup} />
				</Modal>
			)}
			{confirmDeleteState ? (
				<div className=''>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
									<span className='text-xl font-bold'>Thông báo</span>
									<NavLink to='/admin/users'>
										<button
											className='p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
											onClick={() => {
												setUserDelete(null);
												setConfirmDeleteState(false);
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
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</button>
									</NavLink>
								</div>
								<div className='relative px-6 flex-auto'>
									<p className='my-4 text-slate-500 text-lg leading-relaxed'>
										Bạn có chắc chắn muốn{' '}
										{userList[deleteIndex]?.isDeleted === 1
											? 'mở khóa'
											: 'khóa'}{' '}
										tài khoản này chứ?
									</p>
								</div>
								<div className='flex items-center justify-center border-t border-solid border-slate-200 rounded-b'>
									<NavLink to='/admin/users'>
										<button
											className='bg-transparent text-red-500 font-bold text-xl px-6 py-3 rounded outline-none'
											type='button'
											onClick={() => {
												handleChangeUserState(userDelete);
												setConfirmDeleteState(false);
											}}
										>
											Có
										</button>
									</NavLink>
									<NavLink to='/admin/users'>
										<button
											className='bg-transparent text-gray-500 font-bold text-xl px-6 py-3 rounded outline-none'
											type='button'
											onClick={() => {
												setUserDelete(null);
												setConfirmDeleteState(false);
											}}
										>
											Không
										</button>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</div>
			) : null}

			{pdf && (
				<a href={pdf} download>
					Click to download
				</a>
			)}
		</div>
	);
}

export default UserList;
