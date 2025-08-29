/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Ecommerce Sellers init js
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

var sellerline1Chart = "";
var sellerline2Chart = "";
var sellerline3Chart = "";
var sellerline4Chart = "";
var sellerline5Chart = "";
var sellerline6Chart = "";
var sellerline7Chart = "";
var sellerline8Chart = "";
function loadCharts() {
    //Chart-seller 1
    var sellerlinecolor1 = "";
    sellerlinecolor1 = getChartColorsArray("chart-seller1");
    if (sellerlinecolor1) {
        var sparklineoptions1 = {
            series: [{
                data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor1,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };

        if (sellerline1Chart != "")
            sellerline1Chart.destroy();
        sellerline1Chart = new ApexCharts(document.querySelector("#chart-seller1"), sparklineoptions1);
        sellerline1Chart.render();
    }

    //Chart-seller 2
    var sellerlinecolor2 = "";
    sellerlinecolor2 = getChartColorsArray("chart-seller2");
    if (sellerlinecolor2) {
        var sparklineoptions2 = {
            series: [{
                data: [12, 14, 2, 47, 42, 15, 35, 75, 20, 67, 89],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor2,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };

        if (sellerline2Chart != "")
            sellerline2Chart.destroy();
        sellerline2Chart = new ApexCharts(document.querySelector("#chart-seller2"), sparklineoptions2);
        sellerline2Chart.render();
    }

    //Chart-seller 3
    var sellerlinecolor3 = "";
    sellerlinecolor3 = getChartColorsArray("chart-seller3");
    if (sellerlinecolor3) {
        var sparklineoptions3 = {
            series: [{
                data: [45, 20, 8, 42, 30, 5, 35, 79, 22, 54, 64],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor3,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };
        
        if (sellerline3Chart != "")
            sellerline3Chart.destroy();
        sellerline3Chart = new ApexCharts(document.querySelector("#chart-seller3"), sparklineoptions3);
        sellerline3Chart.render();
    }

    //Chart-seller 4
    var sellerlinecolor4 = "";
    sellerlinecolor4 = getChartColorsArray("chart-seller4");
    if (sellerlinecolor4) {
        var sparklineoptions4 = {
            series: [{
                data: [26, 15, 48, 12, 47, 19, 35, 19, 85, 68, 50],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor4,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };
        
        if (sellerline4Chart != "")
            sellerline4Chart.destroy();
        sellerline4Chart = new ApexCharts(document.querySelector("#chart-seller4"), sparklineoptions4);
        sellerline4Chart.render();
    }

    //Chart-seller 5
    var sellerlinecolor5 = "";
    sellerlinecolor5 = getChartColorsArray("chart-seller5");
    if (sellerlinecolor5) {
        var sparklineoptions5 = {
            series: [{
                data: [60, 67, 12, 49, 6, 78, 63, 51, 33, 8, 16],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor5,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };
        
        if (sellerline5Chart != "")
            sellerline5Chart.destroy();
        sellerline5Chart = new ApexCharts(document.querySelector("#chart-seller5"), sparklineoptions5);
        sellerline5Chart.render();
    }

    //Chart-seller 6
    var sellerlinecolor6 = "";
    sellerlinecolor6 = getChartColorsArray("chart-seller6");
    if (sellerlinecolor6) {
        var sparklineoptions6 = {
            series: [{
                data: [78, 63, 51, 33, 8, 16, 60, 67, 12, 49,],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor6,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };
        
        if (sellerline6Chart != "")
            sellerline6Chart.destroy();
        sellerline6Chart = new ApexCharts(document.querySelector("#chart-seller6"), sparklineoptions6);
        sellerline6Chart.render();
    }

    //Chart-seller 7
    var sellerlinecolor7 = "";
    sellerlinecolor7 = getChartColorsArray("chart-seller7");
    if (sellerlinecolor7) {
        var sparklineoptions7 = {
            series: [{
                data: [15, 35, 75, 20, 67, 8, 42, 30, 5, 35],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor7,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };
        
        if (sellerline7Chart != "")
            sellerline7Chart.destroy();
        sellerline7Chart = new ApexCharts(document.querySelector("#chart-seller7"), sparklineoptions7);
        sellerline7Chart.render();
    }

    //Chart-seller 8
    var sellerlinecolor8 = "";
    sellerlinecolor8 = getChartColorsArray("chart-seller8");
    if (sellerlinecolor8) {
        var sparklineoptions8 = {
            series: [{
                data: [45, 32, 68, 55, 36, 10, 48, 25, 74, 54],
            },],
            chart: {
                type: "area",
                height: 43,
                sparkline: {
                    enabled: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100],
                },
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: sellerlinecolor8,
            tooltip: {
                fixed: {
                    enabled: false,
                },
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return "";
                        },
                    },
                },
                marker: {
                    show: false,
                },
            },
        };
        
        if (sellerline8Chart != "")
            sellerline8Chart.destroy();
        sellerline8Chart = new ApexCharts(document.querySelector("#chart-seller8"), sparklineoptions8);
        sellerline8Chart.render();
    }
}

window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();

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
var sellerListData = '';
var editList = false;

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');
var currentPage = 1;
var itemsPerPage = 8;

//seller list by json
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
getJSON("seller-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        sellerListData = data;
        loadSellerList(sellerListData, currentPage);
        sortElementsById();
    }
});

// loadSellerList
function loadSellerList(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages;
    document.getElementById("seller-list").innerHTML = '';

    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            document.getElementById("seller-list").innerHTML += '<div class="col-xl-3 col-md-6">\
        <div class="card">\
            <div class="card-body">\
                <div class="text-end mb-3">\
                    <button type="button" class="btn-close remove-list text-end" data-remove-id="'+ datas[i].id + '" aria-label="Close" data-bs-toggle="modal" data-bs-target="#removeItemModal"></button>\
                </div>\
                <div class="avatar-md mx-auto">\
                    <div class="avatar-title bg-light rounded">\
                        <img src="'+ datas[i].shop[0].img + '" alt="' + datas[i].shop[0].img_alt + '" class="avatar-sm p-1">\
                    </div>\
                </div>\
                <div class="text-center mt-4">\
                    <a href="/apps/ecommerce/seller_overview"><h5>'+ datas[i].shop[0].name + '</h5></a>\
                    <p class="text-muted mb-0">'+ datas[i].seller + '</p>\
                </div>\
            </div>\
            <div class="row g-0 text-center">\
                <div class="col-4">\
                    <div class="card-body px-3 border-top border-bottom border-end border-dashed">\
                        <h5 class="mb-1">'+ datas[i].stock + '</h5>\
                        <p class="text-muted text-truncate mb-0">Item Stock</p>\
                    </div>\
                </div>\
                <div class="col-4">\
                    <div class="card-body h-100 px-3 border-top border-bottom border-end border-dashed">\
                        <div id="chart-seller'+ datas[i].id + '" data-colors=\'["' + datas[i].chartColor + '"]\'  dir="ltr"></div>\
                    </div>\
                </div>\
                <div class="col-4">\
                    <div class="card-body px-3 border-top border-bottom border-dashed">\
                        <h5 class="mb-1">'+ datas[i].revenue + '</h5>\
                        <p class="text-muted text-truncate mb-0">Revenue</p>\
                    </div>\
                </div>\
            </div>\
            <div class="card-body hstack gap-2">\
                <a href="/apps/ecommerce/seller_overview" class="btn btn-subtle-secondary w-100">View Details</a>\
                <button type="button" class="btn btn-subtle-primary w-100 edit-list" data-edit-id="'+ datas[i].id + '" data-bs-toggle="modal" data-bs-target="#addSellerModal">Edit</button>\
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
    loadCharts();
}

function fetchIdFromObj(member) {
    return parseInt(member.id);
}

function findNextId() {
    if (sellerListData.length === 0) {
        return 0;
    }
    var lastElementId = fetchIdFromObj(sellerListData[sellerListData.length - 1]),
        firstElementId = fetchIdFromObj(sellerListData[0]);
    return (firstElementId >= lastElementId) ? (firstElementId + 1) : (lastElementId + 1);
}

function sortElementsById() {
    var manySellerList = sellerListData.sort(function (a, b) {
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

    loadSellerList(manySellerList, currentPage);
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
        return Math.ceil(sellerListData.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadSellerList(sellerListData, currentPage);
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
            loadSellerList(sellerListData, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadSellerList(sellerListData, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}
var idFieldInput = document.getElementById("id-field");
var sellerNameInput = document.getElementById("seller-Name");
var ownerNameInput = document.getElementById("owner-Name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("seller-phone");

// tablelist form submit event
var forms = document.querySelectorAll('.tablelist-form')
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let imageDom
        if (document.querySelector('.dz-image-preview')) {
            let imageElement = new DOMParser().parseFromString(document.querySelectorAll('.dz-image-preview')[0].innerHTML, "text/html");
            imageDom = imageElement.body.querySelector('[data-dz-thumbnail]');
        }
        var errorMsg = document.getElementById("alert-error-msg");
        errorMsg.classList.remove("d-none");

        setTimeout(() => errorMsg.classList.add("d-none"), 2000);

        var text;
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (document.querySelectorAll(".dz-image-preview").length == 0) {
            text = "Please select a seller logo image";
            errorMsg.innerHTML = text;
            return false;
        } else if (sellerNameInput.value == "") {
            text = "Please enter a seller name";
            errorMsg.innerHTML = text;
            return false;
        } else if (ownerNameInput.value == "") {
            text = "Please enter a owner name";
            errorMsg.innerHTML = text;
            return false;
        } else if (!emailInput.value.match(validRegex)) {
            text = "Please enter valid email address";
            errorMsg.innerHTML = text;
            return false;
        } else if (phoneInput.value == "") {
            text = "Please enter a phone no.";
            errorMsg.innerHTML = text;
            return false;
        }

        if (
            sellerNameInput.value !== "" &&
            ownerNameInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            phoneInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && !editList
        ) {
            var newArrayId = findNextId();
            var newArray = {
                'id': newArrayId,
                "shop": [{
                    "img": imageDom.src,
                    "img_alt": imageDom.getAttribute('alt'),
                    "name": sellerNameInput.value
                }],
                "seller": ownerNameInput.value,
                "email": emailInput.value,
                "phone": phoneInput.value,
                "stock": "0",
                "revenue": "0",
                "chartColor": ["--tb-success"]
            };
            sellerListData.push(newArray);
            sortElementsById();
        } else if (
            sellerNameInput.value !== "" &&
            ownerNameInput.value !== "" &&
            emailInput.value.match(validRegex) &&
            phoneInput.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && editList
        ) {
            var getEditid = 0;
            getEditid = idFieldInput.value;
            sellerListData = sellerListData.map(function (item) {
                if (item.id == getEditid) {
                    var editObj = {
                        "id": item.id,
                        "shop": [{
                            "img": imageDom.src,
                            "img_alt": imageDom.getAttribute('alt'),
                            "name": sellerNameInput.value
                        }],
                        "seller": ownerNameInput.value,
                        "email": emailInput.value,
                        "phone": phoneInput.value,
                        "stock": item.stock,
                        "revenue": item.revenue,
                        "chartColor": item.chartColor
                    };
                    return editObj;
                }
                return item;
            });
        }

        loadSellerList(sellerListData, currentPage);
        document.getElementById("alert-error-msg").classList.add("d-none");
        document.getElementById("close-addSellerModal").click();
        return true;
    });
});

// refreshCallbacks
function refreshCallbacks() {
    var getEditid = 0;
    Array.from(document.querySelectorAll(".edit-list")).forEach(function (elem) {
        elem.addEventListener('click', function (event) {
            getEditid = elem.getAttribute('data-edit-id');

            sellerListData = sellerListData.map(function (item) {
                if (item.id == getEditid) {
                    editList = true;
                    document.getElementById("addSellerModalLabel").innerHTML = "Edit seller details";
                    document.querySelector(".submit-btn").innerHTML = "Update";
                    idFieldInput.value = item.id;
                    sellerNameInput.value = item.shop[0].name;
                    emailInput.value = item.email;
                    ownerNameInput.value = item.seller;
                    phoneInput.value = item.phone;

                    document.getElementById('dropzone-preview').innerHTML = "";
                    var mockFile = { name: item.shop[0].img_alt, size: 12345 };
                    dropzone.options.addedfile.call(dropzone, mockFile);
                    dropzone.options.thumbnail.call(dropzone, mockFile, item.shop[0].img);
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
                var filtered = arrayRemove(sellerListData, getRemoveid);

                sellerListData = filtered;
                loadSellerList(sellerListData, currentPage);
                document.getElementById("close-removemodal").click();
            });
        });
    });
}

// Search result list
var searchResultList = document.getElementById("searchResultList");
searchResultList.addEventListener("keyup", function () {
    var inputVal = searchResultList.value.toLowerCase();
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.shop[0].name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.seller.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }
    var filterData = filterItems(sellerListData, inputVal);
    loadSellerList(filterData, currentPage);
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

// clearFields
function clearFields() {
    editList = false;
    document.getElementById("addSellerModalLabel").innerHTML = "Add Seller";
    document.querySelector(".submit-btn").innerHTML = "Add";
    idFieldInput.value = "";
    document.getElementById('dropzone-preview').innerHTML = "";
    sellerNameInput.value = "";
    ownerNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
}

document.getElementById("addSellerModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});
