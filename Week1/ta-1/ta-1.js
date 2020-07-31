let tileContainer = [];
let playerOne = [];
let playerTwo = [];
let connectedTiles = [];

const generateContainer = (maxTileNum, container) => {
    for (let firstElement = 0; firstElement <= maxTileNum; firstElement++) {
        for (
            let secondElement = firstElement;
            secondElement <= maxTileNum;
            secondElement++
        ) {
            container.push([firstElement, secondElement]);
        }
    }
    return container;
};

const dealTiles = (tiles, playerOne, playerTwo) => {
    randomSelector(tiles, playerOne, 7);
    randomSelector(tiles, playerTwo, 7);
};

const randomSelector = (container, arr, size) => {
    for (let i = 0; i < size; i++) {
        let index = Math.floor(Math.random() * container.length);
        arr.push(container[index]);
        container.splice(index, 1);
    }
};

const findValidTile = (tileContainer, boardTiles, playerTiles) => {
    let isFinish = false;
    let validTile = [];
    while (!isFinish) {
        validTile = playerTiles.find((tile) => {
            return tile.includes(
                boardTiles[0][0] || boardTiles[boardTiles.length - 1][1]
            );
        });
        validTile === undefined
            ? tileContainer.length > 0
                ? randomSelector(tileContainer, playerTiles, 1)
                : (isFinish = true)
            : (isFinish = true);
    }

    return validTile;
};

const boardHandler = (
    validTile,
    playerTiles,
    boardTiles,
    connectedTiles,
    finishControl
) => {
    if (validTile !== undefined) {
        let indexOfTile = playerTiles.indexOf(validTile);
        connectedTiles.splice(0, 1, validTile);
        if (boardTiles[0][0] === validTile[0]) {
            connectedTiles.splice(1, 2, boardTiles[0]);
            boardTiles.unshift(validTile.reverse());
        } else if (boardTiles[0][0] === validTile[1]) {
            connectedTiles.splice(1, 2, boardTiles[0]);
            boardTiles.unshift(validTile);
        } else if (boardTiles[boardTiles.length - 1][1] === validTile[0]) {
            connectedTiles.splice(1, 2, boardTiles[boardTiles.length - 1]);
            boardTiles.push(validTile);
        } else if (boardTiles[boardTiles.length - 1][1] === validTile[1]) {
            connectedTiles.splice(1, 2, boardTiles[boardTiles.length - 1]);
            boardTiles.push(validTile.reverse());
        }
        playerTiles.splice(indexOfTile, 1);
    } else finishControl.push(1);
};

const displayBoard = (arr) => {
    let printContainer = '';
    arr.forEach((element) => {
        printContainer += ` <${element[0]}:${element[1]}> `;
    });
    return printContainer;
};

// const playNew = (tileContainer, playerOne, playerTwo) => {
//     let board = [];
//     randomSelector(tileContainer, board, 1);
//     console.log('Game starting with first tile: ', displayBoard(board));

//     while (playerOne.length > 0 && playerTwo.length > 0) {
//         let validTileForPlayerOne = findValidTile(
//             tileContainer,
//             board,
//             playerOne
//         );
//         if (validTileForPlayerOne === undefined) {
//             console.log('PlayerOne has no tile properly');
//             console.log(playerOne);
//         } else {
//             boardHandler(
//                 validTileForPlayerOne,
//                 playerOne,
//                 board,
//                 connectedTiles,
//                 finishControl
//             );

//             console.log(
//                 `PlayerOne plays ${displayBoard([
//                     connectedTiles[0],
//                 ])} to connect to tile ${displayBoard([
//                     connectedTiles[1],
//                 ])} on the board`
//             );
//             console.log('Board is now:', displayBoard(board));
//         }
//     }
// };

const play = (tileContainer, playerOne, playerTwo) => {
    debugger;
    let board = [];
    let finishControl = [];
    randomSelector(tileContainer, board, 1);
    console.log('Game starting with first tile: ', displayBoard(board));
    while (
        playerOne.length > 0 &&
        playerTwo.length > 0 &&
        finishControl.length !== 1
    ) {
        console.log('Container; ', tileContainer);
        console.log('PlayerOne', playerOne);
        console.log('PlayerTwo', playerTwo);
        let validTileForPlayerOne = findValidTile(
            tileContainer,
            board,
            playerOne
        );

        boardHandler(
            validTileForPlayerOne,
            playerOne,
            board,
            connectedTiles,
            finishControl
        );
        console.log(finishControl, 'finish');
        console.log(
            `PlayerOne plays ${displayBoard([
                connectedTiles[0],
            ])} to connect to tile ${displayBoard([
                connectedTiles[1],
            ])} on the board`
        );
        console.log('Board is now:', displayBoard(board));

        if (playerOne.length > 0) {
            let validTileForPlayerTwo = findValidTile(
                tileContainer,
                board,
                playerTwo
            );

            boardHandler(
                validTileForPlayerTwo,
                playerTwo,
                board,
                connectedTiles,
                finishControl
            );
            console.log(
                `PlayerTwo plays ${displayBoard([
                    connectedTiles[0],
                ])} to connect to tile ${displayBoard([
                    connectedTiles[1],
                ])} on the board`
            );
            console.log('Board is now:', displayBoard(board));
        } else console.log('PlayerOne win...');
        if (playerTwo.length === 0) console.log('PlayerTwo win...');
        console.log('Tile Container: ', tileContainer);
        tileContainer.length === 0 && finishControl.length === 1
            ? playerOne.length > playerTwo.length
                ? console.log(
                      `Tile is finished in the stock\nPlayerOne has ${playerOne.length} tiles\nPlayerTwo has ${playerTwo.length} tiles\nPlayerTwo win`
                  )
                : console.log(
                      `Tile is finished in the stock\nPlayerOne has ${playerOne.length} tiles\nPlayerTwo has ${playerTwo.length} tiles\nPlayerOne win`
                  )
            : null;
    }
};

generateContainer(6, tileContainer);

dealTiles(tileContainer, playerOne, playerTwo);

play(tileContainer, playerOne, playerTwo);
