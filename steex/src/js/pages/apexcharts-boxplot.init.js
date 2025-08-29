/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Boxplot Chart init js
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

var chartBoxBasicChart = "";
var chartBoxPlotChart = "";
var chartBoxPlotHoriChart = "";

function loadCharts() {
    var chartBoxBasicColors = "";
    chartBoxBasicColors = getChartColorsArray("basic_box");
    if (chartBoxBasicColors) {
        var options = {
            series: [{
                type: 'boxPlot',
                data: [{
                    x: 'Jan 2015',
                    y: [54, 66, 69, 75, 88]
                },
                {
                    x: 'Jan 2016',
                    y: [43, 65, 69, 76, 81]
                },
                {
                    x: 'Jan 2017',
                    y: [31, 39, 45, 51, 59]
                },
                {
                    x: 'Jan 2018',
                    y: [39, 46, 55, 65, 71]
                },
                {
                    x: 'Jan 2019',
                    y: [29, 31, 35, 39, 44]
                },
                {
                    x: 'Jan 2020',
                    y: [41, 49, 58, 61, 67]
                },
                {
                    x: 'Jan 2021',
                    y: [54, 59, 66, 71, 88]
                }
                ]
            }],
            chart: {
                type: 'boxPlot',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            title: {
                text: 'Basic BoxPlot Chart',
                align: 'left',
                style: {
                    fontWeight: 500,
                },
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                        upper: chartBoxBasicColors[0],
                        lower: chartBoxBasicColors[1]
                    }
                }
            },
            stroke: {
                colors: [chartBoxBasicColors[2]]
            },
        };

        if (chartBoxBasicChart != "")
            chartBoxBasicChart.destroy();
        chartBoxBasicChart = new ApexCharts(document.querySelector("#basic_box"), options);
        chartBoxBasicChart.render();
    }

    //  Boxplot-Scatter
    var chartBoxPlotColors = "";
    chartBoxPlotColors = getChartColorsArray("box_plot");
    if (chartBoxPlotColors) {
        var options = {
            series: [{
                name: 'Box',
                type: 'boxPlot',
                data: [{
                    x: new Date('2017-01-01').getTime(),
                    y: [54, 66, 69, 75, 88]
                },
                {
                    x: new Date('2018-01-01').getTime(),
                    y: [43, 65, 69, 76, 81]
                },
                {
                    x: new Date('2019-01-01').getTime(),
                    y: [31, 39, 45, 51, 59]
                },
                {
                    x: new Date('2020-01-01').getTime(),
                    y: [39, 46, 55, 65, 71]
                },
                {
                    x: new Date('2021-01-01').getTime(),
                    y: [29, 31, 35, 39, 44]
                }
                ]
            },
            {
                name: 'Outliers',
                type: 'scatter',
                data: [{
                    x: new Date('2017-01-01').getTime(),
                    y: 32
                },
                {
                    x: new Date('2018-01-01').getTime(),
                    y: 25
                },
                {
                    x: new Date('2019-01-01').getTime(),
                    y: 64
                },
                {
                    x: new Date('2020-01-01').getTime(),
                    y: 27
                },
                {
                    x: new Date('2020-01-01').getTime(),
                    y: 78
                },
                {
                    x: new Date('2021-01-01').getTime(),
                    y: 15
                }
                ]
            }
            ],
            chart: {
                type: 'boxPlot',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            colors: [chartBoxPlotColors[0], chartBoxPlotColors[1]],
            title: {
                text: 'BoxPlot - Scatter Chart',
                align: 'left',
                style: {
                    fontWeight: 500,
                },
            },
            xaxis: {
                type: 'datetime',
                tooltip: {
                    formatter: function (val) {
                        return new Date(val).getFullYear()
                    }
                }
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                        upper: chartBoxPlotColors[2],
                        lower: chartBoxPlotColors[3]
                    }
                }
            },
            stroke: {
                colors: [chartBoxPlotColors[4]]
            },
            tooltip: {
                shared: false,
                intersect: true
            }
        };

        if (chartBoxPlotChart != "")
            chartBoxPlotChart.destroy();
        chartBoxPlotChart = new ApexCharts(document.querySelector("#box_plot"), options);
        chartBoxPlotChart.render();
    }

    // box_plot_hori
    var chartBoxPlotHoriColors = "";
    chartBoxPlotHoriColors = getChartColorsArray("box_plot_hori");
    if (chartBoxPlotHoriColors) {
        var options = {
            series: [
                {
                    data: [
                        {
                            x: 'Category A',
                            y: [54, 66, 69, 75, 88]
                        },
                        {
                            x: 'Category B',
                            y: [43, 65, 69, 76, 81]
                        },
                        {
                            x: 'Category C',
                            y: [31, 39, 45, 51, 59]
                        },
                        {
                            x: 'Category D',
                            y: [39, 46, 55, 65, 71]
                        },
                        {
                            x: 'Category E',
                            y: [29, 31, 35, 39, 44]
                        },
                        {
                            x: 'Category F',
                            y: [41, 49, 58, 61, 67]
                        },
                        {
                            x: 'Category G',
                            y: [54, 59, 66, 71, 88]
                        }
                    ]
                }
            ],
            chart: {
                type: 'boxPlot',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '50%'
                },
                boxPlot: {
                    colors: {
                        upper: chartBoxPlotHoriColors[0],
                        lower: chartBoxPlotHoriColors[1]
                    }
                }
            },
            stroke: {
                colors: [chartBoxPlotHoriColors[2]]
            },
        };

        if (chartBoxPlotHoriChart != "")
            chartBoxPlotHoriChart.destroy();
        chartBoxPlotHoriChart = new ApexCharts(document.querySelector("#box_plot_hori"), options);
        chartBoxPlotHoriChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();