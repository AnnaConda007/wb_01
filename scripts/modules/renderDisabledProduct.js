 import { ordersData } from '../../orderData.js'

 export const renderingDisabledProducts = () => {
  const productsDisabled = document.querySelector('.product-cards--disabled')
  const topBtnDisabled = document.querySelector('.header__topBtn--disabled')
  const quantityText = document.querySelector('.header__text-disabled')
  const quantityNum = document.querySelector('.text-disabled-num')

  if (ordersData.length) {
    quantityText.style.display = 'block'
    quantityNum.textContent = ordersData.length
  } else {
    quantityText.style.display = 'none'
  }

  topBtnDisabled.addEventListener('click', () => {
    if (productsDisabled.style.display === 'none') {
      productsDisabled.style.display = 'flex'
    } else {
      productsDisabled.style.display = 'none'
    }
  })

  productsDisabled.innerHTML = ``
  ordersData.forEach(({ img, title, size, color }, index) => {
    productsDisabled.innerHTML += `
    <div class="product-cards_card card product-cards_card--disabled">
    <div class="card__flex-container card__flex-container--disabled">
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
        <button>   <img src="./assets/img/like.svg" alt="добавить в избранное " /> </button>
        
        <button class="delite" data-product-index="${index}"> <img src="./assets/img/trash.svg" alt="удалить " /> </button>
        </div>
      </div>
    </div>
  </div>
  `
  })
}
