import { ordersData } from '../../orderData.js'

export const renderProducts = () => {
  const products = document.querySelector('.prod-containner__product-cards')
  const topBtn = document.querySelector('.header__topBtn')

  topBtn.addEventListener('click', () => {
    if (products.style.display === 'none') {
      products.style.display = 'flex'
    } else {
      products.style.display = 'none'
    }
  })

  ordersData.forEach(({ img, title, size, discountPrice, curentPrice, brend, collection, quantity, color }) => {
    products.innerHTML += `

    <div class="product-cards_card card">
    <div class="card__flex-container">
      <div class="card__img-container img-container">
        <input type="checkbox" class="checkbox product-checkbox" />
        <img src="${img}" alt="фото товара" class="img-container_img" />
      </div>
      <div class="card__info info">
        <p class="info-title">${title}</p>
        <div class="info_details details">
          ${
            color
              ? `
          <p class="details_text">Цвет: ${color}</p>
          `
              : ''
          } ${
      size
        ? `
          <p class="details_text">Размер: ${size}</p>
          `
        : ''
    }
        </div>
        <div class="details_addition addition">
          <p class="addition_text">Колекция ${collection}</p>
          <div class="addition_brand brand">
            <p class="addition_text">${brend}</p>
            <img src="./assets/img/exclamation .svg" class="brand_exclamation" alt="предупрежедение" />
          </div>
        </div>
      </div>
    </div>
    <div class="card__flex-container">
      <div class="card__quantity quantity">
        <div class="quantity_btns">
          <button class="quantity_btns-btn">-</button>
          <span class="quantity_btns-number">${quantity}</span>
          <button class="quantity_btns-btn">+</button>
        </div>
        <p class="quantity_balance-in-stock">Осталось 2 шт.</p>
        <div class="quantity_icons-btns icons-btns">
          <img src="./assets/img/like.svg" alt="добавить в избранное " />
          <img src="./assets/img/trash.svg" alt="удалить " />
        </div>
      </div>
      <div class="card__price price">
        <p ${curentPrice.length >= 6 ? `class='price_current price_current--small'` : `class="price_current"`}>${curentPrice.toLocaleString()} com</p>
        <p class="price_previous">${discountPrice.toLocaleString()} com</p>
      </div>
    </div>
  </div>
  
  `
  })
}
