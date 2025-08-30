/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Line Chart init js
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

var linechartBasicChart = "";

function loadCharts() {
    //  Basic Line Charts
    var linechartBasicColors = "";
    linechartBasicColors = getChartColorsArray("line_chart_basic");
    if (linechartBasicColors) {
        var options = {
            series: [{
                name: "New Orders",
                data: [32, 18, 13, 17, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69, 72, 83, 90, 110, 130, 117, 103, 92, 95, 119, 80, 96, 116, 125]
            }, {
                name: "Return Orders",
                data: [3, 6, 2, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29, 32, 41, 34, 29, 37, 70, 55, 49, 36, 30, 52, 38, 33]
            }],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
            },
            grid: {
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 4
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: linechartBasicColors,
            xaxis: {
                type: 'datetime',
                categories: ['02/01/2023 GMT', '02/02/2023 GMT', '02/03/2023 GMT', '02/04/2023 GMT',
                    '02/05/2023 GMT', '02/06/2023 GMT', '02/07/2023 GMT', '02/08/2023 GMT', '02/09/2023 GMT', '02/10/2023 GMT', '02/11/2023 GMT', '02/12/2023 GMT', '02/13/2023 GMT',
                    '02/14/2023 GMT', '02/15/2023 GMT', '02/16/2023 GMT', '02/17/2023 GMT', '02/18/2023 GMT', '02/19/2023 GMT', '02/20/2023 GMT', '02/21/2023 GMT', '02/22/2023 GMT',
                    '02/23/2023 GMT', '02/24/2023 GMT', '02/25/2023 GMT', '02/26/2023 GMT', '02/27/2023 GMT', '02/28/2023 GMT'
                ]
            },
            yaxis: {
                show: false,
            }
        };

        if (linechartBasicChart != "")
            linechartBasicChart.destroy();
        linechartBasicChart = new ApexCharts(document.querySelector("#line_chart_basic"), options);
        linechartBasicChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();


var perPage = 10;
var editList = false;

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
        "order_id",
        "order_date",
        "delivery_date",
        "products",
        "customer",
        "shop",
        "payment_method",
        "amount",
        "rating",
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
var orderList = new List("orderList", options).on("updated", function (list) {
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
        document.querySelector(".pagination-wrap").style.display = "none";
    } else {
        document.querySelector(".pagination-wrap").style.display = "flex";
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


const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
    var json_records = JSON.parse(this.responseText);
    Array.from(json_records).forEach(function (element) {

        orderList.add({
            order_id: `<a href="/apps/ecommerce/order_overview" class="fw-medium link-primary">#TBS2500${element.id}</a>`,
            order_date: element.order_date,
            delivery_date: element.delivery_date,
            products: element.product,
            customer: element.customer,
            shop: '<a href="#!" class="text-reset"><img src="' + element.shop[0].img + '" alt="" class="avatar-xxs rounded-circle me-1 shop-logo"> <span class="shop-name">' + element.shop[0].name + '</span></a>',
            payment_method: element.pay_method,
            amount: '<span class="fw-medium">' + element.price + '</span>',
            rating: '<h5 class="fs-md fw-medium mb-0">' + element.ratings + '</h5>',
            status: isStatus(element.delivery_status)
        });
        orderList.sort('order_id', { order: "desc" });
    });
    orderList.remove("order_id", `<a href="/apps/ecommerce/order_overview" class="fw-medium link-primary">#TBS250001</a>`);
    refreshCallbacks();
    ischeckboxcheck();
}

xhttp.open("GET", "/static/json/order-list.json");
xhttp.send();

isCount = new DOMParser().parseFromString(
    orderList.items.slice(-1)[0]._values.id,
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
        case "New":
            return (
                '<span class="badge bg-primary-subtle text-primary">' +
                val +
                "</span>"
            );
        case "Pending":
            return (
                '<span class="badge bg-warning-subtle text-warning">' +
                val +
                "</span>"
            );
        case "Out of Delivered":
            return (
                '<span class="badge bg-danger-subtle text-danger">' +
                val +
                "</span>"
            );
        case "Shipping":
            return (
                '<span class="badge bg-info-subtle text-info">' + val + "</span>"
            );
        case "Delivered":
            return (
                '<span class="badge bg-success-subtle text-success">' +
                val +
                "</span>"
            );
    }
}

document.getElementById("showModal").addEventListener("show.bs.modal", function (e) {
    if (e.relatedTarget.classList.contains("edit-item-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit Order";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Update";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add Order";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").innerHTML = "Add Order";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List product";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
    }
});

document.querySelector("#companyLogo-image-input").addEventListener("change", function () {
    var preview = document.querySelector("#companyLogo-img");
    var file = document.querySelector("#companyLogo-image-input").files[0];
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
var companyLogoImg = document.getElementById("companyLogo-img");
var customerNameField = document.getElementById("customername-field");
var shopNameField = document.getElementById("shopName-input");
var productsField = document.getElementById("productname-field");
var orderDateField = document.getElementById("date-field");
var amountField = document.getElementById("amount-field");
var paymentField = document.getElementById("payment-field");
var deliverStatsField = document.getElementById("delivered-status");

var removeBtns = document.getElementsByClassName("remove-item-btn");
var editBtns = document.getElementsByClassName("edit-item-btn");

var productVal = new Choices(productsField, {
    searchEnabled: false,
});

var paymentVal = new Choices(paymentField, {
    searchEnabled: false,
});

var deliverStatsVal = new Choices(deliverStatsField, {
    searchEnabled: false,
});

flatpickr("#date-field", {
    enableTime: true,
    dateFormat: "d M, Y"
});

refreshCallbacks();

// tablelist-form
var count = 13;
var forms = document.querySelectorAll('.tablelist-form')
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var errorMsg = document.getElementById("alert-error-msg");
        errorMsg.classList.remove("d-none");

        setTimeout(() => errorMsg.classList.add("d-none"), 2000);

        var text;
        if (customerNameField.value == "") {
            text = "Please enter a customer name";
            errorMsg.innerHTML = text;
            return false;
        } else if (productsField.value == "") {
            text = "Please select a products category";
            errorMsg.innerHTML = text;
            return false;
        } else if (orderDateField.value == "") {
            text = "Please select a order date";
            errorMsg.innerHTML = text;
            return false;
        } else if (shopNameField.value == "") {
            text = "Please enter a shop name";
            errorMsg.innerHTML = text;
            return false;
        } else if (amountField.value == "") {
            text = "Please enter a amount";
            errorMsg.innerHTML = text;
            return false;
        } else if (paymentField.value == "") {
            text = "Please select a payment method";
            errorMsg.innerHTML = text;
            return false;
        } else if (deliverStatsField.value == "") {
            text = "Please select a delivery status";
            errorMsg.innerHTML = text;
            return false;
        }


        if (customerNameField.value !== "" &&
            productsField.value !== "" &&
            orderDateField.value !== "" &&
            shopNameField.value !== "" &&
            amountField.value !== "" &&
            paymentField.value !== "" && deliverStatsField.value !== "" && !editList
        ) {
            orderList.add({
                order_id: '<a href="/apps/ecommerce/order_overview" class="fw-medium link-primary">#TBS2500' + count + '</a>',
                order_date: orderDateField.value,
                delivery_date: '--',
                products: productsField.value,
                customer: customerNameField.value,
                shop: '<a href="#!" class="text-reset"><img src="' + companyLogoImg.src + '" alt="" class="avatar-xxs rounded-circle me-1 shop-logo"> <span class="shop-name">' + shopNameField.value + '</span></a>',
                payment_method: paymentField.value,
                amount: '<span class="fw-medium">' + amountField.value + '</span>',
                rating: '<h5 class="fs-md fw-medium mb-0">--</h5>',
                status: isStatus(deliverStatsField.value)
            });

            orderList.sort('order_id', { order: "desc" });
            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-ordermodal").click();
            count++;
            clearFields();
            refreshCallbacks();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Order inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
        } else if (customerNameField.value !== "" &&
            productsField.value !== "" &&
            orderDateField.value !== "" &&
            shopNameField.value !== "" &&
            amountField.value !== "" &&
            paymentField.value !== "" && deliverStatsField.value !== "" && editList
        ) {
            var editValues = orderList.get({
                order_id: idField.value,
            });

            Array.from(editValues).forEach(function (x) {
                isid = new DOMParser().parseFromString(x._values.order_id, "text/html");
                var selectedid = isid.body.firstElementChild.innerHTML;
                if (selectedid == itemId) {
                    x.values({
                        order_id: '<a href="/apps/ecommerce/order_overview" class="fw-medium link-primary">' + idField.value + '</a>',
                        order_date: orderDateField.value,
                        delivery_date: document.getElementById('delivery-status-field').value,
                        products: productsField.value,
                        customer: customerNameField.value,
                        shop: '<a href="#!" class="text-reset"><img src="' + companyLogoImg.src + '" alt="" class="avatar-xxs rounded-circle me-1 shop-logo"> <span class="shop-name">' + shopNameField.value + '</span></a>',
                        payment_method: paymentField.value,
                        amount: '<span class="fw-medium">' + amountField.value + '</span>',
                        rating: '<h5 class="fs-md fw-medium mb-0">' + document.getElementById('rating-field').value + '</h5>',
                        status: isStatus(deliverStatsField.value)
                    });
                }
            });

            document.getElementById("alert-error-msg").classList.add("d-none");
            document.getElementById("close-ordermodal").click();
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
                var itemValues = orderList.get({
                    order_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    var deleteid = new DOMParser().parseFromString(x._values.order_id, "text/html");

                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;

                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            orderList.remove("order_id", isElem.outerHTML);
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
                var itemValues = orderList.get({
                    order_id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.order_id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;

                    if (selectedid == itemId) {
                        editList = true;
                        idField.value = selectedid;
                        customerNameField.value = x._values.customer;
                        productsField.value = x._values.products;
                        paymentField.value = x._values.payment_method;
                        var statsVal = new DOMParser().parseFromString(x._values.status, "text/html");
                        deliverStatsField.value = statsVal.body.querySelector('.badge').innerHTML;


                        orderDateField.value = x._values.order_date;
                        var priceVal = new DOMParser().parseFromString(x._values.amount, "text/html");
                        amountField.value = priceVal.body.querySelector('span').innerHTML;

                        // productVal
                        if (productVal) productVal.destroy();
                        productVal = new Choices(productsField, {
                            searchEnabled: false,
                        });
                        productVal.setChoiceByValue(x._values.products);

                        // shopNameField
                        var shopField = new DOMParser().parseFromString(x._values.shop, "text/html");
                        shopNameField.value = shopField.body.querySelector('.shop-name').innerHTML;
                        companyLogoImg.src = shopField.body.querySelector('.shop-logo').src;

                        // order_date
                        flatpickr("#date-field", {
                            enableTime: true,
                            dateFormat: "d M, Y",
                            defaultDate: x._values.order_date,
                        });

                        // paymentVal
                        if (paymentVal) paymentVal.destroy();
                        paymentVal = new Choices(paymentField, {
                            searchEnabled: false,
                        });
                        paymentVal.setChoiceByValue(x._values.payment_method);

                        // deliverStatsVal
                        if (deliverStatsVal) deliverStatsVal.destroy();
                        deliverStatsVal = new Choices(deliverStatsField, {
                            searchEnabled: false,
                        });
                        deliverStatsVal.setChoiceByValue(statsVal.body.querySelector('.badge').innerHTML);

                        // delivery date val
                        document.getElementById('delivery-status-field').value = x._values.delivery_date;

                        // rating val
                        var ratingVal = new DOMParser().parseFromString(x._values.rating, "text/html");
                        document.getElementById('rating-field').value = ratingVal.body.querySelector('h5').innerHTML;

                    }
                });
            });
        });
    }
};



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
                    orderList.remove("order_id", `<a href="/apps/ecommerce/order_overview" class="fw-medium link-primary">${ids_array[i]}</a>`);
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

function clearFields() {
    document.getElementById("id-field").value = "";
    companyLogoImg.src = "/static/images/users/multi-user.jpg";
    customerNameField.value = "";
    productsField.value = "";
    orderDateField.value = "";
    amountField.value = "";
    paymentField.value = "";
    shopNameField.value = "";
    deliverStatsField.value = "";

    // productVal
    if (productVal) productVal.destroy();
    productVal = new Choices(productsField, {
        searchEnabled: false,
    });

    // paymentVal
    if (paymentVal) paymentVal.destroy();
    paymentVal = new Choices(paymentField, {
        searchEnabled: false,
    });

    // deliverStatsVal
    if (deliverStatsVal) deliverStatsVal.destroy();
    deliverStatsVal = new Choices(deliverStatsField, {
        searchEnabled: false,
    });

    flatpickr("#date-field", {
        enableTime: true,
        dateFormat: "d M, Y"
    });

    document.getElementById("companyLogo-image-input").value = "";
    document.getElementById('delivery-status-field').value = "";
    document.getElementById('rating-field').value = "";
}


document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});