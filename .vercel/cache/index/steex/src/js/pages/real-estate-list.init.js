/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: real estate list Init Js File
*/

// Dropzone
var dropzonePreviewNode = document.querySelector("#property-preview-list");
dropzonePreviewNode.id = "";
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone(".property-dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#property-preview",
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
        "id",
        "propert_Name",
        "address",
        "bedroom",
        "bathroom",
        "propert_type",
        "sqft",
        "agents",
        "amount",
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
var propertyList = new List("propertyList", options).on("updated", function (list) {
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

const goToPage = (targetPage) => {
    const activePage = document.querySelector(".pagination.listjs-pagination .active");
    const nextPage = targetPage === "next" ? activePage.nextElementSibling : activePage.previousElementSibling;

    if (nextPage) {
        nextPage.children[0].click();
    }
};

document.querySelector(".pagination-next").addEventListener("click", () => {
    if (document.querySelector(".pagination.listjs-pagination")) {
        goToPage("next");
    }
});

document.querySelector(".pagination-prev").addEventListener("click", () => {
    if (document.querySelector(".pagination.listjs-pagination")) {
        goToPage("prev");
    }
});

const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
    var json_records = JSON.parse(this.responseText);
    Array.from(json_records).forEach(function (element) {
        propertyList.add({
            id: '<a href="/apps/real-estate/property_overview" class="fw-medium link-primary">#TBS' + element.id + '</a>',
            propert_Name: '<img src="' + element.property[0].img + '" alt="' + element.property[0].img_alt + '" class="rounded avatar-sm object-fit-cover d-none"><a href="/apps/real-estate/property_overview" class="text-reset">' + element.property[0].title + '</a>',
            address: element.location,
            bedroom: element.facility[0].bedroom,
            bathroom: element.facility[0].bathroom,
            propert_type: element.property[0].type,
            sqft: element.facility[0].area,
            agents: element.agent,
            amount: '<span class="fw-medium">' + element.price + '</span>',
            status: isStatus(element.requirement),
        });
        propertyList.sort('id', { order: "desc" });
    });
    propertyList.remove("id", `<a href="/apps/real-estate/property_overview" class="fw-medium link-primary">#TBS01</a>`);
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/property-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    propertyList.items.slice(-1)[0]._values.id,
    "text/html"
);

function isStatus(val) {
    switch (val) {
        case "Sale":
            return ('<span class="badge bg-danger-subtle text-danger">' + val + "</span>");
        case "Rent":
            return ('<span class="badge bg-info-subtle text-info">' + val + "</span>");
    }
}

document.getElementById("addProperty").addEventListener("show.bs.modal", function (e) {
    if (e.relatedTarget.classList.contains("edit-item-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit Property list";
        document.getElementById("addProperty").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Update";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add Property list";
        document.getElementById("addProperty").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Add Property";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List product";
        document.getElementById("addProperty").querySelector(".modal-footer").style.display = "none";
    }
});

var idFieldInput = document.getElementById("id-field");
var propertyTitleInput = document.getElementById("property-title-input");
var propertyTypeInput = document.getElementById("property-type-input");
var bedroomInput = document.getElementById("bedroom-input");
var bathroomInput = document.getElementById("bathroom-input");
var sqftInput = document.getElementById("sqft-input");
var propertyPriceInput = document.getElementById("property-price-input");
var agentNameInput = document.getElementById("agent-name-input");
var requirementInput = document.getElementById("requirement-input");
var addressInput = document.getElementById("addressLine-input");
var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

var propertyTypeVal = new Choices(propertyTypeInput, {
    searchEnabled: false,
    removeItemButton: true
});

var requirementVal = new Choices(requirementInput, {
    searchEnabled: false,
    removeItemButton: true
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
            let imageElement = new DOMParser().parseFromString(document.querySelectorAll('.dz-image-preview')[0].innerHTML, "text/html");
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
        } else if (propertyTitleInput.value == "") {
            text = "Please enter a property title";
            errorMsg.innerHTML = text;
            return false;
        } else if (propertyTypeInput.value == "") {
            text = "Please select a property type";
            errorMsg.innerHTML = text;
            return false;
        } else if (bedroomInput.value == "") {
            text = "Please enter a no. of bedroom";
            errorMsg.innerHTML = text;
            return false;
        } else if (bathroomInput.value == "") {
            text = "Please enter a no. of bathroom";
            errorMsg.innerHTML = text;
            return false;
        } else if (sqftInput.value == "") {
            text = "Please enter a no. of sqft area";
            errorMsg.innerHTML = text;
            return false;
        } else if (propertyPriceInput.value == "") {
            text = "Please enter a price";
            errorMsg.innerHTML = text;
            return false;
        } else if (agentNameInput.value == "") {
            text = "Please enter a agent name";
            errorMsg.innerHTML = text;
            return false;
        } else if (requirementInput.value == "") {
            text = "Please select a requirement";
            errorMsg.innerHTML = text;
            return false;
        } else if (addressInput.value == "") {
            text = "Please enter a sort address";
            errorMsg.innerHTML = text;
            return false;
        }

        if (
            propertyTitleInput.value !== "" &&
            propertyTypeInput.value !== "" &&
            bedroomInput.value !== "" && bathroomInput.value !== "" &&
            sqftInput.value !== "" && propertyPriceInput.value !== "" &&
            agentNameInput.value !== "" && requirementInput.value !== "" && addressInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && !editList
        ) {
            propertyList.add({
                id: '<a href="/apps/real-estate/property_overview" class="fw-medium link-primary">#TBS' + count + '</a>',
                propert_Name: '<img src="' + imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="rounded avatar-sm object-fit-cover d-none"><a href="/apps/real-estate/property_overview" class="text-reset">' + propertyTitleInput.value + '</a>',
                address: addressInput.value,
                bedroom: bedroomInput.value,
                propert_type: propertyTypeInput.value,
                sqft: sqftInput.value,
                agents: agentNameInput.value,
                amount: '<span class="fw-medium">$' + propertyPriceInput.value + '</span>',
                status: isStatus(requirementInput.value),
            });
            propertyList.sort('id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addPropertyModal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Property Detail inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } else if (
            propertyTitleInput.value !== "" &&
            propertyTypeInput.value !== "" &&
            bedroomInput.value !== "" && bathroomInput.value !== "" &&
            sqftInput.value !== "" && propertyPriceInput.value !== "" &&
            agentNameInput.value !== "" && requirementInput.value !== "" && addressInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var editValues = propertyList.get({
                id: idFieldInput.value,
            });

            Array.from(editValues).forEach(function (x) {
                var isId = new DOMParser().parseFromString(x._values.id, "text/html");
                var selectedId = isId.body.firstElementChild.innerHTML;
                if (selectedId == itemId) {
                    x.values({
                        id: `<a href="/apps/real-estate/property_overview" class="fw-medium link-primary"> ${idFieldInput.value} </a>`,
                        propert_Name: `<img src="${imageDom.src}" alt="${imageDom.getAttribute('alt')}" class="rounded avatar-sm object-fit-cover d-none"><a href="/apps/real-estate/property_overview" class="text-reset">${propertyTitleInput.value}</a>`,
                        address: addressInput.value,
                        bedroom: bedroomInput.value,
                        propert_type: propertyTypeInput.value,
                        sqft: sqftInput.value,
                        agents: agentNameInput.value,
                        amount: `<span class="fw-medium">$ ${propertyPriceInput.value}</span>`,
                        status: isStatus(requirementInput.value),
                    });
                }
            });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addPropertyModal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Property Detail updated Successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        }

        return true;
    });
});

// clearFields
function clearFields() {
    editList = false;
    idFieldInput.value = "";
    document.getElementById('property-preview').innerHTML = "";
    propertyTitleInput.value = "";
    propertyTypeInput.value = "";
    bedroomInput.value = "";
    bathroomInput.value = "";
    sqftInput.value = "";
    propertyPriceInput.value = "";
    agentNameInput.value = "";
    requirementInput.value = "";
    addressInput.value = ""

    // propertyTypeVal
    if (propertyTypeVal) propertyTypeVal.destroy();
    propertyTypeVal = new Choices(propertyTypeInput, {
        searchEnabled: false,
        removeItemButton: true
    });

    // requirementVal
    if (requirementVal) requirementVal.destroy();
    requirementVal = new Choices(requirementInput, {
        searchEnabled: false,
        removeItemButton: true
    });
}

document.getElementById("addProperty").addEventListener("hidden.bs.modal", function () {
    clearFields();
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
                var itemValues = propertyList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteId = new DOMParser().parseFromString(x._values.id, "text/html");

                    var isElem = deleteId.body.firstElementChild;
                    var isDeleteId = deleteId.body.firstElementChild.innerHTML;

                    if (isDeleteId == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            propertyList.remove("id", isElem.outerHTML);
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
                var itemValues = propertyList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var isId = new DOMParser().parseFromString(x._values.id, "text/html");
                    var selectedId = isId.body.firstElementChild.innerHTML;

                    if (selectedId == itemId) {
                        editList = true;
                        idFieldInput.value = selectedId;

                        var propertyTitleDom = new DOMParser().parseFromString(x._values.propert_Name, "text/html");
                        propertyTitleInput.value = propertyTitleDom.body.querySelector('.text-reset').innerHTML;

                        bedroomInput.value = x._values.bedroom;
                        bathroomInput.value = x._values.bathroom;
                        sqftInput.value = x._values.sqft;

                        var amountDom = new DOMParser().parseFromString(x._values.amount, "text/html");
                        propertyPriceInput.value = amountDom.body.querySelector('span').innerHTML.split("$")[1];

                        agentNameInput.value = x._values.agents;
                        addressInput.value = x._values.address;

                        // propertyTypeVal
                        if (propertyTypeVal) propertyTypeVal.destroy();
                        propertyTypeVal = new Choices(propertyTypeInput, {
                            searchEnabled: false,
                            removeItemButton: true
                        });
                        propertyTypeVal.setChoiceByValue(x._values.propert_type);
                        propertyTypeInput.value = x._values.propert_type;

                        // requirementVal
                        var requirementDom = new DOMParser().parseFromString(x._values.status, "text/html");
                        var requirementDomVal = requirementDom.body.querySelector('span').innerHTML
                        if (requirementVal) requirementVal.destroy();
                        requirementVal = new Choices(requirementInput, {
                            searchEnabled: false,
                            removeItemButton: true
                        });
                        requirementVal.setChoiceByValue(requirementDomVal);

                        document.getElementById('property-preview').innerHTML = "";
                        var mockFile = { name: propertyTitleDom.body.querySelector('img').getAttribute('alt'), size: 12345 };
                        dropzone.options.addedfile.call(dropzone, mockFile);
                        dropzone.options.thumbnail.call(dropzone, mockFile, propertyTitleDom.body.querySelector('img').src);
                    }
                });
            });
        });
    }
}

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
                    propertyList.remove("id", `<a href="/apps/real-estate/property_overview" class="fw-medium link-primary">${ids_array[i]}</a>`);
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