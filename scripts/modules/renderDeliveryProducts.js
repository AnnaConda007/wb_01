import { ordersData } from '../../orderData.js'

export const renderingDeliverydProducts = () => {
  const deliveryImgContainer = document.querySelector('.delivery__date-container')

  const { inStockEnough, inStockNotEnough } = ordersData.reduce(
    (acc, order) => {
      if (order.quantity <= order.nearestStock) {
        acc.inStockEnough.push(order)
      } else {
        acc.inStockEnough.push({
          ...order,
          quantity: order.nearestStock,
        })
        acc.inStockNotEnough.push({
          ...order,
          quantity: order.quantity - order.nearestStock,
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
            <div class='amount-box'   > 
            <span class="amount-box-text">${quantity} </span>
             </div>
           
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
  }

  deliveryImgContainer.innerHTML = ``
  if (!ordersData.length) return
  const inStockEnoughHTML = generateDeliveryDateHTML(inStockEnough[0].date[0], inStockEnough)
  const inStockNotEnoughHTML = generateDeliveryDateHTML(inStockEnough[0].date[1], inStockNotEnough)

  if (inStockNotEnough.length) {
    deliveryImgContainer.innerHTML += inStockEnoughHTML + inStockNotEnoughHTML
  } else {
    deliveryImgContainer.innerHTML += inStockEnoughHTML
  }
}
