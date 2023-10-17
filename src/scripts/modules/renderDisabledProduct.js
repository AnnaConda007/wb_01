import { ordersData } from '../../orderData.js'

export const renderingDisabledProducts = () => {
  const productsDisabled = document.querySelector('.product-cards--disabled')
  const topBtnDisabled = document.querySelector('.header__topBtn--disabled')
  const deliveryImgContainer = document.querySelector('.delivery__date-container')

  topBtnDisabled.addEventListener('click', () => {
    if (productsDisabled.style.display === 'none') {
      productsDisabled.style.display = 'flex'
    } else {
      productsDisabled.style.display = 'none'
    }
  })

  ordersData.forEach(({ img, title, size, color }) => {
    productsDisabled.innerHTML += `
    
    <div class="product-cards_card card product-cards_card--disabled">
    <div class="card__flex-container">
      <div class="card__img-container img-container">
        <img src="${img}" alt="фото товара" class="img-container_img" />
      </div>
      <div class="card__info info info--disabled">
        <p class="info-title info-title--disabled">${title}</p>
        <div class="info_details details--disabled details">
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
      </div>
    </div>
    <div class="card__flex-container">
      <div class="card__quantity quantity quantity--disabled">
        <div class="quantity_icons-btns icons-btns">
          <img src="./assets/img/like.svg" alt="добавить в избранное " />
          <img src="./assets/img/trash.svg" alt="удалить " />
        </div>
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
      <p class="delivery__date__section-title section-subtitle  ">${date}</p>
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
