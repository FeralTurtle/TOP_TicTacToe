const gameboardModule = (() => {
    const gameboard = document.querySelector('.gameboard');
    const markers = ['X', 'O', 'X',
        'X', 'O', 'X',
        'X', 'O', 'X'];
    const renderMarkers = () => {
        markers.forEach(marker => {
            const newSpan = document.createElement('span');
            newSpan.classList.add('gameboard-tile');
            newSpan.textContent = marker;
            gameboard.append(newSpan);
        });
    };
    return {
        renderMarkers
    };
})();

gameboardModule.renderMarkers();
