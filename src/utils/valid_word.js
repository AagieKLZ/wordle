let lines = [];
async function readTextFile() {
    const response = await fetch('/valid-wordle-words.txt');
    const text = await response.text();
    lines = text.split('\n');
}

readTextFile()

function validateWord(word){
    console.log(word)
    for (let i = 0; i < lines.length; i++){
        if (word.toLowerCase() === lines[i].toLowerCase()) return true
    }
    console.warn("Word doesn't exist")
    return false
}

function generateWord(){
    return lines[Math.floor(Math.random() * lines.length)]
}

function getResult(word, winner){
    let result = new Array(5).fill(5)
    word = word.toLowerCase()
    winner = winner.toLowerCase()
    if (word == winner){
        result.fill(2)
        return result
    } else{
        for(let i = 0; i < result.length; i++){
            result[i] = word.charAt(i) == winner.charAt(i) ? 2 : 0
        }
        for (let i = 0; i < result.length; i++){
            for (let j = 0; j < result.length; j++){
                if (word.charAt(i) == winner.charAt(j) && i != j){
                    result[i] = 1
                }
            }
        }
    }
    return result
}

export { validateWord, generateWord, getResult, readTextFile}