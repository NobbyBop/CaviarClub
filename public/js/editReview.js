$('#reviewFormDelete').submit((event) => {
    $('#errors').empty()
    let err_count = 0
    
    let r = filterXSS($('#reviewId').val().trim())
    let i = filterXSS($('#isDeleted').val().trim())

    if (r === "") {
        err_count++
        $('#errors').append(`<p>Silly Patrick, you can't edit hidden fields for reviewId!?</p>`)
    }

    if (i !== "yes" && i !== "no") {
        err_count++
        $('#errors').append(`<p>Silly Patrick, you can't edit hidden fields for isDeleted!?</p>`)
    }

    if(err_count > 0){
        event.preventDefault()
    }
});