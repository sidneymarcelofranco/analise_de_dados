/*
   Template Name: Steex - Admin & Dashboard Template
   Author: Themesbrand
   Website: https://Themesbrand.com/
   Contact: Themesbrand@gmail.com
   File: invoice overview init js
*/

if ((localStorage.getItem("invoices-list") !== null) && (localStorage.getItem("option") !== null) && (localStorage.getItem("invoice_no") !== null)) {

    var invoices_list = localStorage.getItem("invoices-list");
    var options = localStorage.getItem("option");
    var invoice_no = localStorage.getItem("invoice_no");
    var invoices = JSON.parse(invoices_list);

    let viewobj = invoices.find(o => o.invoice_no === invoice_no);

    if ((viewobj != '') && (options == "view-invoice")) {
        let badge;
        switch (viewobj.status) {
            case 'Paid':
                badge = "success";
                break;
            case 'Pending':
                badge = "warning";
                break;
            case 'Unpaid':
                badge = "danger";
                break;
            case 'Refund':
                badge = "danger";
        };

        document.getElementById("legal-register-no").innerHTML = viewobj.company_details.legal_registration_no;
        document.querySelector(".card-logo").src = viewobj.logo_img;
        document.getElementById("email").innerHTML = viewobj.company_details.email;
        document.getElementById('website').href = viewobj.company_details.website;
        document.getElementById("website").innerHTML = viewobj.company_details.website;
        document.getElementById("contact-no").innerHTML = viewobj.company_details.contact_no;

        document.getElementById("invoice-no").innerHTML = viewobj.invoice_no;
        document.getElementById("invoice-date").innerHTML = viewobj.createDate;
        document.getElementById("invoice-due-date").innerHTML = viewobj.dueDate;
        document.getElementById("payment-status").innerHTML = viewobj.status;
        document.getElementById("payment-status").classList.remove("bg-success-subtle", 'text-success');
        document.getElementById("payment-status").classList.add('bg-'+badge+'-subtle', 'text-'+badge);
        document.getElementById("total-amount").innerHTML = viewobj.invoice_amount;

        document.getElementById("billing-name").innerHTML = viewobj.billing_address.full_name;
        document.getElementById("billing-address-line-1").innerHTML = viewobj.billing_address.address;
        document.getElementById("billing-phone-no").innerHTML = viewobj.billing_address.phone;
        document.getElementById("billing-tax-no").innerHTML = viewobj.billing_address.tax;

        document.getElementById("shipping-name").innerHTML = viewobj.shipping_address.full_name;
        document.getElementById("shipping-address-line-1").innerHTML = viewobj.shipping_address.address;
        document.getElementById("shipping-phone-no").innerHTML = viewobj.shipping_address.phone;
        document.getElementById("sign-img").src = viewobj.sign_img;

        document.getElementById("products-list").innerHTML = "";
        var paroducts_list = viewobj.products;
        var counter = 1;
        Array.from(paroducts_list).forEach(function (element) {
            product_data = `
                <tr>
                    <th scope="row">` + counter + `</th>
                    <td class="text-start">
                        <span class="fw-medium">` + element.product_name + `</span>
                        <p class="text-muted mb-0">` + element.product_details + `</p>
                    </td>
                    <td>` + element.rates + `</td>
                    <td>` + element.quantity + `</td>
                    <td class="text-end">$` + element.amount + `</td>
                </tr>`;
            document.getElementById("products-list").innerHTML += product_data;
            counter++;
        });
        var order_summary = `<table class="table table-borderless table-nowrap align-middle mb-0 ms-auto" style="width:250px">
                <tbody>
                    <tr>
                        <td>Sub Total</td>
                        <td class="text-end">$` + viewobj.order_summary.sub_total + `</td>
                    </tr>
                    <tr>
                        <td>Estimated Tax <small class="text-muted">(18%)</small></td>
                        <td class="text-end">$` + viewobj.order_summary.estimated_tex + `</td>
                    </tr>
                    <tr>
                        <td>Discount <small class="text-muted">(STEEX30)</small></td>
                        <td class="text-end">- $` + viewobj.order_summary.discount + `</td>
                    </tr>
                    <tr>
                        <td>Shipping Charge</td>
                        <td class="text-end">$` + viewobj.order_summary.shipping_charge + `</td>
                    </tr>
                    <tr class="border-top border-top-dashed fs-15">
                        <th scope="row">Total Amount</th>
                        <th class="text-end">$` + viewobj.order_summary.total_amount + `</th>
                    </tr>
                </tbody>
            </table><!--end table-->`;
        document.getElementById("products-list-total").innerHTML = order_summary;
        document.getElementById("payment-method").innerHTML = viewobj.payment_details.payment_method;
        document.getElementById("card-holder-name").innerHTML = viewobj.payment_details.card_holder_name;
        document.getElementById("card-number").innerHTML = viewobj.payment_details.card_number;
        document.getElementById("card-total-amount").innerHTML = viewobj.payment_details.total_amount;
        document.getElementById("note").innerHTML = viewobj.notes;
    }
}
