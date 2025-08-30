/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: real estate Init Js File
*/

document.querySelectorAll('.myButton').forEach(function (item) {
    item.addEventListener("click", function () {
        var propertyFilters = document.getElementById('propertyFilters');
        propertyFilters.style.display = propertyFilters.style.display === 'none' ? 'block' : 'none';
    });
});

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

var url = "/static/json/";
var propertyListData = '';
var editList = false;

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');
var currentPage = 1;
var itemsPerPage = 8;

//property list by json
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
getJSON("property-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        propertyListData = data;
        loadPropertyList(propertyListData, currentPage);
        sortElementsById();
        rangeSlider();
    }
});

// load PropertyList
function loadPropertyList(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages;
    document.getElementById("property-list").innerHTML = "";
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            var checkStarred = datas[i].starred ? "active" : "";
            document.getElementById("property-list").innerHTML += '<div class="col-xxl-3 col-lg-4 col-md-6">\
        <div class="card real-estate-grid-widgets card-animate">\
            <div class="card-body p-2">\
                <img src="'+ datas[i].property[0].img + '" alt="' + datas[i].property[0].img_alt + '" class="rounded w-100 object-fit-cover" style="height: 180px">\
                <button type="button" class="btn btn-subtle-warning custom-toggle btn-icon btn-sm '+ checkStarred + '" data-bs-toggle="button">\
                    <span class="icon-on"><i class="bi bi-star"></i></span>\
                    <span class="icon-off"><i class="bi bi-star-fill"></i></span>\
                </button>\
                <div class="dropdown dropdown-real-estate">\
                    <button class="btn btn-light btn-icon btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">\
                        <i class="bi bi-three-dots-vertical"></i>\
                    </button>\
                    <ul class="dropdown-menu dropdown-menu-end">\
                        <li><a class="dropdown-item edit-list" href="#addProperty" data-edit-id="'+ datas[i].id + '" data-bs-toggle="modal"><i class="bi bi-pencil-square me-1 align-baseline"></i> Edit</a></li>\
                        <li><a class="dropdown-item remove-list" href="#deleteRecordModal" data-remove-id="'+ datas[i].id + '" data-bs-toggle="modal"><i class="bi bi-trash3 me-1 align-baseline"></i> Delete</a></li>\
                    </ul>\
                </div>\
            </div>\
            <div class="card-body p-3">\
                <p class="text-muted float-end mb-0"><i class="bi bi-star text-warning align-baseline me-1"></i> '+ datas[i].rating + '</p>\
                '+ isType(datas[i].property[0].type) + '\
                <a href="/apps/real-estate/property_overview">\
                    <h6 class="fs-lg text-capitalize text-truncate">'+ datas[i].property[0].title + '</h6>\
                </a>\
                <p class="text-muted"><i class="bi bi-geo-alt align-baseline me-1"></i> '+ datas[i].location + '</p>\
                <ul class="d-flex align-items-center gap-2 flex-wrap list-unstyled">\
                    <li>\
                        <p class="text-muted mb-0"><i class="bi bi-house align-baseline text-primary me-1"></i> '+ datas[i].facility[0].bedroom + ' Bedroom</p>\
                    </li>\
                    <li>\
                        <p class="text-muted mb-0"><i class="ph ph-bathtub align-middle text-primary me-1"></i> '+ datas[i].facility[0].bathroom + ' Bathroom</p>\
                    </li>\
                    <li>\
                        <p class="text-muted mb-0"><i class="bi bi-columns align-baseline text-primary me-1"></i> '+ datas[i].facility[0].area + ' sqft</p>\
                    </li>\
                </ul>\
                <div class="border-top border-dashed mt-3 pt-3 d-flex align-items-center justify-content-between gap-3">\
                    <h5 class="mb-0">'+ datas[i].price + '</h5>\
                    <a href="/apps/real-estate/property_overview" class="link-effect">Read More <i class="bi bi-chevron-right align-baseline ms-1"></i></a>\
                </div>\
            </div>\
        </div>\
    </div>'
        };
    };
    paginationEvents();
    pageEvent(datas);
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
    refreshCallbacks();

};

function isType(val) {
    switch (val) {
        case "Villa":
            return ('<span class="badge bg-danger-subtle text-danger fs-xxs mb-3"><i class="bi bi-house-door align-baseline me-1"></i>' + val + "</span>");
        case "Apartment":
            return ('<span class="badge bg-info-subtle text-info fs-xxs mb-3"><i class="bi bi-building align-baseline me-1"></i>' + val + "</span>");
        case "Residency":
            return ('<span class="badge bg-success-subtle text-success fs-xxs mb-3"><i class="bi bi-buildings align-baseline me-1"></i>' + val + "</span>");
    }
}

