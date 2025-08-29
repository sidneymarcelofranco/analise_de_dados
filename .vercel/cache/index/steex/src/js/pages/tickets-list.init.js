/*
   Template Name: Steex - Admin & Dashboard Template
   Author: Themesbrand
   Website: https://Themesbrand.com/
   Contact: Themesbrand@gmail.com
   File: tickets list init js
*/


const perPage = 10;
var editList = false;

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

//ticketsList Table
var options = {
    valueNames: [
        "tickets_id",
        "assign",
        "ticket_title",
        "client_name",
        "create_date",
        "due_date",
        "priority",
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
const ticketsList = new List("ticketsList", options).on("updated", (list) => {
    if (list.matchingItems.length === 0)
        document.getElementsByClassName("noresult")[0].style.display = "block";
    else
        document.getElementsByClassName("noresult")[0].style.display = "none";

    const isFirst = list.i === 1;
    const isLast = list.i > list.matchingItems.length - list.page;

    // make the Prev and Next buttons disabled on first and last pages accordingly
    const prevBtn = document.querySelector(".pagination-prev.disabled");
    const nextBtn = document.querySelector(".pagination-next.disabled");

    if (prevBtn)
        prevBtn.classList.remove("disabled");

    if (nextBtn)
        nextBtn.classList.remove("disabled");

    if (isFirst)
        document.querySelector(".pagination-prev").classList.add("disabled");

    if (isLast)
        document.querySelector(".pagination-next").classList.add("disabled");

    const paginationElem = document.getElementById("pagination-element");

    if (list.matchingItems.length <= perPage)
        paginationElem.style.display = "none";
    else
        paginationElem.style.display = "flex";

    if (list.matchingItems.length > 0)
        document.getElementsByClassName("noresult")[0].style.display = "none";
    else
        document.getElementsByClassName("noresult")[0].style.display = "block";
});

const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
    var json_records = JSON.parse(this.responseText);
    Array.from(json_records).forEach(function (element) {
        var assignedElem = element.assignedto;
        var showElem = 3;
        var imgHtml = '<div class="avatar-group flex-nowrap">';
        Array.from(assignedElem.slice(0, showElem)).forEach(function (img) {
            imgHtml += `<a href="javascript:void(0);" class="avatar-group-item" data-img="${img.assigneeImg}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${img.assigneeName}">
          <img src="${img.assigneeImg}" alt="" class="rounded-circle avatar-xxs" />
        </a>`;
        });
        if (assignedElem.length > showElem) {
            var elemLength = assignedElem.length - showElem;
            imgHtml += `<a href="javascript:void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${elemLength} More">
            <div class="avatar-xxs">
                <div class="avatar-title rounded-circle">${elemLength}+</div>
            </div>
            </a>`;
        }
        imgHtml += '</div>';


        ticketsList.add({
            tickets_id: `<a href="/apps/support-tickets/overview" class="fw-medium link-primary">#TBS2430190${element.id}</a>`,
            assign: imgHtml,
            ticket_title: element.ticketTitle,
            client_name: element.clientName,
            create_date: element.createDate,
            due_date: element.dueDate,
            priority: isPriority(element.priority).outerHTML,
            status: isStatus(element.status).outerHTML,
        });
        ticketsList.sort('tickets_id', { order: "desc" });
    });
    ticketsList.remove("tickets_id", `<a href="/apps/support-tickets/overview" class="fw-medium link-primary">#TBS243019001</a>`);
    tooltipElm();
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/ticket-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    ticketsList.items.slice(-1)[0]._values.tickets_id,
    "text/html"
);

const paginationNext = document.querySelector(".pagination-next");
const paginationPrev = document.querySelector(".pagination-prev");
const listjsPagination = document.querySelector(".pagination.listjs-pagination");

if (paginationNext) {
    paginationNext.addEventListener("click", handleClickNext);
}

if (paginationPrev) {
    paginationPrev.addEventListener("click", handleClickPrev);
}

function handleClickNext() {
    if (listjsPagination && listjsPagination.querySelector(".active")) {
        const activePaginationItem = listjsPagination.querySelector(".active");

        if (activePaginationItem.nextElementSibling) {
            activePaginationItem.nextElementSibling.children[0].click();
        }
    }
}

function handleClickPrev() {
    if (listjsPagination && listjsPagination.querySelector(".active")) {
        const activePaginationItem = listjsPagination.querySelector(".active");

        if (activePaginationItem.previousElementSibling) {
            activePaginationItem.previousElementSibling.children[0].click();
        }
    }
}


function isStatus(val) {
    const badge = document.createElement("span");

    switch (val) {
        case "Open":
            badge.classList.add("badge", "bg-primary-subtle");
            badge.classList.add("badge", "text-primary");
            badge.textContent = val;
            break;
        case "New":
            badge.classList.add("badge", "bg-info-subtle");
            badge.classList.add("badge", "text-info");
            badge.textContent = val;
            break;
        case "Close":
            badge.classList.add("badge", "bg-danger-subtle");
            badge.classList.add("badge", "text-danger");
            badge.textContent = val;
            break;
        case "Pending":
            badge.classList.add("badge", "bg-warning-subtle");
            badge.classList.add("badge", "text-warning");
            badge.textContent = val;
            break;
        default:
            badge.classList.add("badge", "bg-primary-subtle");
            badge.classList.add("badge", "text-primary");
            badge.textContent = val;
            break;
    }
    return badge;
}

function isPriority(val) {
    const badge = document.createElement("span");

    switch (val) {
        case "High":
            badge.classList.add("badge", "bg-danger");
            badge.textContent = val;
            break;
        case "Low":
            badge.classList.add("badge", "bg-success");
            badge.textContent = val;
            break;
        case "Medium":
            badge.classList.add("badge", "bg-info");
            badge.textContent = val;
            break;
        default:
            badge.classList.add("badge", "bg-info");
            badge.textContent = val;
            break;
    }

    return badge;
}

function tooltipElm() {
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    var tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

var idFieldInput = document.getElementById("id-field");
var clientNameInput = document.getElementById("client-name-input");
var ticketTitleInput = document.getElementById("ticket-title-input");
var createDateInput = document.getElementById("create-date-input");
var dueDateInput = document.getElementById("due-date-input");
var priorityInput = document.getElementById("priority-input");
var statusInput = document.getElementById("status-input");

flatpickr("#create-date-input", {
    dateFormat: "d M, Y"
});

flatpickr("#due-date-input", {
    dateFormat: "d M, Y"
});

var priorityVal = new Choices(priorityInput, {
    searchEnabled: false
});

var statusVal = new Choices(statusInput, {
    searchEnabled: false
});

var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

// tablelist-form
var count = 14;
// tablelist form submit event
var forms = document.querySelectorAll('.tablelist-form')
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var errorMsg = document.getElementById("alert-error-msg");
        errorMsg.classList.remove("d-none");

        setTimeout(() => errorMsg.classList.add("d-none"), 2000);

        // Define an array with all the required input fields and their corresponding error messages
        const requiredFields = [
            { input: clientNameInput, error: "Please enter a client name." },
            { input: ticketTitleInput, error: "Please enter a ticket title." },
            { input: createDateInput, error: "Please select a create date." },
            { input: dueDateInput, error: "Please select a due date." },
            { input: priorityInput, error: "Please select a priority." },
            { input: statusInput, error: "Please select a status." }
        ];

        // Define a variable to track if all required fields have been filled out
        let allFieldsValid = true;

        // Check each required input field to see if it has a value
        requiredFields.forEach(function (field) {
            if (allFieldsValid && field.input.value.trim() === "") {
                // The field is empty, so show the error message and mark allFieldsValid as false
                errorMsg.innerHTML = field.error;
                field.input.classList.add("is-invalid");
                allFieldsValid = false;
            } else {
                // The field has a value, so remove the error message and mark the field as valid
                field.input.classList.remove("is-invalid");
            }
        });

        if (!editList && allFieldsValid) {
            ticketsList.add({
                tickets_id: `<a href="/apps/support-tickets/overview" class="fw-medium link-primary">#TBS2430190${count}</a>`,
                assign: assignToUsers(),
                ticket_title: ticketTitleInput.value,
                client_name: clientNameInput.value,
                create_date: createDateInput.value,
                due_date: dueDateInput.value,
                priority: isPriority(priorityInput.value).outerHTML,
                status: isStatus(statusInput.value).outerHTML,
            })
            ticketsList.sort('tickets_id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addTicketModal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Ticket detail inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } else if (editList && allFieldsValid) {
            var editValues = ticketsList.get({
                tickets_id: idFieldInput.value,
            });

            Array.from(editValues).forEach(function (x) {
                var isId = new DOMParser().parseFromString(x._values.tickets_id, "text/html");
                var selectedId = isId.body.firstElementChild.innerHTML;
                if (selectedId == itemId) {
                    x.values({
                        tickets_id: `<a href="/apps/support-tickets/overview" class="fw-medium link-primary">${idFieldInput.value}</a>`,
                        assign: assignToUsers(),
                        ticket_title: ticketTitleInput.value,
                        client_name: clientNameInput.value,
                        create_date: createDateInput.value,
                        due_date: dueDateInput.value,
                        priority: isPriority(priorityInput.value).outerHTML,
                        status: isStatus(statusInput.value).outerHTML,
                    });
                }
            });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-addTicketModal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Ticket Details updated Successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        }

        return true;
    });
});

