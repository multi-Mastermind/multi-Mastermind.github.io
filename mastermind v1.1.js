//mastermind v1.1
// variabelen definitieren
var currentColor = "white";
var currentBoardPegs = ["peg4", "peg5", "peg6", "peg7"];
var currentBoardPins = ["pin4", "pin5", "pin6", "pin7"];
// totaal aantal rows
var currentrow = 12;
// aantal pegs in een row bepaald door user
var pegCount = Number.parseInt(document.querySelector("#pegNumber").value, 10);
// update heeft meer werk nodig
// pegCount.addEventListener("change", event =>{
//     var pegCount = Number.parseInt(document.querySelector("#pegNumber").value, 10)
// });
// console.log(pegCount);
// console.log(document.querySelector(".gameboard"));
let gameboardstyles = window.getComputedStyle(document.querySelector(".gameboard"));
document.querySelector(".gameboard").style.setProperty('--pegcount', pegCount);
const totalpegs = pegCount * currentrow;
const possibleColors = ["red", "green", "blue", "yellow", "magenta", "orange",];
const totalColors = possibleColors.length;
var hasWon = false;
// var colors = {
//     "rgb(255, 0, 0)": "red",
//     "rgb(0, 255, 0)": "green",
//     "rgb(0, 0, 255)": "blue",
//     "rgb(255, 255, 0)": "yellow",
//     "rgb(255, 0, 255)": "magenta",
//     "rgb(255,165,0)": "orange",
// };
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
        // target.classList.remove("red", "green", "blue", "yellow", "magenta", "orange");
        // let color = possibleColors[++Pegindex % totalColors];
        // target.secretcolor = color;
        // target.classList.add(color);
        // console.log(target.secretcolor);
        target.style.background = possibleColors[++Pegindex % totalColors];
    };
});

// functioneren van submit knop
document.querySelector(".submit").addEventListener("click", event => {
    changePins();
    checkWin();
    changeRows();
    // checkLoss();
    console.log("code submitted");
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
            console.log("peg" + i + " is correct");
        };
    };
};