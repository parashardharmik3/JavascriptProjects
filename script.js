let data = randomword();
let incorrectGuessCount = 0;

function randomword() {
    const wordList = [{"dog" : "something walk and loyal"}, {"cat" : "chippi chippi chappa chappa"}, {"hangman" : "the thing u r playing right now"}, {"whiteboard" : "something on which u can write and draw"}, {"television" : "u can watch things"}, {"cycle" : "cheap travelling vehicle"}, {"speaker" : "so, u can hear loudly"}, {"frame" : "u can stick picture in in it"}, {"bedroom" : "a place to start the ur day and end"}, {"vscode" : "world's best ide"}];
    let randomObject = wordList[Math.floor(Math.random() * wordList.length)];
    let word = Object.keys(randomObject)[0];
    let hint = Object.values(randomObject)[0];
    return {word, hint};
}

const btns = document.querySelectorAll(".alp_btn");
const mans = document.querySelectorAll(".manbody");
const playbtn = document.querySelector(".playbtn");
const hintBtn = document.createElement("button");
hintBtn.innerText = "Hint";
hintBtn.style.display = "none";
hintBtn.classList.add("hintBtn");

playbtn.addEventListener('click', function () {
    data = randomword(); // Remove 'let' keyword here
    incorrectGuessCount = 0;
    let startdisplay = document.querySelector(".gameentry");
    startdisplay.style.display = "none";
    btns.forEach(btn => {
        btn.style.display = "block";
    });
    let output = document.querySelector(".displayword");
    output.innerHTML = ''; // Clear previous word display
    for (let i = 0; i < data.word.length; i++) {
        let input = document.createElement("input");
        input.setAttribute("readonly", true);
        input.setAttribute("class", "insertword");
        input.setAttribute("id", `id${i}`);
        output.appendChild(input);
        output.style.display = "flex";
        output.style.alignItems = "center";
        output.style.justifyContent = "center";
        output.style.flexWrap = "wrap";
        output.style.gap = "0.2rem";
    }
});

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const buttonText = btn.textContent;
        let wordArray = data.word.split("");
        let correctGuess = false;

        for (let i = 0; i < wordArray.length; i++) {
            if (buttonText === wordArray[i]) {
                document.querySelector(`#id${i}`).value = buttonText;
                correctGuess = true;
            }
        }

        if (!correctGuess) {
            incorrectGuessCount++;

            if (incorrectGuessCount <= mans.length) {
                mans[incorrectGuessCount - 1].style.display = "block";
            }

            if (incorrectGuessCount === 3) {
                hintBtn.style.display = "block";
            }

            if (incorrectGuessCount === mans.length) {
                alert("Game Over! The word was: " + data.word);
                resetGame();
            }
        } else if (wordGuessed()) {
            alert("Congratulations! You guessed the word: " + data.word);
            resetGame();
        }
    });
});

hintBtn.addEventListener('click', () => {
    alert("Hint: " + data.hint);
    hintBtn.style.display = "none";
});

function resetGame() {
    mans.forEach(man => {
        man.style.display = "none";
    });

    let output = document.querySelector(".displayword");
    output.innerHTML = '';

    btns.forEach(btn => {
        btn.style.display = "none";
    });

    hintBtn.style.display = "none";

    let startdisplay = document.querySelector(".gameentry");
    startdisplay.style.display = "flex";
}

function wordGuessed() {
    let wordArray = data.word.split("");
    for (let i = 0; i < wordArray.length; i++) {
        if (document.querySelector(`#id${i}`).value !== wordArray[i]) {
            return false;
        }
    }
    return true;
}

document.body.appendChild(hintBtn);
