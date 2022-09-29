import React from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherInfo({ teacher }) {
	const navigate = useNavigate();
	return (
		<div className="hidden lg:block flex-[0.2] py-10 px-6 border-r-2">
			<div className="flex flex-col items-center mb-8">
				<img
					className="rounded-full h-40 w-40 object-cover"
					src="/images/avatar.jpg"
					alt="avatar"
				/>
				<div className="flex flex-col text-center mt-4">
					<span className="font-bold">{teacher?.name}</span>
					<span className="text-base font-medium text-gray-600">Giáo viên</span>
				</div>
			</div>
			<div>
				<hr />
				<div className="mt-6">
					<div className="flex my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="none"
							viewBox="0 0 33 33"
						>
							<path
								fill="#000"
								d="m25.754 7.439-1.76 1.375-7.494 5.569-7.494-5.624-1.76-1.375a2.75 2.75 0 0 0-4.496 2.31V25.63a1.87 1.87 0 0 0 1.87 1.87h4.386V16.885l7.494 5.624 7.494-5.624V27.5h4.386a1.87 1.87 0 0 0 1.87-1.87V9.694a2.75 2.75 0 0 0-4.496-2.255Z"
							/>
						</svg>
						<span className="ml-3 text-[18px]">
							{teacher.email ? teacher.email : 'Chưa cập nhật'}
						</span>
					</div>
					<div className="flex my-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							fill="none"
							viewBox="0 0 33 33"
						>
							<path
								stroke="#000"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M14.512 8.58 9.86 3.21c-.536-.618-1.52-.615-2.142.009L3.893 7.05c-1.139 1.14-1.465 2.832-.806 4.19a40.16 40.16 0 0 0 18.646 18.672c1.356.659 3.047.333 4.186-.807l3.86-3.868c.626-.626.628-1.614.003-2.15l-5.39-4.627c-.563-.484-1.44-.421-2.004.145l-1.876 1.879a.636.636 0 0 1-.76.12 20.016 20.016 0 0 1-7.37-7.379.636.636 0 0 1 .12-.762l1.87-1.871c.567-.57.63-1.45.14-2.014v0Z"
							/>
						</svg>

						<span className="ml-3 text-[18px]">
							{teacher.phone ? teacher.phone : 'Chưa cập nhật'}
						</span>
					</div>
					<div className="flex my-3 mb-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="max-h-7 max-w-7 "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>

						<span className="ml-3 text-[18px]">
							{teacher.address ? teacher.address : 'Chưa cập nhật'}
						</span>
					</div>
					<hr />
					{/* <div className="flex my-3 mt-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							fill="none"
							viewBox="0 0 33 33"
						>
							<g clipPath="url(#a)">
								<path
									fill="#000"
									d="M12.506.302C10.41-.8 6.28 1.331 5.093 3.207c-.528.84-.49 1.445-.49 1.788v18.367L20.09 33l2.913-1.59V13.523L7.101 4.392c.853-1.074 2.773-2.384 4.212-1.858l14.165 7.576v19.926l2.92-1.593V8.518L12.506.302Z"
								/>
							</g>
							<defs>
								<clipPath id="a">
									<path fill="#fff" d="M0 0h33v33H0z" />
								</clipPath>
							</defs>
						</svg>
					</div>
					<div className="flex my-3 mb-6 mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="max-h-9 max-w-9"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path d="M12 14l9-5-9-5-9 5 9 5z" />
							<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
							/>
						</svg>
					</div> */}
				</div>
			</div>
			<hr />
			<div className="text-center mt-6">
				<button
					className="bg-orange-500 text-white py-1 px-4 rounded-xl shadow text-lg font-semibold"
					onClick={() => navigate('/user/edit')}
				>
					Sửa thông tin
				</button>
			</div>
		</div>
	);
}

export default TeacherInfo;