function fetchIdFromObj(member) {
    return parseInt(member.id);
}

function findNextId() {
    if (propertyListData.length === 0) {
        return 0;
    }
    var lastElementId = fetchIdFromObj(propertyListData[propertyListData.length - 1]),
        firstElementId = fetchIdFromObj(propertyListData[0]);
    return (firstElementId >= lastElementId) ? (firstElementId + 1) : (lastElementId + 1);
}

function sortElementsById() {
    var manyPropertyList = propertyListData.sort(function (a, b) {
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

    loadPropertyList(manyPropertyList, currentPage);
}

function selectedPage() {
    var pageNumLink = document.getElementById('page-num').getElementsByClassName('clickPageNumber');
    for (var i = 0; i < pageNumLink.length; i++) {
        if (i == currentPage - 1) {
            pageNumLink[i].parentNode.classList.add("active");
        } else {
            pageNumLink[i].parentNode.classList.remove("active");
        }
    }
};

// paginationEvents
function paginationEvents() {
    var numPages = function numPages() {
        return Math.ceil(propertyListData.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadPropertyList(propertyListData, currentPage);
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
            loadPropertyList(propertyListData, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadPropertyList(propertyListData, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}

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

var properyTypeVal = new Choices(propertyTypeInput, {
    searchEnabled: false,
    removeItemButton: true
});

var requirementVal = new Choices(requirementInput, {
    searchEnabled: false,
    removeItemButton: true
});

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
            var newArrayId = findNextId();
            var newArray = {
                'id': newArrayId,
                "property": [{
                    "type": propertyTypeInput.value,
                    "title": propertyTitleInput.value,
                    "img": imageDom.src,
                    "img_alt": imageDom.getAttribute('alt'),
                }],
                "location": addressInput.value,
                "facility": [{
                    "bedroom": bedroomInput.value,
                    "bathroom": bathroomInput.value,
                    "area": sqftInput.value
                }],
                "rating": "-",
                "price": '$' + propertyPriceInput.value,
                "starred": false,
                "agent": agentNameInput.value,
                "requirement": requirementInput.value
            };
            propertyListData.push(newArray);
            sortElementsById();
        } else if (
            propertyTitleInput.value !== "" &&
            propertyTypeInput.value !== "" &&
            bedroomInput.value !== "" && bathroomInput.value !== "" &&
            sqftInput.value !== "" && propertyPriceInput.value !== "" &&
            agentNameInput.value !== "" && requirementInput.value !== "" && addressInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var getEditId = 0;
            getEditId = idFieldInput.value;
            propertyListData = propertyListData.map(function (item) {
                if (item.id == getEditId) {
                    var editObj = {
                        "id": getEditId,
                        "property": [{
                            "type": propertyTypeInput.value,
                            "title": propertyTitleInput.value,
                            "img": imageDom.src,
                            "img_alt": imageDom.getAttribute('alt'),
                        }],
                        "location": addressInput.value,
                        "facility": [{
                            "bedroom": bedroomInput.value,
                            "bathroom": bathroomInput.value,
                            "area": sqftInput.value
                        }],
                        "rating": item.rating,
                        "price": '$' + propertyPriceInput.value,
                        "starred": item.starred,
                        "agent": agentNameInput.value,
                        "requirement": requirementInput.value
                    };
                    return editObj;
                }
                return item;
            });
        }

        loadPropertyList(propertyListData, currentPage);
        document.getElementById("alert-error-msg").classList.add("d-none");
        document.getElementById("close-addPropertyModal").click();
        return true;
    });
});

// refreshCallbacks
function refreshCallbacks() {
    var getEditId = 0;
    Array.from(document.querySelectorAll(".edit-list")).forEach(function (elem) {
        elem.addEventListener('click', function (event) {
            getEditId = elem.getAttribute('data-edit-id');

            propertyListData = propertyListData.map(function (item) {
                if (item.id == getEditId) {
                    editList = true;
                    document.getElementById("addPropertyModalLabel").innerHTML = "Edit Property details";
                    document.getElementById("add-btn").innerHTML = "Update";
                    idFieldInput.value = item.id;
                    propertyTitleInput.value = item.property[0].title;
                    propertyTypeInput.value = item.property[0].type;
                    bedroomInput.value = item.facility[0].bedroom;
                    bathroomInput.value = item.facility[0].bathroom;
                    sqftInput.value = item.facility[0].area;
                    propertyPriceInput.value = item.price.split("$")[1];
                    agentNameInput.value = item.agent;
                    requirementInput.value = item.requirement;
                    addressInput.value = item.location;

                    document.getElementById('property-preview').innerHTML = "";
                    var mockFile = { name: item.property[0].img_alt, size: 12345 };
                    dropzone.options.addedfile.call(dropzone, mockFile);
                    dropzone.options.thumbnail.call(dropzone, mockFile, item.property[0].img);

                    // properyTypeVal
                    if (properyTypeVal) properyTypeVal.destroy();
                    properyTypeVal = new Choices(propertyTypeInput, {
                        searchEnabled: false,
                        removeItemButton: true
                    });
                    properyTypeVal.setChoiceByValue(item.property[0].type);

                    // requirementVal
                    if (requirementVal) requirementVal.destroy();
                    requirementVal = new Choices(requirementInput, {
                        searchEnabled: false,
                        removeItemButton: true
                    });
                    requirementVal.setChoiceByValue(item.requirement);

                }
                return item;
            });
        });
    });

    var getRemoveid = 0;
    Array.from(document.querySelectorAll(".remove-list")).forEach(function (item) {
        item.addEventListener('click', function (event) {
            getRemoveid = item.getAttribute('data-remove-id');
            document.getElementById("remove-element").addEventListener("click", function () {
                function arrayRemove(arr, value) {
                    return arr.filter(function (ele) {
                        return ele.id != value;
                    });
                }
                var filtered = arrayRemove(propertyListData, getRemoveid);

                propertyListData = filtered;
                loadPropertyList(propertyListData, currentPage);
                document.getElementById("close-removemodal").click();
            });
        });
    });
};

// clearFields
function clearFields() {
    editList = false;
    document.getElementById("addPropertyModalLabel").innerHTML = "Add Property list";
    document.getElementById("add-btn").innerHTML = "Add";
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

    // properyTypeVal
    if (properyTypeVal) properyTypeVal.destroy();
    properyTypeVal = new Choices(propertyTypeInput, {
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

// filter sidebar

// choices category input
var locationSelect = new Choices(document.getElementById('select-location'), {
    searchEnabled: true,
});

locationSelect.passedElement.element.addEventListener('change', function (event) {
    var locationSelectValue = event.detail.value
    if (event.detail.value) {
        var filterData = propertyListData.filter(function (elemlist) {
            var array = elemlist.location.split(",");
            var sliceArr = array.slice(-1).pop();
            return sliceArr.trim() == locationSelectValue
        });
    } else {
        var filterData = propertyListData;
    }
    loadPropertyList(filterData, currentPage);
}, false);

// propertyType
document.querySelectorAll('[name="propertyType"]').forEach(function (elem) {
    elem.addEventListener("change", function () {
        var getAttr = elem.getAttribute("value");

        if (getAttr != 'all') {
            var filterData = propertyListData.filter(function (elemlist) {
                return elemlist.property[0].type == getAttr;
            });
        } else {
            var filterData = propertyListData;
        }
        loadPropertyList(filterData, currentPage);
    });
});

// price range slider
function rangeSlider() {
    var slider = document.getElementById('product-price-range');
    if (slider) {
        noUiSlider.create(slider, {
            start: [500, 3800], // Handle start position
            step: 10, // Slider moves in increments of '10'
            margin: 20, // Handles must be more than '20' apart
            connect: true, // Display a colored bar between the handles
            behaviour: 'tap-drag', // Move handle on tap, bar is draggable
            range: { // Slider can select '0' to '100'
                'min': 0,
                'max': 5000
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

            var maxValue = maxCostInput.value.substr(2);
            var minValue = minCostInput.value.substr(2);
            filterDataAll = propertyListData.filter(
                product => parseFloat(product.price.split("$")[1]) >= minValue && parseFloat(product.price.split("$")[1]) <= maxValue
            );
            loadPropertyList(filterDataAll, currentPage);
        });

        minCostInput.addEventListener('change', function () {
            slider.noUiSlider.set([null, this.value]);
        });

        maxCostInput.addEventListener('change', function () {
            slider.noUiSlider.set([null, this.value]);
        });
    }
}


function windowResize() {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 1400) {
        document.getElementById("propertyFilters").style.display = "none";
    } else {
        document.getElementById("propertyFilters").style.display = "block";
    }
}


windowResize();
window.addEventListener("resize", windowResize);