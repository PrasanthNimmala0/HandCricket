let innings = 1;
let innings1Score = 0;
let innings2Score = 0;
let score = 0;
let ballsLeft = 6;

const scoreElement1 = document.getElementById('innings1-score');
const scoreElement2 = document.getElementById('innings2-score');
const ballsLeftElement = document.getElementById('balls-left');
const runDisplayElement = document.getElementById('run-display');
const batButton = document.getElementById('bat-button');
const nextInningsButton = document.getElementById('next-innings-button');
const gameOverElement = document.getElementById('game-over');
const resetButton = document.getElementById('reset-button');

batButton.addEventListener('click', () => {
    if (ballsLeft > 0) {
        const runs = Math.floor(Math.random() * 7); // Random runs between 0 and 6
        score += runs;
        ballsLeft--;

        // Update UI
        ballsLeftElement.textContent = ballsLeft;
        runDisplayElement.textContent = `You scored: ${runs} run${runs !== 1 ? 's' : ''}`;

        if (runs === 6) {
            runDisplayElement.textContent += ' Fantastic Shot!';
        } else if (runs === 4) {
            runDisplayElement.textContent += ' Great Boundary!';
        } else if (runs === 0) {
            runDisplayElement.textContent += ' Oh no, a dot ball!';
        }

        runDisplayElement.style.color = runs === 0 ? 'red' : 'green';
        runDisplayElement.style.fontSize = '36px';
        setTimeout(() => {
            runDisplayElement.style.color = '#28a745';
            runDisplayElement.style.fontSize = '32px';
        }, 500);

        if (ballsLeft === 0) {
            endInnings();
        }
    }
});

nextInningsButton.addEventListener('click', () => {
    innings = 2;
    ballsLeft = 6;
    score = 0;

    // Update UI
    ballsLeftElement.textContent = ballsLeft;
    runDisplayElement.textContent = `Click "Bat" to Play`;
    nextInningsButton.style.display = 'none';
    batButton.style.display = 'inline-block';
    gameOverElement.style.display = 'none';
    enableBatButton();
});

resetButton.addEventListener('click', resetGame);

function endInnings() {
    disableBatButton();
    if (innings === 1) {
        innings1Score = score;
        scoreElement1.textContent = innings1Score;
        runDisplayElement.textContent = `Innings 1 Over! Final Score: ${innings1Score}`;
        nextInningsButton.style.display = 'inline-block';
        batButton.style.display = 'none';
    } else {
        innings2Score = score;
        scoreElement2.textContent = innings2Score;
        runDisplayElement.textContent = `Innings 2 Over! Final Score: ${innings2Score}`;
        batButton.style.display = 'none';

        if (innings2Score > innings1Score) {
            gameOverElement.textContent = 'Team 2 Wins!';
            gameOverElement.style.display = 'block';
            resetButton.style.display = 'inline-block';
            return; // End game immediately if Team 2 wins
        }

        gameOverElement.style.display = 'block';

        // Display the result
        if (innings1Score > innings2Score) {
            gameOverElement.textContent = 'Team 1 Wins!';
        } else if (innings1Score < innings2Score) {
            gameOverElement.textContent = 'Team 2 Wins!';
        } else {
            gameOverElement.textContent = 'It\'s a Tie!';
        }
        resetButton.style.display = 'inline-block';
    }
}

function resetGame() {
    innings = 1;
    innings1Score = 0;
    innings2Score = 0;
    score = 0;
    ballsLeft = 6;

    scoreElement1.textContent = 0;
    scoreElement2.textContent = 0;
    ballsLeftElement.textContent = ballsLeft;
    runDisplayElement.textContent = 'Click "Bat" to Play';
    gameOverElement.style.display = 'none';
    batButton.style.display = 'inline-block';
    nextInningsButton.style.display = 'none';
    resetButton.style.display = 'none';
    enableBatButton();
}

function disableBatButton() {
    batButton.disabled = true;
    batButton.style.cursor = 'not-allowed';
}

function enableBatButton() {
    batButton.disabled = false;
    batButton.style.cursor = 'pointer';
}
