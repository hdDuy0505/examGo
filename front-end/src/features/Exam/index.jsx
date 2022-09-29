import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ExamDetail from './pages/ExamDetail';
import ExamList from './pages/ExamList';
import ExamResult from './pages/ExamResult';
import ExamResultDetail from './pages/ExamResutlDetail';
import TakeExam from './pages/TakeExam';

function ExamFeature(props) {
	return (
		<div className="min-h-[80vh]">
			<Routes>
				<Route path="/" element={<ExamList />} />
				<Route path=":examId" element={<ExamDetail />} />
				<Route path="take/:examId" element={<TakeExam />} />
				<Route path="result/:examId" element={<ExamResult />} />
				<Route path="resultdetail/" element={<ExamResultDetail />} />
			</Routes>
		</div>
	);
}

ExamFeature.propTypes = {};

export default ExamFeature;
