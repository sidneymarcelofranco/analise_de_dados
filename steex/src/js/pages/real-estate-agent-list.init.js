/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: real estate agent list Init Js File
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

// checkAll
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
        "agent_id",
        "joining_date",
        "agent_Name",
        "address",
        "email",
        "propert_type",
        "contact",
        "status",
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
var agentList = new List("agentList", options).on("updated", function (list) {
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
        agentList.add({
            agent_id: '<a href="/apps/real-estate/agent/overview" class="fw-medium link-primary">#TBS' + element.id + '</a>',
            joining_date: element.joining_date,
            agent_Name: '<div class="d-flex align-items-center gap-2">\
                <img src="'+ element.agent[0].img + '" alt="' + element.agent[0].img_alt + '" class="avatar-xs rounded">\
                <a href="/apps/real-estate/agent/overview" class="text-reset text-capitalize">'+ element.agent[0].name + '</a>\
            </div>',
            address: element.location,
            email: element.email,
            contact: element.contact,
            status: isStatus(element.status),
        });
        agentList.sort('agent_id', { order: "desc" });
    });
    agentList.remove("agent_id", `<a href="/apps/real-estate/agent/overview" class="fw-medium link-primary">#TBS01</a>`);
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/agent-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    agentList.items.slice(-1)[0]._values.agent_id,
    "text/html"
);

function isStatus(val) {
    switch (val) {
        case "Active":
            return (
                '<span class="badge bg-success-subtle text-success">' +
                val +
                "</span>"
            );
        case "Unactive":
            return (
                '<span class="badge bg-danger-subtle text-danger">' +
                val +
                "</span>"
            );
    }
}

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

var idFieldInput = document.getElementById("id-field");
var agentNameInput = document.getElementById("agent-name-input");
var emailInput = document.getElementById("email-input");
var contactInput = document.getElementById("contact-input");
var statusInput = document.getElementById("status-type-input");
var addressInput = document.getElementById("address-input");

var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

var statusTypeVal = new Choices(statusInput, {
    searchEnabled: false,
    removeItemButton: true
});

