import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';
import DropdownUser from './DropdownUser';

const Header = () => {
	const navigate = useNavigate();
	const [isMenu, setIsMenu] = useState(false);
	const [isDropdown, setIsDropdown] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [search, setSearch] = useState('');

	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('TOKEN');
		navigate('/');
		handleClickDropdownItem();
	};
	const handleClickDropdownItem = () => {
		setIsDropdown(!isDropdown);
	};

	return (
		<div
			style={{ fontFamily: 'Yanone Kaffeesatz' }}
			className="sticky top-0 bg-white z-50 flex flex-nowrap items-center justify-between  px-[10px] py-[15px] lg:px-[10px] xl:px-[75px] shadow-md"
		>
			<Link to="/">
				<img
					className="h-[25px] mb-[10px] md:h-[25px] lg:h-[30px]"
					src={window.location.origin + '/images/examgo_logo.png'}
					alt="logo"
				/>
			</Link>

			<div
				className={`${
					isMenu
						? 'bg-white absolute top-1 left-1/2 -translate-x-1/2 border p-10 w-4/5 shadow-lg'
						: 'hidden'
				} ${
					user ? 'flex flex-col-reverse' : ' '
				} md:shadow-none md:relative md:top-0 md:left-0 md:translate-x-0 md:border-none md:p-0 md:w-full md:flex md:flex-row md:flex-1 md:flex-nowrap md:items-center md:justify-between`}
			>
				<div className="flex flex-col-reverse md:flex-row md:flex-0.5 lg:flex-grow-0 md:items-center">
					<div className="mt-5 md:mt-0 text-lg sm:text-[20px] lg:text-xl md:mr-0 lg:mr-6">
						<ul className="md:list-none md:flex md:justify-start md:p-0 md:m-0 md:ml-[10px]">
							<li className="flex justify-center group relative cursor-pointer mx-[10px] py-2 md:py-0 lg:mx-[15px]">
								Đề thi
								<span className="absolute bottom-0 left-0 bg-blue-500 w-full h-1 opacity-0 group-hover:opacity-100 group-hover:transition-all"></span>
							</li>
							<li className="flex justify-center group relative cursor-pointer mx-[10px] py-2 md:py-0 lg:mx-[15px]">
								Giới thiệu
								<span className="absolute bottom-0 left-0 bg-blue-500 w-full h-1 opacity-0 group-hover:opacity-100 group-hover:transition-all"></span>
							</li>
							<li className="flex justify-center group relative cursor-pointer mx-[10px] py-2 md:py-0 lg:mx-[15px]">
								Khóa học
								<span className="absolute bottom-0 left-0 bg-blue-500 w-full h-1 opacity-0 group-hover:opacity-100 group-hover:transition-all"></span>
							</li>
						</ul>
					</div>
					<div className="flex flex-1 border boder-black rounded-full pl-3 lg:pl-3 xl:pl-5">
						<input
							className="w-full text-base md:w-28 md:text-sm lg:w-52 lg:text-base xl:w-80 outline-none border-0 font-sans"
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Tên đề thi ..."
						/>
						<IconButton
							color="primary"
							onClick={() =>
								navigate({
									pathname: '/exam',
									search: createSearchParams({
										search: search,
									}).toString(),
								})
							}
						>
							<SearchIcon />
						</IconButton>
					</div>
				</div>
				{user ? (
					<div className="relative flex items-center justify-between bg-[#E6FFE5] p-3 md:py-1 md:px-3 lg:p-3 rounded-3xl shadow-md mb-4 md:mb-0">
						<div className="flex items-center rounded-xl ">
							<img
								// src={user?.avatar}
								src="/images/avatar.jpg"
								alt="avatar"
								className="w-10 h-10 rounded-full mr-2"
							/>
						</div>
						<div className="flex flex-col w-24 md:w-24 lg:w-36 flex-1 ml-4 md:ml-1 lg:ml-3">
							<span className="font-semibold md:text-lg">{user?.name}</span>
							<span className="text-[18px] text-gray-600 md:text-base">
								{user?.userTypeId === 1
									? 'Học Sinh'
									: user?.userTypeId === 2
									? 'Giáo Viên'
									: 'Quản Trị Viên'}
							</span>
						</div>
						<div
							className="cursor-pointer ml-1 border border-black rounded-full"
							onClick={handleClickDropdownItem}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 "
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
						{isDropdown && (
							<DropdownUser
								handleLogout={handleLogout}
								handleClickItem={handleClickDropdownItem}
								userType={user?.userTypeId}
							/>
						)}
					</div>
				) : (
					<div className="flex justify-center mt-5 md:mt-0 md:justify-end">
						<button
							onClick={() => navigate('/auth/signin', { replace: true })}
							className="border border-yellow-400 mx-1 min-w-20 py-1 px-4 sm:px-8 text-lg sm:text-xl md:px-4 md:text-lg lg:px-8 lg:text-xl rounded-full text-center cursor-pointer transition-all hover:bg-yellow-300 hover:text-white hover:border-white hover:shadow-sm"
						>
							<span>Đăng nhập</span>
						</button>
						<button
							onClick={() => navigate('/auth/signup', { replace: true })}
							className="bg-blue-500 text-white mx-1 min-w-20 py-1 px-4 sm:px-8 text-lg sm:text-xl md:px-4 md:text-lg lg:px-8 lg:text-xl rounded-full text-center cursor-pointer transition-all hover:bg-blue-600 hover:shadow-sm"
						>
							<span>Đăng ký</span>
						</button>
					</div>
				)}
			</div>
			<div onClick={() => setIsMenu(!isMenu)} className="md:hidden cursor-pointer">
				<MenuIcon />
			</div>
		</div>
	);
};

Header.propTypes = {};

export default Header;
