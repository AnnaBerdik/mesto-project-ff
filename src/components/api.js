export {getUserInfo, getCardsInfo,
        editingUserData, addNewCardData,
        likeCards, deleteLikeCards,
        deleteCards, upgradeAvatar};

const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-9'

const getOptions = {
  headers: {
      authorization: '4b0562d4-d42e-4b69-ba5a-70e4113c401d',
      'Content-Type': 'application/json'
  }
};

// Функция проверки ответа от сервера
function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Функция загрузки информации о пользователе с сервера
function getUserInfo() {
  return fetch(baseUrl + '/users/me', getOptions) 
  .then(handleResponse)
};

//Функция загрузки карточек с сервера
function getCardsInfo () {
  return fetch(baseUrl + '/cards', getOptions)
  .then(handleResponse)
};

//Функция pедактирование профиля
function editingUserData (newName, newJob) {
  return fetch(baseUrl + '/users/me', {
    method: 'PATCH',
    headers: getOptions.headers,
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  }).then(handleResponse);
};

// Функция добавления новой карточки
function addNewCardData(cardData) {
  return fetch(baseUrl + '/cards', {
      method: 'POST',
      headers: getOptions.headers,
      body: JSON.stringify(cardData),
  })
    .then(handleResponse);
};

//Функция постановки и снятия лайка
function likeCards(cardId) {
  return fetch(baseUrl + '/cards/likes/' + `${cardId}`, {
    method: 'PUT',
    headers: getOptions.headers,
  })
  .then(handleResponse);
};

function deleteLikeCards(cardId) {
  return fetch(baseUrl + '/cards/likes/' + `${cardId}`, {
      method: 'DELETE',
      headers: getOptions.headers
  }).then(handleResponse);
};

// Функция удаления карточки
function deleteCards(cardId) {
  return fetch(baseUrl + '/cards/' + `${cardId}`, {
    method: 'DELETE',
      headers: getOptions.headers,
  })
  .then(handleResponse);
};

// Функция обновления аватара пользователя
function upgradeAvatar(pictureData) {
  return fetch(baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: getOptions.headers,
    body: JSON.stringify(pictureData)
  })
  .then(handleResponse);
};