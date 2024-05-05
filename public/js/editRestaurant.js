$('#form1').submit((event) => {
    $('#errors').empty()
    let err_count = 0

    let n = $('#name').val().trim()
    let a = $('#address').val().trim()
    let r = $('#restaurantId').val().trim()
    let i = $('#isDeleted').val().trim()

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
    
    let r = $('#restaurantId').val().trim()
    let i = $('#isDeleted').val().trim()

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