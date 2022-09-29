import moment from 'moment';

export const parseDurationToTime = (duration) => {
	const takingTime = moment.utc(duration * 1000).format('HH:mm:ss');

	const arrDiff = takingTime.split(':');
	const hours = parseInt(arrDiff[0]);
	const minutes = parseInt(arrDiff[1]);
	const seconds = parseInt(arrDiff[2]);

	return (
		(hours === 0 ? '' : hours + ' giờ ') +
		(minutes === 0
			? hours > 0
				? ' '
				: ''
			: minutes < 10
			? minutes + ' phút '
			: minutes + ' phút ') +
		(seconds === 0 ? '' : seconds + ' giây')
	);
};
