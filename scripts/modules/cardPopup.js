import { selectedCardNumber, setSelectedCard } from "./constants.js";

export  const cardPopup =  () => {
      let temporalValue = ""
    const cards = [
      { type: 'МИР', number: '1234 56** **** 1234' },
      { type: 'VISA', number: '1234 56** **** 1232' },
      { type: 'MasterCard', number: '1234 56** **** 1231' }
    ];
  const cardElement = document.querySelector(".card-value")
    const cardListElement = document.querySelector('.popup_card-list');
    const chooseButton = document.querySelector('.popup-change-card_choose-btn');
    setSelectedCard(cards[0].number)
 
 
    function renderCardList() {
      cardListElement.innerHTML = cards.map((card, index) => `
        <li>
          <input type="radio" id="card${index}" name="card" value="${card.number}" class="card-radio-input">
          <label for="card${index}">
            <span class="card-type">${card.type}</span>
            <span class="card-number">${card.number}</span>
          </label>
        </li>
      `).join('');
    }
   
    renderCardList();
   
    cards.forEach((_, index) => {
      const radioInput = document.getElementById(`card${index}`);
       radioInput.addEventListener('change', (e) => {
        temporalValue = e.target.value;
      });
      
    });
  

     chooseButton.addEventListener('click', () => {
      if (selectedCardNumber) {
     
        setSelectedCard(temporalValue)
        cardElement.innerHTML= selectedCardNumber
       
      }  
    });
  
     document.querySelector('.close-btn').addEventListener('click', () => {
      document.querySelector('.popup-change-card').style.display = 'none';
    });
  }