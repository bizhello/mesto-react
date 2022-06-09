export class Section {
    constructor(renderer, containerSelector, initialCardsFromServer) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
        this._initialCardsFromServer = initialCardsFromServer;
    }

    renderSection() {
        this._initialCardsFromServer.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(item) {
        this._containerSelector.append(item);
    }

    addItemSubmit(item) {
        this._containerSelector.prepend(item);
    }
}