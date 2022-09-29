export const modifiedEditForm = (data, exam) => {
	const res = {
		...exam,
		name: data.name,
		maxDuration: data.maxDuration,
		subjectId: data.subjectId,
	};

	res.questionList = res.questionList.filter(Boolean);
	res.numOfQuestions = data.questionList.length;

	res.questionList.forEach((question) => {
		const questionData = data.questionList.find((e) => e.id == question.id);

		if (questionData) {
			question.answerList.forEach((a, i) => {
				a.content = questionData.answerListChange[i];
			});
			question.correctAnswerId = questionData.correctAnswerId;
		} else {
			question.examId = -1;
		}
	});

	const addQuestionList = data.questionList.filter((e) => e.id === -1);
	const addQuestion = addQuestionList.map((q) => ({
		content: q.content,
		correctAnswerId: q.correctAnswerId,
		answerList: Array(4)
			.fill()
			.map((a, i) => ({
				content: q.answerListChange[i],
			})),
	}));
	res.questionList.push(...addQuestion);

	return res;
};
