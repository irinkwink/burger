import { API_URL, PREFIX_PRODUCT } from "./const.js"
import { creatCardProduct } from "./createCardProduct.js";
import { catalogList } from "./elements.js";
import { getData } from "./getData.js"

export const renderListProduct = async(category) => {
  const data = await getData(`${API_URL}${PREFIX_PRODUCT}${category ? `?category=${category}` : ``}`);
  console.log('data: ', data);
  
  catalogList.textContent = '';

  const cards = data.map(creatCardProduct);

  catalogList.append(...cards);
}