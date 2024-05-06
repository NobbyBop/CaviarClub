$('#sortForm').submit(function(event) {
    $('#errors').empty();
    let hasError = false;

    const selectedOption = filterXSS($('#sort').val());

    if (!["rating", "recent", "alphabetical"].includes(selectedOption)) {
        hasError = true;
        $('#errors').append('<p>Please select a sorting option.</p>');
    }

    if (hasError) {
        event.preventDefault();
    }
});