// mastermind v1.1 by Jason The

// ****************************************************************************
// helper functions
function generateBoard(ppname) {
    for (let i = 0; i < totalpegs; i++) {
        let pp = document.createElement("div");
        pp.setAttribute("class", ppname + i);
        pp.classList.add(ppname);
        document.getElementById(ppname).appendChild(pp);
        currentBoardPins.push(pp);
        pp.style.backgroundColor = "white";
    };
    // console.warn("generate board done");
};

// ****************************************************************************
// generatie van de div voor de secret code
function generateBoardSecret(secret) {
    for (let i = 0; i < pegCount; i++) {
        let pp = document.createElement("div");
        pp.id = secret + i
        document.getElementById(secret).appendChild(pp);
        currentBoardPins.push(pp);
    };
};
// ****************************************************************************
// definitiëring van huidige rij
function defineCurrentRow() {
    let currentp = document.querySelectorAll(".pegs");
    Array.from(currentp).slice(-pegCount).forEach(Element =>
        Element.classList.add(currentpegs));
    let currentpin = document.querySelectorAll(".pins");
    Array.from(currentpin).slice(-pegCount).forEach(Element =>
        Element.classList.add(currentpins));
};

// ****************************************************************************
// generatie van geheime code
function secretCode() {
    for (let i = 0; i < pegCount; i++) {
        let color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        console.log(document.getElementById("secret" + i));
        document.getElementById("secret" + i).classList.add(color);
    };
};

// ****************************************************************************
// doorgaan naar nieuwe rij
function changeRows() {
    currentrow--;
    const multiplier = pegCount;
    if (currentrow <= 0) {
        alert("player has lost");
    }
    const rowsliceStart = currentrow * multiplier - pegCount
    const rowsliceEnd = multiplier * currentrow
    function newrow(pp) {
        let newpp = document.getElementsByClassName(pp);
        Array.from(newpp).forEach(element =>
            element.classList.remove("current" + pp));
        Array.from(newpp).slice(rowsliceStart, rowsliceEnd).forEach(element =>
            element.classList.add("current" + pp))
        if (currentrow < 12) {
            let instructionsText = document.getElementById("instructionsText");
            instructionsText.style.display = "none";
        }
    }
    newrow(pegs.id);
    // console.log(pegs.id);
    newrow(pins.id);
}


// ****************************************************************************
//controle of de speler wint
function checkWin(pegnr) {
    let AllPegsCorrect = true;
    for (let i = 0; i < pegCount; i++) {
        let secretpeg = document.getElementById("secret" + i);
        let currentBoardPegs = document.querySelectorAll(".currentpegs");
        AllPegsCorrect = AllPegsCorrect && secretpeg.classList.contains(currentBoardPegs[i].style.backgroundColor)
    }
    if (AllPegsCorrect) {
        playerWins = true;
        console.log("player wins");
        alert("Secret code has been cracked. You win!!!");
    } else {
        alert("code is incorrect");
    };
};

// ****************************************************************************
// feedback naar speler via pins.
function changePins(pinnr) {
    function checkPeg(pegnr) {
        let secretpeg = document.getElementById("secret" + pegnr);
        let currentBoardPegs = document.getElementsByClassName(currentpegs);
        let peg = currentBoardPegs[pegnr];
        return secretpeg.classList.contains(peg.style.backgroundColor);
    }
    let currentBoardPins = document.getElementsByClassName(currentpins);
    for (let i = 0; i < pegCount; i++) {
        if (checkPeg(i) === true) {
            let pin = currentBoardPins[i];
            pin.classList.add('correctpin');
            pin.style.backgroundColor = "green";
            console.log("peg" + i + " is correct");
        };
    };
};

function PinsWrongLocation() {
    let secretparent = document.getElementById("secret");
    let secretpegs = Array.from(secretparent.children);
    let secretArray = secretpegs.map(el => el.className);
    console.log(secretArray);
    let currentPegs = document.querySelectorAll(".currentpegs");
    let CurrentArray = Array.from(currentPegs);
    let currentColors = CurrentArray.map(el => el.style.background);
    let currentBoardPins = document.getElementsByClassName(currentpins);
    for (let i = 0; i < pegCount; i++) {
        let containsCurrentColor = secretArray.includes(currentColors[i]);
        if (containsCurrentColor) {
            let pin = currentBoardPins[i];
            console.log(pin);
            pin.classList.add('colorcorrect');
            pin.style.backgroundColor = "red";
            console.log("peg" + i + "'s colour is in code");
        }
    }

    return
    let currentCode = document.querySelectorAll(".currentpegs");
    let CodeArray = Array.from(currentCode);
    let currentColorNames = CodeArray.map(el => el.style.background);
    console.log("Current colors are:" + currentColorNames);
    for (let i = 0; i < pegCount; i++) {
        let secretpeg = document.getElementById("secret" + i);
        let ContainsCorrectColor = secretpeg.classList.contains(currentColorNames[i]);
        //let isSameColor = currentColorNames.includes(secretpeg);
        console.log(currentColorNames, secretpeg, ContainsCorrectColor);
        if (ContainsCorrectColor) {
            let pin = currentBoardPins[i];
            pin.classList.add('colourcorrect');
            pin.style.backgroundColor = "red";
            console.log("peg" + i + "'s colour is in code");
        };

    };
};


