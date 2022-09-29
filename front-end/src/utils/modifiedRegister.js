export const modifiedRegister = (data) => {
	return {
		username: data.username,
		password: data.password,
		user: {
			name: data.name,
			email: data.email,
			phone: data.phone,
			userTypeId: data.userTypeId,
		},
	};
};
