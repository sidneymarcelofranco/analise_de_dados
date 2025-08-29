/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: real estate agent grid Init Js File
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

var url = "/static/json/";
var agentListData = '';
var editList = false;

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');
var currentPage = 1;
var itemsPerPage = 10;

//agent list by json
var getJSON = function (jsonurl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + jsonurl, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

// get json
getJSON("agent-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        agentListData = data;
        loadAgentList(agentListData, currentPage);
        sortElementsById();
    }
});

// load AgentList
function loadAgentList(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages;
    document.getElementById("agent-list").innerHTML = "";

    // Array.from(datas).forEach(function (listData, index) { 
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            var newBadge = datas[i].new ? '<div class="ribbon ribbon-secondary">New</div>' : "";

            document.getElementById("agent-list").innerHTML += '<div class="col">\
        <div class="card ribbon-box ribbon-fill">\
            <div class="card-body">\
                '+ newBadge + '\
                <div class="d-flex justify-content-end">\
                    <div class="flex-shrink-0">\
                        <div class="dropdown">\
                            <a class="btn btn-ghost-secondary btn-icon btn-sm" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\
                                <i class="bi bi-three-dots"></i>\
                            </a>\
                            <ul class="dropdown-menu dropdown-menu-end">\
                                <li><a class="dropdown-item" href="/apps/real-estate/agent/overview"><i class="bi bi-eye align-baseline me-1"></i> Overview</a></li>\
                                <li><a class="dropdown-item edit-list" data-bs-toggle="modal"  data-edit-id="'+ datas[i].id + '" href="#addAgent"><i class="bi bi-pencil-square align-baseline me-1"></i> Edit</a></li>\
                                <li><a class="dropdown-item remove-list" href="#deleteRecordModal" data-remove-id="'+ datas[i].id + '" data-bs-toggle="modal"><i class="bi bi-trash3 align-baseline me-1"></i> Delete</a></li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
                <div class="mt-3 text-center">\
                    <div class="position-relative d-inline-block">\
                        <img src="'+ datas[i].agent[0].img + '" alt="' + datas[i].agent[0].img_alt + '" class="avatar-md rounded mx-auto d-inline-block">\
                        <span class="position-absolute top-0 start-100 translate-middle badge border border-2 border-white rounded-circle '+ isStatus(datas[i].status) + ' p-1"><span class="visually-hidden">unread messages</span></span>\
                    </div>\
                    <h5 class="mt-4 mb-1"><a href="/apps/real-estate/agent/overview" class="text-reset">'+ datas[i].agent[0].name + '</a></h5>\
                    <p class="text-muted"><b>#TBS'+ datas[i].id + '</b></p>\
                    <p class="text-muted"><i class="bi bi-geo-alt align-baseline me-1 text-body"></i> '+ datas[i].location + '</p>\
                    <h6 class="fs-md text-secondary-emphasis mb-4">'+ datas[i].property + ' Property</h6>\
                    <div class="hstack gap-2">\
                        <button class="btn btn-subtle-primary w-100"><i class="bi bi-chat-text align-baseline me-1"></i> Message</button>\
                        <a href="tel:'+ datas[i].contact + '" class="btn btn-info btn-icon flex-shrink-0"><i class="bi bi-telephone"></i></a>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';
        }
    };
    paginationEvents();
    pageEvent(datas);
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
    refreshCallbacks();
    // });
}

function fetchIdFromObj(member) {
    return parseInt(member.id);
}

function findNextId() {
    if (agentListData.length === 0) {
        return 0;
    }
    var lastElementId = fetchIdFromObj(agentListData[agentListData.length - 1]),
        firstElementId = fetchIdFromObj(agentListData[0]);
    return (firstElementId >= lastElementId) ? (firstElementId + 1) : (lastElementId + 1);
}

function sortElementsById() {
    var manAegentList = agentListData.sort(function (a, b) {
        var x = fetchIdFromObj(a);
        var y = fetchIdFromObj(b);

        if (x > y) {
            return -1;
        }
        if (x < y) {
            return 1;
        }
        return 0;
    })

    loadAgentList(manAegentList, currentPage);
}

function isStatus(val) {
    switch (val) {
        case "Active":
            return (
                'bg-success'
            );
        case "Unactive":
            return (
                'bg-danger'
            );
    }
}

function selectedPage() {
    var pagenumLink = document.getElementById('page-num').getElementsByClassName('clickPageNumber');
    for (var i = 0; i < pagenumLink.length; i++) {
        if (i == currentPage - 1) {
            pagenumLink[i].parentNode.classList.add("active");
        } else {
            pagenumLink[i].parentNode.classList.remove("active");
        }
    }
};

