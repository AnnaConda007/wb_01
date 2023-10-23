import { renderProducts } from './renderProducts.js'
import { renderingDisabledProducts } from './renderDisabledProduct.js'
import { renderingDeliverydProducts } from './renderDeliveryProducts.js'
import { renderTotalSum } from './renderTotalSum.js'
import { ordersData } from '../../orderData.js'
import { increasingProduct } from './increasingProduct.js'

export const deliteProduct = () => {
  const deliteBtn = document.querySelectorAll('.delite')
  deliteBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const productIndex = parseInt(event.target.dataset.productIndex)
      ordersData.splice(productIndex, 1)

      console.log(ordersData)
      renderProducts()
      renderTotalSum()
      renderingDisabledProducts()
      renderingDeliverydProducts()
      deliteProduct()
      increasingProduct()
    })
  })
}
