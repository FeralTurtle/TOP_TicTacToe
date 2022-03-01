const Player = (name, marker) => {
    let isCurrentPlayer;
    return { name, marker, isCurrentPlayer };
}

//Get input to assign players, then unlocks start button
const InitializePlayers = (() => {
    const gameHeader = document.querySelector('.game-header');
    const playerInfoInput = document.querySelector('.player-info-input');
    const submitBtn = document.querySelector('.submit-btn');
    const startBtn = document.querySelector('.start-button');
    const player1name = document.querySelector('.player1-info>span:nth-child(1)');
    const player2name = document.querySelector('.player2-info>span:nth-child(1)');
    let submitInfoCount = 0;
    const player1 = Player('', 'X');
    const player2 = Player('', 'O');

    submitBtn.addEventListener('click', () => {
        switch (submitInfoCount) {
            case 0:
                player1.name = playerInfoInput.value;
                player1name.textContent = playerInfoInput.value;
                break;
            case 1:
                player2.name = playerInfoInput.value;
                player2name.textContent = playerInfoInput.value;
                startBtn.style.boxShadow = '0px 0px 8px 4px white';
                while (gameHeader.firstChild) {
                    gameHeader.removeChild(gameHeader.firstChild);
                };
                startBtn.removeAttribute('disabled');
                break;
        }
        playerInfoInput.value = null;
        submitInfoCount++;
    });
    return { player1, player2 };
})();

//Makes gameboard
const Gameboard = (() => {
    const player1 = InitializePlayers.player1;
    const player2 = InitializePlayers.player2;
    const player1Div = document.querySelector('.player1-info');
    const player2Div = document.querySelector('.player2-info');
    let currentPlayer = player1;
    const gameboard = document.querySelector('.gameboard');
    const markers = ['X', 'O', 'X',
        'X', 'O', 'X',
        'X', 'O', 'X'];
    const toggleCurrentPlayer = () => {
        player1Div.classList.toggle('current-player');
        player2Div.classList.toggle('current-player');
        let currentPlayerName = document.querySelector('.current-player>span:nth-child(1)');
        currentPlayerName.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
    };
    const makeBoard = () => markers.forEach(marker => {
        const newTile = document.createElement('span');
        let currentPlayerName = document.querySelector('.current-player>span:nth-child(1)');
        currentPlayerName.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
        newTile.classList.add('gameboard-tile');
        newTile.textContent = marker;
        newTile.addEventListener('click', () => {
            newTile.textContent = currentPlayer.marker;
            if (currentPlayer == player1) {
                currentPlayerName.style.backgroundColor = null;
                currentPlayer = player2;
                toggleCurrentPlayer();
            } else if (currentPlayer == player2) {
                let player2Name = document.querySelector('.player2-info>span:nth-child(1)');
                player2Name.style.backgroundColor = null;
                // currentPlayerName.style.backgroundColor = null;//still points to player 1 instead of player2, despite being player2 in the html. Removes p1 instead of p2.
                currentPlayer = player1;
                toggleCurrentPlayer();
            }
        });
        gameboard.append(newTile);
    });
    return { makeBoard };
})();

const GameMode = (() => {
    const player1Div = document.querySelector('.player1-info');
    const player2Div = document.querySelector('.player2-info');
    const startButton = document.querySelector('.start-button');
    const { makeBoard } = Gameboard;

    //Start button
    startButton.addEventListener('click', () => {
        player1Div.classList.add('current-player');
        startButton.remove();
        makeBoard();
    });
})();
