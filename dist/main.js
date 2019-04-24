import Game from './game.js'

const board = document.querySelector('.board');
const reset = document.querySelector('.reset');
const game = new Game(board);

game.start();
reset.addEventListener('click', () => {
    game.reset();
})
