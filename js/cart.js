import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { catalogList, countAmount, modalProductBtn, orderCount, orderList, orderTotalAmount } from "./elements.js";
import { getData } from "./getData.js";

const getCart = () => {
  const cartList = localStorage.getItem('burger-cart');

  return cartList ? JSON.parse(cartList) : [];
};

const createCartItem = (product, cartList) => {
  const count = cartList.find((item) => item.id === product.id).count;

  const li = document.createElement('li');
  li.dataset.id = product.id;
  li.classList = 'order__item';
  li.innerHTML = `
    <img src="${API_URL}/${product.image}" alt="${product.title}" class="order__image">

    <div class="order__product">
      <h3 class="order__product-title">${product.title}</h3>
      <p class="order__product-weight">${product.weight}г</p>
      <p class="order__product-price">${product.price}₽</p>
    </div>

    <div class="order__product-count count">
      <button class="count__minus">-</button>
      <p class="count__amount">${count}</p>
      <button class="count__plus">+</button>
    </div>
  `

  return li
}

const renderCartList = async () => {
  const cartList = getCart();
  console.log('cartList: ', cartList);

  const allIdProduct = cartList.map((item) => item.id);

  const data = await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`);
  console.log('Cartdata: ', data);

  const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);
  orderCount.textContent = countProduct;

  const totalAmount = cartList.reduce((acc, item) => {
    const price = data.find((product) => item.id === product.id).price;
    return acc += price * item.count;
  }, 0)

  orderTotalAmount.textContent = totalAmount;

  orderList.innerHTML = '';
  const cartItems = data.map((item) => createCartItem(item, cartList));
  orderList.append(...cartItems);
};

const updateCartList = (cartList) => {
  localStorage.setItem('burger-cart', JSON.stringify(cartList));
  renderCartList();
};

const addCart = (id, count = 1) => {
  const cartList = getCart();

  const product = cartList.find((item) => item.id === id)
  
  if (product) {
    product.count += count;
  } else {
    cartList.push({id, count})
  }

  updateCartList(cartList);
};

const removeCart = (id) => {
  const cartList = getCart();

  const productIndex = cartList.findIndex((item) => item.id === id)
  
  if (cartList[productIndex].count > 1) {
    cartList[productIndex].count -= 1;
  } else {
    cartList.splice(productIndex, 1);
  }

  updateCartList(cartList);
};

const cartController = () => {
  catalogList.addEventListener('click', ({target}) => {
    if (target.closest('.product__add')) {
      addCart(target.closest('.product').dataset.id)
    }
  });

  modalProductBtn.addEventListener('click', (e) => {
    addCart(
      modalProductBtn.dataset.id,
      parseInt(countAmount.textContent)
    )
  });

  orderList.addEventListener('click', ({target}) => {
    if (target.closest('.count__plus')) {
      addCart(target.closest('.order__item').dataset.id)
      return
    }

    if (target.closest('.count__minus')) {
      removeCart(target.closest('.order__item').dataset.id)
      return
    }
  })
};

export const cartInit = () => {
  cartController();
  renderCartList();
}