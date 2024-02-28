import './pages/index.css';
import { initialCards} from './scripts/cards.js';
import {openModal, closeModal, closeOverlay} from './components/modal.js';
import { createCard, deleteCard, likeCard} from './components/card.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonCloseList = document.querySelectorAll('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.popup_type_edit .popup__form');
const formAddCard = document.querySelector('.popup_type_new-card .popup__form');
const modalImage = document.querySelector('.popup__image');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const modalTitle = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup_type_new-card .popup__input_type_card-name');
const inputLink = document.querySelector('.popup_type_new-card .popup__input_type_url');

initialCards.forEach(function (element) {
  const newCard = createCard(element.name, element.link, deleteCard, likeCard, openModalImg);
  placesList.append(newCard);
});

//Функция открытия модального окна с картинкой
function openModalImg(imageUrl, imageName) {
  modalImage.src = imageUrl;
  modalImage.alt = imageName;
  modalTitle.textContent = imageName;
  openModal(popupTypeImage);
};

//Функция для открытия попапа и заполнения полей текущими значениями
function openProfilePopup() {
  const currentName = profileTitle.textContent;
  const currentJob = profileDescription.textContent;
  nameInput.value = currentName;
  jobInput.value = currentJob;
  openModal(popupTypeEdit);
};

//Функция для обновления данных на странице
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closeModal(popupTypeEdit);
};

//Функция добавления карточки
formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const nameValue = inputName.value;
  const linkValue = inputLink.value;
  const newCard = createCard(nameValue, linkValue, deleteCard, likeCard, openModalImg);
  placesList.prepend(newCard);
  formAddCard.reset();
  closeModal(popupNewCard);
});

profileEditButton.addEventListener('click', openProfilePopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
profileAddButton.addEventListener('click', () => openModal(popupNewCard));

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', closeOverlay);
  popup.classList.add('popup_is-animated');
});
