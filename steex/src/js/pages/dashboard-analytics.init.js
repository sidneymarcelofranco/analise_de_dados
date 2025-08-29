/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Dashboard Analytics init js
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

var sessionChart = "";
var visitDurationChart = "";
var impressionsChart = "";
var viewsChart = "";
var barchartChart = "";
var clicksChart = "";
var chartColumnDistributedChart = "";
var salesReportChart = "";
var timeOnSaleChart = "";
var goalCompletionsChart = "";
var bounceRateChart = "";
var newSessionsChart = "";
var pieChart = "";

function loadCharts() {
    //  Total Sessions Line Charts
    var sessionChartColors = "";
    sessionChartColors = getChartColorsArray("session_chart");
    if (sessionChartColors) {
        var options = {
            series: [{
                name: 'Total Sessions',
                data: [31, 40, 28, 51, 42, 109, 103]
            }],
            chart: {
                height: 124,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: getChartColorsArray("session_chart"),
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (sessionChart != "")
            sessionChart.destroy();
        sessionChart = new ApexCharts(document.querySelector("#session_chart"), options);
        sessionChart.render();
    }

    //  Avg. Visit Duration Charts
    var visitDurationColors = '';
    visitDurationColors = getChartColorsArray("visti_duration_chart");
    if (visitDurationColors) {
        var options = {
            series: [{
                name: 'Avg. Visit Duration',
                data: [29, 43, 71, 58, 99, 93, 130]
            }],
            chart: {
                height: 124,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: visitDurationColors,
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (visitDurationChart != "")
            visitDurationChart.destroy();
        visitDurationChart = new ApexCharts(document.querySelector("#visti_duration_chart"), options);
        visitDurationChart.render();
    }

    //  Impressions Charts
    var impressionsColors = '';
    impressionsColors = getChartColorsArray("impressions_chart");
    if (impressionsColors) {
        var options = {
            series: [{
                name: 'Impressions',
                data: [50, 18, 47, 32, 84, 110, 93]
            }],
            chart: {
                height: 124,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: impressionsColors,
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (impressionsChart != "")
            impressionsChart.destroy();
        impressionsChart = new ApexCharts(document.querySelector("#impressions_chart"), options);
        impressionsChart.render();
    }

    //  Total Views Charts
    var viewsChartColors = '';
    viewsChartColors = getChartColorsArray("views_chart");
    if (viewsChartColors) {
        var options = {
            series: [{
                name: 'Total Views',
                data: [72, 58, 30, 51, 42, 95, 119]
            }],
            chart: {
                height: 124,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: viewsChartColors,
            xaxis: {
                categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                labels: {
                    style: {
                        fontSize: '10px',
                    },
                }
            },
            yaxis: {
                show: false,
            },
        };

        if (viewsChart != "")
            viewsChart.destroy();
        viewsChart = new ApexCharts(document.querySelector("#views_chart"), options);
        viewsChart.render();
    }

    //pageviews_overview chart
    var barchartColors = '';
    barchartColors = getChartColorsArray("pageviews_overview");
    if (barchartColors) {
        var options = {
            series: [{
                name: 'Website',
                data: [12, 14.65, 28.24, 25.02, 19.65, 23, 21.18, 23.65, 20.32, 18, 12.65, 28.32]
            },
            {
                name: 'Social Media',
                data: [26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32, 25, 24.65, 29.32]
            },
            {
                name: 'Others',
                data: [-10, -17.32, -15.45, -12.30, -19.15, -15.45, -11, -14.32, -15.67, -10, -17.32, -19.2]
            }
            ],
            chart: {
                type: 'bar',
                height: 373,
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: 5,
                colors: "#000",
                lineCap: 'round',
            },
            plotOptions: {
                bar: {
                    columnWidth: '25%',
                    borderRadius: 5,
                    lineCap: 'round',
                    borderRadiusOnAllStackedSeries: true

                },
            },
            colors: barchartColors,
            fill: {
                opacity: 1
            },
            dataLabels: {
                enabled: false,
                textAnchor: 'top',
            },
            legend: {
                show: true,
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
            },
            responsive: [
                {
                    breakpoint: 992,
                    options: {
                        plotOptions: {
                            bar: {
                                columnWidth: '50px',
                            }
                        },
                    }
                },
                {
                    breakpoint: 600,
                    options: {
                        plotOptions: {
                            bar: {
                                columnWidth: '70px',
                            }
                        },
                    }
                }
            ]
        };

        if (barchartChart != "")
            barchartChart.destroy();
        barchartChart = new ApexCharts(document.querySelector("#pageviews_overview"), options);
        barchartChart.render();
    }

    // clicks_Chart Charts
    var clicksChartColors = '';
    clicksChartColors = getChartColorsArray("clicks_Chart");
    if (clicksChartColors) {
        var options = {
            series: [{
                name: 'Website',
                data: [21, 10, 12, 8, 18, 29, 16, 20, 36, 22, 29, 16]
            }, {
                name: 'Ads Clicks',
                data: [10, 29, 16, 13, 33, 24, 39, 46, 40, 35, 49, 41]
            }, {
                name: 'Social Media',
                data: [26, 17, 34, 15, 21, 14, 8, 33, 26, 45, 32, 57]
            }],
            chart: {
                type: 'line',
                height: 373,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: false,
                }
            },
            stroke: {
                curve: 'stepline',
            },
            stroke: {
                width: 3,
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            xaxis: {
                type: 'datetime',
                categories: ['01/01/2023 GMT', '01/02/2023 GMT', '01/03/2023 GMT', '01/04/2023 GMT',
                    '01/05/2023 GMT', '01/06/2023 GMT', '01/07/2023 GMT', '01/08/2023 GMT', '01/09/2023 GMT', '01/10/2023 GMT', '01/11/2023 GMT', '01/12/2023 GMT'
                ],
            },
            legend: {
                position: 'top',
            },
            fill: {
                opacity: 1
            },
            colors: clicksChartColors,
        };

        if (clicksChart != "")
            clicksChart.destroy();
        clicksChart = new ApexCharts(document.querySelector("#clicks_Chart"), options);
        clicksChart.render();
    }

    // Columns Charts
    var chartColumnDistributedColors = '';
    chartColumnDistributedColors = getChartColorsArray("column_distributed");
    if (chartColumnDistributedColors) {
        var options = {
            series: [{
                data: [30, 57, 25, 33, 20, 39, 47, 36, 22, 51, 38, 27, 38, 49, 42, 58, 33, 46, 40, 34, 41, 53, 19, 23, 36, 52, 58, 43]
            }],
            chart: {
                height: 373,
                type: 'bar',
                toolbar: {
                    show: false,
                }
            },
            colors: chartColumnDistributedColors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
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
                    '01/14/2023 GMT', '01/15/2023 GMT', '01/16/2023 GMT', '01/17/2023 GMT', '01/18/2023 GMT', '01/19/2023 GMT', '01/20/2023 GMT', '01/21/2023 GMT', '01/22/2023 GMT',
                    '01/23/2023 GMT', '01/24/2023 GMT', '01/25/2023 GMT', '01/26/2023 GMT', '01/27/2023 GMT', '01/28/2023 GMT'
                ],
            },
        };

        if (chartColumnDistributedChart != "")
            chartColumnDistributedChart.destroy();
        chartColumnDistributedChart = new ApexCharts(document.querySelector("#column_distributed"), options);
        chartColumnDistributedChart.render();
    }

    var activeUserColors = '';
    activeUserColors = getChartColorsArray("main");
    if (activeUserColors) {
        var chartDom = document.getElementById('main');
        pieChart = echarts.init(chartDom);
        var option;

        const data = [];
        for (let i = 0; i < 5; ++i) {
            data.push(Math.round(Math.random() * 200));
        }
        option = {
            grid: {
                left: '0%',
                right: '6%',
                bottom: '0%',
                top: '4%',
                containLabel: true
            },
            xAxis: {
                max: 'dataMax',

                splitLine: {
                    lineStyle: {
                        color: "rgba(135,136, 138,.1)"
                    }
                },
            },

            yAxis: {
                type: 'category',
                data: ['Canada', 'US', 'Serbia', 'Russia', 'Brazil'],
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
            },
            series: [
                {
                    realtimeSort: true,
                    type: 'bar',
                    data: data,
                    label: {
                        color: "#87888a",
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    }
                }
            ],
            legend: {
                show: false
            },
            color: activeUserColors,
            animationDuration: 0,
            animationDurationUpdate: 3000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        };
        function run() {
            for (var i = 0; i < data.length; ++i) {
                if (Math.random() > 0.9) {
                    data[i] += Math.round(Math.random() * 1500);
                } else {
                    data[i] += Math.round(Math.random() * 200);
                }
            }
            pieChart.setOption({
                series: [
                    {
                        type: 'bar',
                        data
                    }
                ]
            });
        }
        setTimeout(function () {
            run();
        }, 0);
        setInterval(function () {
            run();
        }, 3000);

        option && pieChart.setOption(option);
    }
    

    //  sales_Report Charts
    var salesReportColors = '';
    salesReportColors = getChartColorsArray("sales_Report");
    if (salesReportColors) {
        var options = {
            series: [{
                name: 'This Month',
                data: [45, 74, 36, 69, 84, 110, 92]
            }, {
                name: 'Last Month',
                data: [11, 18, 20, 32, 46, 65, 73]
            }],
            chart: {
                height: 333,
                type: 'area',
                toolbar: {
                    show: false
                }
            },
            grid: {
                padding: {
                    top: 0,
                    right: 2,
                    bottom: 0,
                },
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
                offsetY: "-50px",
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'stepline',
            },
            colors: salesReportColors,
            xaxis: {
                type: 'datetime',
                categories: ["02/01/2023 GMT", "02/02/2023 GMT", "02/03/2023 GMT", "02/04/2023 GMT", "02/05/2023 GMT", "02/06/2023 GMT", "02/07/2023 GMT"]
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: function (y) {
                        return y.toFixed(0) + "k";
                    }
                },
            },
        };

        if (salesReportChart != "")
            salesReportChart.destroy();
        salesReportChart = new ApexCharts(document.querySelector("#sales_Report"), options);
        salesReportChart.render();
    }

    //  time_On_Sale Charts
    var timeOnSaleColors = '';
    timeOnSaleColors = getChartColorsArray("time_On_Sale");
    if (timeOnSaleColors) {
        var options = {
            series: [70],
            chart: {
                width: 50,
                height: 100,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '45%',
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: true, fontSize: '10px', offsetY: 5,
                        },
                    }
                },
            },
            colors: timeOnSaleColors
        };

        if (timeOnSaleChart != "")
            timeOnSaleChart.destroy();
        timeOnSaleChart = new ApexCharts(document.querySelector("#time_On_Sale"), options);
        timeOnSaleChart.render();
    }

    //  goal_Completions Charts
    var goalCompletionsColors = '';
    goalCompletionsColors = getChartColorsArray("goal_Completions");
    if (goalCompletionsColors) {
        var options = {
            series: [74.52],
            chart: {
                width: 50,
                height: 100,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '45%',
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: true, fontSize: '10px', offsetY: 5,
                        },
                    }
                },
            },
            colors: goalCompletionsColors
        };

        if (goalCompletionsChart != "")
            goalCompletionsChart.destroy();
        goalCompletionsChart = new ApexCharts(document.querySelector("#goal_Completions"), options);
        goalCompletionsChart.render();
    }

    //  bounce_rate Charts
    var bounceRateColors = '';
    bounceRateColors = getChartColorsArray("bounce_rate");
    if (bounceRateColors) {
        var options = {
            series: [81.32],
            chart: {
                width: 50,
                height: 100,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '45%',
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: true, fontSize: '10px', offsetY: 5,
                        },
                    }
                },
            },
            colors: bounceRateColors
        };

        if (bounceRateChart != "")
            bounceRateChart.destroy();
        bounceRateChart = new ApexCharts(document.querySelector("#bounce_rate"), options);
        bounceRateChart.render();
    }

    //  new_Sessions Charts
    var newSessionsColors = '';
    newSessionsColors = getChartColorsArray("new_Sessions");
    if (newSessionsColors) {
        var options = {
            series: [94.03],
            chart: {
                width: 50,
                height: 100,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '45%',
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: true, fontSize: '10px', offsetY: 5,
                        },
                    }
                },
            },
            colors: newSessionsColors
        };

        if (newSessionsChart != "")
            newSessionsChart.destroy();
        newSessionsChart = new ApexCharts(document.querySelector("#new_Sessions"), options);
        newSessionsChart.render();
    }

    // world map with line & markers
    var vectorMapWorldLineColors = getChartColorsArray("world-map-line-markers");
    if (vectorMapWorldLineColors) {
        document.getElementById("world-map-line-markers").innerHTML = "";
        var worldlinemap = new jsVectorMap({
            map: "world_merc",
            selector: "#world-map-line-markers",
            zoomOnScroll: false,
            zoomButtons: false,
            markers: [
                {
                    name: "Canada",
                    coords: [56.1304, -106.3468],
                },
                {
                    name: "Brazil",
                    coords: [-14.2350, -51.9253]
                },
                {
                    name: "Serbia",
                    coords: [44.0165, 21.0059]
                },
                {
                    name: "Russia",
                    coords: [61, 105]
                },
                {
                    name: "United States",
                    coords: [37.0902, -95.7129]
                },],
            regionStyle: {
                initial: {
                    stroke: "#9599ad",
                    strokeWidth: 0.25,
                    fill: vectorMapWorldLineColors,
                    fillOpacity: 1,
                },
            },
            labels: {
                markers: {
                    render(marker, index) {
                        return marker.name || marker.labelName || 'Not available'
                    }
                }
            },
        });
    }
}

window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
});

loadCharts();

//Browser Usage Table
var options = {
    valueNames: [
        "browsers",
        "click",
        "pageviews"
    ],
};

// Init list
var contactList = new List("networks", options)

//Top Pages Table
var options = {
    valueNames: [
        "activePage",
        "activePageNo",
        "pageUsers"
    ],
};

// Init list
var topPages = new List("top-Pages", options)

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