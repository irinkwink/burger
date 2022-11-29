const catalogList = document.querySelector('.catalog__list');
const modalProduct = document.querySelector('.modal_product');

const product = {
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

const modalProductTitle = document.querySelector('.modal-product__title');
const modalProductImage = document.querySelector('.modal-product__image');
const modalProductDescription = document.querySelector('.modal-product__description');
const ingredientsList = document.querySelector('.ingredients__list');
const ingredientsCalories = document.querySelector('.ingredients__calories');
const modalProductPriceCount = document.querySelector('.modal-product__price-count');

modalProductTitle.textContent = product.title;
modalProductImage.src = product.image;
modalProductDescription.textContent = product.description;
ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
modalProductPriceCount.textContent = product.price;

ingredientsList.innerHTML = '';

const ingredientsListItems  = product.ingredients.map((item) => {
  const li = document.createElement('li');
  li.classList = 'ingredients__item';
  li.textContent = item;
  return li;
});

ingredientsList.append(...ingredientsListItems);

catalogList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.product__detail')
    || target.closest('.product__image')) {
    modalProduct.classList.add('modal_open');
  }
});

modalProduct.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.modal__close') || target === modalProduct) {
    modalProduct.classList.remove('modal_open');
  }
});
