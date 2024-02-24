
export { createCard, deleteCard, likeCard, handlerClickImage };
import { openModalImg } from '../index.js';

//Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, link, deleteCard, likeCard, handlerClickImage) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonRemove = cardItem.querySelector('.card__delete-button');
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image');
    const likeButton = cardItem.querySelector('.card__like-button');
  
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
  
    buttonRemove.addEventListener('click', function () {
      deleteCard(cardItem);
    });
  
    if (likeCard) {
      likeButton.addEventListener('click', likeCard);
    };
  
    cardImage.addEventListener('click', function () {
      if (handlerClickImage) {
        handlerClickImage(link, name);
      };
    });
  
    return cardItem;
  };
  
  function handlerClickImage(link, name) {
    openModalImg(link, name);
  };
  
  function deleteCard(cardElement) {
    cardElement.remove();
  };
  
  //Функция лайка карточки
  function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
  };
  