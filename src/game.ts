import { cssClasses, artifacts } from './constants';

export default class Xoxo {
    private _piece: any = [];
    private _symbols: any = [];
    private _board: HTMLElement;
    private _winningSequences: any = [];
    private _isGameOver: boolean = false;

    constructor (container: HTMLElement) {
        this._board = container;
        this._piece = new Array(9);
        this._symbols = {
            options: [artifacts.X, artifacts.O],
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
        this._board.classList.remove(cssClasses.GAME_OVER);
        this._piece.fill('');
        this.start();
    }

    public start(): void {
        this._piece.fill('');
        this._isGameOver = false;
        this._draw();
    }

    private _move(position: number): boolean {
        if (this._isGameOver) {
            return false;
        }
        if (this._piece[position] === '') {
            this._piece[position] = this._symbols.options[this._symbols.index];
            this._draw();
            const winningSequence = this._checkWinningSequences( this._symbols.index );
            if (winningSequence >= 0) {
                this._gameIsOver(this._symbols.index, winningSequence);
            } else {
                this._symbols.change();
            }
            return true;
        } else {
            return false;
        }
    }

    private _checkWinningSequences(index: number): any {
        for ( const i in this._winningSequences ) {
            if (this._piece[ this._winningSequences[i][0] ] === this._symbols.options[index]
                    && this._piece[ this._winningSequences[i][1] ] === this._symbols.options[index]
                    && this._piece[ this._winningSequences[i][2] ] === this._symbols.options[index]) {
                return i;
            }
        }
        return -1;
    }

    private _gameIsOver(index?: number, sequence?: number) {
        this._isGameOver = true;
        this._board.classList.add(cssClasses.GAME_OVER);
        // winning sequence
        if (index && sequence) {
            this._winningSequences[sequence].map((index: any) => {
                (<HTMLElement>this._board.children[index]).classList.add(cssClasses.WINNING_SEQUENCE);
            });
        }
    }

    private _draw() {
        this._cleanBoard();
        for ( const i of Object.keys(this._piece) ) {
            this._board.appendChild(this._buildPiece(this._piece[i], i));
        }
    }

    private _buildPiece(value: string, position: any): HTMLElement {
        const elm = document.createElement('div');
        elm.innerHTML = value;
        elm.addEventListener('click', () => {
            this._move(position);
        });

        return elm;
    }

    private _cleanBoard() {
        this._board.innerHTML = '';
    }
}
