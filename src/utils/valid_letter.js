function validateLetter(e){
    return e.code.slice(0, 3).toLowerCase() === "key"
}

export default validateLetter