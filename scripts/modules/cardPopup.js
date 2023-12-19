import { selectedCardNumber, setSelectedCard } from "./constants.js";

export const cardPopup = () => {
    const paymentCards = [
      { type: 'МИР', number: '1234 56** **** 1234 01/30' },
      { type: 'VISA', number: '1234 56** **** 1232 01/30' },
      { type: 'MasterCard', number: '1234 56** **** 1231 01/30' }
    ];
  
    let chosenCardNumber = selectedCardNumber || paymentCards[0].number;
    setSelectedCard(chosenCardNumber);  
  
  const overlay = document.querySelector('.popup-beck');
  const modalWindow = document.querySelector('.popup-change-card');
  const changeCardButtons = document.querySelectorAll(".change-payment");
  const cardValueElements = document.querySelectorAll(".card-value");
  const cardListContainer = document.querySelector('.popup_card-list');
  const confirmSelectionButton = document.querySelector('.popup-change-card_choose-btn');
  const closeButton = document.querySelector(".close-btn-card");

  const displaySelectedCard = () => {
    cardValueElements.forEach(element => element.textContent = chosenCardNumber);
  };

  const generateCardListItems = () => {
    return paymentCards.map((card, index) => `
      <li class="popup_list-item">
        <input type="radio" id="card${index}" name="card" value="${card.number}" class="card-radio-input" ${chosenCardNumber === card.number ? 'checked' : ''}>
        <label for="card${index}">
          <span class="card-type">${card.type}</span>
          <span class="card-number">${card.number}</span>
        </label>
      </li>
    `).join('');
  };

  const renderCardList = () => {
    cardListContainer.innerHTML = generateCardListItems();
  };

  const closeModal = () => {
    overlay.style.display = 'none';
    modalWindow.style.display = 'none';
  };

  renderCardList();
  displaySelectedCard();

  cardListContainer.addEventListener('change', (event) => {
    if (event.target.matches('.card-radio-input')) {
      chosenCardNumber = event.target.value;
    }
  });

  confirmSelectionButton.addEventListener('click', () => {
    if (chosenCardNumber) {
      setSelectedCard(chosenCardNumber);
      displaySelectedCard();
      closeModal();
    }
  });

  closeButton.addEventListener('click', closeModal);

  changeCardButtons.forEach(button => {
    button.addEventListener('click', () => {
      overlay.style.display = 'flex';
      modalWindow.style.display = 'block';
    });
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closeModal()
    }
  });
};
