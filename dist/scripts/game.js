export default class Xoxo {
    constructor(container) {
        this._tails = [];
        this._symbols = [];
        this._winningSequences = [];
        this._isGameOver = false;
        this._board = container;
        this._tails = ['', '', '', '', '', '', '', '', ''];
        this._symbols = {
            options: [],
            players: [],
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
    set symbol(value) {
        this._symbols.options.push(value);
    }
    set player(value) {
        this._symbols.players.push(value);
    }
    reset() {
        this._tails.fill('');
        this._symbols.options = [];
        this._symbols.player = [];
        // clean board
        this._cleanBoard();
    }
    start() {
        this._draw();
        this._tails.fill('');
        this._isGameOver = false;
    }
    _move(position) {
        if (this._isGameOver) {
            return false;
        }
        if (this._tails[position] === '') {
            this._tails[position] = this._symbols.options[this._symbols.index];
            this._draw();
            if (this._checkWinningSequences(this._symbols.options[this._symbols.index]) >= 0) {
                this._gameIsOver(this._symbols.index);
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
    _checkWinningSequences(simbol) {
        for (const i in this._winningSequences) {
            if (this._tails[this._winningSequences[i][0]] === simbol
                && this._tails[this._winningSequences[i][1]] === simbol
                && this._tails[this._winningSequences[i][2]] === simbol) {
                return i;
            }
        }
        return -1;
    }
    _gameIsOver(player) {
        this._isGameOver = true;
        this._cleanBoard();
        this._winner(this._symbols.players[player]);
    }
    _draw() {
        this._cleanBoard();
        for (const i of Object.keys(this._tails)) {
            this._board.appendChild(this._buildTail(this._tails[i], i));
        }
    }
    _buildTail(value, position) {
        const elm = document.createElement('div');
        elm.textContent = value;
        elm.addEventListener('click', () => {
            this._move(position);
        });
        return elm;
    }
    _cleanBoard() {
        this._board.innerHTML = '';
    }
    _winner(name) {
        const alert = document.querySelector('.alert');
        alert.children[0].innerText = `${name} win this game!`;
        alert.style.removeProperty('display');
    }
}
