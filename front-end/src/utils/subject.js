const subject = (id) => {
	id = parseInt(id);

	switch (id) {
		case 1:
			return 'Toán';
		case 2:
			return 'Anh Văn';
		case 3:
			return 'Vật Lý';
		case 4:
			return 'Hóa Học';
		case 5:
			return 'Sinh Học';
		case 6:
			return 'Lịch Sử';
		case 7:
			return 'Địa Lý';
		case 8:
			return 'Giáo Dục Công Dân';
		default:
			return;
	}
};

export { subject };
