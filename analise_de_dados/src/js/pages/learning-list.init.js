/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: learning list Init Js File
*/

// Course Images
var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
dropzonePreviewNode.id = "";
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone(".course-dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
    });
}

// checkAll
var checkAll = document.getElementById("checkAll");
if (checkAll) {
  checkAll.onclick = function () {
    var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
    var checkedCount = document.querySelectorAll('.form-check-all input[type="checkbox"]:checked').length;

    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = this.checked;
      if (checkboxes[i].checked) {
        checkboxes[i].closest("tr").classList.add("table-active");
      } else {
        checkboxes[i].closest("tr").classList.remove("table-active");
      }
    }

    if (checkedCount > 0) {
      document.getElementById("remove-actions").classList.add("d-none");
    } else {
      document.getElementById("remove-actions").classList.remove("d-none");
    }
  };
}

// price range slider
function rangeSlider() {
    var slider = document.getElementById('product-price-range');
    if (slider) {
        noUiSlider.create(slider, {
            start: [100, 1000], // Handle start position
            step: 10, // Slider moves in increments of '10'
            margin: 20, // Handles must be more than '20' apart
            connect: true, // Display a colored bar between the handles
            behaviour: 'tap-drag', // Move handle on tap, bar is draggable
            range: { // Slider can select '0' to '100'
                'min': 0,
                'max': 2000
            },
            format: wNumb({ decimals: 0, prefix: '$ ' })
        });

        var minCostInput = document.getElementById('minCost'),
            maxCostInput = document.getElementById('maxCost');

        var filterDataAll = '';

        // When the slider value changes, update the input and span
        slider.noUiSlider.on('update', function (values, handle) {
            // var productListupdatedAll = productListData;

            if (handle) {
                maxCostInput.value = values[handle];
            } else {
                minCostInput.value = values[handle];
            }

            var maxvalue = maxCostInput.value.substr(2);
            var minvalue = minCostInput.value.substr(2);
        });

        minCostInput.addEventListener('change', function () {
            slider.noUiSlider.set([null, this.value]);
        });

        maxCostInput.addEventListener('change', function () {
            slider.noUiSlider.set([null, this.value]);
        });
    }
}
rangeSlider();

var perPage = 10;
var editList = false;

//list Table
var options = {
    valueNames: [
        "id",
        "category",
        "course_Name",
        "instructor",
        "lessons",
        "duration",
        "students",
        "fees",
        "rating",
        "status"
    ],
    page: perPage,
    pagination: true,
    plugins: [
        ListPagination({
            left: 2,
            right: 2,
        }),
    ],
};

// Init list
var courseList = new List("coursesList", options).on("updated", function (list) {
    list.matchingItems.length == 0 ?
        (document.getElementsByClassName("noresult")[0].style.display = "block") :
        (document.getElementsByClassName("noresult")[0].style.display = "none");
    var isFirst = list.i == 1;
    var isLast = list.i > list.matchingItems.length - list.page;
    // make the Prev and Nex buttons disabled on first and last pages accordingly
    document.querySelector(".pagination-prev.disabled") ?
        document.querySelector(".pagination-prev.disabled").classList.remove("disabled") : "";
    document.querySelector(".pagination-next.disabled") ?
        document.querySelector(".pagination-next.disabled").classList.remove("disabled") : "";
    if (isFirst) {
        document.querySelector(".pagination-prev").classList.add("disabled");
    }
    if (isLast) {
        document.querySelector(".pagination-next").classList.add("disabled");
    }
    if (list.matchingItems.length <= perPage) {
        document.getElementById("pagination-element").style.display = "none";
    } else {
        document.getElementById("pagination-element").style.display = "flex";
    }

    if (list.matchingItems.length > 0) {
        document.getElementsByClassName("noresult")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresult")[0].style.display = "block";
    }
});

