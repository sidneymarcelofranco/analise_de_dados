/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Pie Chart init js
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

var chartPieBasicChart = "";
var chartDonutBasicChart = "";
var chartDonutupdatingchart = "";
var chartPieGradientChart = "";
var chartPiePatternChart = "";
var chartPieImageChart = "";
var monochromePieChart = "";

function loadCharts() {
    //  Simple Pie Charts
    var chartPieBasicColors = "";
    chartPieBasicColors = getChartColorsArray("simple_pie_chart");
    if (chartPieBasicColors) {
        var options = {
            series: [44, 55, 13, 43, 22],
            chart: {
                height: 300,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            legend: {
                position: 'bottom'
            },
            dataLabels: {
                dropShadow: {
                    enabled: false,
                }
            },
            colors: chartPieBasicColors
        };

        if (chartPieBasicChart != "")
            chartPieBasicChart.destroy();
        chartPieBasicChart = new ApexCharts(document.querySelector("#simple_pie_chart"), options);
        chartPieBasicChart.render();
    }

    // Simple Donut Charts
    var chartDonutBasicColors = "";
    chartDonutBasicColors = getChartColorsArray("simple_dount_chart");
    if (chartDonutBasicColors) {
        var options = {
            series: [44, 55, 41, 17, 15],
            chart: {
                height: 300,
                type: 'donut',
            },
            legend: {
                position: 'bottom'
            },
            dataLabels: {
                dropShadow: {
                    enabled: false,
                }
            },
            colors: chartDonutBasicColors
        };

        if (chartDonutBasicChart != "")
            chartDonutBasicChart.destroy();
        chartDonutBasicChart = new ApexCharts(document.querySelector("#simple_dount_chart"), options);
        chartDonutBasicChart.render();
    }

    // Updating Donut Charts
    var chartDonutupdatingColors = "";
    chartDonutupdatingColors = getChartColorsArray("updating_donut_chart");
    if (chartDonutupdatingColors) {
        var options = {
            series: [44, 55, 13, 33],
            chart: {
                height: 280,
                type: 'donut',
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'bottom'
            },
            colors: chartDonutupdatingColors
        };

        if (chartDonutupdatingchart != "")
            chartDonutupdatingchart.destroy();
        chartDonutupdatingchart = new ApexCharts(document.querySelector("#updating_donut_chart"), options);
        chartDonutupdatingchart.render();

        function appendData() {
            var arr = chartDonutupdatingchart.w.globals.series.slice()
            arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
            return arr;
        }

        function removeData() {
            var arr = chartDonutupdatingchart.w.globals.series.slice()
            arr.pop()
            return arr;
        }

        function randomize() {
            return chartDonutupdatingchart.w.globals.series.map(function () {
                return Math.floor(Math.random() * (100 - 1 + 1)) + 1
            })
        }

        function reset() {
            return options.series
        }

        document.querySelector("#randomize").addEventListener("click", function () {
            chartDonutupdatingchart.updateSeries(randomize())
        })

        document.querySelector("#add").addEventListener("click", function () {
            chartDonutupdatingchart.updateSeries(appendData())
        })

        document.querySelector("#remove").addEventListener("click", function () {
            chartDonutupdatingchart.updateSeries(removeData())
        })

        document.querySelector("#reset").addEventListener("click", function () {
            chartDonutupdatingchart.updateSeries(reset())
        })
    }

    // Gradient Donut Chart
    var chartPieGradientColors = "";
    chartPieGradientColors = getChartColorsArray("gradient_chart");
    if (chartPieGradientColors) {
        var options = {
            series: [44, 55, 41, 17, 15],
            chart: {
                height: 300,
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function (val, opts) {
                    return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
            },
            title: {
                text: 'Gradient Donut with custom Start-angle',
                style: {
                    fontWeight: 500,
                },
            },
            legend: {
                position: 'bottom'
            },
            colors: chartPieGradientColors
        };

        if (chartPieGradientChart != "")
            chartPieGradientChart.destroy();
        chartPieGradientChart = new ApexCharts(document.querySelector("#gradient_chart"), options);
        chartPieGradientChart.render();
    }

    // Pattern Donut chart
    var chartPiePatternColors = "";
    chartPiePatternColors = getChartColorsArray("pattern_chart");
    if (chartPiePatternColors) {
        var options = {
            series: [44, 55, 41, 17, 15],
            chart: {
                height: 300,
                type: 'donut',
                dropShadow: {
                    enabled: true,
                    color: '#111',
                    top: -1,
                    left: 3,
                    blur: 3,
                    opacity: 0.2
                }
            },
            stroke: {
                width: 0,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true
                            }
                        }
                    }
                }
            },
            labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
            dataLabels: {
                dropShadow: {
                    blur: 3,
                    opacity: 0.8
                }
            },
            fill: {
                type: 'pattern',
                opacity: 1,
                pattern: {
                    enabled: true,
                    style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
                },
            },
            states: {
                hover: {
                    filter: 'none'
                }
            },
            theme: {
                palette: 'palette2'
            },
            title: {
                text: "Favorite Movie Type",
                style: {
                    fontWeight: 500,
                },
            },
            legend: {
                position: 'bottom'
            },
            colors: chartPiePatternColors
        };

        if (chartPiePatternChart != "")
            chartPiePatternChart.destroy();
        chartPiePatternChart = new ApexCharts(document.querySelector("#pattern_chart"), options);
        chartPiePatternChart.render();
    }

    // Pie Chart with Image Fill
    var chartPieImageColors = "";
    chartPieImageColors = getChartColorsArray("image_pie_chart");
    if (chartPieImageColors) {
        var options = {
            series: [44, 33, 54, 45],
            chart: {
                height: 300,
                type: 'pie',
            },
            colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
            fill: {
                type: 'image',
                opacity: 0.85,
                image: {
                    src: ['/static/images/small/img-1.jpg', '/static/images/small/img-2.jpg', '/static/images/small/img-3.jpg', '/static/images/small/img-4.jpg'],
                    width: 25,
                    imagedHeight: 25
                },
            },
            stroke: {
                width: 4
            },
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['#111']
                },
                background: {
                    enabled: true,
                    foreColor: '#fff',
                    borderWidth: 0
                }
            },
            legend: {
                position: 'bottom'
            }
        };

        if (chartPieImageChart != "")
            chartPieImageChart.destroy();
        chartPieImageChart = new ApexCharts(document.querySelector("#image_pie_chart"), options);
        chartPieImageChart.render();
    }

    // monochrome_pie_chart
    var monochromePieColors = "";
    monochromePieColors = getChartColorsArray("monochrome_pie_chart");
    if (monochromePieColors) {
        var options = {
            series: [25, 15, 44, 55, 41, 17],
            chart: {
                height: 300,
                type: 'pie',
            },
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#3762ea',
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            },

            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -5
                    }
                }
            },
            title: {
                text: "Monochrome Pie",
                style: {
                    fontWeight: 500,
                },
            },
            dataLabels: {
                formatter: function (val, opts) {
                    var name = opts.w.globals.labels[opts.seriesIndex];
                    return [name, val.toFixed(1) + '%'];
                },
                dropShadow: {
                    enabled: false,
                }
            },
            legend: {
                show: false
            }
        };

        if (monochromePieChart != "")
            monochromePieChart.destroy();
        monochromePieChart = new ApexCharts(document.querySelector("#monochrome_pie_chart"), options);
        monochromePieChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();