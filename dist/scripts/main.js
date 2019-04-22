import Player from './player.js'
import Game from './game.js'
import { WinnerAlert } from './custom-elements/winner-alert.js';

const board = document.querySelector('.board');
const play = document.querySelector('.play');
const game = new Game(board);

let players = {};

customElements.define('winner-alert', WinnerAlert);

play.addEventListener('click', () => {
    game.reset();

    delete players.one;
    delete players.two;
    players.one = new Player(
        document.querySelector('[name="name-player-1"]').value,
        document.querySelector('[name="symbol-player-1"]').value
    );

    players.two = new Player(
        document.querySelector('[name="name-player-2"]').value,
        document.querySelector('[name="symbol-player-2"]').value
    );

    game.symbol = players.one.symbol;
    game.player = players.one.name;
    game.symbol = players.two.symbol;
    game.player = players.two.name;

    game.start();
})
