import { modalDelivery, modalProduct } from "./elements.js";

export const closeModal = (e) => {
  const modalOpened = document.querySelector('.modal_open');
  
  if (e.target.closest('.modal__close') 
    || e.target === modalOpened
    || e.key === 'Escape') {
    document.removeEventListener('keydown', closeModal);
    modalOpened.classList.remove('modal_open');
  }
}
