import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../../store/slices/userSlice';
import { modifiedRegister } from '../../../utils/modifiedRegister';

function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Hãy nhập Họ tên'),
		email: Yup.string().required('Hãy nhập Email'),
		phone: Yup.string().required('Hãy nhập Số điện thoại'),
		userTypeId: Yup.string().required(),
		username: Yup.string().required('Hãy nhập tên đăng nhập'),
		password: Yup.string().required('Hãy nhập mật khẩu').min(6, 'Mật khẩu phải hơn 6 kí tự'),
		confirmPassword: Yup.string()
			.required('Hãy nhập mật khẩu xác nhận')
			.oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm(formOptions);
	const onSubmit = (data) => {
		data = modifiedRegister(data);

		const handleRegister = async () => {
			try {
				setLoading(true);
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/auth/register`,
					data
				);

				if (res.data) {
					const handleLogin = async () => {
						try {
							const url = `${process.env.REACT_APP_API_URL}/auth/login`;
							const accountLogin = {
								username: data.username,
								password: data.password,
							};
							const res = await axios.post(url, accountLogin);

							if (res.data) {
								localStorage.setItem('TOKEN', res.data.token);
								// const cookies = new Cookies();

								// cookies.set("access_token", res.data.refreshToken, {
								// 	path: "/",
								// });

								const user = res.data;
								const action = login(user);
								dispatch(action);
								setTimeout(() => {
									setLoading(false);
								}, 600);
								navigate('/');
							} else {
							}
						} catch (error) {
							setTimeout(() => {
								setLoading(false);
							}, 600);
							console.log('Failed to login', error);
						}
					};
					handleLogin();
				} else {
				}
			} catch (error) {
				if (error.toString().includes('409')) setError('Tài khoản đã tồn tại');
				setTimeout(() => {
					setLoading(false);
				}, 600);
				console.log('Failed to register', error);
			}
		};
		handleRegister();
	};

	return (
		<div>
			<div className=' rounded-lg shadow-lg w-[300px] sm:w-[400px] md:w-[500px]'>
				<div className='w-full text-center uppercase text-white py-1 rounded-t-lg bg-blue-500'>
					Đăng ký
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='bg-white shadow-md rounded-b-lg px-6 pt-3 pb-4 mb-2'
				>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='name'
						>
							Họ tên
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							name='name'
							{...register('name', { required: true })}
							type='text'
						/>
						<ErrorMessage
							errors={errors}
							name='name'
							render={() => (
								<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.name?.message}
								</span>
							)}
						/>
					</div>
					<label className='block text-gray-700 text-sm font-bold mb-2 mr-2'>
						Vai trò
					</label>
					<div className='mb-2 text-center'>
						<div className='w-full mb-2 flex items-center justify-around'>
							<div className='flex items-center'>
								<label
									className='block text-gray-700 text-sm font-semibold  mr-2'
									htmlFor='userTypeId'
								>
									Học sinh
								</label>
								<input
									name='userTypeId'
									value='1'
									{...register('userTypeId', {
										required: true,
									})}
									type='radio'
								/>
							</div>
							<div className='flex items-center'>
								<label
									className='block text-gray-700 text-sm font-semibold  mr-2'
									htmlFor='userTypeId'
								>
									Giáo viên
								</label>
								<input
									name='userTypeId'
									value='2'
									{...register('userTypeId', {
										required: true,
									})}
									type='radio'
								/>
							</div>
						</div>
						<ErrorMessage
							errors={errors}
							name='userTypeId'
							render={() => (
								<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
									Hãy chọn Loại
								</span>
							)}
						/>
					</div>

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
						<ErrorMessage
							errors={errors}
							name='username'
							render={() => (
								<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.username?.message}
								</span>
							)}
						/>
					</div>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='email'
						>
							Email
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							name='email'
							{...register('email', { required: true })}
							type='text'
						/>
						<ErrorMessage
							errors={errors}
							name='email'
							render={() => (
								<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.email?.message}
								</span>
							)}
						/>
					</div>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='phone'
						>
							Số điện thoại
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							name='phone'
							{...register('phone', { required: true })}
							type='text'
						/>
						<ErrorMessage
							errors={errors}
							name='phone'
							render={() => (
								<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.phone?.message}
								</span>
							)}
						/>
					</div>
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
						<ErrorMessage
							errors={errors}
							name='password'
							render={() => (
								<span className='text-sm bg-red-200 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.password?.message}
								</span>
							)}
						/>
					</div>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='confirmPassword'
						>
							Xác nhận mật khẩu
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
							name='confirmPassword'
							type='password'
							{...register('confirmPassword', { required: true })}
						/>
						<ErrorMessage
							errors={errors}
							name='confirmPassword'
							render={() => (
								<span className='text-sm bg-red-200 mb-3 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.confirmPassword?.message}
								</span>
							)}
						/>
					</div>
					{error && (
						<span className='inline-block w-full text-center text-sm bg-red-200 mb-3 py-1 px-2 rounded text-red-900 font-semibold'>
							{error}
						</span>
					)}
					<div className='flex items-center justify-center'>
						<button
							className='bg-blue-500 text-white font-bold px-2 py-1  rounded focus:outline-none focus:shadow-outline relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:border-2 before:border-transparent before:tranform hover:before:scale-x-110 hover:before:scale-y-125
                            before:transition before:ease-out hover:before:border-yellow-500'
							type='submit'
						>
							Đăng ký
						</button>
					</div>
					<div className='flex justify-center'>
						{loading ? (
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
						) : null}
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
