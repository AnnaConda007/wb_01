import { setSelectedAddress, selectedAddress } from "./constants.js";

export const addressPopup = () => {
  const addresses = [
    "Бишкек, улица Табышалиева, 57",
    "Бишкек, улица Жукеева-Пудовкина, 77",
    "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1",
  ];
  
   let currentAddress = selectedAddress || addresses[0];
  setSelectedAddress(currentAddress);  

 
  const overlay = document.querySelector('.popup-beck');
  const addressModal = document.querySelector('.popup-change-adress');
  const changeAddressButtons = document.querySelectorAll(".change-delivery");
  const addressElements = document.querySelectorAll(".adress-value");
  const addressListContainer = document.querySelector(".popup_adress-list");
  const selectAddressButton = document.querySelector(".popup-change-adress_choose-btn");
  const closeButton = document.querySelector('.close');

   
  const updateAddressDisplay = () => {
    addressElements.forEach(element => element.textContent = currentAddress);
  };

  const deleteAddress = (index) => {
    addresses.splice(index, 1);
    renderAddressList();
    updateAddressDisplay();
  };

  const renderAddressList = () => {
    const listItemsHTML = addresses.map((address, index) => `
      <li class="popup_list-item">
        <div class="address-radio-input"> 
          <input type="radio" id="address${index}" name="address" value="${address}" ${currentAddress === address ? 'checked' : ''}>
          <label for="address${index}">${address}</label>
        </div>
        <button class="address-delete-button" data-index="${index}">
          <img src="../../assets/img/delete.png" alt="Удалить">
        </button>
      </li>
    `).join('');

    addressListContainer.innerHTML = listItemsHTML;

    addressListContainer.querySelectorAll('.address-radio-input input').forEach(radioInput => {
      radioInput.addEventListener("change", () => {
        currentAddress = radioInput.value;
      });
    });

    addressListContainer.querySelectorAll('.address-delete-button').forEach(button => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();  
        deleteAddress(parseInt(button.dataset.index, 10));
      });
    });
  };

  selectAddressButton.addEventListener("click", () => {
    if (currentAddress) {
      setSelectedAddress(currentAddress);
      updateAddressDisplay();
      overlay.style.display = 'none';
      addressModal.style.display = 'none';
    }
  });

  closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    addressModal.style.display = 'none';
  });

  changeAddressButtons.forEach(button => {
    button.addEventListener('click', () => {
      overlay.style.display = 'flex';
      addressModal.style.display = 'block';
    });
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      overlay.style.display = 'none';
       addressModal.style.display = 'none';
    }
  });

   renderAddressList();
  updateAddressDisplay();
};