const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
    var json_records = JSON.parse(this.responseText);
    Array.from(json_records).forEach(function (element) {
        courseList.add({
            id: '<a href="javascript:void(0)" class="fw-medium link-primary">' + element.id + '</a>',
            category: '<a href="/apps/learning/courses/grid" class="text-reset">' + element.category + '</a>',
            course_Name: '<div class="d-flex align-items-center gap-2">\
                <img src="'+ element.course[0].img + '" alt="' + element.course[0].img_alt + '" class="avatar-xxs rounded">\
                <a href="/apps/learning/courses/overview" class="text-reset">'+ element.course[0].name + '</a>\
            </div>',
            instructor: element.instructor,
            lessons: element.lessons,
            duration: element.duration,
            students: element.students,
            fees: '<span class="fw-medium">' + element.fees + '</span>',
            rating: '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' + element.rating + '</span>',
            status: isStatus(element.status),
        });
        courseList.sort('id', { order: "desc" });
    });
    courseList.remove("id", `<a href="javascript:void(0)" class="fw-medium link-primary">#TBS001</a>`);
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/courses-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    courseList.items.slice(-1)[0]._values.id,
    "text/html"
);

document.querySelector(".pagination-next").addEventListener("click", function () {
    document.querySelector(".pagination.listjs-pagination") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling != null ?
            document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click() : "" : "";
});

document.querySelector(".pagination-prev").addEventListener("click", function () {
    document.querySelector(".pagination.listjs-pagination") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling != null ?
            document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click() : "" : "";
});

function isStatus(val) {
    switch (val) {
        case "Open":
            return (
                '<span class="badge bg-info-subtle text-info">' + val + '</span>'
            );
        case "Close":
            return (
                '<span class="badge bg-danger-subtle text-danger">' + val + '</span>'
            );
    }
}

var idFieldInput = document.getElementById("id-field");
var courseTitleInput = document.getElementById("course-title-input");
var categoryInput = document.getElementById("course-category-input");
var instructorInput = document.getElementById("instructor-input")
var lessonsInput = document.getElementById("lessons-input");
var studentsInput = document.getElementById("students-input");
var durationInput = document.getElementById("duration-input");
var feesInput = document.getElementById("fees-input");
var statusInput = document.getElementById("status-input");

var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

var categoryVal = new Choices(categoryInput);

var statusVal = new Choices(statusInput, {
    searchEnabled: false
});

