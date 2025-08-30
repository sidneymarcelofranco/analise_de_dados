/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Ecommerce Product Grid List init js
*/

var url = "/static/json/";
var productListData = '';
var editList = false;

var prevButton = document.getElementById('page-prev');
var nextButton = document.getElementById('page-next');
var currentPage = 1;
var itemsPerPage = 12;

//product list by json
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
getJSON("product-list.json", function (err, data) {
    if (err !== null) {
        console.log("Something went wrong: " + err);
    } else {
        productListData = data;
        loadProductList(productListData, currentPage);
        rangeSlider();
    }
});

function loadProductList(datas, page) {
    var pages = Math.ceil(datas.length / itemsPerPage)
    if (page < 1) page = 1
    if (page > pages) page = pages;

    document.getElementById("product-grid").innerHTML = '';

    // Array.from(datas).forEach(function (listData, index) {
    for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < datas.length; i++) {
        if (datas[i]) {
            var text = datas[i].discount;
            var myArray = text.split("%");
            var discount = myArray[0];
            var pricearray = datas[i].price.split("$");
            var afterDiscount = pricearray[1] - (pricearray[1] * discount / 100);
            if (discount > 0) {
                var discountElem = '<div class="ribbon ribbon-danger">Sale</div>';
                var afterDiscountElem = '<h5 class="fs-lg mb-3">$' + afterDiscount.toFixed(2) + ' <small class="fs-sm fw-normal text-decoration-line-through text-muted">' + datas[i].price + '</small></h5>'
            } else {
                var discountElem = "";
                var afterDiscountElem = '<h5 class="fs-lg mb-3">' + datas[i].price + '</h5>'
            }

            document.getElementById("product-grid").innerHTML += '<div class="col-xxl-3 col-lg-4 col-md-6">\
            <div class="card ribbon-box ribbon-fill">\
                '+ discountElem + '\
                <div class="card-body p-4 m-4">\
                    <button type="button" class="btn btn-sm btn-icon btn-subtle-danger position-absolute top-0 end-0 m-3 remove-list"  data-remove-id="'+ datas[i].id + '" data-bs-toggle="modal" data-bs-target="#deleteRecordModal"><i class="ph-trash"></i></button>\
                    <img src="'+ datas[i].product[0].img + '" alt="" class="img-fluid">\
                </div>\
                <div class="card-body pt-0">\
                    <span class="badge bg-warning-subtle text-warning float-end"><i class="bi bi-star-fill align-baseline me-1"></i> <span class="rate">'+ datas[i].ratings + '</span></span>\
                    '+ afterDiscountElem + '\
                    <a href="/apps/ecommerce/product_details">\
                        <h6 class="fs-md text-truncate">'+ datas[i].product[0].title + '</h6>\
                    </a>\
                    <a href="#!" class="text-decoration-underline text-muted mb-0">'+ datas[i].category + '</a>\
                    <div class="mt-3 hstack gap-2">\
                        <a href="/apps/ecommerce/add_product" class="btn btn-primary w-100"><i class="ph-pencil me-1 align-middle"></i> Edit</a>\
                        <a href="/apps/ecommerce/product_details" class="btn btn-secondary w-100"><i class="ph-eye me-1 align-middle"></i> Overview</a>\
                    </div>\
                </div>\
            </div>\
        </div>';
        };
    }

    paginationEvents();
    searchResult(datas);
    selectedPage();
    currentPage == 1 ? prevButton.parentNode.classList.add('disabled') : prevButton.parentNode.classList.remove('disabled');
    currentPage == pages ? nextButton.parentNode.classList.add('disabled') : nextButton.parentNode.classList.remove('disabled');
    refreshCallbacks();
};

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
        return Math.ceil(productListData.length / itemsPerPage);
    };

    function clickPage() {
        document.addEventListener('click', function (e) {
            if (e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber")) {
                currentPage = e.target.textContent;
                loadProductList(productListData, currentPage);
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
            loadProductList(productListData, currentPage);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < numPages()) {
            currentPage++;
            loadProductList(productListData, currentPage);
        }
    });

    pageNumbers();
    clickPage();
    selectedPage();
}


