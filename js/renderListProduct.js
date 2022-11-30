import { API_URL, PREFIX_PRODUCT } from "./const.js"
import { creatCardProduct } from "./createCardProduct.js";
import { catalogList } from "./elements.js";
import { getData } from "./getData.js"

export const renderListProduct = async(category) => {
  const data = await getData(`${API_URL}${PREFIX_PRODUCT}`);
  console.log('data: ', data);
  
  catalogList.textContent = '';

  const cardsData = category
    ? data.filter((item) => item.category === category)
    : data;

  const cards = cardsData.map(creatCardProduct);

  catalogList.append(...cards);
}