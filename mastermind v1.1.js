//mastermind v1.1
// variabelen definitieren
var currentColor = "white";
var currentBoardPegs = ["peg4", "peg5", "peg6", "peg7"];
var currentBoardPins = ["pin4", "pin5", "pin6", "pin7"];
// totaal aantal rows
var currentrow = 12;
// aantal pegs in een row
let pegCount = 4;
// console.log(document.querySelector(".gameboard"));
let gameboardstyles = window.getComputedStyle(document.querySelector(".gameboard"));
document.querySelector(".gameboard").style.setProperty('--pegcount', pegCount);
const totalpegs = pegCount * currentrow;
const possibleColors = ["red", "green", "blue", "yellow", "magenta", "orange",];
const totalColors = possibleColors.length;
var hasWon = false;
var Pegindex = 0;
var playerWins = false;
const currentpins = "currentpins";
const currentpegs = "currentpegs";
const correctpin = document.querySelector('.correctpin');

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




generateBoard(pegs.id);
generateBoard(pins.id);

function defineCurrentRow() {
    let currentp = document.querySelectorAll(".pegs");
    Array.from(currentp).slice(-pegCount).forEach(Element =>
        Element.classList.add(currentpegs));
    let currentpin = document.querySelectorAll(".pins");
    Array.from(currentpin).slice(-pegCount).forEach(Element =>
        Element.classList.add(currentpins));
};
defineCurrentRow();

const secrets = [0, 1, 2, 3].map(secret => {
    let color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    document
        .getElementById("secret" + secret)
        .classList
        //.add(secretCode[secret]));
        .add(color);
    return color;
});

console.log("Secret code is " + secrets);

// veranderen van kleur van peg bij click
document.addEventListener("click", event => {
    let target = event.target;
    let isValidPeg = target.classList.contains(currentpegs);
    if (isValidPeg && playerWins === false) {
        target.style.background = possibleColors[++Pegindex % totalColors];
    };
});

// functioneren van submit knop
document.querySelector(".submit").addEventListener("click", event => {
    let currentPegs = document.querySelectorAll(".currentpegs");
    currentPegs.forEach(element => {
        if(element.style.backgroundColor != "white"){
            element.classList.add(true)
        };
        // stop de backgroundColor in IF statement... 
        // als deze wit is niet
        
    });
    if (currentPegs[0].classList.contains(true) && currentPegs[1].classList.contains(true) && currentPegs[2].classList.contains(true) && currentPegs[3].classList.contains(true)) {
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
        console.log(newpp)
        Array.from(newpp).forEach(element =>
            element.classList.remove("current" + pp));
        Array.from(newpp).slice(rowsliceStart, rowsliceEnd).forEach(element =>
            element.classList.add("current" + pp));
    }
    newrow(pegs.id);
    console.log(pegs.id);
    newrow(pins.id);
}

//controle of de speler wint
function checkWin() {
    function checkPeg(pegnr) {
        let secretpeg = document.getElementById("secret" + pegnr);
        let currentBoardPegs = document.getElementsByClassName(currentpegs);
        let peg = currentBoardPegs[pegnr];
        console.log(pegnr, "pegcolor", peg.secretcolor, " in ", secretpeg.classList);
        return secretpeg.classList.contains(peg.style.backgroundColor)
    }
    if (checkPeg(0) && checkPeg(1) && checkPeg(2) && checkPeg(3)) {
        playerWins = true;
        console.log("player wins");
        alert("Secret code has been cracked. You win!!!");
    } else {
        alert("code is incorrect");
    };
};

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
