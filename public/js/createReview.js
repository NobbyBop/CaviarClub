function checkString(string) {
    if (string === undefined) throw new Error("Nothing!");
    if (typeof string !== "string")
        throw new Error("Non-string!");
    string = filterXSS(string.trim());
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
  
  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/load_event
  function checkImage(file) {
      return new Promise((resolve, reject) => {
          if (!file) {
              resolve(undefined); // Return undefined if no file is provided
              return;
          }
          if (!file.type.startsWith('image/png')) {
              reject(new Error("Image must be a PNG!"));
              return;
          }
          if (file.size > 10000000) {
              reject(new Error("Max image size is 10 MB."));
              return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
              const base64Image = reader.result.split(',')[1]; // Extract base64 string
              resolve(base64Image);
          };
          reader.onerror = error => reject(error);
      });
  }
  
  
  
  
  $('#create-review-form').submit(async function(event) {
      event.preventDefault(); // Prevent the form from submitting initially
  
      $('#errors').empty();
      let err_count = 0;
  
      let t = filterXSS($('#title').val().trim());
      let r = filterXSS($('#rating').val().trim());
      let c = filterXSS($('#content').val().trim());
      let i = $('#image')[0].files[0]
  
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
          try {
              const base64Image = await checkImage(i);
              $('#imageBase64').val(filterXSS(base64Image));
          } catch (e) {
              err_count++;
              $('#errors').append(`<p>Picture: ${e.message}</p>`);
          }
      }
  
      // Submit the form if there are no errors
      if (err_count === 0) {
          $('#create-review-form')[0].submit();
      }
  });
  