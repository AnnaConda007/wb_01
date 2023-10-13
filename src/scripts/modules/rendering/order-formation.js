import { ordersData } from '../../../orderData.js'

export const renderingOrderFormation = () => {
  const products = document.querySelector('.products')
  const topBtn = document.querySelector('.order-formation_top')

  topBtn.addEventListener('click', () => {
    if (products.style.display === 'none') {
      products.style.display = 'block'
    } else {
      products.style.display = 'none'
    }
  })

  ordersData.forEach(({ img, title, size, discountPrice, curentPrice, brend, collection, color }) => {
    products.innerHTML += `
  <div class='products_product-card product-card'>
  <div class='product-card_product-img product-img'>
    <input type='checkbox' class='checkbox product-checkbox' />
    <img src=${img} alt='фото товара' class='product-img_image' />
  </div>
  <div class='product-card_info info'>
    <p class='info-title'>${title}</p>
    <div class='info_details details'>
    ${color ? `<p class='details_text'>Цвет: ${color}</p>` : ''}
    ${size ? `  <p class='details_text'>Размер: ${size}</p>` : ''}
    
    </div>
    <div class='details_addition addition'>
      <p class='addition_text'>Колекция ${collection}</p>
      <div class='addition_brand brand'>
        <p class='addition_text'>${brend}</p>
        <img src='./assets/img/exclamation .svg' class='brand_exclamation' alt='предупрежедение' />
      </div>
    </div>
  </div>
  <div class='product-card_quantity quantity'>
    <div class='quantity_btns'>
      <button class='quantity_btns-btn'>-</button>
      <span class='quantity_btns-number'>1</span>
      <button class='quantity_btns-btn'>+</button>
    </div>
    <p class='quantity_balance-in-stock'>Осталось 2 шт.</p>
    <div class='quantity_icons-btns icons-btns'>
      <img src='./assets/img/like.svg' alt='добавить в избранное ' />
      <img src='./assets/img/trash.svg' alt='удалить ' />
    </div>
  </div>
  <div class='product-card_price price'>
    <p  ${curentPrice.length >= 6 ? `class='price_current price_current--small'` : `class="price_current"`}>${curentPrice.toLocaleString()} com</p>
    <p class='price_previous'>${discountPrice.toLocaleString()} com</p>
  </div>
</div>
  `
  })
}
