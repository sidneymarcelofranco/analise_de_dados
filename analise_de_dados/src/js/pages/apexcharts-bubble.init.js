/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Bubble Chart init js
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

var chartBubbleSimpleChart = "";
var chartBubbleChart = "";

function loadCharts() {
    // Bubble Charts Generate Data
    function generateData(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

    // Simple Bubble
    var chartBubbleSimpleColors = "";
    chartBubbleSimpleColors = getChartColorsArray("simple_bubble");
    if (chartBubbleSimpleColors) {
        var options = {
            series: [{
                name: 'Bubble1',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble2',
                data: generateData(new Date('12 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble3',
                data: generateData(new Date('13 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble4',
                data: generateData(new Date('14 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
            ],
            chart: {
                height: 350,
                type: 'bubble',
                toolbar: {
                    show: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 0.8
            },
            title: {
                text: 'Simple Bubble Chart',
                style: {
                    fontWeight: 500,
                },
            },
            xaxis: {
                tickAmount: 12,
                type: 'category',
            },
            yaxis: {
                max: 70
            },
            colors: chartBubbleSimpleColors
        };

        if (chartBubbleSimpleChart != "")
            chartBubbleSimpleChart.destroy();
        chartBubbleSimpleChart = new ApexCharts(document.querySelector("#simple_bubble"), options);
        chartBubbleSimpleChart.render();
    }

    // 3D Bubble
    var chartBubbleColors = "";
    chartBubbleColors = getChartColorsArray("bubble_chart");
    if (chartBubbleColors) {
        var options = {
            series: [{
                name: 'Product1',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product2',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product3',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Product4',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
            ],
            chart: {
                height: 350,
                type: 'bubble',
                toolbar: {
                    show: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
            },
            title: {
                text: '3D Bubble Chart',
                style: {
                    fontWeight: 500,
                },
            },
            xaxis: {
                tickAmount: 12,
                type: 'datetime',
                labels: {
                    rotate: 0,
                }
            },
            yaxis: {
                max: 70
            },
            theme: {
                palette: 'palette2'
            },
            colors: chartBubbleColors
        };

        if (chartBubbleChart != "")
            chartBubbleChart.destroy();
        chartBubbleChart = new ApexCharts(document.querySelector("#bubble_chart"), options);
        chartBubbleChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();