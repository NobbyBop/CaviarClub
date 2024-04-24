function checkEmail(email) {
    if (email === undefined) throw "Nothing passed into checkEmail"
    if (typeof email !== "string")
        throw new "Non-string passed into checkEmail"
    email = email.trim();
    if (email.length === 0) throw "Empty email!"
    if (!/^[\w\.-]+@[\w\.-]+\.(com|edu|gov|net|org)$/.test(email)) throw "Invalid email!"
    return email;
}
const checkPass = (str) => {
    if(str===undefined) throw "Password not provided!"
    if(typeof str !== "string") throw "Password not a string!"
    str=str.trim()
    if(str.length === 0) throw "Password not provided!"
    if(!/^(?!.*\s)(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(str)) throw "Password does not meet requirements!"
    return str
}

const checkUser = (str) => {
    if(str===undefined) throw "Userame not provided!"
    if(typeof str !== "string") throw "Username not a string!"
    str=str.trim()
    if(str.length === 0) throw "Username not provided!"
    if(str.length < 5 || str.length > 10) throw "Username must be between 5 and 10 characters!"
    return str.toLowerCase()
}

$('#signup-form').submit((event) => {
    $('#errors').empty()
    let err_count = 0
    let u = $('#username').val().trim()
    let p = $('#password').val().trim()
    let cp = $('#confirmPassword').val().trim()
    let e = $('#email').val().trim()
    
    try{
        u = checkUser(u)
    }catch(e){
        err_count++
        $('#errors').append(`<p>${e}</p>`)
    }
    try{
        p = checkPass(p)
    }catch(e){
        err_count++
        $('#errors').append(`<p>${e}</p>`)
    }
    if(cp !== p){
        err_count++
        $('#errors').append(`<p>Password and Confirm Password must match!</p>`)
    }
    try{
        e = checkEmail(e)
    }catch(e){
        err_count++
        $('#errors').append(`<p>${e}</p>`)
    }
    

    if(err_count > 0){
        $('#username').focus()
        event.preventDefault()
    }
})