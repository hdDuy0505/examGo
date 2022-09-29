import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/slices/userSlice';

function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const onSubmit = (data) => {
		setLoading(true);
		const handleLogin = async () => {
			try {
				const url = `${process.env.REACT_APP_API_URL}/auth/login`;
				const res = await axios.post(url, data);
				//const res = await authApi.login(data);

				if (res.data) {
					localStorage.setItem('TOKEN', res.data.token);

					const user = res.data;
					const action = login(user);
					setTimeout(() => {
						dispatch(action);
						setLoading(false);
						navigate('/');
					}, 600);
				} else {
				}
			} catch (error) {
				if (error.toString().includes('400')) {
					setTimeout(() => {
						setLoading(false);
						setError('Sai tên đăng nhập hoặc mật khẩu');
					}, 600);
				} else if (error.toString().includes('403')) {
					setTimeout(() => {
						setLoading(false);
						setError('Tài khoản đã bị khóa bởi Admin');
					}, 600);
				}
			}
		};
		handleLogin();
	};

	return (
		<div>
			<div className='rounded-lg shadow-lg w-[300px] sm:w-[400px] md:w-[500px]'>
				<div className='w-full text-center uppercase text-white py-1 rounded-t-lg bg-orange-500'>
					Đăng nhập
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='bg-white shadow-md rounded-b-lg px-6 pt-3 pb-4 mb-2'
				>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='username'
						>
							Tên đăng nhập
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							name='username'
							{...register('username', { required: true })}
							type='text'
						/>
					</div>
					<ErrorMessage
						errors={errors}
						name='username'
						render={() => (
							<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
								Hãy nhập tên đăng nhập.
							</span>
						)}
					/>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'
						>
							Mật khẩu
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
							name='password'
							type='password'
							{...register('password', { required: true })}
						/>
					</div>
					<ErrorMessage
						errors={errors}
						name='password'
						render={() => (
							<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
								Hãy nhập mật khẩu
							</span>
						)}
					/>
					{error && (
						<span className='inline-block w-full text-center text-sm bg-red-200 mb-3 py-1 px-2 rounded text-red-900 font-semibold'>
							{error}
						</span>
					)}
					<div className='flex items-center justify-center'>
						<button
							className='bg-orange-500 text-white font-bold px-2 py-1  rounded focus:outline-none focus:shadow-outline relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:border-2 before:border-transparent before:tranform hover:before:scale-x-110 hover:before:scale-y-125 before:transition before:ease-out hover:before:border-yellow-500'
							type='submit'
						>
							Đăng Nhập
						</button>
					</div>
					<div className='flex justify-center'>
						{loading && (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='animate-ping h-5 w-5 mt-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
								/>
							</svg>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
