export const vInt = (num) => {
    if(num === undefined || typeof num !== "number" || Number.isNaN(num)){
        throw new Error("Not a number!")
    }
    if(num !== num.toFixed(0)) throw new Error("Not an integer!")
    return num
}

export const vStr = (str) => {
    if(str === undefined || typeof str !== "string" ||
    str.trim().length === 0){
        throw new Error("Invalid string.")
    }
    else {
        return str.trim()
    }
}

export const vId = (id) => {
    try {
        id = vStr(id)
    } catch(e){
        throw new Error("Error: Invalid object ID.")
    }
    if(!ObjectId.isValid(id)) throw new Error("Error: Invalid object ID.")
    return id
}