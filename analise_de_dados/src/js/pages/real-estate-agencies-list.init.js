/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: real estate agencies list Init Js File
*/

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

const checkAll = document.getElementById("checkAll");
if (checkAll) {
    checkAll.addEventListener("click", handleCheckAll);
}

function handleCheckAll() {
    const checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
    const checkedCount = document.querySelectorAll('.form-check-all input[type="checkbox"]:checked').length;
    const isChecked = this.checked;

    checkboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
        updateRowStyle(checkbox);
    });

    updateRemoveActionsVisibility(checkedCount);
}

function updateRowStyle(checkbox) {
    const row = checkbox.closest("tr");
    if (checkbox.checked)
        row.classList.add("table-active");
    else
        row.classList.remove("table-active");
}

function updateRemoveActionsVisibility(checkedCount) {
    const removeActions = document.getElementById("remove-actions");
    if (checkedCount > 0)
        removeActions.classList.add("d-none");
    else
        removeActions.classList.remove("d-none");
}
var perPage = 10;
var editList = false;

//list Table
var options = {
    valueNames: [
        "agencies_id",
        "since",
        "agencies_Name",
        "address",
        "total_property",
        "employee",
        "email",
        "contact"
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
var agencyList = new List("agenciesList", options).on("updated", function (list) {
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
        agencyList.add({
            agencies_id: '<a href="/apps/real-estate/agencies/overview" class="fw-medium link-primary">#TBA0' + element.id + '</a>',
            since: element.since,
            agencies_Name: '<div class="d-flex align-items-center gap-2">\
                <img src="'+ element.agency[0].img + '" alt="' + element.agency[0].img_alt + '" class="avatar-xxs rounded">\
                <a href="/apps/real-estate/agencies/overview" class="text-reset text-capitalize">'+ element.agency[0].name + '</a>\
            </div>',
            address: element.location,
            total_property: element.property,
            employee: element.employee,
            email: element.email,
            contact: element.contact,
        });
        agencyList.sort('agencies_id', { order: "desc" });
    });
    agencyList.remove("agencies_id", `<a href="/apps/real-estate/agencies/overview" class="fw-medium link-primary">#TBA001</a>`);
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/agency-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    agencyList.items.slice(-1)[0]._values.agencies_id,
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

// sortble-dropdown
var sorttableDropdown = document.querySelectorAll('.sortble-dropdown');
if (sorttableDropdown) {
    sorttableDropdown.forEach(function (elem) {
        elem.querySelectorAll('.dropdown-menu .dropdown-item').forEach(function (item) {
            item.addEventListener('click', function () {
                var getHtml = item.innerHTML;
                elem.querySelector('.dropdown-title').innerHTML = getHtml;
            });
        });
    });
}

var idFieldInput = document.getElementById("id-field");
var agencyNameInput = document.getElementById("agencies-name-input");
var sinceInput = document.getElementById("since-input");
var propertyInput = document.getElementById("property-input");
var employeeInput = document.getElementById("employee-input");
var emailInput = document.getElementById("email-input");
var contactInput = document.getElementById("contact-input");
var addressInput = document.getElementById("address-input");

var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

// since-input
flatpickr("#since-input", {
    enableTime: true,
    dateFormat: "Y",
    enableTime: false,
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
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (document.querySelectorAll(".dz-image-preview").length == 0) {
            text = "Please select a image";
            errorMsg.innerHTML = text;
            return false;
        } else if (agencyNameInput.value == "") {
            text = "Please enter a agency name";
            errorMsg.innerHTML = text;
            return false;
        } else if (sinceInput.value == "") {
            text = "Please select a since year";
            errorMsg.innerHTML = text;
            return false;
        } else if (propertyInput.value == "") {
            text = "Please enter a no. of property area";
            errorMsg.innerHTML = text;
            return false;
        } else if (employeeInput.value == "") {
            text = "Please enter a no. of employee";
            errorMsg.innerHTML = text;
            return false;
        } else if (!emailInput.value.match(validRegex)) {
            text = "Please enter valid email address";
            errorMsg.innerHTML = text;
            return false;
        } else if (contactInput.value == "") {
            text = "Please enter a contact no";
            errorMsg.innerHTML = text;
            return false;
        } else if (addressInput.value == "") {
            text = "Please enter a address";
            errorMsg.innerHTML = text;
            return false;
        }

        if (
            agencyNameInput.value !== "" &&
            sinceInput.value !== "" &&
            propertyInput.value !== "" &&
            employeeInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            contactInput.value !== "" &&
            addressInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && !editList
        ) {
            agencyList.add({
                agencies_id: '<a href="/apps/real-estate/agencies/overview" class="fw-medium link-primary">#TBA0' + count + '</a>',
                since: sinceInput.value,
                agencies_Name: '<div class="d-flex align-items-center gap-2">\
                    <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xxs rounded">\
                    <a href="/apps/real-estate/agencies/overview" class="text-reset text-capitalize">'+ agencyNameInput.value + '</a>\
                </div>',
                address: addressInput.value,
                total_property: propertyInput.value,
                employee: employeeInput.value,
                email: emailInput.value,
                contact: contactInput.value,
            });
            agencyList.sort('agencies_id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addAgencyModal").click();
            count++;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Agency detail inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } else if (
            agencyNameInput.value !== "" &&
            sinceInput.value !== "" &&
            propertyInput.value !== "" &&
            employeeInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            contactInput.value !== "" &&
            addressInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var editValues = agencyList.get({
                agencies_id: idFieldInput.value,
            });

            Array.from(editValues).forEach(function (x) {
                isid = new DOMParser().parseFromString(x._values.agencies_id, "text/html");
                var selectedid = isid.body.firstElementChild.innerHTML;
                if (selectedid == itemId) {
                    x.values({
                        agencies_id: '<a href="/apps/real-estate/agencies/overview" class="fw-medium link-primary">' + idFieldInput.value + '</a>',
                        since: sinceInput.value,
                        agencies_Name: '<div class="d-flex align-items-center gap-2">\
                            <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xxs rounded">\
                            <a href="/apps/real-estate/agencies/overview" class="text-reset text-capitalize">'+ agencyNameInput.value + '</a>\
                        </div>',
                        address: addressInput.value,
                        total_property: propertyInput.value,
                        employee: employeeInput.value,
                        email: emailInput.value,
                        contact: contactInput.value,
                    });
                }
            });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addAgencyModal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Agency Details updated Successfully!',
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
                var itemValues = agencyList.get({
                    agencies_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.agencies_id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;

                    if (selectedid == itemId) {
                        editList = true;
                        document.getElementById("addAgencyModalLabel").innerHTML = "Edit Agencies Details";
                        document.getElementById("add-btn").innerHTML = "Update";
                        idFieldInput.value = selectedid;

                        var agencyNameDom = new DOMParser().parseFromString(x._values.agencies_Name, "text/html");
                        agencyNameInput.value = agencyNameDom.body.querySelector('.text-reset').innerHTML;

                        sinceInput.value = x._values.since;
                        propertyInput.value = x._values.total_property;
                        employeeInput.value = x._values.employee;
                        emailInput.value = x._values.email;
                        contactInput.value = x._values.contact;
                        addressInput.value = x._values.address;
                        // since-input
                        flatpickr("#since-input", {
                            enableTime: true,
                            dateFormat: "Y",
                            enableTime: false,
                            defaultDate: x._values.date,
                        });
                        document.getElementById('dropzone-preview').innerHTML = "";
                        var mockFile = { name: agencyNameDom.body.querySelector('img').getAttribute('alt'), size: 12345 };
                        dropzone.options.addedfile.call(dropzone, mockFile);
                        dropzone.options.thumbnail.call(dropzone, mockFile, agencyNameDom.body.querySelector('img').src);
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
                var itemValues = agencyList.get({
                    agencies_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteid = new DOMParser().parseFromString(x._values.agencies_id, "text/html");

                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;

                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            agencyList.remove("agencies_id", isElem.outerHTML);
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
    document.getElementById("addAgencyModalLabel").innerHTML = "Add Agencies";
    document.getElementById("add-btn").innerHTML = "Add";
    idFieldInput.value = "";
    document.getElementById('dropzone-preview').innerHTML = "";
    agencyNameInput.value = "";
    sinceInput.value = "";
    propertyInput.value = "";
    employeeInput.value = "";
    emailInput.value = "";
    contactInput.value = "";
    addressInput.value = "";

    flatpickr("#since-input", {
        enableTime: true,
        dateFormat: "Y",
        enableTime: false,
    });
}

document.getElementById("addAgencies").addEventListener("hidden.bs.modal", function () {
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
                    agencyList.remove("agencies_id", `<a href="/apps/real-estate/agencies/overview" class="fw-medium link-primary">${ids_array[i]}</a>`);
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