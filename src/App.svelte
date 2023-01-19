<script>
  import { onMount } from 'svelte';
  import ValidateLetter from "./utils/valid_letter"
  import {validateWord, generateWord, getResult, readTextFile} from './utils/valid_word';

  let error = ""
  let winner;
  onMount( async () => {
    await readTextFile()
    winner = generateWord()
    console.log(winner);
  })
  
  let matrix;
  let results;
  function init_matrix(){
    matrix = new Array(6)
    results = new Array(6)
    for (let i = 0; i < 6; i++){
    matrix[i] = new Array(5)
    results[i] = new Array(5)
    for (let j = 0; j < 5; j++){
      matrix[i][j] = ""
      results[i][j] = 0
    }
  }
  }
  
  Object.seal(matrix)
  
  init_matrix()
  let currentRow = 0;
  let currentCol = 0;
  let ended = false;
  function type(e){
    if (ValidateLetter(e) && !ended){    
      if (currentCol <= 4 && currentRow <= 5){
        matrix[currentRow][currentCol] = e.key.toUpperCase()
        if (currentCol < 4) currentCol++;
      }
    } else{
      if (e.key == "Backspace" && currentCol > 0 && !ended) {
        matrix[currentRow][currentCol] = ""
        currentCol--;
      }else if (e.key == "Backspace" && currentCol != 0 && !ended){
        matrix[currentRow][currentCol] = ""
      } 
      if (e.key == "Enter" && !ended) {
        console.log(currentCol, currentRow)
        if (validateRow(currentRow)) {
          error = ""
          let word = matrix[currentRow].join("").toLowerCase()
          results[currentRow] = getResult(word, winner)
          if (winner == word){
            ended = true
            console.info("You won!")
            error = "You won!"
          } else {
            console.log(results[currentRow])
          }
          if (currentCol == 4 && currentRow == 5){
            console.log("End")
            console.info("You lost!")
            ended = true
          } else{
            currentRow++;
            currentCol = 0
          }
          
        } else {
          error = "Word does not exist"
        }
        
      }
    }
  }

  function validateRow(row){
    for(let i = 0; i < matrix[row].length; i++){
      if (matrix[row][i] === "") return false
    }
    return validateWord(matrix[row].join(''))
  }
</script>

<svelte:window on:keydown={type}></svelte:window>
<span>{error}</span>
<div class="board">
{#each matrix as row, i}
  {#each row as el, j}
  <div class={`square ${results[i][j] == 1 ? "half" : results[i][j] == 0 ? "" : "correct"}`} style="--bg-color:{i == currentRow && j == currentCol ? "lightgray" : "darkslategray"}; --text-color: --bg-color:{i == currentRow && j == currentCol ? "black" : "white"}">{el}</div>
  {/each}
{/each}
</div>

<style>
  .board{
    display: grid;
    width: 550px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    background-color: darkslategray;
    row-gap: 5px;
    column-gap: 20px;
  }
  .square{
    border: 2px solid white;
    text-align: center;
    color: white;
    min-height: 100px;
    width: 100px;
    line-height: 75px;
    align-items: center;
    vertical-align: middle;
    background-color: var(--bg-color);
  }

  .half{
    background-color: darkgoldenrod;
  }

  .correct{
    background-color: green;
  }

  .none{
    background-color: darkslategray;
  }

  span{
    background-color: yellow;
  }

  @keyframes rotate{
    from {
      transform: skewY(180deg);
    }
    to {
      transform: skewY(0deg)
    }
  }
</style>

