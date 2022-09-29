const modifiedSubmitForm = (questionList, data, takingTime) => {
	const keys = Object.keys(data).sort();

	let arr = [];
	const n = keys.length / 2;
	for (let i = 0; i < n; i++) {
		const obj = {};
		obj['chosenAnswerId'] = data[keys[i]];
		obj['questionId'] = data[keys[n + i]];
		arr.push(obj);
	}

	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		if (questionList[i].correctAnswerId == arr[i].chosenAnswerId) count += 1;
	}

	return {
		studentExam: {
			duration: takingTime,
			point: (count / arr.length) * 10.0,
		},
		studentChoiceList: arr,
	};
};

export { modifiedSubmitForm };
