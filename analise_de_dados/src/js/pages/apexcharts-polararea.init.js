/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Polar Area Chart init js
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

var chartPolarareaBasicChart = "";

function loadCharts() {
    // Basic Polar Area 
    var chartPolarareaBasicColors = "";
    chartPolarareaBasicColors = getChartColorsArray("basic_polar_area");
    if (chartPolarareaBasicColors) {
        var options = {
            series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
            chart: {
                type: 'polarArea',
                width: 400,
            },
            labels: ['Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Series G', 'Series H', 'Series I'],
            stroke: {
                colors: ['#fff']
            },
            fill: {
                opacity: 0.8
            },

            legend: {
                position: 'bottom'
            },
            
            colors: chartPolarareaBasicColors,
            responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 250,
                        },
                        legend: {
                            show: false
                        }
                    }
                }
            ]
        };

        if (chartPolarareaBasicChart != "")
            chartPolarareaBasicChart.destroy();
        chartPolarareaBasicChart = new ApexCharts(document.querySelector("#basic_polar_area"), options);
        chartPolarareaBasicChart.render();
    }
    // Polar-Area Monochrome Charts

    var options = {
        series: [42, 47, 52, 58, 65],
        chart: {
            width: 400,
            type: 'polarArea'
        },
        labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
            colors: undefined
        },
        yaxis: {
            show: false
        },
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 0
                },
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 250,
                },
                legend: {
                    show: false
                }
            }
        }
    ],
        theme: {
            mode: 'light',
            palette: 'palette1',
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                color: '#405189',
                shadeIntensity: 0.6
            }
        }
    };

    if (document.querySelector("#monochrome_polar_area")) {
        var chart = new ApexCharts(document.querySelector("#monochrome_polar_area"), options);
        chart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();