/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Two step verification Init Js File
*/

// move next
function getInputElement(index) {
    return document.getElementById('digit' + index + '-input');
}
function moveToNext(index, event) {
    const eventCode = event.which || event.keyCode;
    const input = getInputElement(index);
    if (input.value.length === 1) {
        if (index !== 4) {
            getInputElement(index + 1).focus();
        } else {
            input.blur();
        }
    }
    if (eventCode === 8 && index !== 1) {
        getInputElement(index - 1).focus();
    }
}
