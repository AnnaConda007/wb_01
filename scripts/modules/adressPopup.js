import { setSelectedAddress, selectedAddress } from "./constants.js";

export const addressPopup = () => {
  let tempAddress = "";
  const addresses = [
    "Бишкек, улица Табышалиева, 57",
    "Бишкек, улица Жукеева-Пудовкина, 77",
    "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1",
  ];
  const change = document.querySelector(".change-delivery")
   const closeButton = document.querySelector('.close');
  const popupBackground = document.querySelector('.popup-beck');
  const adress = document.querySelector(".adress-value");
  const addressListElement = document.querySelector(".popup_adress-list");
  const changePointButton = document.querySelector(".popup_btn-change_point");
  const changeDeliveryButton = document.querySelector(
    ".popup_btn-change_delivery"
  );
  const chooseBtn = document.querySelector(".popup-change-adress_choose-btn"); // Убедитесь, что класс кнопки написан правильно
  setSelectedAddress(addresses[0]);
  const renderAddresses = (list) => {
    let listItemsHTML = "";

    list.forEach((address, index) => {
      listItemsHTML += `
        <li class="popup_adress-list-item">
        <div class="address-radio-input"> 
        <input type="radio" id="address${index}" name="address" value="${address}" >
          <label for="address${index}">${address}</label>
          </div>
          <button class="address-delete-button" data-index="${index}">
            <img src="../../assets/img/delete.png" alt="Удалить">
          </button>
        </li>
      `;
    });

    addressListElement.innerHTML = listItemsHTML;

    list.forEach((address, index) => {
      const radioInput = document.getElementById(`address${index}`);
      radioInput.addEventListener("change", () => {
        tempAddress = address;
      });

      const deleteButton = document.querySelector(
        `button[data-index="${index}"]`
      );
      deleteButton.addEventListener("click", () => {
        addresses.splice(index, 1);
        renderAddresses(addresses);
      });
    });
  };

  renderAddresses(addresses);

  changePointButton.addEventListener("click", () => {
    renderAddresses([addresses[0]]);
  });

  changeDeliveryButton.addEventListener("click", () => {
    renderAddresses(addresses);
  });

  chooseBtn.addEventListener("click", () => {
    if (tempAddress) {
      setSelectedAddress(tempAddress);
      adress.innerHTML = selectedAddress;
    }  
  });

  closeButton.addEventListener('click', () => {
    popupBackground.style.display = 'none';
  });

  change.addEventListener('click', () => {
    popupBackground.style.display = 'flex';
  });
};
