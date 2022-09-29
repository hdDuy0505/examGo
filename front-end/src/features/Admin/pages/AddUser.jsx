import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function AddUser() {
	const [showSaveState, setShowSaveState] = useState(false);
	return (
		<div className='flex flex-col min-w-[40%] ml-72 mt-4'>
			<span className='font-bold text-xl text-red-500'>Thêm tài khoản</span>
			<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300'>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-lg font-semibold mb-2'
						htmlFor='name'
					>
						Họ và tên
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='name'
						type='text'
						placeholder='Nhập họ và tên'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-lg font-semibold mb-2'
						htmlFor='email'
					>
						Email
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='text'
						placeholder='Nhập email'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-lg font-semibold mb-2'
						htmlFor='password'
					>
						Mật khẩu
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						placeholder='Nhập mật khẩu'
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700 text-lg font-semibold mb-2'>
						Vai trò
					</label>
					<div className='flex'>
						<div className='flex items-center form-check form-check-inline w-[50%]'>
							<input
								className='form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
								type='radio'
								name='role'
								id='student'
								value='student'
							/>
							<label
								className='form-check-label inline-block text-gray-800 align-top'
								htmlFor='student'
							>
								<span>Học sinh</span>
							</label>
						</div>
						<div className='flex items-center form-check form-check-inline w-[50%]'>
							<input
								className='form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
								type='radio'
								name='role'
								id='teacher'
								value='teacher'
							/>
							<label
								className='form-check-label inline-block text-gray-800'
								htmlFor='teacher'
							>
								<span>Giáo viên</span>
							</label>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center pt-5'>
					{/* <NavLink to="/admin/users"> */}
					<button
						className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'
						type='button'
						onClick={() => setShowSaveState(true)}
					>
						Thêm tài khoản
					</button>
					{/*</NavLink> */}
				</div>
			</form>
			{showSaveState ? (
				<div className=''>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
									<span className='text-xl font-bold'>Thông báo</span>
									<NavLink to='/admin/users'>
										<button
											className='p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
											onClick={() => setShowSaveState(false)}
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
										Đã thêm thành công tài khoản mới cho Nguyễn Văn C -
										nvc@yahoo.com
									</p>
								</div>
								<div className='flex items-center justify-center border-t border-solid border-slate-200 rounded-b'>
									<NavLink to='/admin/users'>
										<button
											className='bg-transparent text-red-500 font-bold uppercase text-xl px-6 py-3 rounded outline-none'
											type='button'
											onClick={() => setShowSaveState(false)}
										>
											OK
										</button>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</div>
			) : null}
		</div>
	);
}

export default AddUser;
