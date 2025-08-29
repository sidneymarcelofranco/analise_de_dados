/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Ecommerce customer init js
*/

// private-notes
var ckClassicEditor = document.querySelectorAll(".private-notes")
if (ckClassicEditor) {
    Array.from(ckClassicEditor).forEach(function () {
        ClassicEditor
            .create(document.querySelector('.private-notes'))
            .then(function (editor) {
                editor.ui.view.editable.element.style.height = '60px';
            })
            .catch(function (error) {
                console.error(error);
            });
    });
}

var perPage = 10;
var editList = false;

// customer list
var options = new List('customer-list', {
    valueNames: [
        'id',
        'customer',
        'email',
        'contact',
        'date',
        'status'
    ],
    page: perPage,
    pagination: true,
    plugins: [
        ListPagination({
            left: 2,
            right: 2,
        }),
    ],
});


// Init list
var customerList = new List("customer-list", options).on("updated", function (list) {
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

    // if (l/

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

        customerList.add({
            id: '<a href="javascript:void(0);" class="fw-medium link-primary">'+element.id+'</a>',
            customer: '<div class="d-flex align-items-center">\
                <div class="flex-shrink-0 me-2">\
                    <div>\
                        <img class="avatar-xs rounded-circle customer-image-elem" alt="" src="'+ element.customer[0].img +'">\
                    </div>\
                </div>\
                <div class="flex-grow-1">\
                    <h5 class="fs-base mb-0"><a href="#" class="text-reset customer-name-elem">'+ element.customer[0].name +'</a></h5>\
                </div>\
            </div>',
            email: element.email,
            contact: element.phone,
            date: element.create_date,
            status: isStatus(element.status)
        });
        customerList.sort('id', { order: "desc" });
    });
    customerList.remove("id", `<a href="javascript:void(0);" class="fw-medium link-primary">01</a>`);
    refreshCallbacks();
}

xhttp.open("GET", "/static/json/customer-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    customerList.items.slice(-1)[0]._values.id,
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
                '<span class="badge bg-success-subtle text-success">' +
                val +
                "</span>"
            );
        case "Unactive":
            return (
                '<span class="badge bg-secondary-subtle text-secondary">' +
                val +
                "</span>"
            );
        case "Block":
            return (
                '<span class="badge bg-danger-subtle text-danger">' +
                val +
                "</span>"
            );
    }
}



document.getElementById("showModal").addEventListener("show.bs.modal", function (e) {
    if (e.relatedTarget.classList.contains("edit-item-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit Customer";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Update";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add Customer";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Add Customer";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List product";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
    }
});

document.querySelector("#customer-image-input").addEventListener("change", function () {
    var preview = document.querySelector("#customer-img");
    var file = document.querySelector("#customer-image-input").files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () { 
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
});


// form inputs
var idField = document.getElementById("id-field");
var customerImg = document.getElementById("customer-img");
var customerNameField = document.getElementById("customername-field");
var emailField = document.getElementById("email-field");
var contactField = document.getElementById("contact-field");
var joinDateField = document.getElementById("date-field");
var statsField = document.getElementById("status-field");

var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");
var viewBtns = document.getElementsByClassName("view-item-btn");

var statsVal = new Choices(statsField,{
    searchEnabled: false,
});

flatpickr("#date-field", {
    enableTime: true,
    dateFormat: "d M, Y"
});

refreshCallbacks();

// tablelist-form
var count = 14;
var forms = document.querySelectorAll('.tablelist-form')
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var errorMsg = document.getElementById("alert-error-msg");
        errorMsg.classList.remove("d-none");

        setTimeout(() => errorMsg.classList.add("d-none"), 2000);

        var text;
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (customerNameField.value == "") {
            text = "Please enter a customer name";
            errorMsg.innerHTML = text;
            return false;
        }else if (!emailField.value.match(validRegex)) {
            text = "Please enter valid email address";
            errorMsg.innerHTML = text;
            return false;
        }else if (contactField.value == "") {
            text = "Please enter a contact no";
            errorMsg.innerHTML = text;
            return false;
        }else if (joinDateField.value == "") {
            text = "Please select a join date";
            errorMsg.innerHTML = text;
            return false;
        }else if (statsField.value == "") {
            text = "Please select a status";
            errorMsg.innerHTML = text;
            return false;
        }

        if (
            customerNameField.value !== "" &&
            emailField.value.match(validRegex) &&
            contactField.value !== "" && joinDateField.value !== "" &&
            statsField.value !== "" && !editList
        ) {
            customerList.add({
                id: '<a href="javascript:void(0);" class="fw-medium link-primary">'+count+'</a>',
                customer: '<div class="d-flex align-items-center">\
                    <div class="flex-shrink-0 me-2">\
                        <div>\
                            <img class="avatar-xs rounded-circle customer-image-elem" alt="" src="'+ customerImg.src +'">\
                        </div>\
                    </div>\
                    <div class="flex-grow-1">\
                        <h5 class="fs-base mb-0"><a href="#" class="text-reset customer-name-elem">'+ customerNameField.value +'</a></h5>\
                    </div>\
                </div>',
                email: emailField.value,
                contact: contactField.value,
                date: joinDateField.value,
                status: isStatus(statsField.value)
            });
            customerList.sort('id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-ordermodal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Customer list inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        }else if(
            customerNameField.value !== "" &&
            emailField.value.match(validRegex) &&
            contactField.value !== "" && joinDateField.value !== "" &&
            statsField.value !== "" && editList
        ){
            var editValues = customerList.get({
                id: idField.value,
            });

            Array.from(editValues).forEach(function (x) {
                isid = new DOMParser().parseFromString(x._values.id, "text/html");
                var selectedid = isid.body.firstElementChild.innerHTML;
                if (selectedid == itemId) {
                    x.values({
                        id: '<a href="javascript:void(0);" class="fw-medium link-primary">'+idField.value+'</a>',
                        customer: '<div class="d-flex align-items-center">\
                            <div class="flex-shrink-0 me-2">\
                                <div>\
                                    <img class="avatar-xs rounded-circle customer-image-elem" alt="" src="'+ customerImg.src +'">\
                                </div>\
                            </div>\
                            <div class="flex-grow-1">\
                                <h5 class="fs-base mb-0"><a href="#" class="text-reset customer-name-elem">'+ customerNameField.value +'</a></h5>\
                            </div>\
                        </div>',
                        email: emailField.value,
                        contact: contactField.value,
                        date: joinDateField.value,
                        status: isStatus(statsField.value)
                    });
                }
            });

            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-ordermodal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Customer Detail updated Successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        }
        return true;
    });
});