// tablelist-form
var count = 14;
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
        if (document.querySelectorAll(".dz-image-preview").length == 0) {
            text = "Please select a image";
            errorMsg.innerHTML = text;
            return false;
        } else if (courseTitleInput.value == "") {
            text = "Please enter a course title";
            errorMsg.innerHTML = text;
            return false;
        } else if (categoryInput.value == "") {
            text = "Please select a course category";
            errorMsg.innerHTML = text;
            return false;
        } else if (instructorInput.value == "") {
            text = "Please enter a instructor name";
            errorMsg.innerHTML = text;
            return false;
        } else if (lessonsInput.value == "") {
            text = "Please enter a no. of lessons";
            errorMsg.innerHTML = text;
            return false;
        } else if (studentsInput.value == "") {
            text = "Please enter a no. of student";
            errorMsg.innerHTML = text;
            return false;
        } else if (durationInput.value == "") {
            text = "Please enter a duration";
            errorMsg.innerHTML = text;
            return false;
        } else if (feesInput.value == "") {
            text = "Please enter a fees amount";
            errorMsg.innerHTML = text;
            return false;
        } else if (statusInput.value == "") {
            text = "Please select a status";
            errorMsg.innerHTML = text;
            return false;
        }

        if (
            courseTitleInput.value !== "" &&
            categoryInput.value !== "" &&
            instructorInput.value !== "" &&
            lessonsInput.value !== "" &&
            studentsInput.value !== "" &&
            durationInput.value !== "" &&
            feesInput.value !== "" &&
            statusInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && !editList
        ) {
            courseList.add({
                id: '<a href="javascript:void(0)" class="fw-medium link-primary">' + count + '</a>',
                category: '<a href="/apps/learning/courses/grid" class="text-reset">' + categoryInput.value + '</a>',
                course_Name: '<div class="d-flex align-items-center gap-2">\
                    <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xxs rounded">\
                    <a href="/apps/learning/courses/overview" class="text-reset">'+ courseTitleInput.value + '</a>\
                </div>',
                instructor: instructorInput.value,
                lessons: lessonsInput.value,
                duration: durationInput.value,
                students: studentsInput.value,
                fees: '<span class="fw-medium">' + feesInput.value + '</span>',
                rating: '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">--</span>',
                status: isStatus(statusInput.value),
            });
            courseList.sort('id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addCourseModal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Course details inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } if (
            courseTitleInput.value !== "" &&
            categoryInput.value !== "" &&
            instructorInput.value !== "" &&
            lessonsInput.value !== "" &&
            studentsInput.value !== "" &&
            durationInput.value !== "" &&
            feesInput.value !== "" &&
            statusInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var editValues = courseList.get({
                id: idFieldInput.value,
            });

            Array.from(editValues).forEach(function (x) {
                isid = new DOMParser().parseFromString(x._values.id, "text/html");
                var selectedid = isid.body.firstElementChild.innerHTML;
                if (selectedid == itemId) {
                    x.values({
                        id: '<a href="javascript:void(0)" class="fw-medium link-primary">' + idFieldInput.value + '</a>',
                        category: '<a href="/apps/learning/courses/grid" class="text-reset">' + categoryInput.value + '</a>',
                        course_Name: '<div class="d-flex align-items-center gap-2">\
                            <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xxs rounded">\
                            <a href="/apps/learning/courses/overview" class="text-reset">'+ courseTitleInput.value + '</a>\
                        </div>',
                        instructor: instructorInput.value,
                        lessons: lessonsInput.value,
                        duration: durationInput.value,
                        students: studentsInput.value,
                        fees: '<span class="fw-medium"> $' + feesInput.value + '</span>',
                        rating: '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' + document.getElementById("rating-field").value + '</span>',
                        status: isStatus(statusInput.value),
                    });
                }
            });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addCourseModal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Course details updated Successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        }

        return true;
    });
});

function ischeckboxcheck() {
    Array.from(document.getElementsByName("chk_child")).forEach(function (x) {
        x.addEventListener("change", function (e) {
            if (x.checked == true) {
                e.target.closest("tr").classList.add("table-active");
            } else {
                e.target.closest("tr").classList.remove("table-active");
            }

            var checkedCount = document.querySelectorAll('[name="chk_child"]:checked').length;
            if (e.target.closest("tr").classList.contains("table-active")) {
                (checkedCount > 0) ? document.getElementById("remove-actions").classList.remove("d-none") : document.getElementById("remove-actions").classList.add("d-none");
            } else {
                (checkedCount > 0) ? document.getElementById("remove-actions").classList.remove("d-none") : document.getElementById("remove-actions").classList.add("d-none");
            }
        });
    });
}

