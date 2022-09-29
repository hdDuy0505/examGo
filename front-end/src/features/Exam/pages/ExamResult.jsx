import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import ViewResult from '../components/ViewResult';

function ExamResult() {
	const { examId } = useParams();
	const [examReview, setExamReview] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleGetResult = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem('TOKEN');

				const url = `${process.env.REACT_APP_API_URL}/exam/result/${examId}`;
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data) {
					console.log(res.data);
					setExamReview(res.data);
					setLoading(false);
				}
			} catch (error) {
				console.log('Failed to fetch exam result:', error);
			}
		};
		handleGetResult();
	}, [examId]);

	return (
		<div>
			<section className="w-full min-h-[76.5vh]">
				{loading ? <Loading /> : <ViewResult examReview={examReview} />}
			</section>
		</div>
	);
}

export default ExamResult;
