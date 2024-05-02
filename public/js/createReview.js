function checkRating(rating) {
    if (rating === undefined) throw new Error("Nothing passed into checkRating")
    if (typeof rating !== "number")
      throw new Error("Non-number passed into checkRating")
    if (!(0 <= rating) && !(rating <= 5))
      throw new Error("Rating must be a number from 0 to 5")
    if (!Number.isInteger(rating)) {
      if (rating.toString().split(".")[1].length > 1)
        throw new Error("Rating must have no more than 1 decimal place.")
    }
  }
function checkString(string) {
    if (string === undefined) throw new Error("Nothing!")
    if (typeof string !== "string")
      throw new Error("Non-string!")
    string = string.trim();
    if (string.length <= 0)
      throw new Error("Input cannot be empty!")
    return string;
  }

  $('#create-review-form').submit((event) => {
    $('#errors').empty()
    let err_count = 0
    let t = $('#title').val().trim()
    let r = $('#rating').val().trim()
    let c = $('#content').val().trim()
    let i = $('#image')[0].files[0]

    try {
        t = checkString(t);
    } catch (e) {
        err_count++;
        $('#errors').append(`<p>Title: ${e.message}</p>`)
    }
    try {
        r = checkRating(parseFloat(r)); // Parse the rating to float
    } catch (e) {
        err_count++;
        $('#errors').append(`<p>Rating: ${e.message}</p>`)
    }
    try {
        c = checkString(c);
    } catch (e) {
        err_count++;
        $('#errors').append(`<p>Review: ${e.message}</p>`)
    }
    if(i){
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result.split(',')[1]; 
            base64Image = checkImage(base64Image)
            $('#imageBase64').val(base64Image)
        };
        reader.readAsDataURL(i)
    } else {
        $('#imageBase64').val(undefined)
    }

    if (err_count > 0) {
        $('#title').focus()
        event.preventDefault()
    }
})