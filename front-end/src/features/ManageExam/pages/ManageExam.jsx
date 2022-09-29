import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import ManageBody from '../components/ManageBody';
import TeacherInfo from '../components/TeacherInfo';

function ManageExam() {
	const navigate = useNavigate();
	const teacher = useSelector((state) => state.user);
	const [examList, setExamList] = useState();

	const [searchParams, setSearchParams] = useSearchParams();
	const pageParam = searchParams.get('page');
	const [searchExam, setSearchExam] = useState();
	const [pageIndex, setPageIndex] = useState(pageParam || 1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const fetchExam = async () => {
			try {
				const pageParam = searchParams.get('page');
				const url = `${process.env.REACT_APP_API_URL}/manageexam${
					searchExam ? `?search=${searchExam}` : ''
				}${pageParam ? (searchExam ? `&page=${pageParam}` : `?page=${pageParam}`) : ''}`;

				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res) {
					setExamList(res.data);
					setLoading(false);
				}
			} catch (error) {
				console.log('Failed to fetch exam:', error);
			}
		};
		fetchExam();
	}, [pageIndex, searchExam]);

	const handleSearchExam = (search) => {
		setSearchExam(search);
	};

	const handleDeleteExam = async (examId) => {
		const idxExam = examList.findIndex((e) => e.id === examId);
		const newExamList = [...examList];
		newExamList.splice(idxExam, 1);
		setExamList([...newExamList]);

		try {
			const url = `${process.env.REACT_APP_API_URL}/manageexam/${examId}`;

			const token = localStorage.getItem('TOKEN');
			const res = await axios.delete(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(res.data);
		} catch (error) {
			console.log('Failed to delete exam:', error);
		}
	};

	const handlePaging = (page) => {
		if (page < 1) return;
		navigate({
			pathname: '/manageexam',
			search: createSearchParams({
				page: page,
			}).toString(),
		});
		setPageIndex(page);
	};

	return (
		<div className='flex h-full'>
			<TeacherInfo teacher={teacher} />
			<ManageBody
				examList={examList}
				handleSearchExam={handleSearchExam}
				handleDeleteExam={handleDeleteExam}
				pageIndex={pageIndex}
				handlePaging={handlePaging}
				loading={loading}
			/>
		</div>
	);
}

export default ManageExam;
