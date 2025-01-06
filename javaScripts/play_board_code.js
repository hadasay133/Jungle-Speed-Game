// <reference path="../pages/score_page.html" />
var count = 0;
var cnt = 0;
var points = 0;
var life = 3;
var timeout;
var timeout2;
var c = 1;
var answers = [false, true, false, true, true, true,false,true,false,true];
var play_board = [
    ['card_1.PNG', 'card_3.PNG', 'card_14.PNG', 'card_11.PNG', 'card_35.PNG', 'card_49.PNG', 'card_31.PNG'],
    ['card_21.PNG', 'card_47.PNG', 'card_5.PNG', 'card_66.PNG', 'card_18.PNG', 'card_59.PNG', 'card_25.PNG'],
    ['card_28.PNG', 'card_31.PNG', 'card_62.PNG', 'card_23.PNG', 'card_13.PNG', 'card_42.PNG', 'card_10.PNG'],
    ['card_13.PNG', 'card_9.PNG', 'card_52.PNG', 'card_65.PNG', 'card_53.PNG', 'card_20.PNG', 'card_26.PNG'],
    ['card_50.PNG', 'card_44.PNG', 'card_72.PNG', 'card_5.PNG', 'card_26.PNG', 'card_55.PNG', 'card_6.PNG'],
    ['card_15.PNG', 'card_11.PNG', 'card_58.PNG', 'card_62.PNG', 'card_46.PNG', 'card_12.PNG', 'card_62.PNG'],
    ['card_63.PNG', 'card_5.PNG', 'card_73.PNG', 'card_17.PNG', 'card_10.PNG', 'card_40.PNG', 'card_70.PNG'],
    ['card_9.PNG', 'card_8.PNG', 'card_52.PNG', 'card_63.PNG', 'card_56.PNG', 'card_18.PNG', 'card_37.PNG'],
    ['card_14.PNG', 'card_16.PNG', 'card_23.PNG', 'card_68.PNG', 'card_69.PNG', 'card_17.PNG', 'card_59.PNG'],
    ['card_61.PNG', 'card_39.PNG', 'card_12.PNG', 'card_4.PNG', 'card_65.PNG', 'card_21.PNG', 'card_33.PNG'],
    ['card_61.PNG', 'card_39.PNG', 'card_12.PNG', 'card_4.PNG', 'card_65.PNG', 'card_21.PNG', 'card_33.PNG'],
];
var score = document.createElement("p");
var lose = document.createElement("p");
function animation() {
    "use strict";
    var element = document.getElementById("t");
    var e = document.getElementById("found_button");
    e.addEventListener("click", function () {
        element.classList.remove("timer");
        void element.offsetWidth;
        element.classList.add("timer");
    }, false);
}

function start() {
    show_arrays(sessionStorage.getItem('level')==2);
}

function show_arrays(isRotate) {
    clearTimeout(timeout);
    var board = document.getElementById('board');
    board.innerHTML = "";
    for (var i = 0; i < 7; i++) {
        var imag1 = document.createElement("img");
        imag1.id = 'image_style' + i;
        imag1.className = 'images_class'
        if (isRotate) {
            imag1.classList.add('rotateCard');
        }
        //imag1.className = 'images_class' + (isRotate ? 'rotateCard' : '');
        imag1.src = '../images/' + play_board[count][i];
        board.appendChild(imag1);
    }
    count++;
    if (count < play_board.length) {
        clearTimeout(c);
        c = setTimeout("check2(answers[count-1])", 3249);
        timeout = setTimeout(start, 3250);
    }
    else {
        if (count >= play_board.length) {
            if(life>0)
                openModal();
        }
    }
}
function check2(isNotClicked) {
    clearTimeout(c);
    if (isNotClicked == false) {
        addPoint();``
    }
    else {
        var c2 = document.getElementsByClassName("life");
        life--;
        c2[life].remove();
        if (life == 0) {
            openModal();
            clearTimeout(timeout);
        }
    }

    start();
}
function check() {
    if (answers[count - 1]) {
        addPoint();
    }
    else {
        var c3 = document.getElementsByClassName("life");
        life--;
        c3[life].remove();
        if (life == 0) {
            openModal();
            clearTimeout(timeout);
        }
    }
    start();
}


