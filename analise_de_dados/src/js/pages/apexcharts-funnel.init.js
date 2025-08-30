/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Funnel Chart init js
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

var funnelChart = "";
var pyramidChart = "";

function loadCharts() {

    //  funnel Charts
    var basicFunnelChartColors = "";
    basicFunnelChartColors = getChartColorsArray("funnel_chart");
    if (basicFunnelChartColors) {
        var options = {
            series: [
                {
                    name: "Funnel Series",
                    data: [1380, 1100, 990, 880, 740, 548, 330, 200],
                },
            ],
            chart: {
                type: 'bar',
                height: 350,
            },
            colors: basicFunnelChartColors,
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: '80%',
                    isFunnel: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
                },
                dropShadow: {
                    enabled: true,
                },
            },
            title: {
                text: 'Recruitment Funnel',
                align: 'middle',
            },
            xaxis: {
                categories: [
                    'Sourced',
                    'Screened',
                    'Assessed',
                    'HR Interview',
                    'Technical',
                    'Verify',
                    'Offered',
                    'Hired',
                ],
            },
            legend: {
                show: false,
            },
        };

        if (funnelChart != "")
            funnelChart.destroy();
        funnelChart = new ApexCharts(document.querySelector("#funnel_chart"), options);
        funnelChart.render();
    }

    //  Pyramid Charts
    var pyramidChartColors = "";
    pyramidChartColors = getChartColorsArray("pyramidChart");
    if (pyramidChartColors) {
        var options = {
            series: [
                {
                    name: "",
                    data: [200, 330, 548, 740, 880, 990, 1100, 1380],
                },
            ],
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    distributed: true,
                    barHeight: '80%',
                    isFunnel: true,
                },
            },
            colors: pyramidChartColors,
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex]
                },
                dropShadow: {
                    enabled: true,
                },
            },
            title: {
                text: 'Pyramid Chart',
                align: 'middle',
            },
            xaxis: {
                categories: ['Sweets', 'Processed Foods', 'Healthy Fats', 'Meat', 'Beans & Legumes', 'Dairy', 'Fruits & Vegetables', 'Grains'],
            },
            legend: {
                show: false,
            },
        };

        if (pyramidChart != "")
            pyramidChart.destroy();
        pyramidChart = new ApexCharts(document.querySelector("#pyramidChart"), options);
        pyramidChart.render();
    }
}

window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});
loadCharts();