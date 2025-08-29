/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Ecommerce Product List init js
*/

var perPage = 10;
var editlist = false;

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

//Orders Table
var options = {
    valueNames: [
        'id',
        "products",
        'discount',
        "stock",
        "price",
        "category",
        "orders",
        "rating",
        "published"
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

// Dropzone has been added as a global variable.
// Dropzone
var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
dropzonePreviewNode.id = "";
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone("div.my-dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
    });
}

// Init list
var productList = new List("productList", options).on("updated", function (list) {
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

    if (list.matchingItems.length == perPage) {
        document.querySelector(".pagination.listjs-pagination").firstElementChild.children[0].click()
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

        productList.add({
            id: `<a href="javascript:void(0);" class="fw-medium link-primary">#TB${element.id}</a>`,
            products: '<div class="d-flex align-items-center">\
                <div class="avatar-xs bg-light rounded p-1 me-2">\
                    <img src="'+ element.product[0].img + '" alt="' + element.product[0].img_alt + '" class="img-fluid d-block product-img">\
                </div>\
                <div>\
                    <h6 class="mb-0"><a href="/apps/ecommerce/product_details" class="text-reset text-capitalize product-title">'+ element.product[0].title + '</a></h6>\
                </div>\
            </div>',
            discount: element.discount,
            category: element.category,
            stock: element.stock,
            price: element.price,
            orders: element.orders,
            rating: '<span class="badge bg-warning-subtle text-warning"><i class="bi bi-star-fill align-baseline me-1"></i> <span class="rate">' + element.ratings + '</span></span>',
            published: element.publish
        });
        productList.sort('id', { order: "desc" });

    });
    productList.remove("id", `<a href="javascript:void(0);" class="fw-medium link-primary">#TB01</a>`);
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/product-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    productList.items.slice(-1)[0]._values.id,
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

// form inputs
var idField = document.getElementById("id-field");
var productTitleField = document.getElementById("product-title-input");
var productCategoryField = document.getElementById("product-category-input");
var productStockField = document.getElementById("product-stock-input");
var productPriceField = document.getElementById("product-price-input");
var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

refreshCallbacks();

// date & time
var date = new Date().toUTCString().slice(5, 16);

var categoryVal = new Choices(productCategoryField, {
    searchEnabled: false,
});

// tablelist-form
var count = 13;
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
        if (productTitleField.value == "") {
            text = "Please enter a product title";
            errorMsg.innerHTML = text;
            return false;
        } else if (document.querySelectorAll(".dz-image-preview").length == 0) {
            text = "Please select a product images";
            errorMsg.innerHTML = text;
            return false;
        } else if (productCategoryField.value == "") {
            text = "Please select a products category";
            errorMsg.innerHTML = text;
            return false;
        } else if (productStockField.value == "") {
            text = "Please enter a product stocks";
            errorMsg.innerHTML = text;
            return false;
        } else if (productPriceField.value == "") {
            text = "Please enter a product price";
            errorMsg.innerHTML = text;
            return false;
        }

        if (
            productTitleField.value !== "" &&
            productCategoryField.value !== "" &&
            productStockField.value !== "" &&
            productPriceField.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && !editlist
        ) {
            productList.add({
                id: '<a href="javascript:void(0);" class="fw-medium link-primary">#TBT' + count + "</a>",
                products: '<div class="d-flex align-items-center">\
                    <div class="avatar-xs bg-light rounded p-1 me-2">\
                        <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="img-fluid d-block product-img">\
                    </div>\
                    <div>\
                        <h6 class="mb-0"><a href="/apps/ecommerce/product_details" class="text-reset product-title">'+ productTitleField.value + '</a></h6>\
                    </div>\
                </div>',
                discount: document.getElementById('discount-field').value,
                category: productCategoryField.value,
                stock: productStockField.value,
                price: productPriceField.value,
                orders: '--',
                rating: '<span class="badge bg-warning-subtle text-warning"><i class="bi bi-star-fill align-baseline me-1"></i> <span class="rate">--</span></span>',
                published: date
            });
            productList.sort('id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-modal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product Add successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } else if (
            productTitleField.value !== "" &&
            productCategoryField.value !== "" &&
            productStockField.value !== "" &&
            productPriceField.value !== "" &&
            document.querySelectorAll(".dz-image-preview").length > 0 && editlist
        ) {
            var editValues = productList.get({
                id: idField.value,
            });

            Array.from(editValues).forEach(function (x) {
                isid = new DOMParser().parseFromString(x._values.id, "text/html");
                var selectedid = isid.body.firstElementChild.innerHTML;
                if (selectedid == itemId) {
                    x.values({
                        id: '<a href="javascript:void(0);" class="fw-medium link-primary">' + idField.value + "</a>",
                        products: '<div class="d-flex align-items-center">\
                            <div class="avatar-xs bg-light rounded p-1 me-2">\
                                <img src="'+ imageDom.src + '" alt="' + imageDom.getAttribute('alt') + '" class="img-fluid d-block product-img">\
                            </div>\
                            <div>\
                                <h6 class="mb-0"><a href="/apps/ecommerce/product_details" class="text-reset product-title">'+ productTitleField.value + '</a></h6>\
                            </div>\
                        </div>',
                        discount: document.getElementById('discount-field').value,
                        category: productCategoryField.value,
                        stock: productStockField.value,
                        price: productPriceField.value,
                        orders: document.getElementById('order-field').value,
                        rating: '<span class="badge bg-warning-subtle text-warning"><i class="bi bi-star-fill align-baseline me-1"></i> <span class="rate">' + document.getElementById('rating-field').value + '</span></span>',
                        published: date
                    });
                }
            });

            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-modal").click();
            clearFields();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Order updated Successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        }
        return true;
    });
});