// paginationEvents
function paginationEvents() {
    var numPages = function numPages() {
        return Math.ceil(agentListData.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadAgentList(agentListData, currentPage);
            }
        });
    };

    function pageNumbers() {
        var pageNumber = document.getElementById('page-num');
        pageNumber.innerHTML = "";
        // for each page
        for (var i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
        }
    }

    prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            loadAgentList(agentListData, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadAgentList(agentListData, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}

// pageEvent
function pageEvent(data) {
    if (data.length == 0) {
        document.getElementById("pagination-element").style.display = "none";
        document.getElementById("noresult").classList.remove("d-none");
    } else {
        document.getElementById("pagination-element").style.display = "flex";
        document.getElementById("noresult").classList.add("d-none");
    }

    var pageNumber = document.getElementById('page-num');
    pageNumber.innerHTML = "";
    var dataPageNum = Math.ceil(data.length / itemsPerPage)
    // for each page
    for (var i = 1; i < dataPageNum + 1; i++) {
        pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
    }
}

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
            var newArrayId = findNextId();
            var newArray = {
                "id": newArrayId,
                "joining_date": date,
                "agent": [{
                    "img": imageDom.src,
                    "img_alt": imageDom.getAttribute('alt'),
                    "name": agentNameInput.value
                }],
                "property": "0",
                "location": addressInput.value,
                "email": emailInput.value,
                "contact": contactInput.value,
                "status": statusInput.value,
                "new": false
            };
            agentListData.push(newArray);
            sortElementsById();
        } else if (
            agentNameInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            contactInput.value !== "" && addressInput.value !== "" &&
            statusInput.value !== "" && document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var getEditid = 0;
            getEditid = idFieldInput.value;
            agentListData = agentListData.map(function (item) {
                if (item.id == getEditid) {
                    var editObj = {
                        "id": getEditid,
                        "joining_date": item.joining_date,
                        "agent": [{
                            "img": imageDom.src,
                            "img_alt": imageDom.getAttribute('alt'),
                            "name": agentNameInput.value
                        }],
                        "property": item.property,
                        "location": addressInput.value,
                        "email": emailInput.value,
                        "contact": contactInput.value,
                        "status": statusInput.value,
                        "new": item.new
                    };
                    return editObj;
                }
                return item;
            });
        }
        loadAgentList(agentListData, currentPage);
        document.getElementById("alert-error-msg").classList.add("d-none");
        document.getElementById("close-addAgentModal").click();
        return true;
    });
});

// refreshCallbacks
function refreshCallbacks() {
    // edit click event
    var getEditid = 0;
    Array.from(document.querySelectorAll(".edit-list")).forEach(function (elem) {
        elem.addEventListener('click', function (event) {
            getEditid = elem.getAttribute('data-edit-id');

            agentListData = agentListData.map(function (item) {
                if (item.id == getEditid) {
                    editList = true;
                    document.getElementById("addAgentModalLabel").innerHTML = "Edit Agent Details";
                    document.getElementById("add-btn").innerHTML = "Update";
                    idFieldInput.value = item.id;

                    agentNameInput.value = item.agent[0].name;
                    emailInput.value = item.email;
                    contactInput.value = item.contact;
                    addressInput.value = item.location;

                    // statusTypeVal
                    if (statusTypeVal) statusTypeVal.destroy();
                    statusTypeVal = new Choices(statusInput, {
                        searchEnabled: false,
                        removeItemButton: true
                    });
                    statusTypeVal.setChoiceByValue(item.status);

                    document.getElementById('dropzone-preview').innerHTML = "";
                    var mockFile = { name: item.agent[0].img_alt, size: 12345 };
                    dropzone.options.addedfile.call(dropzone, mockFile);
                    dropzone.options.thumbnail.call(dropzone, mockFile, item.agent[0].img);

                }
                return item;
            });
        });
    });

    // remove click event
    var getRemoveid = 0;
    Array.from(document.querySelectorAll(".remove-list")).forEach(function (item) {
        item.addEventListener('click', function (event) {
            getRemoveid = item.getAttribute('data-remove-id');
            document.getElementById("delete-record").addEventListener("click", function () {
                function arrayRemove(arr, value) {
                    return arr.filter(function (ele) {
                        return ele.id != value;
                    });
                }
                var filtered = arrayRemove(agentListData, getRemoveid);

                agentListData = filtered;
                loadAgentList(agentListData, currentPage);
                document.getElementById("deleteRecord-close").click();
            });
        });
    });
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

// Search product list
var searchProductList = document.getElementById("searchResultList");
searchProductList.addEventListener("keyup", function () {
    var inputVal = searchProductList.value.toLowerCase();
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.agent[0].name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.location.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.contact.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }
    var filterData = filterItems(agentListData, inputVal);
    loadAgentList(filterData, currentPage);
});

// statusInput
var statusFilterInput = new Choices(document.getElementById('status-input'), {
    searchEnabled: true,
});

statusFilterInput.passedElement.element.addEventListener('change', function (event) {
    var statusInputValue = event.detail.value
    if (event.detail.value != "All") {
        var filterData = agentListData.filter(function (elemlist) {
            return elemlist.status == statusInputValue
        });
    } else {
        var filterData = agentListData;
    }

    loadAgentList(filterData, currentPage);
}, false);