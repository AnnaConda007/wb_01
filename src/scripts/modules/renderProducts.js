import { ordersData } from '../../orderData.js'

export const renderProducts = () => {
  const products = document.querySelector('.prod-containner__product-cards')
  const topBtn = document.querySelector('.header__topBtn')
  const amountProducts = document.querySelector('.amount-box-shopping-basket')
  const amountProductsText = document.querySelector('.amount-box-text-shopping-basket')

if(ordersData.length){
  amountProducts.style.display="flex"
  amountProductsText.textContent = ordersData.length
} else {
  amountProducts.style.display="none"
}

  topBtn.addEventListener('click', () => {
    if (products.style.display === 'none') {
      products.style.display = 'flex'
    } else {
      products.style.display = 'none'
    }
  })



  products.innerHTML = ``
  ordersData.forEach(({ img, title, size, inStock, withoutDiscount, curentPrice, brend, collection, quantity, color }, index) => {
    products.innerHTML += `
    <div class="product-cards_card card">
    <div class="card__flex-container">
      <div class="card__img-container img-container">
        <input type="checkbox" class="checkbox product-checkbox" />
        <img src="${img}" alt="фото товара" class="img-container_img" />
      </div>
      <div class="card__info info">
      <div class="card__price price mobile">
      <p ${curentPrice.length >= 5 ? `class='price_current price_current--small'` : `class="price_current"`}> <span class ="price_current-num">  ${(
    curentPrice * quantity
  ).toLocaleString()}  </span>com</p>
      <p class="price_previous"> <span class ="price_previous-num"> ${(withoutDiscount * quantity).toLocaleString()}</span> com</p>
    </div>
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
          <p class="details_text desktop">Размер: ${size}</p>
          `
        : ''
    }
        </div>
        <div class="details_addition addition">
          <p class="addition_text">Коледино ${collection}</p>
          <div class="addition_brand brand">
            <p class="addition_text desktop">${brend}</p>
            <img src="./assets/img/exclamation .svg" class="brand_exclamation" alt="предупрежедение" />
          </div>    
        </div>
      </div>
    </div>
    <div class="card__flex-container">
      <div class="card__quantity quantity">
        <div class="quantity_btns">
          <button class="quantity_btns-btn btn-decrease">-</button>
          <span class="quantity_btns-number">${quantity}</span>
          <button class="quantity_btns-btn   btn-increasing ">+</button>
        </div> 
        ${inStock - quantity <= 2 ? `<p class="quantity_balance-in-stock">Осталось <span class="stock-text"> ${inStock - quantity}</span> шт.</p>` : ''}

        <div class="quantity_icons-btns icons-btns">
        <button>   <img src="./assets/img/like.svg" alt="добавить в избранное " /> </button>
        
        <button class="delite" data-product-index="${index}"> <img src="./assets/img/trash.svg" alt="удалить " /> </button>
      
        </div>
      </div>
      <div class="card__price price desktop">
        <p ${curentPrice.length >= 5 ? `class='price_current price_current--small'` : `class="price_current"`}> <span class ="price_current-num">  ${(
      curentPrice * quantity
    ).toLocaleString()}  </span>com</p>
        <p class="price_previous"> <span class ="price_previous-num"> ${(withoutDiscount * quantity).toLocaleString()}</span> com</p>
      </div>
    </div>
  </div>
  
  `
  })
}
