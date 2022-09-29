import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function ChangePass() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required('Hãy nhập Mật khẩu hiện tại')
			.min(6, 'Mật khẩu phải hơn 6 kí tự'),
		newPassword: Yup.string()
			.required('Hãy nhập Mật khẩu mới')
			.min(6, 'Mật khẩu phải hơn 6 kí tự')
			.notOneOf([Yup.ref('password')], 'Mật khẩu mới phải khác mật khẩu cũ'),
		confirmNewPassword: Yup.string()
			.required('Hãy nhập Mật khẩu mới để xác nhận')
			.oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm(formOptions);
	const onSubmit = (data) => {
		setLoading(true);
		const handleRegister = async () => {
			try {
				const token = localStorage.getItem('TOKEN');

				const res = await axios.put(
					`${process.env.REACT_APP_API_URL}/auth/changepassword`,
					data,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (res.data) {
					setLoading(false);
					navigate(-1);
				}
			} catch (error) {
				setLoading(false);
				setError('Sai mật khẩu cũ');

				console.log('Failed to change password:', error);
			}
		};
		handleRegister();
	};

	return (
		<div>
			<div className='mx-auto rounded-lg shadow-lg mt-12 max-w-lg'>
				<div className='w-full text-center uppercase text-white py-1 rounded-t-lg bg-green-500'>
					Đổi mật khẩu
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='bg-white shadow-md rounded-b-lg px-6 pt-3 pb-4 mb-2'
				>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'
						>
							Mật khẩu cũ
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
							htmlFor='newPassword'
						>
							Mật khẩu mới
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
							name='newPassword'
							type='password'
							{...register('newPassword', { required: true })}
						/>
						<ErrorMessage
							errors={errors}
							name='newPassword'
							render={() => (
								<span className='text-sm bg-red-200 mb-3 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.newPassword?.message}
								</span>
							)}
						/>
					</div>
					<div className='mb-2'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='confirmNewPassword'
						>
							Xác nhập mật khẩu mới
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
							name='confirmNewPassword'
							type='password'
							{...register('confirmNewPassword', { required: true })}
						/>
						<ErrorMessage
							errors={errors}
							name='confirmNewPassword'
							render={() => (
								<span className='text-sm bg-red-200 mb-3 py-1 px-2 rounded text-red-900 font-semibold'>
									{errors.confirmNewPassword?.message}
								</span>
							)}
						/>
					</div>

					<div className='flex items-center justify-center'>
						<button
							className='bg-green-500 text-white font-bold px-2 py-1  rounded focus:outline-none focus:shadow-outline relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:border-2 before:border-transparent before:tranform hover:before:scale-x-110 hover:before:scale-y-125
                            before:transition before:ease-out hover:before:border-yellow-500'
							type='submit'
						>
							Đổi mật khẩu
						</button>
					</div>
					{error && (
						<span className='inline-block w-full text-center text-sm bg-red-200 mb-3 py-1 px-2 rounded text-red-900 font-semibold'>
							{error}
						</span>
					)}
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

export default ChangePass;
