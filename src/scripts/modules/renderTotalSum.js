import { ordersData } from '../../orderData.js'
export const renderTotalSum = () => {
  const withoutDisckount = document.querySelector('.without-discount-num')
  const totalSum = document.querySelector('.total-sum-num')
  const discount = document.querySelector('.discount-num')

  const totalCurentPrice = ordersData.map((order) => order.quantity * order.curentPrice)
  const rediseCurrentPrice = totalCurentPrice.reduce((sum, price) => sum + price, 0)
  const totalwithoutDiscount = ordersData.map((order) => order.quantity * order.withoutDiscount)
  const redusewithoutDiscount = totalwithoutDiscount.reduce((sum, price) => sum + price, 0)
  const differencePrice = redusewithoutDiscount - rediseCurrentPrice
  totalSum.textContent = rediseCurrentPrice.toLocaleString()
  withoutDisckount.textContent = redusewithoutDiscount.toLocaleString()
  discount.textContent = differencePrice.toLocaleString()
}
