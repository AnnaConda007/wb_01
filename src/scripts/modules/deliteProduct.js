import { renderProducts } from './renderProducts.js'
import { renderingDisabledProducts } from './renderDisabledProduct.js'
import { renderingDeliverydProducts } from './renderDeliveryProducts.js'
import { renderTotalSum } from './renderTotalSum.js'
import { ordersData } from '../../orderData.js'
import { increasingProduct } from './increasingProduct.js'
export const deliteProduct = () => {
  const deliteBtn = document.querySelectorAll('.delite')
  deliteBtn.forEach((btn, index) => {
    console.log("555")
    btn.addEventListener('click', () => {
      ordersData.splice(index, 1)
      renderProducts()
      renderTotalSum()
      renderingDisabledProducts()
      renderingDeliverydProducts()
      deliteProduct()
      increasingProduct()
    })
  })
}
