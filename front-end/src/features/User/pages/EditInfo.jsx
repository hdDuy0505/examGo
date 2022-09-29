import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { edit } from '../../../store/slices/userSlice';
// const userInfo = {
// 	name: 'Stone Worker',
// 	quote: 'Yêu hoa lá thích bổ củi',
// 	email: 'stoneworker123@gmail.com',
// 	phone: '03555777899',
// 	address: 'Phường Linh Trung, Thủ Đức, TP.HCM',
// 	grade: 12,
// 	gender: 1,
// };

function EditInfo(props) {
	const userInfo = useSelector((state) => state.user);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userInfoInput, setUserInfoInput] = useState(userInfo);
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		setLoading(true);
		const editInfo = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem('TOKEN');

				const res = await axios.put(`${process.env.REACT_APP_API_URL}/user`, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data) {
					setLoading(false);
					data = { ...userInfo, ...data };
					dispatch(edit({ ...data, token: token }));
					navigate(-1);
				}
			} catch (error) {
				setLoading(false);
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
		<div className="px-12 flex flex-col sm:text-[16px] bg-[#ECF0F4] py-6">
			<div className="flex justify-between w-full">
				<div className="flex flex-col basis-[30%]">
					<p className="font-bold text-red-400 mb-2">Sơ lược</p>
					<div className="rounded-lg shadow-lg p-8 bg-white">
						<div className="text-center mb-4">
							<div className="relative inline-flex justify-center">
								<img
									className="h-full rounded-full border-4"
									src="/images/avatar.jpg"
									height={150}
									width={150}
									alt="avatar"
								/>
								{/* <div className="absolute top-[10%] right-[5%] px-2 py-1 rounded-full bg-purple-400 border-2 border-black text-white">
									{userInfo.grade}
								</div> */}
								{/* <div className="absolute top-[80%] right-[5%] px-2 py-2 rounded-full bg-orange-400 border-2 border-black text-purple-800">
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
							<p className="font-bold text-2xl">{userInfo.name ?? 'Chưa cập nhật'}</p>
							{/* <p className="italic text-red-500">{userInfo.quote}</p> */}
						</div>
						<div>
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
								</svg>
								<span className="ml-8">{userInfo.email ?? 'Chưa cập nhật'}</span>
							</div>
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z" />
									<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
								</svg>
								<span className="ml-8">{userInfo.phone ?? 'Chưa cập nhật'}</span>
							</div>
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
								</svg>
								<span className="ml-8">{userInfo.address ?? 'Chưa cập nhật'}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col md:basis-[64%] md:min-h-full ">
					<p className="font-bold text-red-400 mb-2">Chỉnh sửa hồ sơ</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						onKeyDown={(e) => checkKeyDown(e)}
						className="rounded-lg shadow-lg bg-white py-8"
					>
						<div className="flex py-4 px-8">
							<label htmlFor="name" className="basis-[20%] font-semibold">
								Họ và tên:
							</label>
							<input
								id="name"
								name="name"
								className="basis-[80%] border px-2 py-1"
								value={userInfoInput.name}
								{...register('name')}
								onChange={(e) => handleOnInputChange(e)}
							/>
						</div>
						<div className="flex py-4 px-8">
							<label htmlFor="email" className="basis-[20%] font-semibold">
								Email
							</label>
							<input
								id="email"
								name="email"
								className="basis-[80%] border px-2 py-1"
								value={userInfoInput.email}
								{...register('email')}
								onChange={(e) => handleOnInputChange(e)}
							/>
						</div>
						<div className="flex py-4 px-8">
							<label htmlFor="phone" className="basis-[20%] font-semibold">
								Điện thoại:
							</label>
							<input
								id="phone"
								name="phone"
								className="basis-[80%] border px-2 py-1"
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
						<div className="flex py-4 px-8">
							<label htmlFor="address" className="basis-[20%] font-semibold">
								Địa chỉ:
							</label>
							<input
								id="address"
								name="address"
								className="basis-[80%] border px-2 py-1"
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
						<div className="flex justify-center">
							<button
								className="flex mt-2 px-4 py-2 rounded hover:bg-green-400 bg-green-500 text-white"
								type="submit"
							>
								Lưu thay đổi
							</button>
							<div
								className="flex ml-4 mt-2 px-4 py-2 rounded hover:bg-red-400 bg-red-500 text-white"
								onClick={() => {
									navigate(-1);
								}}
							>
								Hủy
							</div>
						</div>
						<div className="flex justify-center">
							{loading ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="animate-ping h-5 w-5 mt-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
									/>
								</svg>
							) : null}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default EditInfo;
