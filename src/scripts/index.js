import { renderProducts } from './modules/renderProducts.js'
import { renderingDisabledProducts } from './modules/renderDisabledProduct.js'
window.addEventListener('DOMContentLoaded', async function () {
  renderProducts()
  renderingDisabledProducts()
})