const selectElements = Array.from(document.getElementsByClassName("select-element"));

selectElements.forEach(function (elem) {
    const optionLists = Array.from(elem.querySelectorAll(".option-list"));

    optionLists.forEach(function (subElem) {
        const btnAction = subElem.querySelector(".btn-action");
        const imgPath = subElem.querySelector(".avatar-xs img").getAttribute("src");
        const imgListData = document.getElementById("assignee-member");

        btnAction.addEventListener("click", function () {
            subElem.classList.toggle("active");

            if (subElem.classList.contains("active")) {
                const nameElem = subElem.querySelector(".flex-grow-1 .d-block").innerHTML;
                const imgListHtml = `<a href="javascript: void(0);" class="avatar-group-item mb-2" data-img="${imgPath}" data-bs-toggle="tooltip" data-bs-placement="top" title="${nameElem}">\
                    <img src="${imgPath}" alt="" class="rounded-circle avatar-xs" />\
                    </a>`;
                imgListData.insertAdjacentHTML("beforeend", imgListHtml);
                btnAction.innerHTML = "Remove";
                tooltipElm();
            } else {
                const avatarItems = Array.from(imgListData.querySelectorAll(".avatar-group-item"));

                avatarItems.forEach(function (item) {
                    const avatarImg = item.getAttribute("data-img");

                    if (imgPath === avatarImg) {
                        item.remove();
                        btnAction.innerHTML = "Add";
                    }
                });
            }
        });
    });
});

