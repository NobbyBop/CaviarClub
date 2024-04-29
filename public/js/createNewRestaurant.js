$("form").submit((e) => {
	const data = new FormData(e.target);

	for (const pair of Object.entries(data)) {
		console.log(pair);
		if (pair[1].trim().length == 0) {
			e.preventDefault();
			alert("all fields must be filled out...");
			break;
		}
	}
});
