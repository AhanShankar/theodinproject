gameover = false;
AI_opponent = false;

//----notes----

//every 3x3 box has onclick=boxonclick(), which uses as a manipulate_div function to make changes

//in case of AI opponent, every user click is followed by a call to ai_play()

//gameboard is an object which has functions to change game state,checkwinner,restart etc

//in case of AI opponent, gameboard creates an instance of minimax_ai to select moves


function animatestartscreen(str) { //handles the fade animation on clicking vs. AI or vs. Player div
    div = document.getElementById(str);

    div.onclick = function () {
        if (str === 'vsai')
            AI_opponent = true;
        startscsreen = document.getElementById('startscreen');
        startscsreen.classList.add('fadeafterchoice');
        setTimeout(function () {
            document.body.removeChild(document.body.firstElementChild);
            addgridboxes(9);
        }, 1500);
    };
};
animatestartscreen('vsai');//apply animation to vs. AI div
animatestartscreen('vsplayer');//apply animation to vs. Player div

function _1Dto2Dmap(n, rows, col) { //maps 0 based 1d array to 2d array of size rows*col(0 based indexing)
    r = ~~(n / rows);
    c = ~~(n % col);
    return [r, c];
}

function add_options(container) {//add the restart and menu button also add classlist for animations
    optionsdiv = document.createElement('div');
    optionsdiv.id = 'options';

    restartbtn = document.createElement('button');
    restartbtn.classList.add('optionsbtn');
    restartbtn.textContent = 'Restart';
    restartbtn.onclick = function () { board.restartgame(); };

    menubtn = document.createElement('button');
    menubtn.classList.add('optionsbtn');
    menubtn.textContent = 'Menu';
    menubtn.onclick = function () { window.location.reload(); };

    optionsdiv.appendChild(restartbtn);
    optionsdiv.appendChild(menubtn);

    container.appendChild(optionsdiv);
}
function addgridboxes(n) {//add 3x3=9 boxes to the screen and set onclick functions
    let container = document.createElement('div');
    for (i = 1; i <= n; i++) {
        let temp = document.createElement('div');
        temp.id = "" + i;
        temp.onclick = function () { boxonclick(temp); };
        container.appendChild(temp);
    }
    add_options(container);
    container.classList.add('container');
    document.body.insertBefore(container, document.body.firstChild);
}

const manipulate_div = (() => {//module that changes the text content inside the div and inside the 2d array as well
    const add = (div, str) => {
        if (div.textContent === '' && !gameover) {
            [n, m] = _1Dto2Dmap(div.id - 1, 3, 3);
            board.changegamearray(n, m, str);
            div.textContent = str;
            counter.increment();
            board.checkwinner();
        }
        else
            counter.increment(2);
    };
    return { add };
})();
const currentplayerturn = () => {//counter, even=X turn, odd= O turn
    let count = 0;
    function getcount() {
        return count;
    }
    function increment(n = 1) {
        count += n;
    }
    function reset() {
        count = 0;
    }
    return { increment, getcount, reset };
};
const counter = currentplayerturn();//initialise counter

