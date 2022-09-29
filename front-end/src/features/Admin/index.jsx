import { NavLink, Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ExamList from './pages/ExamList';
import Statistics from './pages/Statistics';
import UserList from './pages/UserList';

// <li className="px-6 py-2 border-b border-gray-300 w-full hover:bg-gray-500 hover:text-white">
// 	<NavLink
// 		to="/admin"
// 		// style={({ isActive }) => (isActive ? activeStyle : undefined)}
// 	>
// 		Trang chủ
// 	</NavLink>
// </li>
function AdminFeature(props) {
	// let activeStyle = {
	//     textDecoration: "underline",
	// };
	return (
		<div className='flex'>
			<div className='h-screen min-w-[20%] max-w-[20%] bg-gray-100 pt-2 border border-gray-200'>
				<ul>
					<NavLink
						to=''
						className={({ isActive }) =>
							isActive ? 'block bg-blue-500 text-white' : 'font-xl'
						}
						end
					>
						<li className='flex text-xl items-center px-6 py-2 border-b border-gray-300 w-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 mr-2'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
							</svg>
							Thống kê
						</li>
					</NavLink>
					<NavLink
						to='users'
						className={({ isActive }) =>
							isActive ? 'block bg-blue-500 text-white' : 'font-xl'
						}
					>
						<li className='flex text-xl items-center px-6 py-2 border-b border-gray-300 w-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 mr-2'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
							</svg>
							Quản lý người dùng
						</li>
					</NavLink>
					<NavLink
						to='exams'
						className={({ isActive }) =>
							isActive ? 'block bg-blue-500 text-white' : 'font-xl'
						}
					>
						<li className='flex text-xl items-center px-6 py-2 border-b border-gray-300 w-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 mr-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
								/>
							</svg>
							Quản lý đề thi
						</li>
					</NavLink>
				</ul>
			</div>
			<Routes>
				<Route path='/' element={<Statistics />} />
				<Route path='/users/add' element={<AddUser />} />
				<Route path='/users/edit' element={<EditUser />} />
				<Route path='users' element={<UserList />} />
				<Route path='exams' element={<ExamList />} />
			</Routes>
		</div>
	);
}

AdminFeature.propTypes = {};

export default AdminFeature;
