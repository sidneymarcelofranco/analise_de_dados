/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: ecommerce-checkout.init.js
*/

// card js plugin
var card = new Card({
    form: document.querySelector('#card-form-elem'),
    container: '.card-wrapper',
    formSelectors: {
        numberInput: 'input#card-number-input',
        expiryInput: 'input#card-expiry-input',
        cvcInput: 'input#card-cvc-input',
        nameInput: 'input#card-name-input'
    },
    placeholders: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
    },
    masks: {
        cardNumber: '•' // optional - mask card number
    },
});
