import { ordersData } from '../../../orderData.js'

export const renderingOrderFormation = () => {
  const products = document.querySelector('.prod-containner__product-cards')
  const topBtn = document.querySelector('.header__topBtn')
  const productsDisabled = document.querySelector('.product-cards--disabled')
  const topBtnDisabled = document.querySelector('.header__topBtn--disabled')
  const deliveryImgContainer = document.querySelector('.delivery__date-container')

  topBtn.addEventListener('click', () => {
    if (products.style.display === 'none') {
      products.style.display = 'flex'
    } else {
      products.style.display = 'none'
    }
  })

  topBtnDisabled.addEventListener('click', () => {
    if (productsDisabled.style.display === 'none') {
      productsDisabled.style.display = 'flex'
    } else {
      productsDisabled.style.display = 'none'
    }
  })

  ordersData.forEach(({ img, title, size, discountPrice, curentPrice, brend, collection, quantity, color }) => {
    products.innerHTML += `
  <div class='product-cards_card card'>
  <div class='card__img-container img-container'>
    <input type='checkbox' class='checkbox product-checkbox' />
    <img src=${img} alt='фото товара' class='img-container_img' />
  </div>
  <div class='card__info info'>
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
  <div class='card__quantity quantity'>
    <div class='quantity_btns'>
      <button class='quantity_btns-btn'>-</button>
      <span class='quantity_btns-number'>${quantity}</span>
      <button class='quantity_btns-btn'>+</button>
    </div>
    <p class='quantity_balance-in-stock'>Осталось 2 шт.</p>
    <div class='quantity_icons-btns icons-btns'>
      <img src='./assets/img/like.svg' alt='добавить в избранное ' />
      <img src='./assets/img/trash.svg' alt='удалить ' />
    </div>
  </div>
  <div class='card__price price'>
    <p  ${curentPrice.length >= 6 ? `class='price_current price_current--small'` : `class="price_current"`}>${curentPrice.toLocaleString()} com</p>
    <p class='price_previous'>${discountPrice.toLocaleString()} com</p>
  </div>
</div>
  `
  })

  ordersData.forEach(({ img, title, size, color }) => {
    productsDisabled.innerHTML += `
  <div class='product-cards_card card product-cards_card--disabled'>
  <div class='card__img-container img-container'>
    <img src=${img} alt='фото товара' class='img-container_img' />
  </div>
  <div class='card__info info  info--disabled'>
    <p class='info-title info-title--disabled'>${title}</p>
    <div class='info_details details--disabled details'>
    ${color ? `<p class='details_text'>Цвет: ${color}</p>` : ''}
    ${size ? `  <p class='details_text'>Размер: ${size}</p>` : ''}
    </div>
  </div>
  <div class='card__quantity quantity'>
    <div class='quantity_icons-btns icons-btns'>
      <img src='./assets/img/like.svg' alt='добавить в избранное ' />
      <img src='./assets/img/trash.svg' alt='удалить ' />
    </div>
  </div>
</div>
  `
  })

  const { inStockEnough, inStockNotEnough } = ordersData.reduce(
    (acc, order) => {
      if (order.quantity <= order.inStock) {
        acc.inStockEnough.push(order)
      } else {
        acc.inStockEnough.push({
          ...order,
          quantity: order.inStock,
        })
        acc.inStockNotEnough.push({
          ...order,
          quantity: order.quantity - order.inStock,
        })
      }
      return acc
    },
    { inStockEnough: [], inStockNotEnough: [] }
  )

  function generateDeliveryDateHTML(date, orders) {
    return `
    <div class="date-container__delivery__date delivery__date">
      <p class="delivery__date__order-setup__header__title order-setup__flex__title  ">${date}</p>
      <div class="delivery__date__product-container">
        ${orders
          .map(
            ({ img, quantity }) => `
          <div class='delivery__date__product-img-container'>
            <img class='delivery__date__img-product' src=${img} alt='фото товара' />
            <div class='delivery__date__img-amount'   > 
            <span class="delivery__date__img-amount-text">${quantity} </span>
             </div>
           
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
  }

  const inStockEnoughHTML = generateDeliveryDateHTML(inStockEnough[0].date[0], inStockEnough)
  const inStockNotEnoughHTML = generateDeliveryDateHTML(inStockEnough[0].date[1], inStockNotEnough)

  deliveryImgContainer.innerHTML += inStockEnoughHTML + inStockNotEnoughHTML
}
