export default class Xoxo {
    private _piece: any = [];
    private _symbols: any = [];
    private _board: HTMLElement;
    private _winningSequences: any = [];
    private _isGameOver: boolean = false;

    constructor (container: HTMLElement) {
        this._board = container;
        this._piece = ['', '', '', '', '', '', '', '', ''];
        this._symbols = {
            options: ['X', 'O'],
            index: 0,
            change(): void {
                this.index = ( this.index === 0 ? 1 : 0 );
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

    public reset(): void {
        this._piece.fill('');
        this._symbols.options = [];
        this._symbols.player = [];
        // clean board
        this._cleanBoard();
    }

    public start(): void {
        this._draw();
        this._piece.fill('');
        this._isGameOver = false;
    }

    private _move(position: number): boolean {
        if (this._isGameOver) {
            return false;
        }
        if (this._piece[position] === '') {
            this._piece[position] = this._symbols.options[this._symbols.index];
            this._draw();
            if (this._checkWinningSequences( this._symbols.options[this._symbols.index]) >= 0) {
                this._gameIsOver(this._symbols.index);
            } else {
                this._symbols.change();
            }
            return true;
        } else {
            return false;
        }
    }

    private _checkWinningSequences(simbol: any): any {
        for ( const i in this._winningSequences ) {
            if (this._piece[ this._winningSequences[i][0] ] === simbol
                    && this._piece[ this._winningSequences[i][1] ] === simbol
                    && this._piece[ this._winningSequences[i][2] ] === simbol) {
                return i;
            }
        }
        return -1;
    }

    private _gameIsOver(player: number) {
        this._isGameOver = true;
        this._cleanBoard();
    }

    private _draw() {
        this._cleanBoard();
        for ( const i of Object.keys(this._piece) ) {
            this._board.appendChild(this._buildTail(this._piece[i], i));
        }
    }

    private _buildTail(value: string, position: any): HTMLElement {
        const elm = document.createElement('div');
        elm.textContent = value;
        elm.addEventListener('click', () => {
            this._move(position);
        });

        return elm;
    }

    private _cleanBoard() {
        this._board.innerHTML = '';
    }
}
