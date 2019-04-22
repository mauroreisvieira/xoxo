export class WinnerAlert extends HTMLElement {
    static get observedAttributes() {
        return ['color', 'fontSize'];
    }
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._message = document.createElement('div');
        this._message.className = 'alert__title';
        this._message.textContent = 'My First Custom Component';
        this._alert = document.createElement('div');
        this._alert.className = 'alert';
        this._alert.appendChild(this._message);
        this._root.appendChild(this._alert);
        this.connectCallback();
        this._type = this._root.host.getAttribute('type');
    }
    /** Custom myElemet element added to page. */
    connectCallback() {
        this.updateStyle();
    }
    /** Custom myElemet element removed from page. */
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }
    /** Custom myElemet element moved to new page. */
    adoptedCallback() {
        console.log('adoptedCallback');
    }
    /** Custom myElemet element attributes changed */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'type':
                if (oldValue === newValue) {
                    break;
                }
                this._type = newValue;
                break;
        }
        this.updateStyle();
    }
    updateStyle() {
        this._type = this._root.host.getAttribute('type');
        this._root.host.className = this._type;
    }
}
