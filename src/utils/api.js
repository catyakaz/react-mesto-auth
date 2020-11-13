class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`))

    }

    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then((res) => {
                return this._getResponseData(res)
            })

    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then((res) => {
            return this._getResponseData(res)
        })

    }



    editInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })

        .then((res) => {
            return this._getResponseData(res)
        })
    }


    createCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then((res) => {
            return this._getResponseData(res)
        })
    }


    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
        .then((res) => {
            return this._getResponseData(res)
        })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            return this._getResponseData(res)
        })

    }

    changeCardLikeStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
            body: JSON.stringify({
                id
            })
        })
        .then((res) => {
            return this._getResponseData(res)
        })
    }

    // setCardLike(id) {
    //     return fetch(`${this._baseUrl}/cards/likes/${id}`, {
    //         method: 'PUT',
    //         headers: this._headers,
    //         body: JSON.stringify({
    //             id
    //         })
    //     })
    //     .then((res) => {
    //         return this._getResponseData(res)
    //     })
    // }

}



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
      authorization: '2986404e-c6f3-4c31-9fb5-a19e57bddffa',
      'Content-Type': 'application/json'
    }
  });

  export default api;