import { renderProducts } from './renderProducts.js'
import { renderingDisabledProducts } from './renderDisabledProduct.js'
import { renderingDeliverydProducts } from './renderDeliveryProducts.js'
import { renderTotalSum } from './renderTotalSum.js'
import { ordersData } from '../../orderData.js'
import { increasingProduct } from './increasingProduct.js'

 const toDelitePr = []
 
export const deliteProduct = () => {
  const deliteBtns = document.querySelectorAll('.delite');
  deliteBtns.forEach((btn) => {
    const checkProducts = document.querySelectorAll(".check-product");
    checkProducts.forEach((checkbox, i) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          toDelitePr.push(i);
        } else {
           const indexToRemove = toDelitePr.indexOf(i);
          if (indexToRemove !== -1) {
            toDelitePr.splice(indexToRemove, 1);
          }
         }
      });
    });
    

    btn.addEventListener('click', (event) => {
      const productIndex = parseInt(btn.dataset.productIndex);  
      toDelitePr.push(productIndex);
          const uniqueIndexes = Array.from(new Set(toDelitePr));
           for (let i = uniqueIndexes.length - 1; i >= 0; i--) {
        ordersData.splice(uniqueIndexes[i], 1);
      }
    
      renderProducts();
      renderTotalSum();
      renderingDisabledProducts();
      renderingDeliverydProducts();
      deliteProduct();
      increasingProduct();
    });
    
  
  });
}

const selectAllCheckbox = document.querySelector('.select-all-checkbox input');
selectAllCheckbox.addEventListener('change', () => {
  const checkboxes = document.querySelectorAll('.product-checkbox input');
  checkboxes.forEach((checkbox, i) => {
    checkbox.checked = selectAllCheckbox.checked;
    toDelitePr.push(i);
  });
  
});

