import { catalogTitle, navigationList, navigationListItems } from "./elements.js";
import { renderListProduct } from "./renderListProduct.js";

export const navigationListController = () => {
  navigationList.addEventListener('click', (e) => {
    const categoryItem = e.target.closest('.navigation__button');

    if (!categoryItem) return;

    navigationListItems.forEach((item) => {
      item === categoryItem
        ? item.classList.add('navigation__button_active')
        : item.classList.remove('navigation__button_active');
    });

    catalogTitle.textContent = categoryItem.textContent;

    const category = categoryItem.dataset.category;
    console.log('category: ', category);

    renderListProduct(category);
  })
}