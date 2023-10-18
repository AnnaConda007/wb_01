import { renderProducts } from './modules/renderProducts.js'
import { renderingDisabledProducts } from './modules/renderDisabledProduct.js'
import { increasingProduct } from './modules/increasingProduct.js'
import { renderingDeliverydProducts } from './modules/renderDeliveryProducts.js'
import { deliteProduct } from './modules/deliteProduct.js'
import { renderTotalSum } from './modules/renderTotalSum.js'
window.addEventListener('DOMContentLoaded', async function () {
  renderProducts()
  renderTotalSum()

  renderingDisabledProducts()
  renderingDeliverydProducts()
  increasingProduct()
  deliteProduct()
})
