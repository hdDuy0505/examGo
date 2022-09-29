import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import EditExamForm from '../components/EditExamForm';

function EditExam() {
	const [exam, setExam] = useState();
	const { examId } = useParams();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchExam = async () => {
			setLoading(true);
			try {
				const url = `${process.env.REACT_APP_API_URL}/manageexam/${examId}`;
				const token = localStorage.getItem('TOKEN');
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data) {
					setExam(res.data);
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
				console.log('Failed to fetch exam:', error);
			}
		};
		fetchExam();
	}, [examId]);

	return (
		<div className="p-5">
			{loading ? <Loading /> : <EditExamForm examId={examId} exam={exam} />}
		</div>
	);
}

export default EditExam;