function boxonclick(div) { //onclick function for each 3x3 div, uses manipulate_div to get things done
    if (!AI_opponent) {
        if (counter.getcount() % 2 == 1)
            manipulate_div.add(div, 'O');
        else
            manipulate_div.add(div, 'X');
    }
    else {
        if (counter.getcount() % 2 == 0) {
            manipulate_div.add(div, 'X');
            board.ai_play();
        }

    }
};
function gameboard() {//the actual gameboard object that manages everything, and includes the 2d array as a private variable
    let gamearray = new Array(3).fill(0).map(() => new Array(3).fill(0));

    function changegamearray(n, m, val) {//change 2d array
        gamearray[n][m] = val;
    }
    function evaluate() {//evaluate if any player has won, if yes, return ['playersymbol' , 'won condition(row,col,diagonal)' , conditionnumber]
        let b = gamearray;
        for (row = 0; row < 3; row++) {
            if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2]) {
                if (b[row][0] == 'X')
                    return ['X', 'row', row];
                else if (b[row][0] == 'O')
                    return ['O', 'row', row];
            }
        }

        // Checking for Columns for X or O victory. 
        for (col = 0; col < 3; col++) {
            if (b[0][col] == b[1][col] &&
                b[1][col] == b[2][col]) {
                if (b[0][col] == 'X')
                    return ['X', 'col', col];

                else if (b[0][col] == 'O')
                    return ['O', 'col', col];
            }
        }

        // Checking for Diagonals for X or O victory. 
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
            if (b[0][0] == 'X')
                return ['X', 'dia', 1]; //negative slope dia=1
            else if (b[0][0] == 'O')
                return ['O', 'dia', 1];
        }

        if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
            if (b[0][2] == 'X')
                return ['X', 'dia', -1];
            else if (b[0][2] == 'O')
                return ['O', 'dia', -1];
        }
        return 0;
    }
    function checkwinner() {//use evaluate to check and declare winner, if any, and end the game
        let value = evaluate();
        if (Array.isArray(value)) {
            declarewinner(value);
            gameover = true;
        }
        else if (value === 0 && movesleft() === 0) {
            declarewinner(0);
            gameover = true;
        }


    }
    function declarewinner(valuearray) {//add text to screen and highlight boxes that led to winning
        if (valuearray[1] === 'row') {
            let winningrow = valuearray[2];
            for (i = 1; i <= 3; i++) {
                let div = document.getElementById(winningrow * 3 + i + '');
                div.classList.add('wonblock');
            }
        }
        else if (valuearray[1] === 'col') {
            let winningcol = valuearray[2] + 1;
            for (i = 1; i <= 3; i++) {
                let div = document.getElementById((3 * i) + (winningcol - 3) + '');
                div.classList.add('wonblock');
            }
        }
        else if (valuearray[1] === 'dia') {
            let winningdia = valuearray[2];
            if (winningdia === 1) {
                let dia1 = [1, 5, 9];
                for (i = 0; i < 3; i++) {
                    let div = document.getElementById(dia1[i] + '');
                    div.classList.add('wonblock');
                }
            }
            else {
                let dia1 = [3, 5, 7];
                for (i = 0; i < 3; i++) {
                    let div = document.getElementById(dia1[i] + '');
                    div.classList.add('wonblock');
                }
            }
        }
        let winneranouncement = document.createElement('p');
        if (!AI_opponent) {
            if (valuearray[0] === 'X')
                winneranouncement.textContent = 'Player 1 wins!';
            else if (valuearray[0] === 'O')
                winneranouncement.textContent = 'Player 2 wins!';
            else
                winneranouncement.textContent = 'Draw';
        }
        else {
            if (valuearray[0] === 'X')
                winneranouncement.textContent = 'Human win.. wait what?';
            else if (valuearray[0] === 'O')
                winneranouncement.textContent = 'AI wins! As expected';
            else
                winneranouncement.textContent = 'Draw';
        }
        winneranouncement.id = 'winneranouncement';
        document.body.append(winneranouncement);
    }
    function restartgame() {//restart game, remove all formatting and reset 2d array
        gameover = false;
        counter.reset();
        gamearray = Array(3).fill(null).map(() => Array(3).fill(0));

        for (i = 1; i <= 9; i++) {
            let div = document.getElementById("" + i);
            if (div.classList.contains('wonblock'))
                div.classList.remove('wonblock');
            div.textContent = '';
        }
        let winnerann = document.getElementById('winneranouncement');
        if (winnerann !== null)
            document.body.removeChild(winnerann);


    }
    function movesleft() {//check if there are moves left
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (gamearray[i][j] !== 'X' && gamearray[i][j] !== 'O') {
                    return 1;
                }
            }
        }
        return 0;
    }


    function ai_play() {//one call to this function makes one AI move
        if (AI_opponent) {
            let AI = minimax_AI(gamearray, movesleft, evaluate);//instance of AI_minimax

            if (counter.getcount() % 2 == 1) {
                let [r, c] = AI.bestmove();
                let div = document.getElementById(r * 3 + c + 1 + '');//2d array indexing to 1d div id conversion
                if (div !== null)
                    manipulate_div.add(div, 'O');
            }

        }
    }
    return { changegamearray, checkwinner, restartgame, ai_play };
}
board = gameboard();
function minimax_AI(gamearray, movesleft, evaluate) {//minimax AI 

    function minimax(ismax) {//minimax algorithm itself

        let score = evaluate();
        if (Array.isArray(score)) {
            if (score[0] === 'X')
                return 10;
            else
                return -10;
        }
        if (movesleft() === 0) {
            return 0;
        }
        if (ismax) {
            let besteval = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (gamearray[i][j] !== 'X' && gamearray[i][j] !== 'O') {
                        gamearray[i][j] = 'X';
                        besteval = Math.max(minimax(!ismax), besteval);
                        gamearray[i][j] = '';
                    }
                }
            }
            return besteval;

        }

        else {
            let besteval = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (gamearray[i][j] !== 'X' && gamearray[i][j] !== 'O') {

                        gamearray[i][j] = 'O';
                        besteval = Math.min(minimax(!ismax), besteval);
                        gamearray[i][j] = '';

                    }
                }
            }
            return besteval;

        }
    }
    function bestmove() {//returns bestmove at [i,j]
        let best = [];
        let eval = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gamearray[i][j] !== 'O' && gamearray[i][j] !== 'X') {
                    gamearray[i][j] = 'O';
                    let m = minimax(true);
                    gamearray[i][j] = '';
                    if (eval > m) {

                        best[0] = i;
                        best[1] = j;
                        eval = m;
                    }
                }

            }
        }
        return best;
    }


    return { bestmove };
}
