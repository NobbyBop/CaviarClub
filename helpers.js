export const vInt = (num) => {
    if(num === undefined || typeof num !== "number" || Number.isNaN(num)){
        throw new Error("Not a number!")
    }
    if(num !== num.toFixed(0)) throw new Error("Not an integer!")
    return num
}