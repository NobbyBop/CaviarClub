$(document).ready(() => {
	$("#searchResults").hide();

	$("#searchDish").submit((e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const dishName = filterXSS(data.get("dishName").trim());
		const restaurantId = filterXSS(data.get("restaurantId"));

		if (dishName.length == 0) {
			alert("cannot search for an empty string.");
			return;
		}

		$("#selectDish").children().not(":first-child").remove();

		$.ajax({
			url: `/create/dish/`,
			method: "post",
			dataType: "json",
			data: {
				dishName,
				restaurantId,
			},
			success: (res) => {
				$("#searchResults").show();
				if (res.search) {
					for (const dish of res.searchResults) {
						const dishId = filterXSS(dish._id);
						const dishName = filterXSS(dish.name);
						$("#selectDish").append(
							`<option value="${dishId}">${dishName}</option>`
						);
					}
					$("#selectDish").append(`<option value="/">--add a dish--</option>`);
				} else {
					alert(filterXSS(res.message));
					$("#searchResults").hide();
				}
			},
		});
	});
	$("#searchResults").submit((e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const dishId = filterXSS(data.get("dishId"));

		if (dishId == "") {
			alert("you must select a dish to progress to the next page...");
			return;
		}
		if (dishId == "/") {
			window.location.href = "/create/dish/new/";
			return;
		}

		window.location.href = `/create/review/?dishId=${dishId}`;
	});
});
