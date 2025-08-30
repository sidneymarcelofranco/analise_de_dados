/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Widgets init js
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

var sessionChart = "";
var visitDurationChart = "";
var impressionsChart = "";
var viewsChart = "";
var areachartmini6Chart = "";
var areachartmini7Chart = "";
var areachartmini8Chart = "";
var areachartmini9Chart = "";
var salesReportChart = "";
var syncStatusBreakdownChart = "";
var realizedRateChart = "";
var emailSentChart = "";
function loadCharts() {
    //  Total Sessions Line Charts
    var sessionChartColors = "";
    sessionChartColors = getChartColorsArray("session_chart");
    if (sessionChartColors) {
        var options = {
            series: [{
                name: 'Total Sessions',
                data: [31, 40, 28, 51, 42, 109, 103]
            }],
            chart: {
                height: 124,
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
            colors: getChartColorsArray("session_chart"),
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (sessionChart != "")
            sessionChart.destroy();
        sessionChart = new ApexCharts(document.querySelector("#session_chart"), options);
        sessionChart.render();
    }

    //  Avg. Visit Duration Charts
    var visitDurationColors = '';
    visitDurationColors = getChartColorsArray("visti_duration_chart");
    if (visitDurationColors) {
        var options = {
            series: [{
                name: 'Avg. Visit Duration',
                data: [29, 43, 71, 58, 99, 93, 130]
            }],
            chart: {
                height: 124,
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
            colors: visitDurationColors,
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (visitDurationChart != "")
            visitDurationChart.destroy();
        visitDurationChart = new ApexCharts(document.querySelector("#visti_duration_chart"), options);
        visitDurationChart.render();
    }

    //  Impressions Charts
    var impressionsColors = '';
    impressionsColors = getChartColorsArray("impressions_chart");
    if (impressionsColors) {
        var options = {
            series: [{
                name: 'Impressions',
                data: [50, 18, 47, 32, 84, 110, 93]
            }],
            chart: {
                height: 124,
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
            colors: impressionsColors,
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (impressionsChart != "")
            impressionsChart.destroy();
        impressionsChart = new ApexCharts(document.querySelector("#impressions_chart"), options);
        impressionsChart.render();
    }

    //  Total Views Charts
    var viewsChartColors = '';
    viewsChartColors = getChartColorsArray("views_chart");
    if (viewsChartColors) {
        var options = {
            series: [{
                name: 'Total Views',
                data: [72, 58, 30, 51, 42, 95, 119]
            }],
            chart: {
                height: 124,
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
            colors: viewsChartColors,
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (viewsChart != "")
            viewsChart.destroy();
        viewsChart = new ApexCharts(document.querySelector("#views_chart"), options);
        viewsChart.render();
    }

    // Chart-6
    var areachartmini6Colors = "";
    areachartmini6Colors = getChartColorsArray("mini-chart-6");
    if (areachartmini6Colors) {
        var options1 = {
            series: [{
                data: [50, 15, 35, 62, 23, 56, 44, 12]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini6Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini6Chart != "")
            areachartmini6Chart.destroy();
        areachartmini6Chart = new ApexCharts(document.querySelector("#mini-chart-6"), options1);
        areachartmini6Chart.render();
    }

    // Chart-7
    var areachartmini7Colors = "";
    areachartmini7Colors = getChartColorsArray("mini-chart-7");
    if (areachartmini7Colors) {
        var options2 = {
            series: [{
                data: [50, 15, 20, 34, 23, 56, 65, 75]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini7Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini7Chart != "")
            areachartmini7Chart.destroy();
        areachartmini7Chart = new ApexCharts(document.querySelector("#mini-chart-7"), options2);
        areachartmini7Chart.render();
    }

    // Chart-8
    var areachartmini8Colors = "";
    areachartmini8Colors = getChartColorsArray("mini-chart-8");
    if (areachartmini8Colors) {
        var options3 = {
            series: [{
                data: [32, 18, 29, 31, 46, 33, 39, 46]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini8Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini8Chart != "")
            areachartmini8Chart.destroy();
        areachartmini8Chart = new ApexCharts(document.querySelector("#mini-chart-8"), options3);
        areachartmini8Chart.render();
    }

    // Chart-9
    var areachartmini9Colors = "";
    areachartmini9Colors = getChartColorsArray("mini-chart-9");
    if (areachartmini9Colors) {
        var options4 = {
            series: [{
                data: [36, 25, 18, 34, 39, 30, 34, 42]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini9Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini9Chart != "")
            areachartmini9Chart.destroy();
        areachartmini9Chart = new ApexCharts(document.querySelector("#mini-chart-9"), options4);
        areachartmini9Chart.render();
    }

    //  sales_Report Charts
    var salesReportColors = '';
    salesReportColors = getChartColorsArray("sales_Report");
    if (salesReportColors) {
        var options = {
            series: [{
                name: 'This Month',
                data: [45, 74, 36, 69, 84, 110, 92]
            }, {
                name: 'Last Month',
                data: [11, 18, 20, 32, 46, 65, 73]
            }],
            chart: {
                height: 333,
                type: 'area',
                toolbar: {
                    show: false
                }
            },
            grid: {
                padding: {
                    top: 0,
                    right: 2,
                    bottom: 0,
                },
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
                offsetY: "-50px",
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'stepline',
            },
            colors: salesReportColors,
            xaxis: {
                type: 'datetime',
                categories: ["02/01/2023 GMT", "02/02/2023 GMT", "02/03/2023 GMT", "02/04/2023 GMT", "02/05/2023 GMT", "02/06/2023 GMT", "02/07/2023 GMT"]
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: function (y) {
                        return y.toFixed(0) + "k";
                    }
                },
            },
        };

        if (salesReportChart != "")
            salesReportChart.destroy();
        salesReportChart = new ApexCharts(document.querySelector("#sales_Report"), options);
        salesReportChart.render();
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
                height: 365,
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
                height: 360,
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
                height: 390,
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

    // world map with line & markers
    var vectorMapWorldLineColors = getChartColorsArray("world-map-line-markers");
    if (vectorMapWorldLineColors) {
        document.getElementById("world-map-line-markers").innerHTML = "";
        var worldlinemap = new jsVectorMap({
            map: "world_merc",
            selector: "#world-map-line-markers",
            zoomOnScroll: false,
            zoomButtons: false,
            markers: [{
                name: "Greenland",
                coords: [72, -42]
            },
            {
                name: "Canada",
                coords: [56.1304, -106.3468],
            },
            {
                name: "Brazil",
                coords: [-14.2350, -51.9253]
            },
            {
                name: "Serbia",
                coords: [44.0165, 21.0059]
            },
            {
                name: "Russia",
                coords: [61, 105]
            },
            {
                name: "United States",
                coords: [37.0902, -95.7129]
            },],
            regionStyle: {
                initial: {
                    stroke: "#9599ad",
                    strokeWidth: 0.25,
                    fill: vectorMapWorldLineColors,
                    fillOpacity: 1,
                },
            },
            labels: {
                markers: {
                    render(marker, index) {
                        return marker.name || marker.labelName || 'Not available'
                    }
                }
            },
        });
    }
}
// Reload charts on the theme change or resize browser
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});

loadCharts();

//Browser Usage Table
var options = {
    valueNames: [
        "browsers",
        "click",
        "pageviews"
    ],
};
var contactList = new List("networks", options)

// sortble-dropdown
var sorttableDropdown = document.querySelectorAll('.sortble-dropdown');
if (sorttableDropdown) {
    sorttableDropdown.forEach(function (elem) {
        elem.querySelectorAll('.dropdown-menu .dropdown-item').forEach(function (item) {
            item.addEventListener('click', function () {
                elem.querySelector('.dropdown-title').innerHTML = item.innerHTML;
            });
        });
    });
}