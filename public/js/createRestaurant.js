$(document).ready(() => {
	$("#searchResults").hide();
	$("#searchRestaurant").submit((e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const restaurantName = filterXSS(data.get("restaurantName").trim());

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
						const sanitizedId = filterXSS(restaurant._id);
						const sanitizedName = filterXSS(restaurant.name);
						const sanitizedAddress = filterXSS(restaurant.address);
						$("#selectRestaurant").append(
							`<option value="${sanitizedId}">${sanitizedName} - ${sanitizedAddress}</option>`
						);
					}
					$("#selectRestaurant").append(
						`<option value="/">--add a restaurant--</option>`
					);
					$("#searchResults").show();
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

		const restaurantId = filterXSS(data.get("restaurantId"));

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