function assignToUsers() {
    var assignedToUsers = [];
    var assignedTo = document.querySelectorAll('.option-list.active');
    Array.from(assignedTo).forEach(function (ele) {
        var imgPath = ele.querySelector(".avatar-xs img").getAttribute('src');
        var namepath = ele.querySelector(".flex-grow-1 .d-block").innerHTML;
        var obj = {
            assigneeName: namepath,
            assigneeImg: imgPath
        };
        assignedToUsers.push(obj);
    });

    var assignedElem = assignedToUsers;
    var showElem = 3;
    var imgHtml = '<div class="avatar-group flex-nowrap">';
    Array.from(assignedElem.slice(0, showElem)).forEach(function (img) {
        imgHtml += `<a href="javascript: void(0);" class="avatar-group-item" data-img="${img.assigneeImg}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${img.assigneeName}">\
            <img src="${img.assigneeImg}" alt="" class="rounded-circle avatar-xxs" />\
        </a>`;
    });
    if (assignedElem.length > showElem) {
        var elemLength = assignedElem.length - showElem;
        imgHtml += `<a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${elemLength} More">\
            <div class="avatar-xxs">\
                <div class="avatar-title rounded-circle">${elemLength}+</div>\
            </div>\
        </a>`;
    }
    imgHtml += '</div>';
    return imgHtml;
}

