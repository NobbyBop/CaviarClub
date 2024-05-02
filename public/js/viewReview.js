$(document).ready(() => {
	$("#likeButton").click((e) => {
		if ($("#likeButton").hasClass("liked")) {
			$.ajax({
				method: "post",
				dataType: "json",
				data: {
					like: "remove",
				},
				success: (res) => {
					if (res.success) {
						$("#numLikes").text(`Number of likes: ${res.newLikes}`);
						$("#likeButton").removeClass("liked");
					} else {
						alert(res.message);
					}
				},
			});
		} else {
			$.ajax({
				method: "post",
				dataType: "json",
				data: {
					like: "add",
				},
				success: (res) => {
					if (res.success) {
						$("#numLikes").text(`Number of likes: ${res.newLikes}`);
						$("#likeButton").addClass("liked");
					} else {
						alert(res.message);
					}
				},
			});
		}
	});
});
