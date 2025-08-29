/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Ecommerce agent overview init js
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

var linechartBasicChart = "";
function loadCharts() {
    //  Basic Line Charts
    var linechartBasicColors = "";
    linechartBasicColors = getChartColorsArray("line_chart_basic");
    if (linechartBasicColors) {
        var options = {
            series: [{
                name: "Daily Earning",
                data: [32, 43, 48, 35, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69, 72, 83, 90, 110, 130, 117, 111, 97, 89, 119, 80, 96, 116, 124]
            }, {
                name: "Expenses",
                data: [15, 35, 18, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29, 32, 41, 34, 29, 37, 70, 55, 49, 37, 21, 54, 36, 45]
            }],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
            },
            grid: {
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 4
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: linechartBasicColors,
            xaxis: {
                type: 'datetime',
                categories: ['03/01/2023 GMT', '03/02/2023 GMT', '03/03/2023 GMT', '03/04/2023 GMT',
                    '03/05/2023 GMT', '03/06/2023 GMT', '03/07/2023 GMT', '03/08/2023 GMT', '03/09/2023 GMT', '03/10/2023 GMT', '03/11/2023 GMT', '03/12/2023 GMT', '03/13/2023 GMT',
                    '03/14/2023 GMT', '03/15/2023 GMT', '03/16/2023 GMT', '03/17/2023 GMT', '03/18/2023 GMT', '03/19/2023 GMT', '03/20/2023 GMT', '03/21/2023 GMT', '03/22/2023 GMT',
                    '03/23/2023 GMT', '03/24/2023 GMT', '03/25/2023 GMT', '03/26/2023 GMT', '03/27/2023 GMT', '03/28/2023 GMT'
                ]
            },
            yaxis: {
                show: false,
            }
        };

        if (linechartBasicChart != "")
            linechartBasicChart.destroy();
        linechartBasicChart = new ApexCharts(document.querySelector("#line_chart_basic"), options);
        linechartBasicChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();