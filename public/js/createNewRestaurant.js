$("form").submit((e) => {
	const data = new FormData(e.target);

	for (const pair of data.entries()) {
		const sanitizedValue = filterXSS(pair[1]);
		console.log([pair[0], sanitizedValue]);
		if (sanitizedValue.trim().length == 0) {
			e.preventDefault();
			alert("all fields must be filled out...");
			break;
		}
	}
});
