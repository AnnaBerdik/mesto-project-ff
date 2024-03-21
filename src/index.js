import './pages/index.css';
import {openModal, closeModal, closeOverlay} from './components/modal.js';
import {createCard, changeLike, handleDeleteCard} from './components/card.js';
import {clearValidation, enableValidation,  validationConfig } from './components/validation.js';
import {getUserInfo, getCardsInfo, editingUserData, addNewCardData, upgradeAvatar} from './components/api.js';


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
const profileImage = document.querySelector('.profile__image');
const inputName = document.querySelector('.popup_type_new-card .popup__input_type_card-name');
const inputLink = document.querySelector('.popup_type_new-card .popup__input_type_url');
const formEdit = document.forms['edit-profile'];
const formAdd = document.forms['new-place'];
const formUpdatePicture = document.forms['update-picture'];
const formUpdatePictureButton = formUpdatePicture.querySelector('.popup__button');
const inputPictureUrl = document.querySelector('.popup__input_type_picture-url');
const popupUpdatePicture = document.querySelector('.popup_type_update-picture');
const formEditButton = formEdit.querySelector('.popup__button');
const formNewCardButton = formAdd.querySelector('.popup__button');
const profileEditAvatarButton = document.querySelector('.profile__edit-avatar');

let userId;

function changeLikeHandler(cardId, elementCountLikes, likeButton) {
  changeLike(cardId, elementCountLikes, likeButton);
}

function addCard(cardElement) {
  placesList.append(cardElement);
};

function addNewCard(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const card = createCard(cardData, deleteHandler, likeHandler, imageHandler, userId);
 placesList.prepend(card);
};

function renderCards(initialCards) {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, handleDeleteCard, changeLikeHandler, openModalImg, userId);
    addCard(cardElement);
  });
};

function renderUserInfo(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
};

//Функция открытия модального окна смены аватара
function openUpdatePictureAvatar() {
  clearValidation(formUpdatePicture, validationConfig);
  openModal(popupUpdatePicture);
};

//Функция открытия модального окна с картинкой
function openModalImg(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalTitle.textContent = cardData.name;
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
function  handleProfileFormSubmit(evt) {
  evt.preventDefault();
  formEditButton.textContent = 'Сохранение...';
  const newName = nameInput.value;
  const newJob = jobInput.value;
  editingUserData(newName, newJob)
  .then(() => {
    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;
    closeModal(popupTypeEdit);
    clearValidation(formEdit, validationConfig);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    formEditButton.textContent = 'Сохранить';
  });
};

//Функция добавления карточки
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  formNewCardButton.textContent = 'Сохранение...'
  const cardDataNew = {
    name: inputName.value,
    link: inputLink.value
  }
  addNewCardData(cardDataNew)
  .then((newCardData) => {
    addNewCard(newCardData, handleDeleteCard, changeLike, openModalImg, userId);
    closeModal(popupNewCard);
    formAdd.reset();
    clearValidation(formAdd, validationConfig);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    formNewCardButton.textContent = 'Сохранить';
  });
};

// Функция обновления аватара
function handleFormSubmitUpdatePicture(evt) {
  evt.preventDefault();
  formUpdatePictureButton.textContent = 'Сохранение...'
  const pictureData = {
    avatar: inputPictureUrl.value
  }
  upgradeAvatar(pictureData)
  .then(() => {
    profileImage.style.backgroundImage = `url(${inputPictureUrl.value})`;
    closeModal(popupUpdatePicture);
    formUpdatePicture.reset();
    clearValidation(formUpdatePicture, validationConfig);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    formUpdatePictureButton.textContent = 'Сохранить';
  });
};

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', closeOverlay);
  popup.classList.add('popup_is-animated');
});

profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', () => openModal(popupNewCard));
formEdit.addEventListener('submit',  handleProfileFormSubmit);
formAdd.addEventListener('submit', handleFormSubmitNewCard);
formUpdatePicture.addEventListener('submit', handleFormSubmitUpdatePicture);
profileEditAvatarButton.addEventListener('click', openUpdatePictureAvatar);

Promise.all([getCardsInfo(), getUserInfo()])
.then(([initialCards, userData]) => {
  renderUserInfo(userData);
  userId = userData._id
  renderCards(initialCards);
})
.catch((error) => {
  console.log(`Ошибка: ${error}`);
});

enableValidation(validationConfig);
