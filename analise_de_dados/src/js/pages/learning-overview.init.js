/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: learning overview Init Js File
*/

document.getElementById("agent-chat").addEventListener('click', function () {
    if (document.getElementById("emailchat-detailElem").classList.contains("d-block")) {
        document.getElementById("emailchat-detailElem").classList.remove("d-block");
    } else {
        document.getElementById("emailchat-detailElem").classList.add("d-block");
    }
});

document.getElementById("emailchat-btn-close").addEventListener('click', function () {
    if (document.getElementById("emailchat-detailElem").classList.contains("d-block")) {
        document.getElementById("emailchat-detailElem").classList.remove("d-block");
    }
});

// Dropzone has been added as a global variable.
var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
dropzonePreviewNode.id = "";
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone(".dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
    });
}

// basic-rating
if (document.querySelector('#basic-rater')){
    var basicRating = raterJs({
        starSize: 22,
        rating: 0,
        step:0.5,
        element: document.querySelector("#basic-rater"),
        rateCallback: function rateCallback(rating, done) {
            this.setRating(rating);
            done();
        }
    });
}

var editList = false;
var reviewTitleInput = document.getElementById("reviewTitle-input");
var reviewDescInput = document.getElementById("reviewDesc-input");
var userNameVal = document.querySelector('.user-name-text').innerHTML;
var rating = document.getElementById("basic-rater");
// date & time
var date = new Date().toUTCString().slice(5, 16);

var forms = document.querySelectorAll('.tablelist-form')
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var rateVal = rating.getAttribute('data-rating');

        var errorMsg = document.getElementById("alert-error-msg");
        errorMsg.classList.remove("d-none");

        setTimeout(() => errorMsg.classList.add("d-none"), 2000);

        var text;

        if (!rateVal) {
            text = "Please select a rating";
            errorMsg.innerHTML = text;
            return false;
        } else if (reviewTitleInput.value == "") {
            text = "Please enter a review";
            errorMsg.innerHTML = text;
            return false;
        } else if (!rateVal) {
            text = "Please select a rating";
            errorMsg.innerHTML = text;
            return false;
        } else if (reviewDescInput.value == "") {
            text = "Please enter a review description";
            errorMsg.innerHTML = text;
            return false;
        }

        var imgHtml = '<div class="d-flex flex-grow-1 gap-2 review-gallery-img">';
        document.querySelectorAll("#dropzone-preview .dz-image-preview").forEach(function (item) {
            var thumbnailImg = item.querySelector('[data-dz-thumbnail]');
            var thumbnailImgName = item.querySelector('[data-dz-name]').innerHTML;
            imgHtml += '<a href="#" class="avatar-md mt-3">\
            <div class="avatar-title bg-light rounded">\
                <img src="'+ thumbnailImg.src + '" alt="'+thumbnailImgName+'" class="product-img avatar-sm">\
            </div>\
        </a>';
        });
        imgHtml += '</div>';

        var uniqueid = Math.floor(Math.random() * 100);
        var reviewListHtml = '<li class="review-list py-2"  id="review-'+ uniqueid + '">\
            <div class="border border-dashed rounded p-3">\
                <div class="hstack flex-wrap gap-3 mb-4">\
                    <div class="badge rounded-pill bg-danger-subtle text-danger mb-0">\
                        <i class="mdi mdi-star"></i> <span class="rate-num">'+ parseFloat(rateVal).toFixed(1) + '</span>\
                    </div>\
                    <div class="vr"></div>\
                    <div class="flex-grow-1">\
                        <p class="mb-0"><a href="#!">'+ userNameVal + '</a></p>\
                    </div>\
                    <div class="flex-shrink-0">\
                        <span class="text-muted fs-13 mb-0">'+ date + '</span>\
                    </div>\
                    <div class="flex-shrink-0">\
                        <a href="#addReview" class="badge bg-secondary-subtle text-secondary edit-item-list" data-bs-toggle="modal"><i class="ph-pencil align-baseline me-1"></i> Edit</a>\
                        <a href="#removeItemModal" class="badge bg-danger-subtle text-danger" data-bs-toggle="modal"><i class="ph-trash align-baseline"></i></a>\
                    </div>\
                </div>\
                <h6 class="review-title fs-md">'+ reviewTitleInput.value + '</h6>\
                <p class="review-desc mb-0">'+ reviewDescInput.value + '</p>\
                '+ imgHtml + '\
            </div>\
        </li>';

        if (
            reviewTitleInput.value !== "" && rateVal &&
            reviewDescInput.value !== "" && !editList
        ) {
            var reviewListdata = document.getElementById("review-list");
            reviewListdata.insertAdjacentHTML("afterbegin", reviewListHtml);

            var closeBtn = document.getElementById("review-close");
            closeBtn.click();
            editReviewList();
        } else if (
            reviewTitleInput.value !== "" && rateVal &&
            reviewDescInput.value !== "" && editList
        ) {
            var getEditid = 0;
            getEditid = document.getElementById("id-field").value;
            document.getElementById(getEditid).querySelector('.rate-num').innerHTML = parseFloat(rateVal).toFixed(1);
            document.getElementById(getEditid).querySelector('.review-title').innerHTML = reviewTitleInput.value;
            document.getElementById(getEditid).querySelector('.review-desc').innerHTML = reviewDescInput.value;
            document.getElementById(getEditid).querySelector('.review-gallery-img').innerHTML = "";
            

            document.querySelectorAll("#dropzone-preview .dz-image-preview").forEach(function (item) {
                var thumbnailImg = item.querySelector('[data-dz-thumbnail]');
                var thumbnailImgName = item.querySelector('[data-dz-name]').innerHTML;
                document.getElementById(getEditid).querySelector('.review-gallery-img').innerHTML += '<a href="#" class="avatar-md mt-3">\
                <div class="avatar-title bg-light rounded">\
                    <img src="'+ thumbnailImg.src + '" alt="'+thumbnailImgName+'" class="product-img avatar-sm">\
                </div>\
            </a>';;
            });
            var closeBtn = document.getElementById("review-close");
            closeBtn.click();
        }
        
        return true;
    })
});

