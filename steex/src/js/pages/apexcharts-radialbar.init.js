/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Radialbar Chart init js
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

var chartRadialbarBasicChart = "";
var chartRadialbarMultipleChart = "";
var chartRadialbarCircleChart = "";
var chartRadialbarGradientChart = "";
var chartStorkeRadialbarChart = "";
var chartStorkeRadialbarImagesChart = "";
var chartSemiRadialbarChart = "";

function loadCharts() {
    //  Radialbar Charts
    var chartRadialbarBasicColors = "";
    chartRadialbarBasicColors = getChartColorsArray("basic_radialbar");
    if (chartRadialbarBasicColors) {
        var options = {
            series: [70],
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Cricket'],
            colors: chartRadialbarBasicColors
        };

        if (chartRadialbarBasicChart != "")
            chartRadialbarBasicChart.destroy();
        chartRadialbarBasicChart = new ApexCharts(document.querySelector("#basic_radialbar"), options);
        chartRadialbarBasicChart.render();
    }

    // Multi-Radial Bar
    var chartRadialbarMultipleColors = "";
    chartRadialbarMultipleColors = getChartColorsArray("multiple_radialbar");
    if (chartRadialbarMultipleColors) {
        var options = {
            series: [44, 55, 67, 83],
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
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
                                return 249
                            }
                        }
                    }
                }
            },
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            colors: chartRadialbarMultipleColors
        };

        if (chartRadialbarMultipleChart != "")
            chartRadialbarMultipleChart.destroy();
        chartRadialbarMultipleChart = new ApexCharts(document.querySelector("#multiple_radialbar"), options);
        chartRadialbarMultipleChart.render();
    }

    // Circle Chart - Custom Angle
    var chartRadialbarCircleColors = "";
    chartRadialbarCircleColors = getChartColorsArray("circle_radialbar");
    if (chartRadialbarCircleColors) {
        var options = {
            series: [76, 67, 61, 55],
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: '30%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    }
                }
            },
            colors: chartRadialbarCircleColors,
            labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
            legend: {
                show: true,
                floating: true,
                fontSize: '16px',
                position: 'left',
                offsetX: 160,
                offsetY: 15,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0
                },
                formatter: function (seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
                itemMargin: {
                    vertical: 3
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            },{
                breakpoint: 992,
                options: {
                    legend: {
                        offsetX: 0,
                    }
                }
            }]
        };
;
        if (chartRadialbarCircleChart != "")
            chartRadialbarCircleChart.destroy();
        chartRadialbarCircleChart = new ApexCharts(document.querySelector("#circle_radialbar"), options);
        chartRadialbarCircleChart.render();
    }

    // Gradient Radialbar
    var chartRadialbarGradientColors = "";
    chartRadialbarGradientColors = getChartColorsArray("gradient_radialbar");
    if (chartRadialbarGradientColors) {
        var options = {
            series: [75],
            chart: {
                height: 350,
                type: 'radialBar',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: '70%',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                    },
                    track: {
                        strokeWidth: '67%',
                        margin: 0, // margin is in pixels

                    },

                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -10,
                            show: true,
                            color: '#888',
                            fontSize: '17px'
                        },
                        value: {
                            formatter: function (val) {
                                return parseInt(val);
                            },
                            color: '#111',
                            fontSize: '36px',
                            show: true,
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: chartRadialbarGradientColors,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Percent'],
        };

        if (chartRadialbarGradientChart != "")
            chartRadialbarGradientChart.destroy();
        chartRadialbarGradientChart = new ApexCharts(document.querySelector("#gradient_radialbar"), options);
        chartRadialbarGradientChart.render();
    }

    // Stroked Gauge
    var chartStorkeRadialbarColors = "";
    chartStorkeRadialbarColors = getChartColorsArray("stroked_radialbar");
    if (chartStorkeRadialbarColors) {
        var options = {
            series: [67],
            chart: {
                height: 326,
                type: 'radialBar',
                offsetY: -10
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                            color: undefined,
                            offsetY: 120
                        },
                        value: {
                            offsetY: 76,
                            fontSize: '22px',
                            color: undefined,
                            formatter: function (val) {
                                return val + "%";
                            }
                        }
                    }
                }
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
            labels: ['Median Ratio'],
            colors: chartStorkeRadialbarColors
        };

        if (chartStorkeRadialbarChart != "")
            chartStorkeRadialbarChart.destroy();
        chartStorkeRadialbarChart = new ApexCharts(document.querySelector("#stroked_radialbar"), options);
        chartStorkeRadialbarChart.render();
    }

    // Radialbars with Image
    var chartStorkeRadialbarImagesColors = "";
    chartStorkeRadialbarImagesColors = getChartColorsArray("stroked_radialbar");
    if (chartStorkeRadialbarImagesColors) {
        var options = {
            series: [67],
            chart: {
                height: 315,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 15,
                        size: '65%',
                        image: '/static/images/comingsoon.png',
                        imageWidth: 56,
                        imageHeight: 56,
                        imageClipped: false
                    },
                    dataLabels: {
                        name: {
                            show: false,
                            color: '#fff'
                        },
                        value: {
                            show: true,
                            color: '#333',
                            offsetY: 65,
                            fontSize: '22px'
                        }
                    }
                }
            },
            fill: {
                type: 'image',
                image: {
                    src: ['/static/images/small/img-4.jpg'],
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Volatility'],
        };

        if (chartStorkeRadialbarImagesChart != "")
            chartStorkeRadialbarImagesChart.destroy();
        chartStorkeRadialbarImagesChart = new ApexCharts(document.querySelector("#radialbar_with_img"), options);
        chartStorkeRadialbarImagesChart.render();
    };

    // Semi Circle
    var chartSemiRadialbarColors = "";
    chartSemiRadialbarColors = getChartColorsArray("semi_radialbar");
    if (chartSemiRadialbarColors) {
        var options = {
            series: [76],
            chart: {
                type: 'radialBar',
                height: 350,
                offsetY: -20,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        margin: 5, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: -2,
                            fontSize: '22px'
                        }
                    }
                }
            },
            grid: {
                padding: {
                    top: -10
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    shadeIntensity: 0.4,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 53, 91]
                },
            },
            labels: ['Average Results'],
            colors: chartSemiRadialbarColors
        };

        if (chartSemiRadialbarChart != "")
            chartSemiRadialbarChart.destroy();
        chartSemiRadialbarChart = new ApexCharts(document.querySelector("#semi_radialbar"), options);
        chartSemiRadialbarChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();