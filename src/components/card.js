import { deleteCards, deleteLikeCards,  likeCards } from '../components/api.js';
export { createCard, changeLike, handleDeleteCard};

const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
function createCard(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonRemove = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const likeButton = cardItem.querySelector('.card__like-button');
  const elementCountLikes = cardItem.querySelector('.card__likes-number');

  const isLikedByCurrentUser = cardData.likes.some((like) => like._id === userId);
  
  elementCountLikes.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  if (deleteHandler) {
    buttonRemove.addEventListener('click', () => {
      deleteHandler(cardData._id, cardItem);
    });
  }

  if (likeHandler) {
    likeButton.addEventListener('click', function() {
      likeHandler(cardData._id, elementCountLikes, likeButton);
    });
  }
  
  if (imageHandler) {
    cardImage.addEventListener('click', function() {
      imageHandler(cardData);
    });
  }
  
  if (isLikedByCurrentUser) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    buttonRemove.remove();
  }
    
  return cardItem;
};

// Функция переключения лайка
function changeLike(cardId, elementCountLikes, likeButton) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  if (isLiked) {
    deleteLikeCards(cardId)
    .then((updatedCard) => {
      elementCountLikes.textContent = updatedCard.likes.length;
      likeButton.classList.remove('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  } else {
    likeCards(cardId)
    .then((updatedCard) => {
      elementCountLikes.textContent = updatedCard.likes.length;
      likeButton .classList.add('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  }
};

// Функция удаления карточки
function handleDeleteCard(cardId, cardElement) {
  deleteCards(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });
};