// refreshCallbacks
function refreshCallbacks() {
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
                var filtered = arrayRemove(productListData, getRemoveid);

                productListData = filtered;
                loadProductList(productListData, currentPage);
                document.getElementById("close-removemodal").click();
            });
        });
    });
};

// Search product list
var searchProductList = document.getElementById("searchResultList");
searchProductList.addEventListener("keyup", function () {
    var inputVal = searchProductList.value.toLowerCase();
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.product[0].title.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }
    var filterData = filterItems(productListData, inputVal);
    loadProductList(filterData, currentPage);
});

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
            var productListupdatedAll = productListData;

            if (handle) {
                maxCostInput.value = values[handle];
            } else {
                minCostInput.value = values[handle];
            }

            var maxvalue = maxCostInput.value.substr(2);
            var minvalue = minCostInput.value.substr(2);

            filterDataAll = productListupdatedAll.filter(function (product) {
                if (product.price) {
                    var listArray = product.price.split("$");
                    return parseFloat(listArray[1]) >= minvalue && parseFloat(listArray[1]) <= maxvalue
                }
            });

            loadProductList(filterDataAll, currentPage);
        });

        minCostInput.addEventListener('change', function () {
            slider.noUiSlider.set([null, this.value]);
        });

        maxCostInput.addEventListener('change', function () {
            slider.noUiSlider.set([null, this.value]);
        });
    }
}

//  category list filter
Array.from(document.querySelectorAll('.filter-list a')).forEach(function (filteritem) {
    filteritem.addEventListener("click", function () {
        var filterListItem = document.querySelector(".filter-list a.active");
        if (filterListItem) filterListItem.classList.remove("active");
        filteritem.classList.add('active');

        var filterItemValue = filteritem.querySelector(".listname").innerHTML
        var filterData = productListData.filter(filterlist => filterlist.category === filterItemValue);

        loadProductList(filterData, currentPage);
    });
});


// discount-filter
var arraylist = [];
document.querySelectorAll("#discount-filter .form-check").forEach(function (item) {
    var inputVal = item.querySelector(".form-check-input").value;
    item.querySelector(".form-check-input").addEventListener("change", function () {
        if (item.querySelector(".form-check-input").checked) {
            arraylist.push(inputVal);
        } else {
            arraylist.splice(arraylist.indexOf(inputVal), 1);
        }

        var filterproductdata = productListData;
        if (item.querySelector(".form-check-input").checked && inputVal == 0) {
            filterDataAll = filterproductdata.filter(function (product) {
                if (product.discount) {
                    var listArray = product.discount.split("%");
                    return parseFloat(listArray[0]) < 10;
                }
            });
        } else if (item.querySelector(".form-check-input").checked && arraylist.length > 0) {
            var compareval = Math.min.apply(Math, arraylist);
            filterDataAll = filterproductdata.filter(function (product) {
                if (product.discount) {
                    var listArray = product.discount.split("%");
                    return parseFloat(listArray[0]) >= compareval;
                }
            });
        } else {
            filterDataAll = productListData;
        }


        loadProductList(filterDataAll, currentPage);
    });
});


function searchResult(data) {
    if (data.length == 0) {
        document.getElementById("pagination-element").style.display = "none";
        document.getElementById("search-result-elem").classList.remove("d-none");
    } else {
        document.getElementById("pagination-element").style.display = "flex";
        document.getElementById("search-result-elem").classList.add("d-none");
    }

    var pageNumber = document.getElementById('page-num');
    pageNumber.innerHTML = "";
    var dataPageNum = Math.ceil(data.length / itemsPerPage)
    // for each page
    for (var i = 1; i < dataPageNum + 1; i++) {
        pageNumber.innerHTML += "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + i + "</a></div>";
    }
}