document.getElementById("showModal").addEventListener("show.bs.modal", function (e) {
    if (e.relatedTarget.classList.contains("edit-item-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit product";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Update";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add product";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Add product";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List product";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
    }
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
                var itemValues = productList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    deleteid = new DOMParser().parseFromString(x._values.id, "text/html");

                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;

                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            productList.remove("id", isElem.outerHTML);
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
                var itemValues = productList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;

                    if (selectedid == itemId) {
                        editlist = true;
                        idField.value = selectedid;
                        var productDom = new DOMParser().parseFromString(x._values.products, "text/html");
                        productTitleField.value = productDom.querySelector(".product-title").innerHTML;

                        document.getElementById('dropzone-preview').innerHTML = "";
                        var mockFile = { name: productDom.body.querySelector('img').getAttribute('alt'), size: 12345 };
                        dropzone.options.addedfile.call(dropzone, mockFile);
                        dropzone.options.thumbnail.call(dropzone, mockFile, productDom.body.querySelector('img').src);

                        // categoryVal
                        if (categoryVal) categoryVal.destroy();
                        categoryVal = new Choices(productCategoryField, {
                            searchEnabled: false,
                        });
                        var selectedproduct = x._values.category;
                        categoryVal.setChoiceByValue(selectedproduct);

                        productStockField.value = x._values.stock;
                        var priceVal = x._values.price.split("$");
                        productPriceField.value = priceVal[1];

                        var ratingDom = new DOMParser().parseFromString(x._values.rating, "text/html");
                        document.getElementById('order-field').value = x._values.orders;
                        document.getElementById('rating-field').value = ratingDom.querySelector('.rate').innerHTML;
                    }
                });
            });
        });
    }
};

function clearFields() {
    idField.value = "";
    productTitleField.value = "";
    productStockField.value = "";
    productPriceField.value = "";

    if(document.getElementById('dropzone-preview'))
        document.getElementById('dropzone-preview').innerHTML = "";

    if (categoryVal) {
        categoryVal.destroy();
        categoryVal = new Choices(productCategoryField);
    }
    document.getElementById('order-field').value = "";
    document.getElementById('rating-field').value = "";
    document.getElementById('discount-field').value = "";
}

document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
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
                    productList.remove("id", `<a href="javascript:void(0);" class="fw-medium link-primary">${ids_array[i]}</a>`);
                }
                document.getElementById("remove-actions").classList.add("d-none");
                document.getElementById("checkAll").checked = false;
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your data has been deleted.',
                    icon: 'success',
                    // confirmButtonClass: 'btn btn-info w-xs mt-2',
                    customClass: {
                        confirmButton: 'btn btn-info w-xs me-2 mt-2',
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

function filterData() {
    var isDiscount = document.getElementById("idDiscount").value;
    var isCategory = document.getElementById("idCategory").value;

    productList.filter(function (data) {
        var discountFilter = false;
        var categoryFilter = false;
        var discountVal = data.values().discount.split('%');

        if (data.values().category == "all" || isCategory == "all") {
            categoryFilter = true;
        } else {
            categoryFilter = data.values().category == isCategory;
        }

        if (discountVal == "all" || isDiscount == "all") {
            discountFilter = true;
        } else if (isDiscount == "0") {
            discountFilter = parseFloat(discountVal[0]) < 10;
        } else {
            discountFilter = parseFloat(discountVal[0]) >= isDiscount;
        }

        if (discountFilter && categoryFilter) {
            return discountFilter && categoryFilter;
        }
    });
    productList.update();
}