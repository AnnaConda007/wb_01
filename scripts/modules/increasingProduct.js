import { ordersData } from '../../orderData.js'
import { renderingDeliverydProducts } from './renderDeliveryProducts.js'
import { renderTotalSum } from './renderTotalSum.js'

export const increasingProduct = () => {
  const btnDecrease = document.querySelectorAll('.btn-decrease')
  const btnIncreasing = document.querySelectorAll('.btn-increasing')

  const handleBtn = (operation, btn, index) => {
    const cardElement = btn.closest('.product-cards_card')
    const quantityElement = cardElement.querySelector('.quantity_btns-number')
    const amount = cardElement.querySelector('.price_current-num')
    const amountPrew = cardElement.querySelector('.price_previous-num')
    const inStock = cardElement.querySelector('.stock-text')
    const inStockValue = ordersData[index].inStock
    const difference = operation === 'increasing' ? inStockValue - ordersData[index].quantity - 1 : inStockValue - ordersData[index].quantity + 1
    if (difference < 0) return
    if (inStock) {
      inStock.textContent = difference
    }
    if (operation === 'increasing') {
      ordersData[index].quantity++
    } else {
      ordersData[index].quantity--
    }
    quantityElement.textContent = ordersData[index].quantity
    amount.textContent = Math.ceil(ordersData[index].quantity * ordersData[index].curentPrice).toLocaleString()
    amountPrew.textContent = Math.ceil(ordersData[index].quantity * ordersData[index].withoutDiscount).toLocaleString()
    renderTotalSum()
    renderingDeliverydProducts()
  }

  btnDecrease.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (ordersData[index].quantity <= 1) return
      handleBtn('decrease', btn, index)
    })
  })

  btnIncreasing.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      handleBtn('increasing', btn, index)
    })
  })
}