// ****************************************************************************
// variabelen definitieren
var currentColor = "white";
var currentBoardPegs = ["peg4", "peg5", "peg6", "peg7", "peg8"];
var currentBoardPins = ["pin4", "pin5", "pin6", "pin7", "pin8"];
// totaal aantal rows
let currentrow = 12;

// ****************************************************************************
// aantal pegs in een row
let pegCount = parseInt(document.querySelector("#pegAmount").value);
const PegcountButton = document.getElementById("pegCountButton");
PegcountButton.addEventListener("click", updatePegCount);
// functie geven aan peg number knop
function updatePegCount() {
    pegCount = parseInt(document.querySelector("#pegAmount").value); // haal pegcount uit HTML
    if (pegCount < 3 || pegCount > 6 || pegCount === 0) {
        alert("pegcount number is invalid. Chosse between 3 to 6")
    }
    else if (currentrow < 12) {
        alert("you cannot change the peg count after starting")
    }
    else {
        console.log(pegCount);
        totalpegs = pegCount * currentrow;
        let oldPegs = document.getElementById("pegs");
        document.querySelector(".gameboard").style.setProperty('--pegcount', pegCount);
        while (oldPegs.firstChild) {
            oldPegs.removeChild(oldPegs.firstChild);
        }
        oldPegs.style.setProperty("--pegcount", pegCount);
        generateBoard(pegs.id);
        let oldPins = document.getElementById("pins");
        while (oldPins.firstChild) {
            oldPins.removeChild(oldPins.firstChild);
        }
        oldPins.style.setProperty("--pegcount", pegCount);
        generateBoard(pins.id);
        let oldSecrets = document.getElementById("secret");
        while (oldSecrets.firstChild) {
            oldSecrets.removeChild(oldSecrets.firstChild);
        };
        generateBoardSecret(secret.id);
        defineCurrentRow();
        secretCode();
        PinsWrongLocation();
    }
};
// end all functions
// ****************************************************************************

console.log(pegCount);
// ****************************************************************************
// generatie van de gameboard
let gameboardstyles = window.getComputedStyle(document.querySelector(".gameboard"));
document.querySelector(".gameboard").style.setProperty('--pegcount', pegCount);
let totalpegs = pegCount * currentrow;
console.log(totalpegs);
const possibleColors = ["red", "green", "blue", "yellow", "magenta", "orange",];
const totalColors = possibleColors.length;
var hasWon = false;
var Pegindex = 0;
let playerWins = false;
const currentpins = "currentpins";
const currentpegs = "currentpegs";
const correctpin = document.querySelector('.correctpin');

generateBoard(pegs.id);
generateBoard(pins.id);
generateBoardSecret(secret.id);
secretCode();
defineCurrentRow();

// ****************************************************************************
// veranderen van kleur van peg bij click
document.addEventListener("click", event => {
    let target = event.target;
    let isValidPeg = target.classList.contains(currentpegs);
    if (isValidPeg && playerWins === false) {
        target.style.background = possibleColors[++Pegindex % totalColors];
        target.classList.remove("red", "green", "blue", "yellow", "magenta", "orange");
        target.classList.add(target.style.background);
    };
});

// ****************************************************************************
// functioneren van submit knop
document.querySelector(".submit").addEventListener("click", event => {
    let currentPegs = document.querySelectorAll(".currentpegs");
    currentPegs.forEach(element => {
        if (element.style.backgroundColor != "white") {
            element.classList.add("Played")
        };
        // stop de backgroundColor in IF statement... 
        // als deze wit is niet

    });

    let allPegsChosen = true
    for (let i = 0; i < pegCount; i++) {
        allPegsChosen = allPegsChosen && currentPegs[i].classList.contains("Played");
    }
    if (allPegsChosen) {
        PinsWrongLocation();
        changePins();
        checkWin();
        changeRows();

        // checkLoss();
        console.log("code submitted");
    }
    else {
        alert("enter code to submit");
    }
});

// ****************************************************************************
// functie resetknop
document.querySelector("#Reset").addEventListener("click", event => {
    currentrow = 12;
    updatePegCount();
    let instructionsText = document.getElementById("instructionsText");
    instructionsText.style.display = "block";
    playerWins = false
});
