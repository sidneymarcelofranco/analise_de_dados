/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.comom
File: Coming soon Init Js File
*/

document.addEventListener('DOMContentLoaded', function () {
    var mainArray = Array.from(document.querySelectorAll(".countdownlist"))
    mainArray.forEach(function (item) {
        var countdownVal = new Date().getTime() + 15000; // item.getAttribute("data-countdown") // You may use specific date for long duration of coming soon time.

        // Set the date we're counting down to
        var countDownDate = new Date(countdownVal).getTime();

        // Update the count down every 1 second
        var countDown = setInterval(function () {
            // Get today's date and time
            var currentTime = new Date().getTime();
            // Find the distance between currentTime and the count down date
            var distance = countDownDate - currentTime;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var countDownBlock = '<div class="countdownlist-item">' +
                '<div class="count-title">Days</div>' + '<div class="count-num">' + days + '</div>' +
                '</div>' +
                '<div class="countdownlist-item">' +
                '<div class="count-title">Hours</div>' + '<div class="count-num">' + hours + '</div>' +
                '</div>' +
                '<div class="countdownlist-item">' +
                '<div class="count-title">Minutes</div>' + '<div class="count-num">' + minutes + '</div>' +
                '</div>' +
                '<div class="countdownlist-item">' +
                '<div class="count-title">Seconds</div>' + '<div class="count-num">' + seconds + '</div>' +
                '</div>';

            // Output the result in an element with id="countDownBlock"
            if (item) {
                item.innerHTML = countDownBlock;
            }
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(countDown);
                document.getElementById("countDownText").innerHTML = `<div class="text-center">
                <img src="/static/images/success-img.png" alt="" height="120">
                <div class="mt-5">
                    <h4>We've Launched our new website</h4>
                    <p class="text-muted">Click the below button to visit our website.</p>
                </div>
                <a href="/" class="btn btn-primary icon-link">Back to Home <i class="bi bi-arrow-right"></i></a>
            </div>`;
            }
        }, 1000);
    })
});