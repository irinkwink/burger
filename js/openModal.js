import { API_URL, PREFIX_PRODUCT } from "./const.js";
import {
  modalProduct,
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsList,
  ingredientsCalories,
  modalProductPriceCount,
  modalProductBtn,
} from "./elements.js";
import { getData } from "./getData.js";

export const openModal = async (id) => {
  const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);

  modalProductTitle.textContent = product.title;
  modalProductImage.src = `${API_URL}/${product.image}`;
  modalProductDescription.textContent = product.description;
  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
  modalProductPriceCount.textContent = product.price;
  modalProductBtn.dataset.id = product.id;

  ingredientsList.innerHTML = '';

  const ingredientsListItems  = product.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList = 'ingredients__item';
    li.textContent = item;
    return li;
  });

  ingredientsList.append(...ingredientsListItems);

  modalProduct.classList.add('modal_open');
}