/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: dashboard real estate init js
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

var propertySaleChart = "";
var propertyRentChart = "";
var visitorsChart = "";
var residencyChart = "";
var totalRevenueChart = "";
var totalIncomeChart = "";
var propertySale2Chart = "";
var propetryRentChart = "";
var chartRadialbarMultipleChart = "";
var areachartmini6Chart = "";
var areachartmini7Chart = "";
var areachartmini8Chart = "";
var areachartmini9Chart = "";
var pieChart
function loadCharts() {
    //  property_sale
    var propertySaleColors = "";
    propertySaleColors = getChartColorsArray("property_sale");
    if (propertySaleColors) {
        var options = {
            series: [80],
            chart: {
                width: 110,
                height: 110,
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '50%',
                    },
                    track: {
                        margin: 0,
                        background: propertySaleColors,
                        opacity: 0.2,
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            grid: {
                padding: {
                    top: -15,
                    bottom: -15
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Cricket'],
            colors: propertySaleColors
        };

        if (propertySaleChart != "")
            propertySaleChart.destroy();
        propertySaleChart = new ApexCharts(document.querySelector("#property_sale"), options);
        propertySaleChart.render();
    }

    //  property_rent
    var propertyRentColors = "";
    propertyRentColors = getChartColorsArray("property_rent");
    if (propertyRentColors) {
        var options = {
            series: [65],
            chart: {
                width: 110,
                height: 110,
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '50%'
                    },
                    track: {
                        margin: 0,
                        background: propertyRentColors,
                        opacity: 0.2,
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            grid: {
                padding: {
                    top: -15,
                    bottom: -15
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Cricket'],
            colors: propertyRentColors
        };

        if (propertyRentChart != "")
            propertyRentChart.destroy();
        propertyRentChart = new ApexCharts(document.querySelector("#property_rent"), options);
        propertyRentChart.render();
    }

    //  visitors_chart
    var visitorsChartColors = "";
    visitorsChartColors = getChartColorsArray("visitors_chart");
    if (visitorsChartColors) {
        var options = {
            series: [47],
            chart: {
                width: 110,
                height: 110,
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '50%'
                    },
                    track: {
                        margin: 0,
                        background: visitorsChartColors,
                        opacity: 0.2,
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            grid: {
                padding: {
                    top: -15,
                    bottom: -15
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Cricket'],
            colors: visitorsChartColors
        };

        if (visitorsChart != "")
            visitorsChart.destroy();
        visitorsChart = new ApexCharts(document.querySelector("#visitors_chart"), options);
        visitorsChart.render();
    }

    //  residency_property
    var residencyColors = "";
    residencyColors = getChartColorsArray("residency_property");
    if (residencyColors) {
        var options = {
            series: [43],
            chart: {
                width: 110,
                height: 110,
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '50%'
                    },
                    track: {
                        margin: 0,
                        background: residencyColors,
                        opacity: 0.2,
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            grid: {
                padding: {
                    top: -15,
                    bottom: -15
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Cricket'],
            colors: residencyColors
        };

        if (residencyChart != "")
            residencyChart.destroy();
        residencyChart = new ApexCharts(document.querySelector("#residency_property"), options);
        residencyChart.render();
    }

    //total_revenue
    var totalRevenueColors = "";
    totalRevenueColors = getChartColorsArray("total_revenue");
    if (totalRevenueColors) {
        var options = {
            series: [{
                name: 'Income',
                data: [26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32, 25, 24.65, 29.32]
            }],
            chart: {
                type: 'bar',
                height: 328,
                stacked: true,
                toolbar: {
                    show: false
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '30%',
                    lineCap: 'round',
                    borderRadiusOnAllStackedSeries: true

                },
            },
            grid: {
                padding: {
                    left: 0,
                    right: 0,
                    top: -15,
                    bottom: -15
                }
            },
            colors: totalRevenueColors,
            fill: {
                opacity: 1
            },
            dataLabels: {
                enabled: false,
                textAnchor: 'top',
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: function (y) {
                        return y.toFixed(0) + "k";
                    }
                },
            },
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'right',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    rotate: -90
                },
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    stroke: {
                        width: 1
                    },
                },
            }
        };

        if (totalRevenueChart != "")
            totalRevenueChart.destroy();
        totalRevenueChart = new ApexCharts(document.querySelector("#total_revenue"), options);
        totalRevenueChart.render();
    }

    //  total_income
    var totalIncomeColors = "";
    totalIncomeColors = getChartColorsArray("total_income");
    if (totalIncomeColors) {
        var options = {
            series: [{
                name: "Income",
                data: [32, 18, 13, 17, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69, 72, 83, 90, 110, 130, 117, 103, 92, 95, 119, 80, 96, 116, 125]
            }],
            chart: {
                height: 328,
                type: 'line',
                toolbar: {
                    show: false
                }
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
            colors: totalIncomeColors,
            xaxis: {
                type: 'datetime',
                categories: ['02/01/2023 GMT', '02/02/2023 GMT', '02/03/2023 GMT', '02/04/2023 GMT',
                    '02/05/2023 GMT', '02/06/2023 GMT', '02/07/2023 GMT', '02/08/2023 GMT', '02/09/2023 GMT', '02/10/2023 GMT', '02/11/2023 GMT', '02/12/2023 GMT', '02/13/2023 GMT',
                    '02/14/2023 GMT', '02/15/2023 GMT', '02/16/2023 GMT', '02/17/2023 GMT', '02/18/2023 GMT', '02/19/2023 GMT', '02/20/2023 GMT', '02/21/2023 GMT', '02/22/2023 GMT',
                    '02/23/2023 GMT', '02/24/2023 GMT', '02/25/2023 GMT', '02/26/2023 GMT', '02/27/2023 GMT', '02/28/2023 GMT'
                ]
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: function (y) {
                        return "$" + y.toFixed(0);
                    }
                },
            },
        };

        if (totalIncomeChart != "")
            totalIncomeChart.destroy();
        totalIncomeChart = new ApexCharts(document.querySelector("#total_income"), options);
        totalIncomeChart.render();
    }

    // property_sale_chart
    var propertySaleChartColors = "";
    propertySaleChartColors = getChartColorsArray("property_sale_chart");
    if (propertySaleChartColors) {
        var options = {
            series: [{
                name: "Property Rent",
                data: [30, 57, 25, 33, 20, 27, 38, 49, 42, 58, 33, 46, 40, 34, 41, 53, 19, 23, 36, 52, 58, 43]
            }],
            chart: {
                height: 328,
                type: 'bar',
                toolbar: {
                    show: false,
                }
            },
            colors: propertySaleChartColors,
            plotOptions: {
                bar: {
                    columnWidth: '30%',
                    distributed: true,
                    borderRadius: 5,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                type: 'datetime',
                categories: ['01/01/2023 GMT', '01/02/2023 GMT', '01/03/2023 GMT', '01/04/2023 GMT',
                    '01/05/2023 GMT', '01/06/2023 GMT', '01/07/2023 GMT', '01/08/2023 GMT', '01/09/2023 GMT', '01/10/2023 GMT', '01/11/2023 GMT', '01/12/2023 GMT', '01/13/2023 GMT',
                    '01/14/2023 GMT', '01/15/2023 GMT', '01/16/2023 GMT', '01/17/2023 GMT', '01/18/2023 GMT', '01/19/2023 GMT', '01/20/2023 GMT', '01/21/2023 GMT', '01/22/2023 GMT'
                ],
            },
        };

        if (propertySale2Chart != "")
            propertySale2Chart.destroy();
        propertySale2Chart = new ApexCharts(document.querySelector("#property_sale_chart"), options);
        propertySale2Chart.render();
    }

    // propetry_rent Charts
    var propetryRentColors = "";
    propetryRentColors = getChartColorsArray("propetry_rent");
    if (propetryRentColors) {
        var options = {
            series: [{
                name: 'Property Rent',
                data: [31, 40, 28, 43, 59, 87, 75, 60, 51, 66, 109, 100]
            }],
            chart: {
                height: 328,
                type: 'area',
                toolbar: {
                    show: false
                }
            },
            fill: {
                opacity: "0.01",
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: propetryRentColors,
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    rotate: -90
                },
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    stroke: {
                        width: 1
                    },
                },
            }
        };

        if (propetryRentChart != "")
            propetryRentChart.destroy();
        propetryRentChart = new ApexCharts(document.querySelector("#propetry_rent"), options);
        propetryRentChart.render();
    }

    // Multi-Radial Bar
    var chartRadialbarMultipleColors = "";
    chartRadialbarMultipleColors = getChartColorsArray("multiple_radialbar");
    if (chartRadialbarMultipleColors) {
        var options = {
            series: [44, 55, 67, 83],
            chart: {
                height: 335,
                type: 'pie',
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
            legend: {
                show: true,
            },
            labels: ['Commercial', 'Residential', 'Villa', 'Apartment'],
            colors: chartRadialbarMultipleColors
        };

        if (chartRadialbarMultipleChart != "")
            chartRadialbarMultipleChart.destroy();
        chartRadialbarMultipleChart = new ApexCharts(document.querySelector("#multiple_radialbar"), options);
        chartRadialbarMultipleChart.render();
    }

    //Total Properties
    var propertyTypeColors = getChartColorsArray("property_type");
    if (propertyTypeColors) {
        var chartDom = document.getElementById('property_type');
        pieChart = echarts.init(chartDom);
        var option;

        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '0%',
                left: 'center',
                // doesn't perfectly work with our tricks, disable it
                selectedMode: false,
                textStyle:{
                    color: "#87888a"
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['70%', '100%'],
                    center: ['50%', '70%'],
                    // adjust the start angle
                    startAngle: 180,
                    label: {
                        color: "#87888a",
                        formatter(param) {
                            // correct the percentage
                            return param.name + ' (' + param.percent * 2 + '%)';
                        }
                    },
                    itemStyle: {
                        // borderColor: 'transparent',
                        borderWidth: 4
                    },
                    data: [
                        { value: 1048, name: 'Residency' },
                        { value: 735, name: 'Commercial' },
                        { value: 580, name: 'Villa' },
                        { value: 484, name: 'Apartment' },
                        {
                            // make an record to fill the bottom 50%
                            value: 1048 + 735 + 580 + 484,
                            itemStyle: {
                                // stop the chart from rendering this piece
                                color: 'none',
                                decal: {
                                    symbol: 'none'
                                }
                            },
                            label: {
                                show: false
                            }
                        }
                    ]
                }
            ],
            color: propertyTypeColors
        };

        if (option && typeof option === "object") {
            option && pieChart.setOption(option);
        }
    }
    // Chart-6
    var areachartmini6Colors = "";
    areachartmini6Colors = getChartColorsArray("mini-chart-6");
    if (areachartmini6Colors) {
        var options1 = {
            series: [{
                data: [50, 15, 35, 62, 23, 56, 44, 12]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini6Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini6Chart != "")
            areachartmini6Chart.destroy();
        areachartmini6Chart = new ApexCharts(document.querySelector("#mini-chart-6"), options1);
        areachartmini6Chart.render();
    }

    // Chart-7
    var areachartmini7Colors = "";
    areachartmini7Colors = getChartColorsArray("mini-chart-7");
    if (areachartmini7Colors) {
        var options2 = {
            series: [{
                data: [50, 15, 20, 34, 23, 56, 65, 75]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini7Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini7Chart != "")
            areachartmini7Chart.destroy();
        areachartmini7Chart = new ApexCharts(document.querySelector("#mini-chart-7"), options2);
        areachartmini7Chart.render();
    }

    // Chart-8
    var areachartmini8Colors = "";
    areachartmini8Colors = getChartColorsArray("mini-chart-8");
    if (areachartmini8Colors) {
        var options3 = {
            series: [{
                data: [32, 18, 29, 31, 46, 33, 39, 46]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini8Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini8Chart != "")
            areachartmini8Chart.destroy();
        areachartmini8Chart = new ApexCharts(document.querySelector("#mini-chart-8"), options3);
        areachartmini8Chart.render();
    }

    // Chart-9
    var areachartmini9Colors = "";
    areachartmini9Colors = getChartColorsArray("mini-chart-9");
    if (areachartmini9Colors) {
        var options4 = {
            series: [{
                data: [36, 25, 18, 34, 39, 30, 34, 42]
            }],
            chart: {
                type: 'line',
                height: 50,
                sparkline: {
                    enabled: true
                }

            },
            colors: areachartmini9Colors,
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        };

        if (areachartmini9Chart != "")
            areachartmini9Chart.destroy();
        areachartmini9Chart = new ApexCharts(document.querySelector("#mini-chart-9"), options4);
        areachartmini9Chart.render();
    }
}

window.addEventListener("resize", function () {
    pieChart.resize();
    setTimeout(() => {
        loadCharts();
    }, 0);
});
loadCharts();

//Orders Table
var options = {
    valueNames: [
        "propert_id",
        "propert_type",
        "propert_name",
        "address",
        "agent_name",
        "price",
        "status"
    ],
};

// Init list
var propertyList = new List("propertyList", options).on("updated", function (list) {
    list.matchingItems.length == 0 ?
        (document.getElementsByClassName("noresult")[0].style.display = "block") :
        (document.getElementsByClassName("noresult")[0].style.display = "none");

    if (list.matchingItems.length > 0) {
        document.getElementsByClassName("noresult")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresult")[0].style.display = "block";
    }
});

// sortble-dropdown
var sorttableDropdown = document.querySelectorAll('.sortble-dropdown');
if (sorttableDropdown) {
    sorttableDropdown.forEach(function (elem) {
        elem.querySelectorAll('.dropdown-menu .dropdown-item').forEach(function (item) {
            item.addEventListener('click', function () {
                var getHtml = item.innerHTML;
                elem.querySelector('.dropdown-title').innerHTML = getHtml;
            });
        });
    });
}
