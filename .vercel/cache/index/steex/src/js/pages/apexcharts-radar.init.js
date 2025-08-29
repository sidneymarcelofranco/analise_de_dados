/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.comom
File: Radar Chart init js
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

var chartRadarBasicChart = "";
var chartRadarMultiChart = "";
var chartRadarPolyradarChart = "";

function loadCharts() {
    // Basic Radar Chart
    var chartRadarBasicColors = "";
    chartRadarBasicColors = getChartColorsArray("basic_radar");
    if (chartRadarBasicColors) {
        var options = {
            series: [{
                name: 'Series 1',
                data: [80, 50, 30, 40, 100, 20],
            }],
            chart: {
                height: 350,
                type: 'radar',
                toolbar: {
                    show: false
                }
            },
            colors: chartRadarBasicColors,
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June']
            }
        };

        if (chartRadarBasicChart != "")
            chartRadarBasicChart.destroy();
        chartRadarBasicChart = new ApexCharts(document.querySelector("#basic_radar"), options);
        chartRadarBasicChart.render();
    }

    // Radar Chart - Multi series
    var chartRadarMultiColors = "";
    chartRadarMultiColors = getChartColorsArray("multi_radar");
    if (chartRadarMultiColors) {
        var options = {
            series: [{
                name: 'Series 1',
                data: [80, 50, 30, 40, 100, 20],
            },
            {
                name: 'Series 2',
                data: [20, 30, 40, 80, 20, 80],
            },
            {
                name: 'Series 3',
                data: [44, 76, 78, 13, 43, 10],
            }
            ],
            chart: {
                height: 350,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                },
                toolbar: {
                    show: false
                },
            },
            stroke: {
                width: 2
            },
            fill: {
                opacity: 0.2
            },
            markers: {
                size: 0
            },
            colors: chartRadarMultiColors,
            xaxis: {
                categories: ['2014', '2015', '2016', '2017', '2018', '2019']
            }
        };

        if (chartRadarMultiChart != "")
            chartRadarMultiChart.destroy();
        chartRadarMultiChart = new ApexCharts(document.querySelector("#multi_radar"), options);
        chartRadarMultiChart.render();
    }

    // Polygon - Radar Charts
    var chartRadarPolyradarColors = "";
    chartRadarPolyradarColors = getChartColorsArray("polygon_radar");
    if (chartRadarPolyradarColors) {
        var options = {
            series: [{
                name: 'Series 1',
                data: [20, 100, 40, 30, 50, 80, 33],
            }],
            chart: {
                height: 350,
                type: 'radar',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                radar: {
                    size: 140,

                }
            },
            title: {
                text: 'Radar with Polygon Fill',
                style: {
                    fontWeight: 500,
                },
            },
            colors: chartRadarPolyradarColors,
            markers: {
                size: 4,
                colors: ['#fff'],
                strokeColor: '#f34e4e',
                strokeWidth: 2,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            xaxis: {
                categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: function (val, i) {
                        if (i % 2 === 0) {
                            return val
                        } else {
                            return ''
                        }
                    }
                }
            }
        };

        if (chartRadarPolyradarChart != "")
            chartRadarPolyradarChart.destroy();
        chartRadarPolyradarChart = new ApexCharts(document.querySelector("#polygon_radar"), options);
        chartRadarPolyradarChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();