function openModal() {
    clearTimeout(timeout);
    clearTimeout(c);
    var element = document.getElementById("t");
    element.style.webkitAnimationPlayState = "paused";
    element.style.zIndex = 0;
    var modal = document.createElement("dialog");
    if (life == 0) {
        modal.innerHTML += 'YOU LOSE, TRY AGAIN'
    }
    if (count >= play_board.length) {
        modal.innerHTML += 'WELL DONE, YOU WON'
    }
    modal.classList.add("modal_background");
    document.getElementById("header").appendChild(modal);
    //score.innerHTML = 'the number of the correct answers:' + points;
    //document.getElementById("win").appendChild(score);
    //lose.innerHTML = 'the number of the incorrect answers:' + (3-life);
    //document.getElementById("lose").appendChild(lose);
    var newGame = document.createElement("dialog");
    //newGame.classList.add("modal_background");
    newGame.className = 'newGameButton'
    newGame.style.marginTop = "15%"
    newGame.style.zIndex = 2;
    newGame.innerHTML = 'NEW GAME';
    newGame.onclick = ()=>document.location.reload(true);
    document.getElementById("header").insertBefore(newGame, document.getElementById('resultLink'));
    var results = document.createElement("dialog");
    results.classList.add("modal_background");
    results.className = 'newGameButton'
    results.style.marginTop = "30%"
    results.style.zIndex = 2;
    results.innerHTML = 'results';
    document.getElementById("resultLink").appendChild(results);
    //document.getElementById("resultLink").click =;
    //addEventListener("click", function () {
    //    var a = document.createElement("a");
    //    a.href = "";
    //    this.appendChild(a);
    //});
    localStorage.points = points;
    localStorage.life = life;
}

function addPoint() {
    points++;
    var win_point = document.createElement("img");
    win_point.src = "../images/picture.png";
    win_point.classList.add("win_point");
    document.getElementById("points-container").appendChild(win_point);
}
function scoreFunction() {
    points = parseInt(localStorage.points);
    life = parseInt(localStorage.life);
    //var score = document.createElement("p");
    score.innerHTML = 'the number of your correct answers:' + points;
    score.className = 'score_letter';
    document.getElementById("win").appendChild(score);
    //var lose = document.createElement("p");
    lose.innerHTML = 'the number of your incorrect answers:' + (3 - life);
    lose.className = 'score_letter';
    document.getElementById("loser").appendChild(lose);
}
function stopGame() {
    //cnt++;
    clearTimeout(timeout);
    clearTimeout(c);
    localStorage.count = count;
    localStorage.points = points;
    localStorage.life = life;
    suspendedModal();
    //if (cnt > 1) {
    //    document.createElement("div").id = "suspend";
    //}
    var element = document.getElementById("t");
    element.style.webkitAnimationPlayState = "paused";
}

function continueGame() {
    if (localStorage.count) {
        count = parseInt(localStorage.count);
        points = parseInt(localStorage.points);
        life = parseInt(localStorage.life);
        timeout = setTimeout(show_arrays, 3250);
    }
    document.getElementById("s").remove();
    document.getElementById("sb").remove()
    var element = document.getElementById("t");
    element.style.webkitAnimationPlayState = "running";
}

function suspendedModal() {
    var suspended = document.createElement("dialog");
    suspended.innerHTML = 'SUSPENDED'
    suspended.classList.add("modal_background");
    suspended.id = "s";
    document.getElementById("suspend").appendChild(suspended);
    var suspendedButton = document.createElement("dialog");
    suspendedButton.classList.add("modal_background");
    suspendedButton.className = 'newGameButton';
    suspendedButton.innerHTML = 'continue';
    suspendedButton.id = "sb";
    //suspendedButton.onclick = "continueGame()";
    document.getElementById("suspend").appendChild(suspendedButton);
    //var text = modal.innerHTML = 'SUSPENDED';
}

//function saveLevel(level) {
//    sessionStorage.level = level;
//    open("../pages/play_board.html", "_self");
//}
