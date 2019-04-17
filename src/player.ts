export default class Player {
    private _name: string;
    private _symbol: string;

    constructor (name: string, symbol: any) {
        this._name = name;
        this._symbol = symbol;
    }

    get name() {
        return this._name;
    }

    get symbol() {
        return this._symbol;
    }
}
