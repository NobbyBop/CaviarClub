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
	$("#commentForm").submit((e) => {
		const data = new FormData(e.target);

		if (data.get("comment").trim().length == 0) {
			alert("Cannot submit empty comment!!");
			e.preventDefault();
		}
	});
});
