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

const Gameboard = (() => {
    const gameboard = document.querySelector('.gameboard');
    const markers = ['', '', '',
        '', '', '',
        '', '', ''];
    markers.forEach(marker => {
        const newTile = document.createElement('span');
        newTile.classList.add('gameboard-tile');
        newTile.textContent = marker;
        gameboard.append(newTile);
    });
    return { markers };
})();

//Add board functionality and check for win/tie
const GameMode = (() => {
    const player1 = InitializePlayers.player1;
    const player2 = InitializePlayers.player2;
    const player1Div = document.querySelector('.player1-info');
    const player2Div = document.querySelector('.player2-info');
    const gameHeader = document.querySelector('.game-header');
    const startButton = document.querySelector('.start-button');
    const markers = Gameboard.markers;
    let currentPlayer = player1;
    let player1Name = document.querySelector('.player1-info>span:nth-child(1)');
    let player2Name = document.querySelector('.player2-info>span:nth-child(1)');
    const toggleCurrentPlayer = () => {
        player1Div.classList.toggle('current-player');
        player2Div.classList.toggle('current-player');
    };
    const addBoardEventListener = () => {
        const gameboardTiles = document.querySelectorAll('.gameboard-tile');
        gameboardTiles.forEach(tile => tile.addEventListener('click', () => {
            if (tile.textContent != '') {
                console.log('not null, no marker allowed');
                return;
            }
            if (currentPlayer == player1) {
                tile.textContent = currentPlayer.marker;
                checkForWin();
                currentPlayer = player2;
                player1Name.style.backgroundColor = null;
                player2Name.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
                toggleCurrentPlayer();
            } else if (currentPlayer == player2) {
                tile.textContent = currentPlayer.marker;
                checkForWin();
                currentPlayer = player1;
                player2Name.style.backgroundColor = null;
                player1Name.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
                toggleCurrentPlayer();
            }
        }));
    }
    const addResetButton = () => {
        const gameboardTiles = document.querySelectorAll('.gameboard-tile');
        const gameContainer = document.querySelector('.game-container');
        const gameHeader = document.querySelector('.game-header');
        const resetButton = document.createElement('button');
        let player1Name = document.querySelector('.player1-info>span:nth-child(1)');
        let player2Name = document.querySelector('.player2-info>span:nth-child(1)');
        resetButton.textContent = 'Reset game';
        resetButton.classList.add('reset-button');
        resetButton.addEventListener('click', () => {
            gameHeader.textContent = null;
            player1Name.style.backgroundColor = null;
            player2Name.style.backgroundColor = null;
            gameboardTiles.forEach(tile => tile.textContent = null);
            resetButton.remove(resetButton);
        });
        gameContainer.append(resetButton);
    };

    //Start button
    startButton.addEventListener('click', () => {
        player1Div.classList.add('current-player');
        let player1Name = document.querySelector('.player1-info>span:nth-child(1)');
        player1Name.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
        startButton.remove();
        addBoardEventListener();
    });

    function checkForWin() {
        //Check board
        const gameboard = document.querySelector('.gameboard');
        const boardScan = [];
        const winCheck = [];
        let filledTiles = 0;
        //Fills boardScan[] with all placed markers
        const tiles = gameboard.children;
        Array.from(tiles).forEach(tile => {
            boardScan.push(tile.textContent);
            if (tile.textContent != '') {
                filledTiles++;
            };
        });
        //Fills winCheck[] with current player's marker's indices
        const playerMarker = currentPlayer.marker;
        let playerMarkerIndex = boardScan.indexOf(playerMarker);
        while (playerMarkerIndex != -1) { // while there is a marker (marker of current player) to get an index from
            winCheck.push(playerMarkerIndex);
            playerMarkerIndex = boardScan.indexOf(playerMarker, playerMarkerIndex + 1); // breaks infinite loop
        };

        //Check win or tie
        const winIndices = ['0,1,2', '3,4,5', '6,7,8', '0,3,6', '1,4,7', '2,5,8', '0,4,8', '2,4,6'];
        let win = false;
        let tie = false;
        if (winIndices.indexOf(winCheck.toString()) != -1) { //is winCheck's value inside winIndices array
            win = true;
            console.log(winCheck.toString());
            gameHeader.textContent = `${currentPlayer.name} wins!`;
            let currentPlayerScore = document.querySelector('.current-player>span:nth-child(2)');
            currentPlayerScore.textContent++;
            addResetButton();
        } else if (filledTiles == 9) {
            tie = true;
            console.log(winCheck.toString());
            gameHeader.textContent = `Tie game!`;
            addResetButton();
        };
    };
})();
