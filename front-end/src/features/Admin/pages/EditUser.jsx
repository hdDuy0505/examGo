import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

function EditUser({ userEdit, setEditPopup }) {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [userInfoInput, setUserInfoInput] = useState(userEdit);

	const onSubmit = (data) => {
		data['id'] = userEdit.id;
		console.log(data);
		const editInfo = async () => {
			try {
				const token = localStorage.getItem('TOKEN');

				const res = await axios.put(
					`${process.env.REACT_APP_API_URL}/admin/edituser/${userEdit.id}`,
					data,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (res.data) {
					setEditPopup((cur) => !cur);
					navigate(0);
				}
			} catch (error) {
				console.log('Failed to edit user info:', error);
			}
		};
		editInfo();
	};

	const handleOnInputChange = (e) => {
		setUserInfoInput((prev) => {
			return {
				...prev,
				[e.target.id]: e.target.value,
			};
		});
	};
	const checkKeyDown = (e) => {
		if (e.code === 'Enter') e.preventDefault();
	};

	return (
		<div className='flex flex-col '>
			<span className='font-bold text-xl text-red-500'>Chỉnh sửa tài khoản</span>
			<form
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => checkKeyDown(e)}
				className=' bg-white py-8'
			>
				<div className='flex py-4 px-8'>
					<label htmlFor='name' className=' basis-[20%] font-semibold'>
						Tên:
					</label>
					<input
						id='name'
						name='name'
						className='basis-[80%] border px-2 py-1'
						value={userInfoInput.name}
						{...register('name')}
						onChange={(e) => handleOnInputChange(e)}
					/>
				</div>
				<div className='flex py-4 px-8'>
					<label htmlFor='email' className='basis-[20%] font-semibold'>
						Email:
					</label>
					<input
						id='email'
						name='email'
						className='basis-[80%] border px-2 py-1'
						value={userInfoInput.email}
						{...register('email')}
						onChange={(e) => handleOnInputChange(e)}
					/>
				</div>
				<div className='flex py-4 px-8'>
					<label htmlFor='phone' className='basis-[20%] font-semibold'>
						SĐT:
					</label>
					<input
						id='phone'
						name='phone'
						className='basis-[80%] border px-2 py-1'
						value={userInfoInput.phone}
						{...register('phone')}
						onChange={(e) => handleOnInputChange(e)}
					/>
				</div>
				{/* <div className="flex">
							<div className="flex py-4 px-8 basis-[50%]  justify-between">
								<label htmlFor="gender" className="font-semibold">
									Giới tính:
								</label>
								<select
									id="gender"
									name="gender"
									className="border px-2 py-1"
									value={userInfoInput.gender}
									onChange={(e) => handleOnInputChange(e)}
								>
									<option value={0}>Nữ</option>
									<option value={1}>Nam</option>
								</select>
							</div>
							<div className="flex py-4 px-8 basis-[50%]  justify-between">
								<label htmlFor="grade" className="font-semibold">
									Khối:
								</label>
								<select
									id="grade"
									name="grade"
									className="border px-2 py-1"
									value={userInfoInput.grade}
									onChange={(e) => handleOnInputChange(e)}
								>
									<option value={10}>10</option>
									<option value={11}>11</option>
									<option value={12}>12</option>
								</select>
							</div>
						</div> */}
				<div className='flex py-4 px-8'>
					<label htmlFor='address' className='basis-[20%] font-semibold'>
						Địa chỉ:
					</label>
					<input
						id='address'
						name='address'
						className='basis-[80%] border px-2 py-1'
						value={userInfoInput.address}
						{...register('address')}
						onChange={(e) => handleOnInputChange(e)}
					/>
				</div>
				{/* <div className="flex py-4 px-8">
							<label htmlFor="quote" className="basis-[20%] font-semibold">
								Mô tả:
							</label>
							<input
								id="quote"
								name="quote"
								className="basis-[80%] border px-2 py-1"
								value={userInfoInput.quote}
								onChange={(e) => handleOnInputChange(e)}
							/>
						</div> */}
				<div className='flex items-center justify-center space-x-4 pt-5'>
					{/*<NavLink to="/admin/users">*/}
					<button
						className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'
						type='submit'
					>
						Lưu thay đổi
					</button>
					{/*</NavLink>*/}
					<NavLink to='/admin/users'>
						<button
							className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'
							onClick={() => setEditPopup((cur) => !cur)}
						>
							Hủy
						</button>
					</NavLink>
				</div>
			</form>
		</div>
	);
}
export default EditUser;
