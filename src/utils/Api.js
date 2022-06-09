class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }
    _getResponseData(res)  {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(this._url+'users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    getInitialCards() {
        return fetch(this._url+'cards', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    editUserInfo(name, status) {
        return  fetch(this._url+'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: status
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    createCard(name, link) {
        return fetch(this._url+'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`,
                likes: []
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    likeCard(cardId) {
        return fetch(this._url+`cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    deleteLikeCard(cardId) {
        return fetch(this._url+`cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    deleteCard(cardId) {
        return fetch(this._url+`cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
    changePhotoProfile(avatar) {
        return fetch(this._url+'users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,body: JSON.stringify({
                avatar: `${avatar}`
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
    headers: {
        "authorization": 'a8fa9cc1-52e1-4272-a720-87f73d0acb6d',
        "content-type": "application/json"
    }
})



