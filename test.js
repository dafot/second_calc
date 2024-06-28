"use strict";

const elements = {
    valueOne: document.querySelector(".economic-damages"),
    valueTwo: document.querySelector(".non-economic-damage"),
    button: document.querySelector(".calculator__button"),
    totalSum: document.querySelector(".calculator__total-sum"),
    inputs: document.querySelectorAll(".calculator__input")
};

console.log(elements.totalSum);

function calculateDamageSum() {
    button.addEventListener('click', () => {
        if (calculatorValidate()) {
            addTotalSum();
            removeErrors();
        }
    });

    button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            console.log('Enter key pressed');
            if (calculatorValidate()) {
                addTotalSum();
                removeErrors();
            }
        }
    });
}

function calculatorValidate() {
    let isValid = true;
    Object.values(elements).slice(0, 2).forEach((element, index) => {
        if (element.value === "" || !validateNumbersAndCommas(element.value)) {
            isValid = false;
            createError("Enter the sum", element);
        }
    });
    return isValid;
}

function createError(errorText, inputElement) {
    const error = document.createElement("span");
    error.textContent = errorText;
    error.classList.add("calculator-error");
    inputElement.closest(".calculator__input-box").appendChild(error);
}

function addTotalSum() {
    totalSum.textContent = formatNumberWithCommas(removeCommas(elements.valueOne.value) + removeCommas(elements.valueTwo.value));
}

function formatNumberInput(inputElement) {
    const value = inputElement.value.replace(/,/g, '');
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    inputElement.value = formattedValue;
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeCommas(str) {
    return +str.replace(/,/g, '');
}

function validateNumbersAndCommas(input) {
    const regex = /^[0-9,]*$/;
    return regex.test(input);
}

function removeErrors() {
    const errors = document.querySelectorAll(".calculator-error");
    errors.forEach(error => error.remove());
}

calculateDamageSum();
elements.inputs.forEach(input => {
    input.addEventListener('input', () => formatNumberInput(input));
});