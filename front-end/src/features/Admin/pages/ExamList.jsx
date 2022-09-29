import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import ManageBody from '../components/ManageBody';

function ExamList() {
	const navigate = useNavigate();
	const teacher = useSelector((state) => state.user);
	const [examList, setExamList] = useState();

	const [searchParams, setSearchParams] = useSearchParams();
	const pageParam = searchParams.get('page');

	const [pageIndex, setPageIndex] = useState(pageParam || 1);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		const fetchExam = async () => {
			try {
				const pageParam = searchParams.get('page');
				const url = `${process.env.REACT_APP_API_URL}/admin/examlist${
					pageParam ? `?page=${pageParam}` : ''
				}`;

				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res) {
					console.log(res);
					setExamList(res.data);
					setLoading(false);
				}
			} catch (error) {
				console.log('Failed to fetch exam:', error);
			}
		};
		fetchExam();
	}, [pageIndex]);

	const handleDeleteExam = (examId) => {
		const idxExam = examList.findIndex((e) => e.id === examId);
		const newExamList = [...examList];
		newExamList.splice(idxExam, 1);
		setExamList([...newExamList]);
	};

	const handlePaging = (page) => {
		if (page < 1) return;
		navigate({
			pathname: '/admin/exams',
			search: createSearchParams({
				page: page,
			}).toString(),
		});
		setPageIndex(page);
	};
	return (
		<div className='w-full'>
			<ManageBody
				examList={examList}
				handleDeleteExam={handleDeleteExam}
				pageIndex={pageIndex}
				handlePaging={handlePaging}
				loading={loading}
			/>
		</div>
	);
}

export default ExamList;
