/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Ecommerce Dashboard init js
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

var marketOverviewChart = "";
var areachartmini6Chart = "";
var areachartmini7Chart = "";
var chartColumnChart = "";
function loadCharts() {
    //Popularity chart
    var marketOverviewColors = "";
    marketOverviewColors = getChartColorsArray("market-overview");
    if (marketOverviewColors) {
        var options = {
            series: [{
                name: 'Earning',
                data: [26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32, 25, 24.65, 29.32]
            },
            {
                name: 'Expense',
                data: [-10, -17.32, -15.45, -12.30, -19.15, -15.45, -11, -14.32, -15.67, -10, -17.32, -19.2]
            }
            ],
            chart: {
                type: 'bar',
                height: 328,
                stacked: true,
                toolbar: {
                    show: false
                },
            },
            stroke: {
                width: 5,
                colors: "#000",
                lineCap: 'round',
            },
            grid: {
                show: true,
                borderColor: '#000',

                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '30%',
                    borderRadius: 5,
                    lineCap: 'round',
                    borderRadiusOnAllStackedSeries: true

                },
            },
            colors: marketOverviewColors,
            fill: {
                opacity: 1
            },
            dataLabels: {
                enabled: false,
                textAnchor: 'top',
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: function (y) {
                        return y.toFixed(0) + "k";
                    }
                },
            },
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'right',
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
            }
        };

        if (marketOverviewChart != "")
            marketOverviewChart.destroy();
        marketOverviewChart = new ApexCharts(document.querySelector("#market-overview"), options);
        marketOverviewChart.render();
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
                height: 45,
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
        var options1 = {
            series: [{
                data: [50, 15, 20, 34, 23, 56, 65, 41]
            }],
            chart: {
                type: 'line',
                height: 45,
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
        areachartmini7Chart = new ApexCharts(document.querySelector("#mini-chart-7"), options1);
        areachartmini7Chart.render();
    }

    // Basic Column Chart
    var chartColumnColors = "";
    chartColumnColors = getChartColorsArray("column_chart");
    if (chartColumnColors) {
        var options = {
            chart: {
                height: 360,
                type: 'bar',
                toolbar: {
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '45%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['transparent']
            },
            legend: {
                show: true,
                position: 'top',
            },
            series: [{
                name: 'Search Engine Traffic',
                data: [74, 83, 102, 97]
            }, {
                name: 'Direct Traffic',
                data: [46, 57, 59, 54]
            }],
            colors: chartColumnColors,
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May'],
            },
            yaxis: {
                show: false,
            },
            grid: {
                borderColor: '#f1f1f1',
            },
        }

        if (chartColumnChart != "")
            chartColumnChart.destroy();
        chartColumnChart = new ApexCharts(document.querySelector("#column_chart"), options);
        chartColumnChart.render();
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

window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});

loadCharts();

//Orders Table
var options = {
    valueNames: [
        "order_date",
        "order_id",
        "shop",
        "customer",
        "products",
        "amount",
        "status",
        "rating"
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