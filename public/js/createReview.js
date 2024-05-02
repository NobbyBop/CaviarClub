function checkString(string) {
  if (string === undefined) throw new Error("Nothing!");
  if (typeof string !== "string")
      throw new Error("Non-string!");
  string = string.trim();
  if (string.length <= 0)
      throw new Error("Input cannot be empty!");
  return string;
}

function checkRating(rating) {
  if (rating === undefined) throw new Error("Nothing passed into checkRating");
  if (typeof rating !== "number")
      throw new Error("Non-number passed into checkRating");
  if (!(0 <= rating) && !(rating <= 5))
      throw new Error("Rating must be a number from 0 to 5");
  if (!Number.isInteger(rating)) {
      if (rating.toString().split(".")[1].length > 1)
          throw new Error("Rating must have no more than 1 decimal place.");
  }
}

function checkImage(str) {
  // Pictures are allowed to not exist, or not be provided into the function.
  if (str === undefined) return undefined;
  if (typeof str !== "string") throw new Error("Image must be represented as a string.");
  str = str.trim();
  // If the picture doesn't exist, that is fine.
  if (str.length === 0) return undefined;
  try {
      const binaryData = atob(str);
      if (!binaryData.startsWith('\x89PNG\r\n\x1a\n')) throw new Error("Image must be a PNG!");
      return str;
  } catch (e) {
      throw new Error("Image must be a PNG!");
  }
}



$('#create-review-form').submit(function(event) {
  event.preventDefault(); // Prevent the form from submitting initially

  $('#errors').empty();
  let err_count = 0;

  let t = $('#title').val().trim();
  let r = $('#rating').val().trim();
  let c = $('#content').val().trim();
  let i = $('#image')[0].files[0];

  try {
      t = checkString(t);
  } catch (e) {
      err_count++;
      $('#errors').append(`<p>Title: ${e.message}</p>`);
  }

  try {
      r = checkRating(parseFloat(r)); // Parse the rating to float
  } catch (e) {
      err_count++;
      $('#errors').append(`<p>Rating: ${e.message}</p>`);
  }

  try {
      c = checkString(c);
  } catch (e) {
      err_count++;
      $('#errors').append(`<p>Review: ${e.message}</p>`);
  }

  // Check if an image file is selected
  if (i) {
      // Read the selected image file and convert it to base64
      if (i.size > 1000000) {
          err_count++;
          $('#errors').append(`<p>Picture: Max image size is 10 MB.</p>`);
      } else {
          const reader = new FileReader();
          reader.onload = function(event) {
              let base64Image = event.target.result.split(',')[1]; // Remove data URL prefix
              try {
                  base64Image = checkImage(base64Image);
                  $('#imageBase64').val(base64Image);
                  if (err_count > 0) {
                    $('#title').focus();
                  } else {
                      $('#create-review-form')[0].submit();
                  }
              } catch (e) {
                  err_count++;
                  $('#errors').append(`<p>Review: ${e.message}</p>`);
              }
          };
          reader.readAsDataURL(i); // Read the image file as data URL
      }
  } else {
      if (err_count > 0) {
          $('#title').focus();
      } else {
          $('#create-review-form')[0].submit();
      }
  }
  // Prevent form submission if there are errors
  if (err_count > 0) {
      $('#title').focus();
      return false;
  }
});