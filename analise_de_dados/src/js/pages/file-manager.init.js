/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: file-manager init Js File
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

var pieChart;
var storageColors = getChartColorsArray("storageChart");
if (storageColors) {
    var chartDom = document.getElementById('storageChart');
    pieChart = echarts.init(chartDom);
    var option;

    option = {
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '4%',
            containLabel: true
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            // show: false,
            bottom: '-5px',
            left: 'center',
            textStyle:{
                color: "#87888a"
            }
        },
        series: [
            {
                name: 'Storage',
                type: 'pie',
                radius: ['75%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 5
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 15,
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    backgroundColor: "#fff",
                    padding: 15,
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Dcomuents' },
                    { value: 735, name: 'Audio' },
                    { value: 580, name: 'Images' },
                    { value: 484, name: 'Video' },
                    { value: 300, name: 'Others' }
                ],
                color: storageColors
            }
        ]
    };

    if (option && typeof option === "object") {
        option && pieChart.setOption(option);
    }
}

window.addEventListener('resize', function () {
    if(pieChart)
        pieChart.resize();
});

// Dropzone
var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
dropzonePreviewNode.id = "";
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone(".file-dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
    });
}

//Orders Table
var options = {
    valueNames: [
        "docs_type",
        "document_name",
        "size",
        "file_item",
        "date"
    ],
};

// Init list
var contactList = new List("contactList", options).on("updated", function (list) {
    list.matchingItems.length == 0 ?
        (document.getElementsByClassName("noresult")[0].style.display = "block") :
        (document.getElementsByClassName("noresult")[0].style.display = "none");

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

var bodyElement = document.getElementsByTagName('body')[0];

Array.from(document.querySelectorAll("#file-list tr")).forEach(function (item) {
    item.querySelector(".view-item-btn").addEventListener("click", function () {
      bodyElement.classList.add("file-detail-show");
      pieChart.resize();
    });
});

Array.from(document.querySelectorAll(".close-btn-overview")).forEach(function (item) {
    item.addEventListener("click", function () {
        bodyElement.classList.remove("file-detail-show");
    });
});

var isShowMenu = false;
var emailMenuSidebar = document.getElementsByClassName('file-manager-wrapper');
Array.from(document.querySelectorAll(".file-menu-btn")).forEach(function (item) {
    item.addEventListener("click", function () {
        Array.from(emailMenuSidebar).forEach(function (elm) {
            elm.classList.add("menubar-show");
            isShowMenu = true;
        });
    });
});

window.addEventListener('click', function (e) {
    if (document.querySelector(".file-manager-wrapper").classList.contains('menubar-show')) {
        if (!isShowMenu) {
            document.querySelector(".file-manager-wrapper").classList.remove("menubar-show");
        }
        isShowMenu = false;
    }
});


function windowResize() {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize < 1400) {
      document.body.classList.remove("file-detail-show");
    } else {
      document.body.classList.add("file-detail-show");
    }
  }
  
  
  windowResize();
  window.addEventListener("resize", windowResize);