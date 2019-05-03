import Game from './game.js';
const socket = io('http://localhost:3000');
const board = document.querySelector('.board');
const reset = document.querySelector('.reset');
const join = document.querySelector('.join');
const game = new Game(board);
game.start();
if (reset) {
    reset.addEventListener('click', () => {
        game.reset();
    });
}
if (join) {
    join.addEventListener('click', () => {
        console.log('Player Join');
        socket.emit('join', 'HELLO WORLD');
    });
}
// listen for new joins
socket.on('join', function (data) {
    console.log(data);
});
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
