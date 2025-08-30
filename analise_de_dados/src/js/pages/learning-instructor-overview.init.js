/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Learning instructor overview init js
*/

// get colors array from the string
function getChartColorsArray(chartId) {
    const chartElement = document.getElementById(chartId);
    if (chartElement) {
        const colors = chartElement.dataset.colors;
        if (colors) {
            const parsedColors = JSON.parse(colors);
            const mappedColors = parsedColors.map((value) => {
                const newValue = value.replace(/\s/g, "");
                if (!newValue.includes(",")) {
                    const color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
                    return color || newValue;
                } else {
                    const val = value.split(",");
                    if (val.length === 2) {
                        const rgbaColor = `rgba(${getComputedStyle(document.documentElement).getPropertyValue(val[0])}, ${val[1]})`;
                        return rgbaColor;
                    } else {
                        return newValue;
                    }
                }
            });
            return mappedColors;
        } else {
            console.warn(`data-colors attribute not found on: ${chartId}`);
        }
    }
}

var sessionChartChart = "";
function loadCharts() {
    //  Total Sessions Line Charts
    var sessionChartColors = "";
    sessionChartColors = getChartColorsArray("session_chart");
    if (sessionChartColors) {
        var options = {
            series: [{
                name: "Active Students",
                data: [3, 6, 2, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29, 32, 41, 34, 29, 37, 64, 55, 49, 69, 78, 73, 69, 83]
            }, {
                name: "New Enrollment",
                data: [10, 16, 25, 14, 29, 33, 47, 53, 41, 55, 63, 53, 66, 71, 79, 70, 73, 84, 92, 83, 96, 93, 101, 109, 99, 87, 93, 107]
            }],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 4
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: sessionChartColors,
            xaxis: {
                type: 'datetime',
                categories: ['02/01/2023 GMT', '02/02/2023 GMT', '02/03/2023 GMT', '02/04/2023 GMT',
                    '02/05/2023 GMT', '02/06/2023 GMT', '02/07/2023 GMT', '02/08/2023 GMT', '02/09/2023 GMT', '02/10/2023 GMT', '02/11/2023 GMT', '02/12/2023 GMT', '02/13/2023 GMT',
                    '02/14/2023 GMT', '02/15/2023 GMT', '02/16/2023 GMT', '02/17/2023 GMT', '02/18/2023 GMT', '02/19/2023 GMT', '02/20/2023 GMT', '02/21/2023 GMT', '02/22/2023 GMT',
                    '02/23/2023 GMT', '02/24/2023 GMT', '02/25/2023 GMT', '02/26/2023 GMT', '02/27/2023 GMT', '02/28/2023 GMT'
                ]
            }
        };

        if (sessionChartChart != "")
            sessionChartChart.destroy();
        sessionChartChart = new ApexCharts(document.querySelector("#session_chart"), options);
        sessionChartChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();

//courses Table
var options = {
    valueNames: [
        "course_title",
        "price",
        "duration",
        "students",
        "ratings",
        "status"
    ],
};

// Init list
var coursesListTable = new List("coursesListTable", options).on("updated", function (list) {
    list.matchingItems.length == 0 ?
        (document.getElementsByClassName("noresult")[0].style.display = "block") :
        (document.getElementsByClassName("noresult")[0].style.display = "none");

    if (list.matchingItems.length > 0) {
        document.getElementsByClassName("noresult")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresult")[0].style.display = "block";
    }
});

//studentsListTable
var options = {
    valueNames: [
        "students_name",
        "students_email",
        "students_contact",
        "students_courses",
        "joined_date",
        "students_status"
    ],
};

// Init list
var studentsListTable = new List("studentsListTable", options).on("updated", function (list) {
    list.matchingItems.length == 0 ?
        (document.getElementsByClassName("noresult")[0].style.display = "block") :
        (document.getElementsByClassName("noresult")[0].style.display = "none");

    if (list.matchingItems.length > 0) {
        document.getElementsByClassName("noresult")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresult")[0].style.display = "block";
    }
});

// Dropzone has been added as a global variable.
// Dropzone
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
if (document.querySelector('#basic-rater')) {
    var basicRating = raterJs({
        starSize: 22,
        rating: 0,
        step: 0.5,
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

        var imgHtml = '<div class="d-flex flex-grow-1 gap-2">';
        document.querySelectorAll("#dropzone-preview .dz-image-preview").forEach(function (item) {
            var thumbnailImg = item.querySelector('[data-dz-thumbnail]');
            var thumbnailImgName = item.querySelector('[data-dz-name]');
            imgHtml += '<a href="#" class="avatar-md  mt-3">\
            <div class="avatar-title bg-light rounded">\
                <img src="'+ thumbnailImg.src + '" alt="' + thumbnailImgName + '" class="avatar-sm">\
            </div>\
        </a>';
        });
        imgHtml += '</div>';

        var uniqueid = Math.floor(Math.random() * 100);
        var reviewListHtml = '<li class="review-list py-2"  id="review-' + uniqueid + '">\
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
                        <a href="#!" class="badge bg-secondary-subtle text-secondary"><i class="ph-pencil align-baseline me-1"></i> Edit</a>\
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
        } else if (
            reviewTitleInput.value !== "" && rateVal &&
            reviewDescInput.value !== "" && editList
        ) {
            var getEditid = 0;
            getEditid = document.getElementById("id-field").value;
            document.getElementById(getEditid).querySelector('.rate-num').innerHTML = parseFloat(rateVal).toFixed(1);
            document.getElementById(getEditid).querySelector('.review-title').innerHTML = reviewTitleInput.value;
            document.getElementById(getEditid).querySelector('.review-desc').innerHTML = reviewDescInput.value;
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
        item.querySelector('.edit-item-list').addEventListener('click', function (event) {
            editList = true;
            var getEditid = item.getAttribute('id');
            document.getElementById("id-field").value = getEditid;
            reviewTitleInput.value = item.querySelector(".review-title").innerHTML;
            reviewDescInput.value = item.querySelector(".review-desc").innerHTML;

            if (item.querySelectorAll('.product-img')) {
                item.querySelectorAll('.product-img').forEach(function (elem) {

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