document.getElementById("addReview").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

function clearFields() {
    rating.removeAttribute('data-rating');
    rating.setAttribute('title', '');
    rating.querySelector(".star-value").style.width = "0%";
    
    reviewTitleInput.value = '';
    reviewDescInput.value = '';

    document.getElementById('dropzone-preview').innerHTML = "";
};

// Remove product from cart
var removeProduct = document.getElementById('removeItemModal')
if (removeProduct)
removeProduct.addEventListener('show.bs.modal', function (e) {
    document.getElementById('remove-product').addEventListener('click', function (event) {
        e.relatedTarget.closest('.review-list').remove();
        document.getElementById("close-modal-review").click();
    });
});

function editReviewList() {
    Array.from(document.querySelectorAll("#review-list .review-list")).forEach(function (item) {
        item.querySelector('.edit-item-list').addEventListener('click', function(event){
            editList = true;
            var getEditid = item.getAttribute('id');
            document.getElementById("id-field").value = getEditid;
            reviewTitleInput.value = item.querySelector(".review-title").innerHTML;
            reviewDescInput.value = item.querySelector(".review-desc").innerHTML;

            if(item.querySelectorAll('.review-gallery-img .product-img')){
                item.querySelectorAll('.review-gallery-img .product-img').forEach(function(elem){
                    
                    var mockFile = { name: elem.getAttribute("alt"), size: 12345 };
                    dropzone.options.addedfile.call(dropzone, mockFile);
                    dropzone.options.thumbnail.call(dropzone, mockFile, elem.src);
                    
                })
            }

            basicRating.setRating(parseFloat(item.querySelector(".rate-num").innerHTML));
        });
    });
}

editReviewList();