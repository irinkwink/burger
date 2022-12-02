import { cartInit } from "./cart.js";
import { closeModal } from "./closeModal.js";
import { catalogList, modalProduct, modalProductBtn} from "./elements.js";
import { navigationListController } from "./navigationListController.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";

catalogList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.product__detail')
    || target.closest('.product__image')) {
    const id = e.target.closest('.product').dataset.id;
    openModal(id);
    modalProductBtn.focus();
    document.addEventListener('keydown', closeModal);
  }
});

modalProduct.addEventListener('click', closeModal);

const init = () => {
  renderListProduct('burger');
  navigationListController();
  cartInit();
}

init();
