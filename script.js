function startGame(gameboard, markers) {
    const currentPlayerText = document.querySelector('#current-player>span:nth-child(1)');
    currentPlayerText.style.backgroundColor = 'rgba(255, 255, 255, 0.65';
    makeBoard(gameboard, markers);
}

function makeBoard(gameboard, markers) {
    markers.forEach(marker => {
        const newTile = document.createElement('span');
        newTile.classList.add('gameboard-tile');
        newTile.textContent = marker;
        newTile.addEventListener('click', () => {
            newTile.textContent = currentPlayer.marker;
        });
        gameboard.append(newTile);
    });
}

const Player = (name, marker) => {
    let isCurrentPlayer;
    return { name, marker, isCurrentPlayer };
}

const GameMode = (() => {
    const player1Div = document.querySelector('player1-score');
    const player2Div = document.querySelector('player2-score');
    const currentPlayerText = document.querySelector('#current-player>span:nth-child(1)');

    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let currentPlayerDiv = document.querySelector('#current-player');
})();

const GameBoard = (() => {
    const gameboard = document.querySelector('.gameboard');
    const markers = ['X', 'O', 'X',
        'X', 'O', 'X',
        'X', 'O', 'X'];
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', () => {
        startGame(gameboard, markers)
        startButton.remove();
    });
})();

const InitializePlayers = (() => {
    const gameHeader = document.querySelector('.game-header');
    const playerInfoInput = document.querySelector('.player-info-input');
    const submitBtn = document.querySelector('.submit-btn');
    const startBtn = document.querySelector('.start-button');
    const player1name = document.querySelector('.player1-info>span:nth-child(1)');
    const player2name = document.querySelector('.player2-info>span:nth-child(1)');
    let counter = 0;

    submitBtn.addEventListener('click', () => {
        switch (counter) {
            case 0:
                player1name.textContent = playerInfoInput.value;
                break;
            case 1:
                player2name.textContent = playerInfoInput.value;
                startBtn.style.boxShadow = '0px 0px 8px 4px white';
                while (gameHeader.firstChild) {
                    gameHeader.removeChild(gameHeader.firstChild);
                };
                startBtn.removeAttribute('disabled');
                break;    
        }
        playerInfoInput.value = null;
        counter++;
    });
})();
