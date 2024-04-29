$(document).ready(() => {
	$("#searchResults").hide();
	$("#searchRestaurant").submit((e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const restaurantName = data.get("restaurantName").trim();

		if (restaurantName.length == 0) {
			alert("cannot search for an empty string.");
			return;
		}

		$("#selectRestaurant").children().not(":first-child").remove();

		$.ajax({
			url: `/create/restaurant/`,
			method: "post",
			dataType: "json",
			data: {
				restaurantName,
			},
			success: (res) => {
				if (res.search) {
					for (const restaurant of res.searchResults) {
						$("#selectRestaurant").append(
							`<option value="${restaurant._id}">${restaurant.name} - ${restaurant.address}</option>`
						);
					}
					$("#selectRestaurant").append(
						`<option value="/">--add a restaurant--</option>`
					);
					$("#searchResults").show();
				} else {
					alert(res.message);
					$("#searchResults").hide();
				}
			},
		});
	});
	$("#searchResults").submit((e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const restaurantId = data.get("restaurantId");

		if (restaurantId == "") {
			alert("you must select a restaurant to progress to the next page...");
			return;
		}
		if (restaurantId == "/") {
			window.location.href = "/create/restaurant/new/";
			return;
		}

		window.location.href = `/create/dish/?restaurantId=${restaurantId}`;
	});
});