function ischeckboxcheck() {
    Array.from(document.getElementsByName("chk_child")).forEach(function (checkbox) {
        checkbox.addEventListener("change", function (event) {
            var closestRow = event.target.closest("tr");
            if (checkbox.checked) {
                closestRow.classList.add("table-active");
            } else {
                closestRow.classList.remove("table-active");
            }

            var checkedCount = document.querySelectorAll('[name="chk_child"]:checked').length;
            var removeActions = document.getElementById("remove-actions");
            if (closestRow.classList.contains("table-active")) {
                removeActions.classList.toggle("d-none", checkedCount <= 0);
            } else {
                removeActions.classList.toggle("d-none", checkedCount <= 0);
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
                var itemId = e.target.closest("tr").children[1].innerText;
                var itemValues = ticketsList.get({
                    tickets_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var isId = new DOMParser().parseFromString(x._values.tickets_id, "text/html");
                    var selectedId = isId.body.firstElementChild.innerHTML;
                    
                    if (selectedId == itemId) {
                        
                        editList = true;
                        document.getElementById("addTicketModalLabel").innerHTML = "Edit Ticket Details";
                        document.getElementById("add-btn").innerHTML = "Update";
                        idFieldInput.value = selectedId;
                        ticketTitleInput.value = x._values.ticket_title;
                        clientNameInput.value = x._values.client_name;
                        createDateInput.value = x._values.create_date;
                        dueDateInput.value = x._values.due_date;

                        Array.from(document.querySelectorAll(".select-element .option-list")).forEach(function (subElem) {
                            var nameElem = subElem.querySelector(".flex-grow-1 .d-block").innerHTML;
                            var assignElem = new DOMParser().parseFromString(x._values.assign, "text/html");

                            assignElem.querySelectorAll(".avatar-group .avatar-group-item").forEach(function (subItem) {
                                if (subItem.getAttribute('data-bs-title') == nameElem) {
                                    subElem.classList.add("active");
                                    var imgListData = document.getElementById("assignee-member");
                                    if (subElem.classList.contains("active")) {
                                        var imgListHtml =
                                            '<a href="javascript: void(0);" class="avatar-group-item mb-2" data-img="' + subItem.getAttribute('data-img') + '"  data-bs-toggle="tooltip" data -bs-placement="top" data-bs-title="' + subItem.getAttribute('data-bs-title') + '">\
                                        <img src="'+ subItem.getAttribute('data-img') + '" alt="" class="rounded-circle avatar-xs" />\
                                        </a>';

                                        imgListData.insertAdjacentHTML("beforeend", imgListHtml);
                                        subElem.querySelector(".btn-action").innerHTML = "Remove";
                                        tooltipElm();
                                    }
                                }

                                return subElem;
                            });
                        });

                        flatpickr("#create-date-input", {
                            dateFormat: "d M, Y",
                            defaultDate: x._values.create_date,

                        });

                        flatpickr("#due-date-input", {
                            dateFormat: "d M, Y",
                            defaultDate: x._values.due_date,
                        });

                        var priorityDom = new DOMParser().parseFromString(x._values.priority, "text/html");
                        priorityInput.value = priorityDom.body.querySelector(".badge").innerHTML;
                        if (priorityVal) priorityVal.destroy();
                        priorityVal = new Choices(priorityInput, {
                            searchEnabled: false
                        });
                        priorityVal.setChoiceByValue(priorityDom.body.querySelector(".badge").innerHTML);

                        var statusDom = new DOMParser().parseFromString(x._values.status, "text/html");
                        statusInput.value = statusDom.body.querySelector(".badge").innerHTML;
                        if (statusVal) statusVal.destroy();
                        statusVal = new Choices(statusInput, {
                            searchEnabled: false
                        });
                        statusVal.setChoiceByValue(statusDom.body.querySelector(".badge").innerHTML);
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
                var itemValues = ticketsList.get({
                    tickets_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteId = new DOMParser().parseFromString(x._values.tickets_id, "text/html");
                    var isElem = deleteId.body.firstElementChild;
                    var isDeleteId = deleteId.body.firstElementChild.innerHTML;

                    if (isDeleteId == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            ticketsList.remove("tickets_id", isElem.outerHTML);
                            document.getElementById("deleteRecord-close").click();
                        });
                    }
                });
            });
        });
    }
}

function clearFields() {
    editList = false;
    idFieldInput.value = "";
    clientNameInput.value = "";
    ticketTitleInput.value = "";
    createDateInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "";
    statusInput.value = "";

    // priorityVal
    if (priorityVal) priorityVal.destroy();
    priorityVal = new Choices(priorityInput, {
        searchEnabled: false
    });

    // statusVal
    if (statusVal) statusVal.destroy();
    statusVal = new Choices(statusInput, {
        searchEnabled: false
    });

    flatpickr("#create-date-input", {
        dateFormat: "d M, Y"
    });

    flatpickr("#due-date-input", {
        dateFormat: "d M, Y"
    });

    Array.from(document.querySelectorAll('.option-list')).forEach(function (ele) {
        if (ele.classList.contains("active")) {
            ele.classList.remove("active")
        }
        ele.querySelector(".btn-action").innerHTML = "add";
    });

    document.getElementById("assignee-member").innerHTML = "";
}

document.getElementById("addTickets").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

function deleteMultiple() {
    const ids_array = [];
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
                    ticketsList.remove("tickets_id", `<a href="/apps/support-tickets/overview" class="fw-medium link-primary">${ids_array[i]}</a>`);
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