function refreshCallbacks() {
    // removeBtns
    if (removeBtns) {
        Array.from(removeBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[0].innerText;
                itemId = e.target.closest("tr").children[0].innerText;
                var itemValues = customerList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteid = new DOMParser().parseFromString(x._values.id, "text/html");

                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;

                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            customerList.remove("id", isElem.outerHTML);
                            document.getElementById("deleteRecord-close").click();
                        });
                    }
                });
            });
        });
    }


    // editBtns
    if (editBtns){
        Array.from(editBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[0].innerText;
                itemId = e.target.closest("tr").children[0].innerText;
                var itemValues = customerList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;
                    
                    if (selectedid == itemId) {
                        editList = true;
                        idField.value = selectedid;

                        // customer Field
                        var customerVal = new DOMParser().parseFromString(x._values.customer, "text/html");
                        customerImg.src = customerVal.body.querySelector('.customer-image-elem').src;
                        customerNameField.value = customerVal.body.querySelector('.customer-name-elem').innerHTML;

                        emailField.value = x._values.email;
                        contactField.value = x._values.contact;
                        joinDateField.value = x._values.date;

                        var statsValue = new DOMParser().parseFromString(x._values.status, "text/html");
                        statsField.value = statsValue.body.querySelector('.badge').innerHTML;

                        // date-field
                        flatpickr("#date-field", {
                            enableTime: true,
                            dateFormat: "d M, Y",
                            defaultDate: x._values.date,
                        });

                        // statsVal
                        if (statsVal) statsVal.destroy();
                        statsVal = new Choices(statsField,{
                            searchEnabled: false,
                        });
                        statsVal.setChoiceByValue(statsValue.body.querySelector('.badge').innerHTML);
                    }
                });
            });
        });
    }

    // viewBtns
    if(viewBtns){
        Array.from(viewBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[0].innerText;
                itemId = e.target.closest("tr").children[0].innerText;
                var itemValues = customerList.get({
                    id: itemId,
                });
    
                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;
                    if (selectedid == itemId) {
                        // customer Field
                        var customerVal = new DOMParser().parseFromString(x._values.customer, "text/html");
    
                        document.querySelector('#overview-card .overview-img').src = customerVal.body.querySelector('.customer-image-elem').src;
                        document.querySelector('#overview-card .overview-name').innerHTML = customerVal.body.querySelector('.customer-name-elem').innerHTML;
    
                        var nickNameVal = customerVal.body.querySelector('.customer-name-elem').innerHTML.split(' ')
                        document.querySelector('#overview-card .overview-nick-name').innerHTML = '@'+nickNameVal[1];
    
                        document.querySelector('#overview-card .overview-email').innerHTML = x._values.email;
                        document.querySelector('#overview-card .overview-contact').innerHTML = x._values.contact;
                        document.querySelector('#overview-card .overview-date').innerHTML = x._values.date;
                        
                        var statsCode = x._values.status
                        document.querySelector('#overview-card .overview-status').innerHTML = statsCode;
                    }
                });
            });
        });
    }
    
}

// filterData
function filterData() {
    var isstatus = document.getElementById("idStatus").value;
    var pickerVal = document.getElementById("datepicker-range").value;

    var date1 = pickerVal.split(" to ")[0];
    var date2 = pickerVal.split(" to ")[1];

    customerList.filter(function (data) {
        matchData = new DOMParser().parseFromString(
            data.values().status,
            "text/html"
        );
        var status = matchData.body.firstElementChild.innerHTML;
        var statusFilter = false;
        var dateFilter = false;

        if (status == "all" || isstatus == "all") {
            statusFilter = true;
        } else {
            statusFilter = status == isstatus;
        }

        if (
            new Date(data.values().create_date) >= new Date(date1) &&
            new Date(data.values().create_date) <= new Date(date2)
        ) {
            dateFilter = true;
        } else {
            dateFilter = false;
        }

        if (statusFilter && dateFilter) {
            return statusFilter && dateFilter;
        } else if (statusFilter && pickerVal == "") {
            return statusFilter;
        } else if (dateFilter && pickerVal == "") {
            return dateFilter;
        }
    });
    customerList.update();
}

// clearFields
function clearFields() {
    document.getElementById("id-field").value = "";
    customerImg.src = "/static/images/users/user-dummy-img.jpg";
    customerNameField.value = "";
    emailField.value = "";
    contactField.value = "";
    joinDateField.value = "";

    // statsVal
    if (statsVal) statsVal.destroy();
    statsVal = new Choices(statsField,{
        searchEnabled: false,
    });

    flatpickr("#date-field", {
        enableTime: true,
        dateFormat: "d M, Y"
    });
    document.getElementById("customer-image-input").value = "";
};


document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});