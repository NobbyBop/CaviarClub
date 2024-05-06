$(document).ready(() => {
	$("#likeButton").click((e) => {
		if ($("#likeButton").hasClass("liked")) {
			$.ajax({
				method: "post",
				dataType: "json",
				data: {
					like: filterXSS("remove"),
				},
				success: (res) => {
					if (res.success) {
						$("#numLikes").text(`Number of likes: ${res.newLikes}`);
						$("#likeButton").removeClass("liked");
					} else {
						alert(filterXSS(res.message));
					}
				},
			});
		} else {
			$.ajax({
				method: "post",
				dataType: "json",
				data: {
					like: filterXSS("add"),
				},
				success: (res) => {
					if (res.success) {
						$("#numLikes").text(`Number of likes: ${res.newLikes}`);
						$("#likeButton").addClass("liked");
					} else {
						alert(filterXSS(res.message));
					}
				},
			});
		}
	});
	$("#commentForm").submit((e) => {
		const data = new FormData(e.target);

		if (filterXSS(data.get("comment")).trim().length == 0) {
			alert("Cannot submit empty comment!!");
			e.preventDefault();
		}
	});
});