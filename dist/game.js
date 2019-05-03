import { artifacts, cssClasses, ids } from './constants.js';
export default class Xoxo {
    constructor(container) {
        this._piece = [];
        this._symbols = [];
        this._results = [];
        this._winningSequences = [];
        this._isGameOver = false;
        this._board = container;
        this._piece = new Array(9);
        this._results = [ids.X, ids.O],
            this._symbols = {
                options: [artifacts.X, artifacts.O],
                players: [ids.X, ids.O],
                index: 0,
                change() {
                    this.index = (this.index === 0 ? 1 : 0);
                },
            };
        this._isGameOver = false;
        this._winningSequences = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    }
    reset() {
        this._board.classList.remove(cssClasses.GAME_OVER);
        this._piece.fill('');
        this.start();
    }
    start() {
        this._piece.fill('');
        this._isGameOver = false;
        this._draw();
    }
    _move(position) {
        if (this._isGameOver) {
            return false;
        }
        if (this._piece[position] === '') {
            this._piece[position] = this._symbols.options[this._symbols.index];
            this._draw();
            const winningSequence = this._checkWinningSequences(this._symbols.index);
            if (winningSequence >= 0) {
                this._gameIsOver(this._symbols.index, winningSequence, this._symbols.players[this._symbols.index]);
            }
            else {
                this._symbols.change();
            }
            return true;
        }
        else {
            return false;
        }
    }
    _checkWinningSequences(index) {
        for (const i in this._winningSequences) {
            if (this._piece[this._winningSequences[i][0]] === this._symbols.options[index]
                && this._piece[this._winningSequences[i][1]] === this._symbols.options[index]
                && this._piece[this._winningSequences[i][2]] === this._symbols.options[index]) {
                return i;
            }
        }
        return -1;
    }
    _gameIsOver(index, sequence, player) {
        this._isGameOver = true;
        this._board.classList.add(cssClasses.GAME_OVER);
        this._showResult(player);
        this._winningSequences[sequence].map((index) => {
            this._board.children[index].classList.add(cssClasses.WINNING_SEQUENCE);
        });
    }
    _showResult(player) {
        this._results[player] = this._results[player] ? this._results[player] + 1 : 1;
        const target = document.getElementById(player);
        if (target && target.firstElementChild) {
            target.firstElementChild.innerText = this._results[player];
        }
    }
    _draw() {
        this._cleanBoard();
        for (const i of Object.keys(this._piece)) {
            this._board.appendChild(this._buildPiece(this._piece[i], i));
        }
    }
    _buildPiece(value, position) {
        const elm = document.createElement('div');
        elm.innerHTML = value;
        elm.addEventListener('click', () => {
            this._move(position);
        });
        return elm;
    }
    _cleanBoard() {
        this._board.innerHTML = '';
    }
}
