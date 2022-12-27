// variabelen definitieren
var currentColor = "white";
var currentBoardPegs = ["peg4", "peg5", "peg6", "peg7"];
var currentBoardPins = ["pin4", "pin5", "pin6", "pin7"];
var currentrow = 12;
var possibleColors = ["red", "green", "blue", "yellow", "magenta", "orange"];
var hasWon = false;
var colors = {
    "rgb(255, 0, 0)": "red",
    "rgb(0, 255, 0)": "green",
    "rgb(0, 0, 255)": "blue",
    "rgb(255, 255, 0)": "yellow",
    "rgb(255, 0, 255)": "magenta",
    "rgb(255,165,0)": "orange",
};
var PegColors = possibleColors;
var Pegindex = 0;
var playerWins = false;
const currentpins ="currentpin";
const currentpegs = "currentpeg";
const correctpin = document.querySelector('.correctpin');

// generatie van pegs
for (let i = 0; i < 48; i++) {
    let peg = document.createElement("div");
    peg.setAttribute("class", "peg" + i);
    peg.classList.add("peg");
    // console.log( document.getElementById("pegs"));
    document.getElementById("pegs").appendChild(peg);
    currentBoardPegs.push(peg);
};

// generatie van pins
for (let i = 0; i < 48; i++) {
    let pin = document.createElement("div");
    pin.setAttribute("class", "pin" + i);
    pin.classList.add("pin");
    document.getElementById("pins").appendChild(pin);
    currentBoardPins.push(pin);
};

// eerste rij definitiëren
function currentRow() {
    function defineCurrentpeg(peg) {
        var currentPeg0 = document.getElementsByClassName(peg);
        currentPeg0[0].classList.add(currentpegs);
    }
    defineCurrentpeg("peg44");
    defineCurrentpeg("peg45");
    defineCurrentpeg("peg46");
    defineCurrentpeg("peg47");

    function defineCurrentpin(pin) {
        var currentPin0 = document.getElementsByClassName(pin);
        currentPin0[0].classList.add(currentpins);
    }
    defineCurrentpin("pin44");
    defineCurrentpin("pin45");
    defineCurrentpin("pin46");
    defineCurrentpin("pin47");

};
currentRow();

// genereren van willekeurige geheime code
var secretCode = [
    possibleColors[Math.floor(Math.random() * 6)],
    possibleColors[Math.floor(Math.random() * 6)],
    possibleColors[Math.floor(Math.random() * 6)],
    possibleColors[Math.floor(Math.random() * 6)]
];
function secret() {
    function assignSecret(secret) {
        var code0 = document.getElementById(secret);
        var slot = secret.charAt(secret.length - 1);
        console.log(code0)
        code0.classList.add(secretCode[slot]);
    };
    assignSecret("secret0");
    assignSecret("secret1");
    assignSecret("secret2");
    assignSecret("secret3");
};
secret();

// voor win debugging
console.log(secretCode);

// oude code ingelaten als backup
// document.addEventListener("click", event=>{
//     var target = event.target;
//     var isValidPeg = target.classList.contains("peg");
//     if (isValidPeg && playerWins===false){
//        target.style.backgroundColor = PegColors[++Pegindex%6];
//     }
// });

// veranderen van kleur van peg bij click
document.addEventListener("click", event => {
    var target = event.target;
    var isValidPeg = target.classList.contains(currentpegs);
    if (isValidPeg && playerWins === false) {
        target.classList.remove("red", "green", "blue", "yellow", "magenta", "orange");
        let color = PegColors[++Pegindex % 6];
        target.secretcolor = color;
        target.classList.add(color);
        console.log(target.secretcolor);
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
    const multiplier = 4;
    if (currentrow <= 0) {
        alert("player has lost");
    }

    //remove current 
    var allPegs = document.getElementById("pegs");
    const currentPegs = allPegs.getElementsByClassName(currentpegs);
    for (let i = 0; i < 4; i++) {
        console.log(currentPegs);
        currentPegs[0].classList.remove(currentpegs);
    };
    const currentBoardPegs = [
        "peg" + (currentrow * multiplier - 4),
        "peg" + (currentrow * multiplier - 3),
        "peg" + (currentrow * multiplier - 2),
        "peg" + (currentrow * multiplier - 1)
    ];
    for (let i in currentBoardPegs) {
        console.log(allPegs.getElementsByClassName(currentBoardPegs[i])[0]);
        allPegs.getElementsByClassName(currentBoardPegs[i])[0].classList.add(currentpegs);
    };
    console.log(currentBoardPegs);


    // console.log("current removed");


    console.log('current reassigned');
    // in principe hezelfde als remove current wacht tot pin feedback is geimplementeerd
    var allPins = document.getElementById("pins");
    const currentPins = allPins.getElementsByClassName(currentpins);
    for (let i = 0; i < 4; i++) {
        console.log(currentPins);
        currentPins[0].classList.remove(currentpins);
    };
    const currentBoardPins = [
        "pin" + (currentrow * multiplier - 4),
        "pin" + (currentrow * multiplier - 3),
        "pin" + (currentrow * multiplier - 2),
        "pin" + (currentrow * multiplier - 1)
    ];
    for (let i in currentBoardPins) {
        allPins.getElementsByClassName(currentBoardPins[i])[0].classList.add(currentpins);
        ;
    }
    console.log(currentBoardPins);
};

//controle of de speler wint
function checkWin() {
    function checkPeg(pegnr) {
        let secretpeg = document.getElementById("secret" + pegnr);
        let currentBoardPegs = document.getElementsByClassName(currentpegs);
        let peg = currentBoardPegs[pegnr];
        console.log(pegnr, "pegcolor", peg.secretcolor, " in ", secretpeg.classList);
        return secretpeg.classList.contains(peg.secretcolor)
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
        return secretpeg.classList.contains(peg.secretcolor);
    }
    let currentBoardPins = document.getElementsByClassName(currentpins);
    for (let i = 0; i < 4; i++) {
        if (checkPeg(i) === true) {
            let pin = currentBoardPins[i];
            pin.classList.add('correctpin');
            console.log("peg" + i + " is correct");
        };
    };
};


// controle of e speler verliest (verplaatst naar changeRows functie)
// function checkLoss() {
//     if (currentrow <= 0) {
//         alert("player has lost");
//     }
// };
