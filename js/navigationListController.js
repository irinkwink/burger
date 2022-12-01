import { catalogTitle, navigationList, navigationListItems } from "./elements.js";
import { renderListProduct } from "./renderListProduct.js";

export const navigationListController = () => {
  let activeBtn = navigationList.querySelector('.navigation__button_active');
  
  navigationList.addEventListener('click', (e) => {
    const categoryItem = e.target.closest('.navigation__button');

    if (!categoryItem) return;

    activeBtn.classList.remove('navigation__button_active');
    activeBtn = categoryItem;
    activeBtn.classList.add('navigation__button_active');
    const category = activeBtn.dataset.category;

    catalogTitle.textContent = activeBtn.textContent;

    renderListProduct(category);
  })
}