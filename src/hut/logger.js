class Logger {
	log (message) {
		const currentTime = new Date();
		const time = [
			currentTime.getHours(),
			currentTime.getMinutes(),
			currentTime.getSeconds(),
		].join(':');
		console.log(time, message);
	}
}

export default new Logger();