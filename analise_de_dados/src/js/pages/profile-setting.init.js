/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Profile-setting init js
*/

// Profile Foreground Img
if (document.querySelector("#profile-foreground-img-file-input")) {
    document.querySelector("#profile-foreground-img-file-input").addEventListener("change", function () {
        var preview = document.querySelector(".profile-wid-img");
        var file = document.querySelector(".profile-foreground-img-file-input")
            .files[0];
        var reader = new FileReader();
        reader.addEventListener(
            "load",
            function () {
                preview.src = reader.result;
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

// Profile Foreground Img
if (document.querySelector("#profile-img-file-input")) {
    document.querySelector("#profile-img-file-input").addEventListener("change", function () {
        var preview = document.querySelector(".user-profile-image");
        var file = document.querySelector(".profile-img-file-input").files[0];
        var reader = new FileReader();
        reader.addEventListener(
            "load",
            function () {
                preview.src = reader.result;
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

var count = 2;
function new_link() {
    count++;
    var div1 = document.createElement('div');
    div1.id = count;

    var delLink = '<div class="row"><div class="col-lg-12">' +
        '<div class="mb-3">' +
        '<label for="degreeName1" class="form-label">Degree Name</label>' +
        '<input type="text" class="form-control" id="degreeName1" placeholder="Job title">' +
        '</div></div>' +
        '<div class="col-lg-6">' +
        '<div class="mb-3">' +
        '<label for="universityName" class="form-label">University/school Name</label>' +
        '<input type="text" class="form-control" id="universityName" placeholder="University/school name">' +
        '</div>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<div class="mb-3">' +
        '<label for="passedYear3" class="form-label">Passed Years</label>' +
        '<div class="row">' +
        '<div class="col-lg-5">' +
        '<select class="form-control" data-trigger name="passedYear3"> ' +
        '<option value="">Select years</option>' +
        '<option value="Choice 1">2001</option>' +
        '<option value="Choice 2">2002</option>' +
        '<option value="Choice 3">2003</option>' +
        '<option value="Choice 4">2004</option>' +
        '<option value="Choice 5">2005</option>' +
        '<option value="Choice 6">2006</option>' +
        '<option value="Choice 7">2007</option>' +
        '<option value="Choice 8">2008</option>' +
        '<option value="Choice 9">2009</option>' +
        '<option value="Choice 10">2010</option>' +
        '<option value="Choice 11">2011</option>' +
        '<option value="Choice 12">2012</option>' +
        '<option value="Choice 13">2013</option>' +
        '<option value="Choice 14">2014</option>' +
        '<option value="Choice 15">2015</option>' +
        '<option value="Choice 16">2016</option>' +
        '<option value="Choice 17">2017</option>' +
        '<option value="Choice 18">2018</option>' +
        '<option value="Choice 19">2019</option>' +
        '<option value="Choice 20">2020</option>' +
        '<option value="Choice 21">2021</option>' +
        '<option value="Choice 22">2022</option>' +
        '</select>' +
        '</div>' +
        '<div class="col-auto align-self-center">to</div>' +
        '<div class="col-lg-5">' +
        '<select class="form-control" data-trigger  name="choices-single-default2">' +
        '<option value="">Select years</option>' +
        '<option value="Choice 1">2001</option>' +
        '<option value="Choice 2">2002</option>' +
        '<option value="Choice 3">2003</option>' +
        '<option value="Choice 4">2004</option>' +
        '<option value="Choice 5">2005</option>' +
        '<option value="Choice 6">2006</option>' +
        '<option value="Choice 7">2007</option>' +
        '<option value="Choice 8">2008</option>' +
        '<option value="Choice 9">2009</option>' +
        '<option value="Choice 10">2010</option>' +
        '<option value="Choice 11">2011</option>' +
        '<option value="Choice 12">2012</option>' +
        '<option value="Choice 13">2013</option>' +
        '<option value="Choice 14">2014</option>' +
        '<option value="Choice 15">2015</option>' +
        '<option value="Choice 16">2016</option>' +
        '<option value="Choice 17">2017</option>' +
        '<option value="Choice 18">2018</option>' +
        '<option value="Choice 19">2019</option>' +
        '<option value="Choice 20">2020</option>' +
        '<option value="Choice 21">2021</option>' +
        '<option value="Choice 22">2022</option>' +
        '</select></div></div></div></div>' +
        '<div class="col-lg-12">' +
        '<div class="mb-3">' +
        '<label for="degreeDescription" class="form-label">Degree Description</label>' +
        '<textarea class="form-control" id="degreeDescription" rows="3" placeholder="Enter description"></textarea>' +
        '</div></div><div class="hstack gap-2 justify-content-end"><a class="btn btn-danger" href="javascript:deleteEl(' + count + ')">Delete</a></div></div>';

    div1.innerHTML = document.getElementById('newForm').innerHTML + delLink;

    document.getElementById('newlink').appendChild(div1);

    var genericExamples = document.querySelectorAll("[data-trigger]");
    Array.from(genericExamples).forEach(function (genericExamp) {
        var element = genericExamp;
        new Choices(element, {
            placeholderValue: "This is a placeholder set in the config",
            searchPlaceholderValue: "This is a search placeholder",
            searchEnabled: false,
        });
    });
}

function deleteEl(eleId) {
    d = document;
    var ele = d.getElementById(eleId);
    var parentEle = d.getElementById('newlink');
    parentEle.removeChild(ele);
}