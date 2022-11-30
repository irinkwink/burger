import { catalogList, modalProduct} from "./elements.js";
import { navigationListController } from "./navigationListController.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";

const burgerMaks = {
  title: 'Бургер Макс',
  price: 10000,
  weight: 5000,
  calories: 15000,
  description: 'Огромный бургер, съешь сам или возьми на компанию!',
  image: 'img/megaburger.jpg',
  ingredients: [
    'Пшеничная булочка',
    'Мега котлета из горядины',
    'Много сыра',
    'Листья салата',
    'Чипотл'
  ]
};

catalogList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.product__detail')
    || target.closest('.product__image')) {
    const id = e.target.closest('.product').dataset.id;
    openModal(id);
  }
});

modalProduct.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.modal__close') || target === modalProduct) {
    modalProduct.classList.remove('modal_open');
  }
});


const init = () => {
  renderListProduct('burger');
  navigationListController();
}

init();
