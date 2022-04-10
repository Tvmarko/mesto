class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getProfileInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(console.log);
  } 

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(console.log)
  } 

    editProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .catch(console.log)
   }

   editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(console.log)
 }

    addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(console.log)
 }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(console.log)
  }

    deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(console.log)
  }

    addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(console.log)
  }
}
   

/*
  createCard(){
    return fetch('${this._baseUrl}/cards', {
      method: 'POST', 
      body: JSON.stringify({
        name: item.name,
        link: item.link}),
      headers: this._headers
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => {
        console.log(err);
      })
  } 
    
  deleteCard(id) {
    return fetch('${this._baseUrl}/${id}', {
      method: 'DELETE', 
      headers: this._headers
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .catch((err) => {
    console.log(err);
  })
} 
}
*/

  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: 'd47f770a-d44b-46ab-a4b8-15da85bd32ea',
      'Content-Type': 'application/json'
    }
  }); 