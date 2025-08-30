/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Ecommerce Sellers init js
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

var chartLineAreaMultiChart = "";
function loadCharts() {
    // Line Cloumn & Area Charts
    var chartLineAreaMultiColors = "";
    chartLineAreaMultiColors = getChartColorsArray("portfolio_charts");
    if (chartLineAreaMultiColors) {
        var options = {
            series: [{
                name: 'Earnings',
                type: 'column',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21, 37, 23, 11, 22]
            }, {
                name: 'Orders',
                type: 'area',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 45, 64, 44, 55, 41]
            }, {
                name: 'Refunds',
                type: 'line',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 25, 21, 30, 25, 36]
            }],
            chart: {
                height: 400,
                type: 'line',
                stacked: false,
                toolbar: {
                    show: false,
                }
            },
            stroke: {
                width: [0, 2, 3],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    columnWidth: '25%'
                }
            },
            fill: {
                opacity: [1, 0.08, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100]
                }
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
            },
            labels: ['01/01/2022', '02/01/2022', '03/01/2022', '04/01/2022', '05/01/2022', '06/01/2022', '07/01/2022',
                '08/01/2022', '09/01/2022', '10/01/2022', '11/01/2022', '12/01/2022', '01/01/2023', '02/01/2023', '03/01/2023', '04/01/2023'
            ],
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime'
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return "$" + y.toFixed(0);
                        }
                        return y;

                    }
                }
            },
            colors: chartLineAreaMultiColors
        };

        if (chartLineAreaMultiChart != "")
            chartLineAreaMultiChart.destroy();
        chartLineAreaMultiChart = new ApexCharts(document.querySelector("#portfolio_charts"), options);
        chartLineAreaMultiChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();