// date & time
var date = new Date().toUTCString().slice(5, 16);
// tablelist-form
var count = 14;
// tablelist form submit event
var forms = document.querySelectorAll('.tablelist-form')
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (document.querySelector('.dz-image-preview')) {
            let imageElement = new DOMParser().parseFromString(document.querySelectorAll('.dz-image-preview')[0].innerHTML, "text/html");
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
        } else if (agentNameInput.value == "") {
            text = "Please enter a agent name";
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
        } else if (statusInput.value == "") {
            text = "Please select a status";
            errorMsg.innerHTML = text;
            return false;
        } else if (addressInput.value == "") {
            text = "Please enter a address";
            errorMsg.innerHTML = text;
            return false;
        }

        if (
            agentNameInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            contactInput.value !== "" && addressInput.value !== "" &&
            statusInput.value !== "" && document.querySelectorAll(".dz-image-preview").length > 0 && !editList
        ) {
            agentList.add({
                agent_id: '<a href="/apps/real-estate/agent/overview" class="fw-medium link-primary">#TBS' + count + '</a>',
                joining_date: date,
                agent_Name: '<div class="d-flex align-items-center gap-2">\
                    <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xs rounded">\
                    <a href="/apps/real-estate/agent/overview" class="text-reset text-capitalize">'+ agentNameInput.value + '</a>\
                </div>',
                address: addressInput.value,
                email: emailInput.value,
                contact: contactInput.value,
                status: isStatus(statusInput.value),
            });
            agentList.sort('agent_id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addAgentModal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Agent detail inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } else if (
            agentNameInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            contactInput.value !== "" && addressInput.value !== "" &&
            statusInput.value !== "" && document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var editValues = agentList.get({
                agent_id: idFieldInput.value,
            });

            Array.from(editValues).forEach(function (x) {
                isid = new DOMParser().parseFromString(x._values.agent_id, "text/html");
                var selectedid = isid.body.firstElementChild.innerHTML;
                if (selectedid == itemId) {
                    x.values({
                        agent_id: '<a href="/apps/real-estate/agent/overview" class="fw-medium link-primary">' + idFieldInput.value + '</a>',
                        joining_date: document.getElementById("date-input").value,
                        agent_Name: '<div class="d-flex align-items-center gap-2">\
                            <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="avatar-xs rounded">\
                            <a href="/apps/real-estate/agent/overview" class="text-reset text-capitalize">'+ agentNameInput.value + '</a>\
                        </div>',
                        address: addressInput.value,
                        email: emailInput.value,
                        contact: contactInput.value,
                        status: isStatus(statusInput.value),
                    });
                }
            });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addAgentModal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Agent Detail updated Successfully!',
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

    // removeBtns
    if (removeBtns) {
        Array.from(removeBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText;
                itemId = e.target.closest("tr").children[1].innerText;
                var itemValues = agentList.get({
                    agent_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteid = new DOMParser().parseFromString(x._values.agent_id, "text/html");

                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;

                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            agentList.remove("agent_id", isElem.outerHTML);
                            document.getElementById("deleteRecord-close").click();
                        });
                    }
                });
            });
        });
    }

    // editBtns
    if (editBtns) {
        Array.from(editBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText;
                itemId = e.target.closest("tr").children[1].innerText;
                var itemValues = agentList.get({
                    agent_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.agent_id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;

                    if (selectedid == itemId) {
                        editList = true;
                        document.getElementById("addAgentModalLabel").innerHTML = "Edit Agent Details";
                        document.getElementById("add-btn").innerHTML = "Update";
                        idFieldInput.value = selectedid;

                        var agentNameDom = new DOMParser().parseFromString(x._values.agent_Name, "text/html");
                        agentNameInput.value = agentNameDom.body.querySelector('.text-reset').innerHTML;

                        emailInput.value = x._values.email;
                        contactInput.value = x._values.contact;

                        // statusTypeVal
                        var statusDom = new DOMParser().parseFromString(x._values.status, "text/html");
                        if (statusTypeVal) statusTypeVal.destroy();
                        statusTypeVal = new Choices(statusInput, {
                            searchEnabled: false,
                            removeItemButton: true
                        });
                        statusTypeVal.setChoiceByValue(statusDom.body.querySelector(".badge").innerHTML);

                        addressInput.value = x._values.address;

                        document.getElementById("date-input").value = x._values.joining_date;

                        document.getElementById('dropzone-preview').innerHTML = "";
                        var mockFile = { name: agentNameDom.body.querySelector('img').getAttribute('alt'), size: 12345 };
                        dropzone.options.addedfile.call(dropzone, mockFile);
                        dropzone.options.thumbnail.call(dropzone, mockFile, agentNameDom.body.querySelector('img').src);
                    }
                });
            });
        });
    }
}

// clearFields
function clearFields() {
    editList = false;
    document.getElementById("addAgentModalLabel").innerHTML = "Add Agent";
    document.getElementById("add-btn").innerHTML = "Add";
    idFieldInput.value = "";
    document.getElementById('dropzone-preview').innerHTML = "";
    agentNameInput.value = "";
    emailInput.value = "";
    contactInput.value = "";
    addressInput.value = "";
    document.getElementById("date-input").value = "";

    // statusTypeVal
    if (statusTypeVal) statusTypeVal.destroy();
    statusTypeVal = new Choices(statusInput, {
        searchEnabled: false,
        removeItemButton: true
    });
}

document.getElementById("addAgent").addEventListener("hidden.bs.modal", function () {
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
                    agentList.remove("agent_id", `<a href="/apps/real-estate/agent/overview" class="fw-medium link-primary">${ids_array[i]}</a>`);
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