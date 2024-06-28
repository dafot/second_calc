"use strict";
const valueOne = document.querySelector(".economic-damages");
const valueTwo = document.querySelector(".non-economic-damage");
const button = document.querySelector(".calculator__button")
const totalSum = document.querySelector(".calculator__total-sum")
const inputs  = document.querySelectorAll(".calculator__input");

function calculateDamageSum() {
    formatNumberWithCommas()
    button.addEventListener('click', () => {
        if(calculatorValidate()){
            addTotalSum()
            removeErrors()           
        }        
        
    })
    button.addEventListener("keydown", (e) => {
        if(calculatorValidate()){
            if (e.key === "Enter" || e.keyCode === 13) {    
                console.log('Enter key pressed');
                addTotalSum()
                removeErrors()
            }
        }
    })
}
calculateDamageSum()

function calculatorValidate(){
    let isValid;
    if(valueOne.value == "" && validateNumbersAndCommas(valueOne.value)){
        isValid = false;
        createError("enter the sum", valueOne)
    }else{
        isValid = true;
    }

    if(valueTwo.value == ""  && validateNumbersAndCommas(valueTwo.value)){
        isValid = false;
        createError("enter the sum", valueTwo)
    }else{
        isValid = true
    }
    return isValid;
}

function createError(errorText, input){
    const error = document.createElement("span");
    error.textContent = errorText;
    error.classList.add("calculator-error");
    input.closest(".calculator__input-box").appendChild(error);

}
function addTotalSum(){
    console.log("pressed")
    
    totalSum.textContent = formatNumberWithCommas(removeCommas(valueOne.value) + removeCommas(valueTwo.value))
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
function formatNumberInput(input) {    
    const value = input.value.replace(/,/g, ''); 
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input.value = formattedValue;
}
function formatNumberWithCommas() {
    const economicDamagesInput = document.querySelector('.economic-damages');
    const nonEconomicDamageInput = document.querySelector('.non-economic-damage');
  
    economicDamagesInput.addEventListener('input', function() {
      const value = this.value.replace(/,/g, '');
      const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.value = formattedValue;
    });
  
    nonEconomicDamageInput.addEventListener('input', function() {
      const value = this.value.replace(/,/g, ''); 
      const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
      this.value = formattedValue;
    });
  }

function removeCommas(str) {
str =  str.replace(/,/g, '');
return +str
}

function validateNumbersAndCommas(input) {    
    const regex = /^[0-9,]*$/;
    return regex.test(input);
    
}
function removeErrors() {
    const errors = document.querySelectorAll(".calculator-error");
    errors.forEach(error => {
        error.remove();
    })
}