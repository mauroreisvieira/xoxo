export default class Player {
    constructor(name, symbol) {
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
