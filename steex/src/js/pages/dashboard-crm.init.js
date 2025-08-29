/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Dashboard CRM init js
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

var balanceOverviewChart = "";
var realizedRateChart = "";
var emailSentChart = "";
var usersActivityChart = "";
var syncStatusBreakdownChart = "";

function loadCharts() {
    //  balance_overview Charts
    var balanceOverviewColors = "";
    balanceOverviewColors = getChartColorsArray("balance_overview");
    if (balanceOverviewColors) {
        var options = {
            series: [{
                name: 'Total Revenue',
                data: [49, 62, 55, 67, 73, 89, 110, 120, 115, 129, 123, 133]
            }, {
                name: 'Total Expense',
                data: [62, 76, 67, 49, 63, 77, 70, 86, 92, 103, 87, 93]
            }, {
                name: 'Profit Ratio',
                data: [12, 36, 29, 33, 37, 42, 58, 67, 49, 33, 24, 18]
            }],
            chart: {
                height: 300,
                type: 'line',
                toolbar: {
                    show: false
                },
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 0,
                    left: 0,
                    blur: 3,
                    color: balanceOverviewColors,
                    opacity: 0.25
                }
            },
            markers: {
                size: 0,
                strokeColors: balanceOverviewColors,
                strokeWidth: 2,
                strokeOpacity: 0.9,
                fillOpacity: 1,
                radius: 0,
                hover: {
                    size: 5,
                }
            },
            grid: {
                show: true,
                padding: {
                    top: -20,
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
                width: [2, 2, 2],
                curve: 'smooth'
            },
            colors: balanceOverviewColors,
        };

        if (balanceOverviewChart != "")
            balanceOverviewChart.destroy();
        balanceOverviewChart = new ApexCharts(document.querySelector("#balance_overview"), options);
        balanceOverviewChart.render();
    }

    // realized_rate charts
    var realizedRateColors = "";
    realizedRateColors = getChartColorsArray("realized_rate");
    if (realizedRateColors) {
        var options = {
            series: [{
                name: 'Read',
                data: [80, 50, 30, 40, 100, 20],
            },
            {
                name: 'Delivery',
                data: [20, 30, 40, 80, 20, 80],
            },
            {
                name: 'Failed',
                data: [44, 76, 78, 13, 43, 10],
            }
            ],
            chart: {
                height: 403,
                type: 'radar',
                toolbar: {
                    show: false
                },
            },
            stroke: {
                width: 1
            },
            fill: {
                opacity: 0.2
            },
            markers: {
                size: 3,
                hover: {
                    size: 4,
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            colors: realizedRateColors,
            xaxis: {
                categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
            }
        };

        if (realizedRateChart != "")
            realizedRateChart.destroy();
        realizedRateChart = new ApexCharts(document.querySelector("#realized_rate"), options);
        realizedRateChart.render();
    }

    // emailSent Bar
    var emailSentColors = "";
    emailSentColors = getChartColorsArray("emailSent");
    if (emailSentColors) {
        var options = {
            series: [63, 87, 33],
            chart: {
                height: 363,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    track: {
                        background: emailSentColors,
                        opacity: 0.15,
                    },
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                            color: "#87888a",
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return 1793
                            }
                        }
                    },
                }
            },
            legend: {
                show: true,
                position: 'bottom',
            },
            labels: ['Sent', 'Received', 'Failed'],
            colors: emailSentColors
        };

        if (emailSentChart != "")
            emailSentChart.destroy();
        emailSentChart = new ApexCharts(document.querySelector("#emailSent"), options);
        emailSentChart.render();
    }

    // usersActivity Columns Charts
    var usersActivityColors = "";
    usersActivityColors = getChartColorsArray("usersActivity");
    if (usersActivityColors) {
        var options = {
            series: [{
                name: 'Activ User',
                data: [44, 55, 41, 67, 22, 43]
            }, {
                name: 'New Users',
                data: [13, 23, 20, 8, 13, 27]
            }],
            chart: {
                type: 'bar',
                height: 330,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '40%',
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            },
            grid: {
                show: true,
                padding: {
                    top: -18,
                    right: 0,
                    bottom: 0,
                },
            },
            legend: {
                position: 'bottom',
            },
            fill: {
                opacity: 1
            },
            colors: usersActivityColors,
        };

        if (usersActivityChart != "")
            usersActivityChart.destroy();
        usersActivityChart = new ApexCharts(document.querySelector("#usersActivity"), options);
        usersActivityChart.render();
    }

    // syncStatusBreakdown Charts
    var syncStatusBreakdownColors = "";
    syncStatusBreakdownColors = getChartColorsArray("syncStatusBreakdown");
    if (syncStatusBreakdownColors) {
        var options = {
            series: [{
                name: 'Synced',
                data: [44, 55, 41, 37, 22, 43, 21]
            }, {
                name: 'Sync Needed',
                data: [53, 32, 33, 52, 13, 43, 32]
            }, {
                name: 'Never Synced',
                data: [12, 17, 11, 9, 15, 11, 20]
            }, {
                name: 'Review Needed',
                data: [9, 7, 5, 8, 6, 9, 4]
            }],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnHight: '40%',
                },
            },
            grid: {
                show: true,
                padding: {
                    top: -20,
                    right: 0,
                    bottom: -10,
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
            },
            yaxis: {
                title: {
                    text: undefined
                },
            },
            fill: {
                opacity: 1
            },
            legend: {
                show: false,
            },
            colors: syncStatusBreakdownColors
        };

        if (syncStatusBreakdownChart != "")
            syncStatusBreakdownChart.destroy();
        syncStatusBreakdownChart = new ApexCharts(document.querySelector("#syncStatusBreakdown"), options);
        syncStatusBreakdownChart.render();
    }

}

window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();


//leadsList Table
var options = new List('leadsList', {
    valueNames: [
        "contact_name",
        "phone_number",
        "leads_score",
        "location",
        "create_date"
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