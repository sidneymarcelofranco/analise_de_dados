/*
   Template Name: Steex - Admin & Dashboard Template
   Author: Themesbrand
   Website: https://Themesbrand.com/
   Contact: Themesbrand@gmail.com
   File: Learning instructors grid init js
*/

// Instrucor Images
var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
dropzonePreviewNode.id = "";
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone(".instrucor-dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
    });
}

var idFieldInput = document.getElementById("id-field");
var instructorNameInput = document.getElementById("instructor-name-input");
var totalCourseInput = document.getElementById("total-courses-input");
var emailInput = document.getElementById("email-input");
var studentsInput = document.getElementById("students-input");
var experienceInput = document.getElementById("experience-input");
var contactInput = document.getElementById("contact-input");
var statusInput = document.getElementById("status-input");

var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

var statusVal = new Choices(statusInput, {
    searchEnabled: false
});



// tablelist form submit event
var forms = document.querySelectorAll('.tablelist-form')
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (document.querySelector('.dz-image-preview')) {
            var imageElement = new DOMParser().parseFromString(document.querySelectorAll('.dz-image-preview')[0].innerHTML, "text/html");
            var imageDom = imageElement.body.querySelector('[data-dz-thumbnail]');
        }

        var errorMsg = document.getElementById("alert-error-msg");
        errorMsg.classList.remove("d-none");

        setTimeout(() => errorMsg.classList.add("d-none"), 2000);

        var text;
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (document.querySelectorAll(".dz-image-preview").length == 0) {
            text = "Please select a image";
            errorMsg.innerHTML = text;
            return false;
        } else if (instructorNameInput.value == "") {
            text = "Please enter a instructor name";
            errorMsg.innerHTML = text;
            return false;
        } else if (!emailInput.value.match(validRegex)) {
            text = "Please enter valid email address";
            errorMsg.innerHTML = text;
            return false;
        } else if (totalCourseInput.value == "") {
            text = "Please enter a no. of course";
            errorMsg.innerHTML = text;
            return false;
        } else if (experienceInput.value == "") {
            text = "Please enter a no. of experience";
            errorMsg.innerHTML = text;
            return false;
        } else if (studentsInput.value == "") {
            text = "Please enter a no. of students";
            errorMsg.innerHTML = text;
            return false;
        } else if (contactInput.value == "") {
            text = "Please enter a contact no";
            errorMsg.innerHTML = text;
            return false;
        } else if (statusInput.value == "") {
            text = "Please select a status";
            errorMsg.innerHTML = text;
            return false;
        }

        return true;
    });
});