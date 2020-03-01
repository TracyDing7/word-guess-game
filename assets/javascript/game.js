var userOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var computerOptions = ["buffalo", "cheetah", "elephant", "gazelle", "hippo", "leopard", "lion", "rhino", "zebra"];
var computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
// for verifying functionality
console.log("Computer choice: " + computerChoice);

var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var wordDisplay = document.getElementById("word-display");
var attemptsText = document.getElementById("guesses-left");
var guessesText = document.getElementById("already-guessed");
// setting up variables
var numWins = 0;
var numlosses = 0 ;
var attempts = 12;
attemptsText.textContent = attempts;
// this array will store the letters already guessed
var guesses = [];

// this array will store the hidden word
var hiddenWord = [];

// this array will hold the computer word to check for a win
var computerWord = [];

for (var i = 0; i < computerChoice.length; i++) {
    hiddenWord[i] = "-";
}
wordDisplay.textContent = hiddenWord.join("");

for (var i = 0; i < computerChoice.length; i++) {
    computerWord[i] = computerChoice[i];
}


document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();
   
    if ((userOptions.indexOf(letter) > -1) && (guesses.indexOf(letter) < 0)) {
        if (computerWord.indexOf(letter) > -1) {
            // replacing the "-" in the hidden word with the correct letter
            for (var i = 0; i < computerWord.length; i++) {
                if (letter == computerWord[i]) {
                    hiddenWord[i] = letter;
                   
                }
            }

            wordDisplay.textContent = hiddenWord.join("");
             
      } else {
        attempts -= 1;
        attemptsText.textContent = attempts;
      }
      // updating the guessed letters
      guesses.push( letter);
      guessesText.textContent = guesses;

      if (checkArrays(hiddenWord, computerWord)) {
        let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3');
        audio.play()
        numWins += 1;
        winsText.textContent = numWins;
         
        resetGame();
    }
    // conditions for a loss
    if (attempts === 0) {
        numlosses +=1;
        lossesText.textContent = numlosses;
        resetGame();
    }
 }
}

function resetGame() {
    console.log("------------------------------------------------");

    attempts = 12;
    attemptsText.textContent = attempts;

    guesses = [];
    guessesText.textContent = guesses;

    // picking a new word from the array
    computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    console.log("Computer choice: " + computerChoice);

    // resetting arrays for comparison
    hiddenWord = [];
    computerWord = [];

    for (var i = 0; i < computerChoice.length; i++) {
        hiddenWord.push("-");
    }
    wordDisplay.textContent = hiddenWord.join("");
    
    for (var i = 0; i < computerChoice.length; i++) {
        computerWord.push(computerChoice[i]);
    }    
}

// function to check if hiddenWord and computerWord are identical
function checkArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        } 
    }
    return true;
}