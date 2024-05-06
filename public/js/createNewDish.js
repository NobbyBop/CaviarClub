$("form").submit((e) => {
	const data = new FormData(e.target);

	for (const pair of data.entries()) {
		const value = filterXSS(pair[1]);
		if (value.trim().length == 0) {
			e.preventDefault();
			alert("all fields must be filled out...");
			break;
		}
	}
});