function refreshCallbacks() {
    // editBtns
    if (editBtns) {
        Array.from(editBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText;
                itemId = e.target.closest("tr").children[1].innerText;
                var itemValues = courseList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;

                    if (selectedid == itemId) {
                        editList = true;
                        document.getElementById("addCourseModalLabel").innerHTML = "Edit Course Details";
                        document.getElementById("add-btn").innerHTML = "Update";
                        idFieldInput.value = selectedid;

                        var courseNameDom = new DOMParser().parseFromString(x._values.course_Name, "text/html");
                        courseTitleInput.value = courseNameDom.body.querySelector('.text-reset').innerHTML;

                        instructorInput.value = x._values.instructor;
                        lessonsInput.value = x._values.lessons;
                        studentsInput.value = x._values.students;
                        durationInput.value = x._values.duration;

                        var feesAmountDom = new DOMParser().parseFromString(x._values.fees, "text/html");
                        var feesAmountDomVal = feesAmountDom.body.querySelector(".fw-medium").innerHTML;
                        if(feesAmountDomVal.charAt(0) == "$"){
                            feesInput.value = feesAmountDomVal.split("$")[1];
                        }else{
                            feesInput.value = feesAmountDomVal;
                        }

                        // categoryVal
                        var categoryDom = new DOMParser().parseFromString(x._values.category, "text/html");
                        if (categoryVal) categoryVal.destroy();
                        categoryVal = new Choices(categoryInput);
                        categoryVal.setChoiceByValue(categoryDom.body.querySelector(".text-reset").innerHTML);

                        // statusTypeVal
                        var statusDom = new DOMParser().parseFromString(x._values.status, "text/html");
                        if (statusVal) statusVal.destroy();
                        statusVal = new Choices(statusInput, {
                            searchEnabled: false
                        });
                        statusVal.setChoiceByValue(statusDom.body.querySelector(".badge").innerHTML);

                        document.getElementById('dropzone-preview').innerHTML = "";
                        var mockFile = { name: courseNameDom.body.querySelector('img').getAttribute('alt'), size: 12345 };
                        dropzone.options.addedfile.call(dropzone, mockFile);
                        dropzone.options.thumbnail.call(dropzone, mockFile, courseNameDom.body.querySelector('img').src);

                        // rating value
                        var ratingDom = new DOMParser().parseFromString(x._values.rating, "text/html");
                        document.getElementById("rating-field").value = ratingDom.body.querySelector('.rate-value').innerHTML;
                    }
                });
            });
        });
    }

    // removeBtns
    if (removeBtns) {
        Array.from(removeBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText;
                itemId = e.target.closest("tr").children[1].innerText;
                var itemValues = courseList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteid = new DOMParser().parseFromString(x._values.id, "text/html");

                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;

                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            courseList.remove("id", isElem.outerHTML);
                            document.getElementById("deleteRecord-close").click();
                        });
                    }
                });
            });
        });
    }
}

// clearFields
function clearFields() {
    editList = false;
    document.getElementById("addCourseModalLabel").innerHTML = "Add Course";
    document.getElementById("add-btn").innerHTML = "Add Course";

    idFieldInput.value = "";
    document.getElementById('dropzone-preview').innerHTML = "";
    courseTitleInput.value = "";
    categoryInput.value = "";
    instructorInput.value = "";
    lessonsInput.value = "";
    studentsInput.value = "";
    durationInput.value = "";
    feesInput.value = "";
    statusInput.value = "";
    document.getElementById("rating-field").value = "";

    // categoryVal
    if (categoryVal) categoryVal.destroy();
    categoryVal = new Choices(categoryInput);

    // statusTypeVal
    if (statusVal) statusVal.destroy();
    statusVal = new Choices(statusInput, {
        searchEnabled: false
    });
}

document.getElementById("addCourse").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

function deleteMultiple() {
    ids_array = [];
    var items = document.getElementsByName('chk_child');
    for (i = 0; i < items.length; i++) {
        if (items[i].checked == true) {
            var trNode = items[i].parentNode.parentNode.parentNode;
            var id = trNode.querySelector("td a").innerHTML;
            ids_array.push(id);
        }
    }
    if (typeof ids_array !== 'undefined' && ids_array.length > 0) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-primary w-xs me-2 mt-2',
                cancelButton: 'btn btn-danger w-xs mt-2',
            },
            confirmButtonText: "Yes, delete it!",
            buttonsStyling: false,
            showCloseButton: true
        }).then(function (result) {
            if (result.value) {
                for (i = 0; i < ids_array.length; i++) {
                    courseList.remove("id", `<a href="javascript:void(0)" class="fw-medium link-primary">${ids_array[i]}</a>`);
                }
                document.getElementById("remove-actions").classList.add("d-none");
                document.getElementById("checkAll").checked = false;
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your data has been deleted.',
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-info w-xs mt-2',
                    },
                    buttonsStyling: false
                });
            }
        });
    } else {
        Swal.fire({
            title: 'Please select at least one checkbox',
            confirmButtonClass: 'btn btn-info',
            buttonsStyling: false,
            showCloseButton: true
        });
    }
}