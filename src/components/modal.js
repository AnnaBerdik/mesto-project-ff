
//Функция открытия модального окна
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscape);
};

//Функция закрытия модального окна
function closeModal(popup) {
popup.classList.remove('popup_is-opened');
document.removeEventListener('keydown', closeEscape);
};

//Функция закрытия модального окна по клику на оверлей
function closeOverlay(evt) {
if (evt.target.classList.contains('popup_is-opened')) {
  closeModal(evt.target);
}
};

//Функция закрытия модального окна по нажатию на Esc
function closeEscape(evt) {
if (evt.key === 'Escape') {
  closeModal(document.querySelector('.popup_is-opened'));
}
};

export {openModal, closeModal, closeOverlay};