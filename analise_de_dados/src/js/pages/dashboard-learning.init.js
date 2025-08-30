/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Dashboard learning init js
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

var totalStudentsChart = "";
var totalCoursesChart = "";
var chartStorkeRadialbarChart = "";
var linechartDatalabelChart = "";
var areachartSplineChart = "";
function loadCharts() {
    //  Total students Charts
    var totalSetudentsColors = "";
    totalSetudentsColors = getChartColorsArray("total_students");
    if (totalSetudentsColors) {
        var options = {
            series: [{
                name: 'Total Students',
                data: [33, 56, 37, 51, 42, 83, 71]
            }],
            chart: {
                height: 95,
                type: 'bar',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    distributed: true,
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                padding: {
                    top: -15,
                    right: 0,
                    left: 0,
                    bottom: -10
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: totalSetudentsColors,
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    show: false,
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (totalStudentsChart != "")
            totalStudentsChart.destroy();
        totalStudentsChart = new ApexCharts(document.querySelector("#total_students"), options);
        totalStudentsChart.render();
    }

    //  Total students Charts
    var totalCoursesColors = "";
    totalCoursesColors = getChartColorsArray("total_courses");
    if (totalCoursesColors) {
        var options = {
            series: [{
                name: 'Total Courses',
                data: [33, 56, 37, 51, 42, 83, 71]
            }],
            chart: {
                height: 95,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                padding: {
                    top: -15,
                    right: 0,
                    left: 0,
                    bottom: -10
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: totalCoursesColors,
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                labels: {
                    show: false,
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (totalCoursesChart != "")
            totalCoursesChart.destroy();
        totalCoursesChart = new ApexCharts(document.querySelector("#total_courses"), options);
        totalCoursesChart.render();
    }

    // Stroked Gauge
    var chartStorkeRadialbarColors = "";
    chartStorkeRadialbarColors = getChartColorsArray("stroked_radialbar");
    if (chartStorkeRadialbarColors) {
        var options = {
            series: [67],
            chart: {
                height: 320,
                type: 'radialBar',
                // offsetY: -2  
            },
            plotOptions: {
                radialBar: {
                    startAngle: -120,
                    endAngle: 120,
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                            color: undefined,
                            offsetY: 80
                        },
                        value: {
                            offsetY: 30,
                            fontSize: '20px',
                            color: "#87888a",
                            formatter: function (val) {
                                return val + "%";
                            }
                        }
                    }
                }
            },
            grid: {
                show: false,
                padding: {
                    top: -15,
                    right: 0,
                    left: 0,
                    bottom: -10
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            stroke: {
                dashArray: 4
            },
            labels: ['Daily Goal'],
            colors: chartStorkeRadialbarColors
        };

        if (chartStorkeRadialbarChart != "")
            chartStorkeRadialbarChart.destroy();
        chartStorkeRadialbarChart = new ApexCharts(document.querySelector("#stroked_radialbar"), options);
        chartStorkeRadialbarChart.render();
    }

    //  Line chart datalabel
    var linechartDatalabelColors = "";
    linechartDatalabelColors = getChartColorsArray("line_chart_datalabel");
    if (linechartDatalabelColors) {
        var options = {
            chart: {
                height: 405,
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: false
                }
            },
            colors: linechartDatalabelColors,
            markers: {
                size: 0,
                colors: "#ffffff",
                strokeColors: linechartDatalabelColors,
                strokeWidth: 1,
                strokeOpacity: 0.9,
                fillOpacity: 1,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [2, 2, 2],
                curve: 'smooth'
            },
            series: [{
                name: "Orders",
                type: 'line',
                data: [180, 274, 346, 290, 370, 420, 490, 542, 510, 580, 636, 745]
            },
            {
                name: "Refunds",
                type: 'area',
                data: [100, 154, 302, 411, 300, 284, 273, 232, 187, 174, 152, 122]
            },
            {
                name: "Earnings",
                type: 'line',
                data: [260, 360, 320, 345, 436, 527, 641, 715, 832, 794, 865, 933]
            }
            ],
            fill: {
                type: ['solid', 'gradient', 'solid'],
                gradient: {
                    shadeIntensity: 1,
                    type: "vertical",
                    inverseColors: false,
                    opacityFrom: 0.3,
                    opacityTo: 0.0,
                    stops: [20, 80, 100, 100]
                },
            },
            grid: {
                row: {
                    colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.2
                },
                borderColor: '#f1f1f1'
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false
                        }
                    },
                    legend: {
                        show: false
                    },
                }
            }]
        }

        if (linechartDatalabelChart != "")
            linechartDatalabelChart.destroy();
        linechartDatalabelChart = new ApexCharts(document.querySelector("#line_chart_datalabel"), options);
        linechartDatalabelChart.render();
    };

    //  Spline Area Charts
    var areachartSplineColors = "";
    areachartSplineColors = getChartColorsArray("area_chart_spline");
    if (areachartSplineColors) {
        var options = {
            series: [{
                name: 'This Month',
                data: [49, 54, 48, 54, 67, 88, 96, 102, 120, 133]
            }, {
                name: 'Last Month',
                data: [57, 66, 74, 63, 55, 70, 84, 97, 112, 99]
            }],
            chart: {
                height: 320,
                type: 'area',
                toolbar: {
                    show: false
                }
            },
            fill: {
                type: ['gradient', 'gradient'],
                gradient: {
                    shadeIntensity: 1,
                    type: "vertical",
                    inverseColors: false,
                    opacityFrom: 0.2,
                    opacityTo: 0.0,
                    stops: [50, 70, 100, 100]
                },
            },
            markers: {
                size: 4,
                strokeColors: areachartSplineColors,
                strokeWidth: 1,
                strokeOpacity: 0.9,
                fillOpacity: 1,
                hover: {
                    size: 6,
                }
            },
            grid: {
                show: false,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                },
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    rotate: -90
                },
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    stroke: {
                        width: 1
                    },
                },
            },
            stroke: {
                width: [2, 2],
                curve: 'smooth'
            },
            colors: areachartSplineColors,
        };

        if (areachartSplineChart != "")
            areachartSplineChart.destroy();
        areachartSplineChart = new ApexCharts(document.querySelector("#area_chart_spline"), options);
        areachartSplineChart.render();
    }
}

window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();



//coursesList Table
var options = new List('coursesList', {
    valueNames: [
        "courses_Name",
        "category",
        "instructor",
        "lessons",
        "duration",
        "fees",
        "status",
        "rating"
    ],
    page: 5,
    pagination: true
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