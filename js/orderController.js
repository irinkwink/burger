import { closeModal } from "./closeModal.js";
import { modalDelivery, modalDeliveryForm, modalOrderConfirm, modalOrderConfirmTextContainer, order } from "./elements.js"

export const orderController = (getCart, clearCart) => {

  const showOrderConfirm = (data, orderData) => {
    let text = `
      <h2 class="modal-order-confirm__title">Спасибо за заказ!</h2>
      <p class="modal-order-confirm__text">Номер вашего заказа: ${data.id}</p>
      <p class="modal-order-confirm__text">О готовности заказа мы сообщим по телефону ${orderData.phone}</p>
      `;
    
    if (orderData.format === 'delivery') {
      text += `<p class="modal-order-confirm__text">Заказ привезёт ${data.manager}</p>`
    }

    text += '<p class="modal-order-confirm__text modal-order-confirm__text_color">Мы уже начали готовить!</p>'

    modalOrderConfirmTextContainer.innerHTML = text;
    modalOrderConfirm.classList.add('modal_open');

    modalOrderConfirm.addEventListener('click', closeModal);
  }

  modalDeliveryForm.addEventListener('change', () => {
    if (modalDeliveryForm.format.value === 'pickup') {
      modalDeliveryForm['address-info'].classList.add('modal-delivery__fieldset-input_hide');
    }

    if (modalDeliveryForm.format.value === 'delivery') {
      modalDeliveryForm['address-info'].classList.remove('modal-delivery__fieldset-input_hide');
    }
  })

  

  modalDeliveryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(modalDeliveryForm);
    const orderData = Object.fromEntries(formData);

    orderData.order = getCart();

    fetch('https://63895b67c5356b25a2feb4a8.mockapi.io/order', {
      method: 'post',
      body: JSON.stringify(orderData),
    })
      .then(response => response.json())
      .then(data => {
        clearCart();
        console.log(data);
        order.classList.remove('order_open');
        document.removeEventListener('keydown', closeModal);
        modalDelivery.classList.remove('modal_open');
        showOrderConfirm(data, orderData);
      });
  })
}