export const convertTime = (time: number | undefined) => {
	if (time !== undefined) {
		const hours = Math.trunc(time / 3600);
		const minutes = Math.trunc((time - (hours * 3600)) / 60);
		const seconds = Math.trunc(time - (minutes * 60) - (hours * 3600));

		const hoursString = hours !== 0 ? `${hours < 10 ? `0${hours}` : hours}:` : '';
		const minutesString = `${minutes < 10 ? `0${minutes}` : minutes}:`;
		const secondsString = `${seconds < 10 ? `0${seconds}` : seconds}`;

		return hoursString + minutesString + secondsString;
	}

	return '';
};