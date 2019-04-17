export default class Xoxo {
    constructor(container) {
        this._tails = [];
        this._symbols = [];
        this._winningSequences = [];
        this._gameOver = false;
        this._board = container;
        this._tails = ['', '', '', '', '', '', '', '', ''];
        this._symbols = {
            options: [],
            players: [],
            turnIndex: 0,
            change() {
                this.turnIndex = (this.turnIndex === 0 ? 1 : 0);
            },
        };
        this._gameOver = false;
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
    play(position) {
        if (this._gameOver) {
            return false;
        }
        if (this._tails[position] === '') {
            this._tails[position] = this._symbols.options[this._symbols.turnIndex];
            this.draw();
            if (this.checkWinningSequences(this._symbols.options[this._symbols.turnIndex]) >= 0) {
                this.gameIsOver(this._symbols.turnIndex);
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
    checkWinningSequences(simbol) {
        for (const i in this._winningSequences) {
            if (this._tails[this._winningSequences[i][0]] === simbol
                && this._tails[this._winningSequences[i][1]] === simbol
                && this._tails[this._winningSequences[i][2]] === simbol) {
                return i;
            }
        }
        return -1;
    }
    gameIsOver(player) {
        this._gameOver = true;
        this._board.innerHTML = `<p>${this._symbols.players[player]} win this game!<p>`;
    }
    draw() {
        this.cleanBoard();
        for (const i of Object.keys(this._tails)) {
            this._board.appendChild(this.buildTail(this._tails[i], i));
        }
    }
    buildTail(value, position) {
        const elm = document.createElement('div');
        elm.textContent = value;
        elm.addEventListener('click', () => {
            this.play(position);
        });
        return elm;
    }
    cleanBoard() {
        this._board.innerHTML = '';
    }
    reset() {
        this._tails.fill('');
        this._symbols.options = [];
        this._symbols.player = [];
        // clean board
        this.cleanBoard();
    }
    start() {
        this.draw();
        this._tails.fill('');
        this._gameOver = false;
    }
}
