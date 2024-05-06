$('#form1').submit((event) => {
    $('#errors').empty()
    let err_count = 0

    let n = filterXSS($('#name').val().trim())
    let a = filterXSS($('#address').val().trim())
    let r = filterXSS($('#restaurantId').val().trim())
    let i = filterXSS($('#isDeleted').val().trim())

    if (n === "" && a === "") {
        err_count++
        $('#errors').append(`<p>No changes made!</p>`)
    }

    if (r === "") {
        err_count++
        $('#errors').append(`<p>Silly Patrick, you can't edit hidden fields for restaurantId!?</p>`)
    }

    if (i !== "yes" && i !== "no") {
        err_count++
        $('#errors').append(`<p>Silly Patrick, you can't edit hidden fields for isDeleted!?</p>`)
    }

    if(err_count > 0){
        $('#name').focus()
        event.preventDefault()
    }
});

$('#form2').submit((event) => {
    $('#errors').empty()
    let err_count = 0
    
    let r = filterXSS($('#restaurantId').val().trim())
    let i = filterXSS($('#isDeleted').val().trim())

    if (r === "") {
        err_count++
        $('#errors').append(`<p>Silly Patrick, you can't edit hidden fields for restaurantId!?</p>`)
    }

    if (i !== "yes" && i !== "no") {
        err_count++
        $('#errors').append(`<p>Silly Patrick, you can't edit hidden fields for isDeleted!?</p>`)
    }

    if(err_count > 0){
        event.preventDefault()
    }
});