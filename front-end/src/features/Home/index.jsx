import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
function HomeFeature(props) {
	const navigate = useNavigate();
	return (
		<div className="home">
			<section className="bg-home h-60 bg-cover bg-no-repeat sm:h-80 md:h-[500px] lg:h-[700px] xl:h-[918px] lg:bg-cover flex justify-center items-center">
				<div className="text-center justify-center bg-gray-100 bg-opacity-60 rounded-3xl shadow-lg w-4/5 py-5 md:py-10 md:w-2/3 lg:w-1/2 ">
					<h1 className="text-lg text-red-500 font-bold sm:text-[30px] lg:text-[40px] md:mb-5">
						LUYỆN THI ĐẠI HỌC
					</h1>
					<p className="text-sm text-gray-700 px-5 font-medium md:text-lg md:px-10 lg:text-lg lg:px-22 xl:px-32">
						Đây là những giờ phút vô cùng quan trọng của cuộc đời, hãy tập trung ôn thi
						và đừng để bất cứ điều gì làm xao nhãng bạn nhé.
					</p>
				</div>
			</section>

			<div className="grid place-content-center my-6 sm:my-10">
				<h1 className="text-lg pl-2 text-center sm:text-left sm:text-xl sm:pl-10 md:pl-10 md:text-2xl lg:text-3xl font-bold text-green-800 mb-3">
					Đề thi theo môn học
				</h1>
				<div className="grid px-2 sm:px-0 grid-cols-1 sm:grid-cols-2 gap-3 place-items-center">
					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: '/exam',
								search: createSearchParams({
									subject: 1,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/math.jpg"
								alt="math"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl">
							Toán
						</h3>
					</div>
					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: 'exam',
								search: createSearchParams({
									subject: 2,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/english.jpg"
								alt="english"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl ">
							Tiếng Anh
						</h3>
					</div>
					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: 'exam',
								search: createSearchParams({
									subject: 3,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/physics.jpg"
								alt="physics"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl ">
							Vật Lý
						</h3>
					</div>
					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: 'exam',
								search: createSearchParams({
									subject: 4,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/chemistry.jpg"
								alt="chemistry"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl ">
							Hóa Học
						</h3>
					</div>
					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: 'exam',
								search: createSearchParams({
									subject: 5,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/biology.jpg"
								alt="biology"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl ">
							Sinh Học
						</h3>
					</div>
					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: 'exam',
								search: createSearchParams({
									subject: 6,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/history.jpg"
								alt="history"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl ">
							Lịch Sử
						</h3>
					</div>
					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: 'exam',
								search: createSearchParams({
									subject: 7,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/geography.jpg"
								alt="geography"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl">
							Địa Lý
						</h3>
					</div>

					<div
						className="border border-gray-300 cursor-pointer"
						onClick={() =>
							navigate({
								pathname: 'exam',
								search: createSearchParams({
									subject: 8,
									page: 1,
								}).toString(),
							})
						}
					>
						<div className=" overflow-hidden">
							<img
								className="object-cover w-96 h-48 sm:w-64 sm md:w-72 md:h-40 lg:w-96 lg:h-48 transform hover:scale-125 hover:transition-all duration-200"
								src="/images/civiceducation.jpg"
								alt="civic education"
							/>
						</div>
						<h3 className="text-center w-full py-3 text-sm sm:text-md md:text-xl ">
							Giáo Dục Công Dân
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

HomeFeature.propTypes = {};

export default HomeFeature;
