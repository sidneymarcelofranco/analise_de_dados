/*
   Template Name: Steex - Admin & Dashboard Template
   Author: Themesbrand
   Website: https://Themesbrand.com/
   Contact: Themesbrand@gmail.com
   File: Learning instructors list init js
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

var totalInstructorsChart = "";
var totalCoursesChart = "";
var instructorActivityChart = "";
function loadCharts() {
    //  totalInstructors
    var totalInstructorsColors = "";
    totalInstructorsColors = getChartColorsArray("total_instructors");
    if (totalInstructorsColors) {
        var options = {
            series: [84],
            chart: {
                height: 170,
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '75%'
                    },
                    track: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Instructor Total'],
            colors: totalInstructorsColors,
            responsive: [{
                breakpoint: 1600,
                options: {
                    chart: {
                        height: 150,
                    }
                },
            }]
            
        };

        if (totalInstructorsChart != "")
            totalInstructorsChart.destroy();
        totalInstructorsChart = new ApexCharts(document.querySelector("#total_instructors"), options);
        totalInstructorsChart.render();
    }

    //  total_courses
    var totalCoursesColors = "";
    totalCoursesColors = getChartColorsArray("total_courses");
    if (totalCoursesColors) {
        var options = {
            series: [33],
            chart: {
                height: 170,
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '75%'
                    },
                    track: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Instructor Total'],
            colors: totalCoursesColors,
            responsive: [{
                breakpoint: 1600,
                options: {
                    chart: {
                        height: 150,
                    }
                },
            }]
        };

        if (totalCoursesChart != "")
            totalCoursesChart.destroy();
        totalCoursesChart = new ApexCharts(document.querySelector("#total_courses"), options);
        totalCoursesChart.render();
    }

    //  instuctor_activity Charts
    var instructorActivityColors = "";
    instructorActivityColors = getChartColorsArray("instuctor_activity");
    if (instructorActivityColors) {
        var options = {
            series: [{
                name: "New Orders",
                data: [32, 18, 13, 17, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69, 72, 83, 90, 110, 130, 117, 103, 92, 95, 119, 80, 96, 116, 125]
            }, {
                name: "Return Orders",
                data: [3, 6, 2, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29, 32, 41, 34, 29, 37, 70, 55, 49, 36, 30, 52, 38, 33]
            }],
            chart: {
                height: 190,
                type: 'line',
                // zoom: {
                //     enabled: false
                // },
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'right',
            },
            grid: {
                yaxis: {
                    lines: {
                        show: false
                    }
                },
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
            colors: instructorActivityColors,
            xaxis: {
                type: 'datetime',
                categories: ['02/01/2023 GMT', '02/02/2023 GMT', '02/03/2023 GMT', '02/04/2023 GMT',
                    '02/05/2023 GMT', '02/06/2023 GMT', '02/07/2023 GMT', '02/08/2023 GMT', '02/09/2023 GMT', '02/10/2023 GMT', '02/11/2023 GMT', '02/12/2023 GMT', '02/13/2023 GMT',
                    '02/14/2023 GMT', '02/15/2023 GMT', '02/16/2023 GMT', '02/17/2023 GMT', '02/18/2023 GMT', '02/19/2023 GMT', '02/20/2023 GMT', '02/21/2023 GMT', '02/22/2023 GMT',
                    '02/23/2023 GMT', '02/24/2023 GMT', '02/25/2023 GMT', '02/26/2023 GMT', '02/27/2023 GMT', '02/28/2023 GMT'
                ]
            },
            yaxis: {
                show: false,
            }
        };

        if (instructorActivityChart != "")
            instructorActivityChart.destroy();
        instructorActivityChart = new ApexCharts(document.querySelector("#instuctor_activity"), options);
        instructorActivityChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();

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

            if (checkboxes[i].closest("tr").classList.contains("table-active")) {
                (checkedCount > 0) ? document.getElementById("remove-actions").classList.add("d-none") : document.getElementById("remove-actions").classList.remove("d-none");
            } else {
                (checkedCount > 0) ? document.getElementById("remove-actions").classList.add("d-none") : document.getElementById("remove-actions").classList.remove("d-none");
            }
        }
    };
}

var perPage = 10;
var editList = false;

//instructorList Table
var options = {
    valueNames: [
        "instructor_id",
        "instructor",
        "courses_total",
        "email",
        "experience",
        "students",
        "contact",
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
var instructorList = new List("instructorList", options).on("updated", function (list) {
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
        instructorList.add({
            instructor_id: '<a href="/apps/learning/instructors/overview" class="fw-medium link-primary">#TBSI1590' + element.id + '</a>',
            instructor: '<div class="d-flex align-items-center gap-2">\
                <img src="'+ element.instructor[0].img + '" alt="' + element.instructor[0].img_alt + '" class="avatar-xxs rounded-circle">\
                <a href="/apps/learning/courses/overview" class="text-reset">'+ element.instructor[0].name + '</a>\
            </div>',
            courses_total: element.total_course,
            email: element.email,
            experience: element.experience,
            students: element.students,
            contact: element.contact,
            rating: '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' + element.rating + '</span>',
            status: isStatus(element.status),
        });
        instructorList.sort('instructor_id', { order: "desc" });
    });
    instructorList.remove("instructor_id", `<a href="/apps/learning/instructors/overview" class="fw-medium link-primary">#TBSI159001</a>`);
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/instructors-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    instructorList.items.slice(-1)[0]._values.instructor_id,
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
        case "Active":
            return (
                '<span class="badge bg-success-subtle text-success">' + val + '</span>'
            );
        case "Unactive":
            return (
                '<span class="badge bg-danger-subtle text-danger">' + val + '</span>'
            );
    }
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

refreshCallbacks();

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

        if (
            instructorNameInput.value !== "" &&
            totalCourseInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            studentsInput.value !== "" &&
            experienceInput.value !== "" && contactInput.value !== "" &&
            statusInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && !editList
        ) {
            instructorList.add({
                instructor_id: '<a href="/apps/learning/instructors/overview" class="fw-medium link-primary">#TBSI1590' + count + '</a>',
                instructor: '<div class="d-flex align-items-center gap-2">\
                    <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xxs rounded-circle">\
                    <a href="/apps/learning/instructors/overview" class="text-reset">'+ instructorNameInput.value + '</a>\
                </div>',
                courses_total: totalCourseInput.value,
                email: emailInput.value,
                experience: experienceInput.value,
                students: studentsInput.value,
                contact: contactInput.value,
                rating: '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value"> --</span>',
                status: isStatus(statusInput.value),
            });
            instructorList.sort('instructor_id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addInstructorModal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Instructors detail inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } else if (
            instructorNameInput.value !== "" &&
            totalCourseInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            studentsInput.value !== "" &&
            experienceInput.value !== "" && contactInput.value !== "" &&
            statusInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var editValues = instructorList.get({
                instructor_id: idFieldInput.value,
            });

            Array.from(editValues).forEach(function (x) {
                isid = new DOMParser().parseFromString(x._values.instructor_id, "text/html");
                var selectedid = isid.body.firstElementChild.innerHTML;
                if (selectedid == itemId) {
                    x.values({
                        instructor_id: '<a href="javascript:void(0)" class="fw-medium link-primary">' + idFieldInput.value + '</a>',
                        instructor: '<div class="d-flex align-items-center gap-2">\
                            <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xxs rounded-circle">\
                            <a href="/apps/learning/instructors/overview" class="text-reset">'+ instructorNameInput.value + '</a>\
                        </div>',
                        courses_total: totalCourseInput.value,
                        email: emailInput.value,
                        experience: experienceInput.value,
                        students: studentsInput.value,
                        contact: contactInput.value,
                        rating: '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' + document.getElementById("rating-field").value + '</span>',
                        status: isStatus(statusInput.value),
                    });
                }
            });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addInstructorModal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Instructors details updated Successfully!',
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
                var itemValues = instructorList.get({
                    instructor_id: itemId,
                });


                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.instructor_id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;

                    if (selectedid == itemId) {
                        editList = true;
                        document.getElementById("addInstructorModalLabel").innerHTML = "Edit Instructor Details";
                        document.getElementById("add-btn").innerHTML = "Update";
                        idFieldInput.value = selectedid;


                        var instructorDom = new DOMParser().parseFromString(x._values.instructor, "text/html");
                        instructorNameInput.value = instructorDom.body.querySelector('.text-reset').innerHTML;

                        emailInput.value = x._values.email;
                        totalCourseInput.value = x._values.courses_total;
                        experienceInput.value = x._values.experience;
                        studentsInput.value = x._values.students;
                        contactInput.value = x._values.contact;

                        // statusTypeVal
                        var statusDom = new DOMParser().parseFromString(x._values.status, "text/html");
                        if (statusVal) statusVal.destroy();
                        statusVal = new Choices(statusInput, {
                            searchEnabled: false
                        });
                        statusVal.setChoiceByValue(statusDom.body.querySelector(".badge").innerHTML);
                        document.getElementById('dropzone-preview').innerHTML = "";
                        var mockFile = { name: instructorDom.body.querySelector('img').getAttribute('alt'), size: 12345 };
                        dropzone.options.addedfile.call(dropzone, mockFile);
                        dropzone.options.thumbnail.call(dropzone, mockFile, instructorDom.body.querySelector('img').src);

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
                var itemValues = instructorList.get({
                    instructor_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteid = new DOMParser().parseFromString(x._values.instructor_id, "text/html");

                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;

                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            instructorList.remove("instructor_id", isElem.outerHTML);
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
    document.getElementById("addInstructorModalLabel").innerHTML = "Add Instructor";
    document.getElementById("add-btn").innerHTML = "Add Instructor";

    idFieldInput.value = "";
    document.getElementById('dropzone-preview').innerHTML = "";
    instructorNameInput.value = "";
    totalCourseInput.value = "";
    emailInput.value = "";
    studentsInput.value = "";
    experienceInput.value = "";
    contactInput.value = "";
    statusInput.value = "";
    document.getElementById("rating-field").value = "";

    // statusTypeVal
    if (statusVal) statusVal.destroy();
    statusVal = new Choices(statusInput, {
        searchEnabled: false
    });
}

document.getElementById("addInstructor").addEventListener("hidden.bs.modal", function () {
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
                    instructorList.remove("instructor_id", `<a href="/apps/learning/instructors/overview" class="fw-medium link-primary">${ids_array[i]}</a>`);
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