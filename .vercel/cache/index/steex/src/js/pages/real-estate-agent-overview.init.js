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

var agentOverviewChart = "";
function loadCharts() {
    // Line Cloumn & Area Charts
    var agentOverviewColors = "";
    agentOverviewColors = getChartColorsArray("agent_overview_charts");
    if (agentOverviewColors) {
        var options = {
            series: [{
                name: 'Total Property',
                type: 'column',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21, 37, 23, 11, 22]
            }, {
                name: 'Property Rent',
                type: 'area',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 45, 64, 44, 55, 41]
            }, {
                name: 'Property Sold',
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
            },
            colors: agentOverviewColors
        };

        if (agentOverviewChart != "")
            agentOverviewChart.destroy();
        agentOverviewChart = new ApexCharts(document.querySelector("#agent_overview_charts"), options);
        agentOverviewChart.render();
    }
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();