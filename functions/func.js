exports.handler = async () => {
	try {
		console.log('do something');
		return {
			statusCode: 200,
		};
	} catch (err) {
		return {
			statusCode: 500,
			err,
		};
	}
};
