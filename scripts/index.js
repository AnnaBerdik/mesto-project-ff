// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// @todo: Темплейт карточки


const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(element, deleteCard) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardItem.querySelector('.card__title').textContent = element.name;

  const cardImage = cardItem.querySelector('.card__image');
  cardImage.src = element.link; 
  cardImage.alt = element.name; 

  const buttonRemove = cardItem.querySelector('.card__delete-button');
  buttonRemove.addEventListener('click', function () {
    deleteCard(cardItem);
  });

  return cardItem;
}

initialCards.forEach(function (element) {
  const cardItem = createCard(element, deleteCard);
  placesList.prepend(cardItem);
});

function deleteCard(cardItem) {
  cardItem.remove();
}

