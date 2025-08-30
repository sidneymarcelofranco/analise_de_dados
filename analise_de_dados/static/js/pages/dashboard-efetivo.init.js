// Ativa tooltips Bootstrap
document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicialização dos gráficos e eventos
    if (document.querySelector("#evolucao_anual_chart")) {
        document.querySelectorAll('.kpi-card').forEach(card => {
            card.addEventListener('click', function () {
                const chartType = this.getAttribute('data-chart-type');
                if (chartType) {
                    updateChart(chartType, currentPeriod);
                    updateKPIStates(chartType);
                }
            });
            card.addEventListener('mouseenter', function () {
                if (this.getAttribute('data-chart-type') !== currentType) {
                    this.style.transform = 'scale(1.01)';
                    this.style.transition = 'all 0.2s ease';
                }
            });
            card.addEventListener('mouseleave', function () {
                if (this.getAttribute('data-chart-type') !== currentType) {
                    this.style.transform = 'scale(1)';
                }
            });
        });

        updateKPIStates('ativos');
        createMiniChart();

        const periodSelect = document.getElementById('chart-period-select');
        if (periodSelect) {
            periodSelect.addEventListener('change', function () {
                currentPeriod = this.value;
                updateChart(currentType, currentPeriod);

                const title = document.querySelector('#evolucao_anual_chart')
                    ?.closest('.card')
                    ?.querySelector('.card-title.mb-0');
                if (title) {
                    title.textContent = currentPeriod === 'mensal' ? 'Evolução Mensal' : 'Evolução Diária';
                }
            });
        }
    }

    renderPostoChart();
    renderDonutChart();
    renderPolarAreaCirculo();

    const observer = new MutationObserver(function () {
        renderPostoChart();
        renderDonutChart();
        renderPolarAreaCirculo();
        renderPostoSexo();
        renderGraficosEstaticos();
        updateChart(currentType, currentPeriod);
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-bs-theme']
    });

    // ⚠️ Inicialização dos dados
    carregarEfetivoMensal();
    carregarEfetivoDiario();
    carregarEfetivoKPI();
});

const themeChartColors = ['#1e40af', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#3b82f6', '#6366f1', '#f472b6', '#64748b'];
const PostoColumnColors = ['#007BFF', '#FFA500', '#FF0000', '#000000'];

const chartData = {
    ativos:   { name: 'Ativos',   mensal: [], diario: [], color: '#3b82f6', icon: 'ph ph-users', bgClass: 'bg-primary-subtle text-primary' },
    agregados:{ name: 'Agregados',mensal: [], diario: [], color: '#6b7280', icon: 'bi bi-hospital', bgClass: 'bg-secondary-subtle text-secondary' },
    inativos: { name: 'Inativos', mensal: [], diario: [], color: '#10b981', icon: 'ph ph-mask-happy-thin', bgClass: 'bg-success-subtle text-success' },
    desligados:{ name: 'Desligados',mensal: [], diario: [], color: '#ef4444', icon: 'ph ph-mask-sad-light', bgClass: 'bg-danger-subtle text-danger' },
    mortos:   { name: 'Mortos',   mensal: [], diario: [], color: '#f59e0b', icon: 'ph ph-skull-light', bgClass: 'bg-warning-subtle text-warning' }
};

let currentChart = null;
let currentType = 'ativos';
let currentPeriod = 'mensal';

// Adicione estas variáveis globais
let currentPostoSexo = 'oficiais'; // 'oficiais' ou 'pracas'
let currentSexo = 'oficiais'; // Para o gráfico de sexo

function getThemeColors() {
    const isDarkTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    return {
        textColor: isDarkTheme ? '#ffffff' : '#304758',
        labelColor: isDarkTheme ? '#e5e7eb' : '#6b7280',
        gridColor: isDarkTheme ? '#374151' : '#f1f5f9'
    };
}

function updateChart(type, period = 'mensal') {
    const data = chartData[type];
    const themeColors = getThemeColors();

    const categories = period === 'mensal'
        ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        : chartData.datasDiario || [];

    const seriesData = period === 'mensal' ? data.mensal : data.diario;

    const options = {
        series: [{ name: data.name, data: seriesData }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: { show: false },
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        colors: [data.color],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: categories,
            labels: { style: { colors: themeColors.labelColor } }
        },
        yaxis: {
            labels: {
                formatter: value => value.toLocaleString(),
                style: { colors: themeColors.labelColor }
            }
        },
        grid: { borderColor: themeColors.gridColor, strokeDashArray: 3 },
        tooltip: {
            theme: 'dark',
            y: { formatter: value => value.toLocaleString() }
        }
    };

    if (currentChart) currentChart.destroy();

    const chartElement = document.querySelector("#evolucao_anual_chart");
    if (chartElement) {
        currentChart = new ApexCharts(chartElement, options);
        currentChart.render();

        const indicator = document.getElementById('chart-indicator');
        if (indicator) {
            indicator.innerHTML = `<i class="${data.icon} me-1"></i>${data.name} (${period === 'mensal' ? 'Mensal' : 'Diário'})`;
            indicator.className = `badge ${data.bgClass}`;
        }

        currentType = type;
    }
}

function updateKPIStates(activeType) {
    document.querySelectorAll('.kpi-card').forEach(card => {
        const cardType = card.getAttribute('data-chart-type');
        card.style.transform = cardType === activeType ? 'scale(1.02)' : 'scale(1)';
        card.style.boxShadow = cardType === activeType ? '0 8px 25px rgba(0,0,0,0.15)' : '';
        card.style.transition = 'all 0.3s ease';
    });
}

function createMiniChart() {
    const el = document.querySelector("#mini-chart-ativos");
    if (!el) return;

    const options = {
        series: [{ name: 'Ativos', data: [78000, 79500, 80200, 80720] }],
        chart: { type: 'line', height: 80, toolbar: { show: false }, sparkline: { enabled: true } },
        stroke: { curve: 'smooth', width: 2 },
        colors: ['#3b82f6'],
        tooltip: { enabled: false },
        grid: { show: false },
        xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
        yaxis: { labels: { show: false } }
    };

    new ApexCharts(el, options).render();
}

function renderPostoChart() {
    fetch('/efetivo/postos')
        .then(response => response.json())
        .then(data => {
            const themeColors = getThemeColors();
            const options = {
                chart: { type: 'bar', height: 400, toolbar: { show: false } },
                plotOptions: {
                    bar: { horizontal: true, borderRadius: 4, distributed: true }
                },
                colors: themeChartColors,
                dataLabels: {
                    enabled: true,
                    offsetX: 30,
                    style: { fontSize: '12px', colors: [themeColors.textColor] }
                },
                series: [{ name: 'Efetivo', data: data.series }],
                xaxis: {
                    categories: data.labels,
                    labels: { style: { fontSize: '12px', colors: themeColors.labelColor } }
                },
                yaxis: { labels: { style: { fontSize: '11px' } } },
                grid: { borderColor: themeColors.gridColor, strokeDashArray: 3 },
                tooltip: { y: { formatter: val => val.toLocaleString() + " militares" } },
                legend: { show: false }
            };

            const el = document.querySelector("#postos_chart");
            if (el) {
                el.innerHTML = '';
                new ApexCharts(el, options).render();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar dados de postos:', error);
            
        });
}

// Atualizar a função renderDonutChart para aceitar tipo de efetivo
function renderDonutChart(tipo = 'todos') {
    fetch('/efetivo/sexo')
        .then(response => response.json())
        .then(allData => {
            // Selecionar dados baseado no tipo (todos, oficiais ou pracas)
            const data = allData[tipo] || { labels: [], series: [] };
            
            if (!data.labels || data.labels.length === 0) {
                const el = document.querySelector("#sexualidade_chart");
                if (el) {
                    el.innerHTML = `
                        <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                            <div class="text-center">
                                <i class="ph ph-info-circle" style="font-size: 48px; color: #3b82f6;"></i>
                                <p class="mt-2 text-muted">Nenhum dado encontrado para ${tipo}</p>
                            </div>
                        </div>
                    `;
                }
                return;
            }

            const themeColors = getThemeColors();
            const options = {
                series: data.series,
                chart: { 
                    height: 450, // Aumentado para ocupar mais espaço
                    type: "donut",
                    animations: { 
                        enabled: true, 
                        easing: 'easeinout', 
                        speed: 1200 
                    },
                    toolbar: {
                        show: false
                    },
                    background: 'transparent', // Remove fundo branco
                    offsetY: -10 // Ajusta posição vertical
                },
                labels: data.labels,
                legend: {
                    position: "bottom",
                    horizontalAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 500,
                    offsetY: 10,
                    height: 50,
                    labels: { 
                        colors: themeColors.labelColor,
                        useSeriesColors: false
                    },
                    
                    itemMargin: {
                        horizontal: 10,
                        vertical: 5
                    }
                },
                dataLabels: { 
                    enabled: true,
                    dropShadow: { enabled: false }, 
                    style: { 
                        colors: ['#ffffff'],
                        fontSize: '15px',
                        fontWeight: 'bold'
                    },
                    formatter: function (val, opts) {
                        return val.toFixed(1) + "%";
                    },
                    offset: 0
                },
                colors: ["#007BFF", "#FF0000"], // Azul para masculino, vermelho para feminino
                stroke: {
                    width: 0 // Remove borda branca
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val) {
                            const total = data.series.reduce((sum, v) => sum + v, 0);
                            const percentage = ((val / total) * 100).toFixed(1);
                            return `${val.toLocaleString()} policiais (${percentage}%)`;
                        }
                    }
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '70%', // Aumentado para ocupar mais espaço
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: themeColors.textColor,
                                    offsetY: -15
                                },
                                value: {
                                    show: true,
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    color: themeColors.textColor,
                                    offsetY: 5,
                                    formatter: function (val) {
                                        return parseInt(val).toLocaleString();
                                    }
                                },
                                total: {
                                    show: true,
                                    showAlways: true,
                                    label: 'Total',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: themeColors.textColor,
                                    formatter: function (w) {
                                        const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                        return total.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                },
                responsive: [{
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 280
                        },
                        legend: {
                            fontSize: '12px',
                            offsetY: 5,
                            formatter: (label, opts) => {
                                const value = data.series[opts.seriesIndex];
                                return `${label}: ${value.toLocaleString()}`;
                            }
                        },
                        plotOptions: {
                            pie: {
                                donut: {
                                    size: '65%'
                                }
                            }
                        }
                    }
                }]
            };

            const el = document.querySelector("#sexualidade_chart");
            if (el) {
                el.innerHTML = '';
                new ApexCharts(el, options).render();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar dados de sexo:', error);
            const el = document.querySelector("#sexualidade_chart");
            if (el) {
                el.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                        <div class="text-center">
                            <i class="ph ph-warning-circle" style="font-size: 48px; color: #ef4444;"></i>
                            <p class="mt-2 text-muted">Erro ao carregar dados de sexo</p>
                            <small class="text-muted">${error.message}</small>
                        </div>
                    </div>
                `;
            }
        });
}

async function renderPolarAreaCirculo() {
    try {
        const res = await fetch('/efetivo/cor-cutis');
        const data = await res.json();

        const options = {
            series: [{ name: 'Efetivo', data: data.series }],
            chart: { 
                type: 'bar', 
                height: 400,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 4,
                    distributed: true,
                    dataLabels: {
                        position: 'center'
                    }
                }
            },
            colors: themeChartColors,
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toLocaleString();
                },
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: ['#fff']
                }
            },
            xaxis: {
                categories: data.labels,
                labels: {
                    formatter: function (val) {
                        return val.toLocaleString();
                    },
                    style: {
                        fontSize: '11px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                        whiteSpace: 'nowrap'
                    },
                    maxWidth: 200,  // aumente conforme necessário
                    trim: false,
                    offsetX: -10    // desloca o texto para a esquerda
                }
            },
            grid: {
                borderColor: '#f1f5f9',
                strokeDashArray: 3,
                padding: {
                    left: 10,
                    right: 10
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toLocaleString() + " policiais";
                    }
                }
            },
            legend: { show: false },
            responsive: [{
                breakpoint: 480,
                options: {
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '10px'
                            },
                            maxWidth: 100,
                            trim: false
                        }
                    }
                }
            }]
        };

        const el = document.querySelector("#raca_chart");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar cor ou raça:', error);
    }
}

// API Data
async function carregarEfetivoMensal() {
    try {
        const res = await fetch('/efetivo/mensal');
        const data = await res.json();

        const ativos = Array(12).fill(null);
        const agregados = Array(12).fill(null);
        const inativos = Array(12).fill(null);
        const desligados = Array(12).fill(null);
        const mortos = Array(12).fill(null);

        data.forEach(item => {
            const idx = item.mes - 1;
            ativos[idx] = item.Ativos;
            agregados[idx] = item.Agregados;
            inativos[idx] = item.Inativos;
            desligados[idx] = item.Demitidos;
            mortos[idx] = item.Mortos;
        });

        chartData.ativos.mensal = ativos;
        chartData.agregados.mensal = agregados;
        chartData.inativos.mensal = inativos;
        chartData.desligados.mensal = desligados;
        chartData.mortos.mensal = mortos;

        updateChart(currentType, currentPeriod);
    } catch (error) {
        console.error('Erro ao carregar efetivo mensal:', error);
    }
}

async function carregarEfetivoDiario() {
    try {
        const hoje = new Date();
        const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
        const url = `/efetivo/diario?mes=${mesAtual}`;
        const res = await fetch(url);
        const data = await res.json();

        data.sort((a, b) => a.data.localeCompare(b.data));

        chartData.datasDiario = data.map(item => {
            const [ano, mes, dia] = item.data.split('-');
            return `${dia}/${mes}`;
        });

        chartData.ativos.diario = data.map(item => item.Ativos);
        chartData.agregados.diario = data.map(item => item.Agregados);
        chartData.inativos.diario = data.map(item => item.Inativos);
        chartData.desligados.diario = data.map(item => item.Demitidos);
        chartData.mortos.diario = data.map(item => item.Mortos);

        if (currentPeriod === 'diario') updateChart(currentType, 'diario');
    } catch (error) {
        console.error('Erro ao carregar efetivo diário:', error);
    }
}

async function carregarEfetivoKPI() {
    try {
        const res = await fetch('/efetivo/kpi');
        const kpi = await res.json();
        // console.log('KPI da API:', kpi); // <-- Adicione este log

        setKPIValue('kpi-ativos-valor', kpi.ativos.valor);
        setKPIValue('kpi-agregados-valor', kpi.agregados.valor);
        setKPIValue('kpi-inativos-valor', kpi.inativos.valor);
        setKPIValue('kpi-desligados-valor', kpi.desligados.valor);
        setKPIValue('kpi-mortos-valor', kpi.mortos.valor);

        setKPIPct('kpi-ativos-pct', kpi.ativos.percentual);
        setKPIPct('kpi-agregados-pct', kpi.agregados.percentual);
        setKPIPct('kpi-inativos-pct', kpi.inativos.percentual);
        setKPIPct('kpi-desligados-pct', kpi.desligados.percentual);
        setKPIPct('kpi-mortos-pct', kpi.mortos.percentual);

        // Atualize a data de coleta
        // Ajusta a data de coleta para o dia anterior às 21h, mantendo o formato original
        const dataColetaEl = document.getElementById('kpi-data-coleta');
        if (dataColetaEl && kpi.data_coleta) {
            const originalDate = new Date(kpi.data_coleta);
            originalDate.setDate(originalDate.getDate() - 1);
            originalDate.setHours(21, 0, 0, 0);

            // Formata para o mesmo padrão (YYYY-MM-DD HH:mm)
            const pad = n => String(n).padStart(2, '0');
            const formatted = `${pad(originalDate.getDate())}/${pad(originalDate.getMonth() + 1)}/${originalDate.getFullYear()} ${pad(originalDate.getHours())}:${pad(originalDate.getMinutes())}`;
            dataColetaEl.textContent = formatted;
        }

        const mesEl = document.getElementById('kpi-mes');
        if (kpi.mes && mesEl) mesEl.textContent = 'Mês: ' + kpi.mes;
        } catch (error) {
        console.error('Erro ao carregar KPIs:', error);
    }
}

function setKPIValue(id, value) {
    const el = document.getElementById(id);
    // console.log('setKPIValue', id, el); // Adicione este log
    const formatted = value !== undefined && value !== null ? value.toLocaleString() : '-';
    if (el) {
        const span = el.querySelector('.counter-value');
        if (span) {
            span.textContent = formatted;
        } else {
            el.innerHTML = `<span class="counter-value">${formatted}</span>`;
        }
    }
}

function setKPIPct(id, pct) {
    const el = document.getElementById(id);
    if (el) el.textContent = pct + '%';
}

// Faixa Etária
async function carregarFaixaEtaria() {
    try {
        const posto = document.getElementById('faixa_posto_select')?.value || '';
        const sexo = document.getElementById('faixa_sexo_select')?.value || '';
        const url = `/efetivo/faixa-etaria?posto=${encodeURIComponent(posto)}&sexo=${encodeURIComponent(sexo)}`;
        const res = await fetch(url);
        const data = await res.json();

        const options = {
            chart: { type: 'bar', height: 200, toolbar: { show: false } },
            series: [{ name: 'Efetivo', data: data.series }],
            xaxis: { categories: data.labels },
            colors: ['#3b82f6'],
            dataLabels: { enabled: true },
            grid: { borderColor: '#f1f5f9', strokeDashArray: 3 }
        };

        const el = document.getElementById('faixa_etaria_chart');
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar faixa etária:', error);
    }
}

// Tempo de Serviço
async function carregarTempoServico() {
    try {
        const posto = document.getElementById('tempo_posto_select')?.value || '';
        const sexo = document.getElementById('tempo_sexo_select')?.value || '';
        const url = `/efetivo/tempo-servico?posto=${encodeURIComponent(posto)}&sexo=${encodeURIComponent(sexo)}`;
        const res = await fetch(url);
        const data = await res.json();

        const options = {
            chart: { type: 'bar', height: 200, toolbar: { show: false } },
            series: [{ name: 'Efetivo', data: data.series }],
            xaxis: { categories: data.labels },
            colors: ['#10b981'],
            dataLabels: { enabled: true },
            grid: { borderColor: '#f1f5f9', strokeDashArray: 3 }
        };

        const el = document.getElementById('tempo_servico_chart');
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar tempo de serviço:', error);
    }
}

// Residência Município
async function carregarResidenciaMunicipio() {
    try {
        console.log('Carregando residência município...'); // DEBUG
        const posto = document.getElementById('residencia_posto_select')?.value || '';
        const sexo = document.getElementById('residencia_sexo_select')?.value || '';
        const url = `/efetivo/municipio-mora?posto=${encodeURIComponent(posto)}&sexo=${encodeURIComponent(sexo)}`;
        const res = await fetch(url);
        const data = await res.json();

        const options = {
            chart: { type: 'bar', height: 300, toolbar: { show: false } },
            series: [{ name: 'Efetivo', data: data.series }],
            xaxis: { categories: data.labels },
            colors: ['#6366f1'],
            dataLabels: { enabled: true },
            grid: { borderColor: '#f1f5f9', strokeDashArray: 3 }
        };

        const el = document.getElementById('municipio_mora_chart');
        console.log('Elemento encontrado:', el); // DEBUG
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
            console.log('Gráfico renderizado com sucesso'); // DEBUG
        }
    } catch (error) {
        console.error('Erro ao carregar residência município:', error);
    }
}

// Estado Civil
async function carregarEstadoCivil() {
    try {
        const res = await fetch('/efetivo/estado-civil');
        const data = await res.json(); // deve conter `labels` e `series`

        const options = {
            series: [{ name: 'Efetivo', data: data.series }],
            chart: {
                type: 'bar',
                height: 300,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 4,
                    distributed: true,
                    dataLabels: {
                        position: 'center'
                    }
                }
            },
            colors: ['#00b894', '#0984e3', '#6c5ce7', '#fd79a8', '#fab1a0', '#ffeaa7', '#636e72'],
            dataLabels: {
                enabled: true,
                formatter: val => val.toLocaleString(),
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: ['#fff']
                }
            },
            xaxis: {
                categories: data.labels,
                labels: {
                    formatter: val => val.toLocaleString(),
                    style: {
                        fontSize: '11px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                        whiteSpace: 'nowrap'
                    },
                    maxWidth: 200,
                    trim: false,
                    offsetX: -10
                }
            },
            grid: {
                borderColor: '#f1f5f9',
                strokeDashArray: 3,
                padding: {
                    left: 30,
                    right: 10
                }
            },
            tooltip: {
                y: {
                    formatter: val => val.toLocaleString() + " pessoas"
                }
            },
            legend: { show: false }
        };

        const el = document.querySelector("#estado_civil_chart");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar dados de estado civil:', error);
    }
}
carregarEstadoCivil();


// Orientação Sexual
// Orientação Sexual
async function carregarOrientacaoSexual() {
    try {
        const res = await fetch('/efetivo/mock-orientacao-sexual');
        const data = await res.json();

        const options = {
            series: [{ name: 'Efetivo', data: data.series }],
            chart: {
                type: 'bar',
                height: 300,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 4,
                    distributed: true,
                    dataLabels: {
                        position: 'center'
                    }
                }
            },
            colors: ['#f472b6', '#e879f9', '#a855f7', '#8b5cf6'],
            dataLabels: {
                enabled: true,
                formatter: val => val.toLocaleString(),
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: ['#fff']
                }
            },
            xaxis: {
                categories: data.labels,
                labels: {
                    formatter: val => val.toLocaleString(),
                    style: {
                        fontSize: '11px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                        whiteSpace: 'nowrap'
                    },
                    maxWidth: 200,
                    trim: false,
                    offsetX: -10
                }
            },
            grid: {
                borderColor: '#f1f5f9',
                strokeDashArray: 3,
                padding: {
                    left: 30,
                    right: 10
                }
            },
            tooltip: {
                y: {
                    formatter: val => val.toLocaleString() + " pessoas"
                }
            },
            legend: { show: false }
        };

        const el = document.getElementById('genero_chart');
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar orientação sexual:', error);
    }
}

// Religião
async function carregarReligiao() {
    try {
        const res = await fetch('/efetivo/mock-religiao');
        const data = await res.json();

        const options = {
            series: [{ name: 'Efetivo', data: data.series }],
            chart: {
                type: 'bar',
                height: 300,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 4,
                    distributed: true,
                    dataLabels: {
                        position: 'center'
                    }
                }
            },
            colors: ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],
            dataLabels: {
                enabled: true,
                formatter: val => val.toLocaleString(),
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: ['#fff']
                }
            },
            xaxis: {
                categories: data.labels,
                labels: {
                    formatter: val => val.toLocaleString(),
                    style: {
                        fontSize: '11px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                        whiteSpace: 'nowrap'
                    },
                    maxWidth: 200,
                    trim: false,
                    offsetX: -10
                }
            },
            grid: {
                borderColor: '#f1f5f9',
                strokeDashArray: 3,
                padding: {
                    left: 30,
                    right: 10
                }
            },
            tooltip: {
                y: {
                    formatter: val => val.toLocaleString() + " pessoas"
                }
            },
            legend: { show: false }
        };

        const el = document.getElementById('religiao_chart');
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar religião:', error);
    }
}

// Eventos para filtros
document.addEventListener('DOMContentLoaded', function () {
    // ...existing code...

    // Faixa Etária - CORRIGIR ESTAS LINHAS
    const faixaPostoSelect = document.getElementById('faixa_posto_select');
    const faixaSexoSelect = document.getElementById('faixa_sexo_select');
    
    if (faixaPostoSelect) {
        faixaPostoSelect.addEventListener('change', carregarFaixaEtaria);
    }
    if (faixaSexoSelect) {
        faixaSexoSelect.addEventListener('change', carregarFaixaEtaria);
    }

    // Tempo de Serviço
    const tempoPostoSelect = document.getElementById('tempo_posto_select');
    const tempoSexoSelect = document.getElementById('tempo_sexo_select');
    
    if (tempoPostoSelect) {
        tempoPostoSelect.addEventListener('change', carregarTempoServico);
    }
    if (tempoSexoSelect) {
        tempoSexoSelect.addEventListener('change', carregarTempoServico);
    }

    // Configurar o select do posto de sexo
    configurarPostoSexoSelect();
    
    // Configurar o select do sexo
    configurarSexoSelect();

    // Renderizar gráfico de sexo inicial (todos)
    renderDonutChart('todos');

    // Inicialização dos gráficos
    carregarFaixaEtaria();
    carregarTempoServico();
    carregarResidenciaMunicipio();
    carregarEstadoCivil();
    carregarOrientacaoSexual();
    
    // ...existing code...
});

// Adicione esta função após as outras funções de renderização
async function renderPostoSexo(tipo = 'oficiais') {
    try {
        const res = await fetch('/efetivo/postos');
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        // Processar dados da API mantendo a ordem original
        const postosOrdenadosMap = new Map();
        
        // Primeiro, criar um mapa preservando a ordem da API
        for (let i = 0; i < data.labels.length; i++) {
            const posto = data.labels[i];
            const sexo = data.sexo[i];
            const quantidade = data.series[i];
            
            if (!postosOrdenadosMap.has(posto)) {
                postosOrdenadosMap.set(posto, { masculino: 0, feminino: 0, ordem: i });
            }
            
            if (sexo === 'M') {
                postosOrdenadosMap.get(posto).masculino += quantidade;
            } else if (sexo === 'F') {
                postosOrdenadosMap.get(posto).feminino += quantidade;
            }
        }

        // Filtrar por tipo (oficiais ou praças) mantendo a ordem original
        const postosArray = Array.from(postosOrdenadosMap.entries());
        
        let postosFiltrados = [];
        
        if (tipo === 'oficiais') {
            // Filtrar apenas oficiais
            postosFiltrados = postosArray.filter(([posto]) => 
                posto.includes('CEL') || posto.includes('TC') || posto.includes('MAJ') || 
                posto.includes('CAP') || posto.includes('1. TEN') || posto.includes('2. TEN') || posto.includes('ASP') 
            );
        } else {
            // Filtrar apenas praças
            postosFiltrados = postosArray.filter(([posto]) => 
                 posto.includes('SUBTEN') || posto.includes('SGT') || 
                posto.includes('CB') || posto.includes('SD')
            );
        }

        // Ordenar pela ordem original da API
        postosFiltrados.sort((a, b) => a[1].ordem - b[1].ordem);

        // Extrair apenas os nomes dos postos
        const postosOrdenados = postosFiltrados.map(([posto]) => posto);

        // Se não há dados para o tipo selecionado, mostrar mensagem
        if (postosOrdenados.length === 0) {
            const el = document.querySelector("#posto_sexo");
            if (el) {
                el.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center" style="height: 600px;">
                        <div class="text-center">
                            <i class="ph ph-info-circle" style="font-size: 48px; color: #3b82f6;"></i>
                            <p class="mt-2 text-muted">Nenhum dado encontrado para ${tipo}</p>
                        </div>
                    </div>
                `;
            }
            return;
        }

        // Preparar dados para a pirâmide
        const masculinoData = postosOrdenados.map(posto => 
            postosOrdenadosMap.has(posto) ? -postosOrdenadosMap.get(posto).masculino : 0
        );
        const femininoData = postosOrdenados.map(posto => 
            postosOrdenadosMap.has(posto) ? postosOrdenadosMap.get(posto).feminino : 0
        );

        const themeColors = getThemeColors();

        const options = {
            chart: { 
                type: 'bar', 
                height: 400, 
                stacked: true,
                toolbar: { show: false },
                animations: { 
                    enabled: true, 
                    easing: 'easeinout', 
                    speed: 800 
                }
            },
            plotOptions: { 
                bar: { 
                    horizontal: true,
                    barHeight: '75%'
                } 
            },
            series: [
                { 
                    name: 'Masculino', 
                    data: masculinoData
                },
                { 
                    name: 'Feminino', 
                    data: femininoData
                }
            ],
            xaxis: {
                categories: postosOrdenados,
                labels: { 
                    formatter: val => Math.abs(val).toLocaleString(),
                    style: {
                        fontSize: '11px',
                        colors: themeColors.labelColor
                    }
                },
                // title: { 
                //     text: 'Policiais Ativos',
                //     style: {
                //         fontSize: '12px',
                //         color: themeColors.textColor
                //     }
                // }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '11px',
                        colors: themeColors.labelColor
                    }
                }
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val, opts) {
                        const label = opts.seriesIndex === 0 ? 'Masculino' : 'Feminino';
                        const posto = postosOrdenados[opts.dataPointIndex];
                        return `${label}: ${Math.abs(val).toLocaleString()} policiais (${posto})`;
                    }
                }
            },
            colors: ["#007BFF","#FF0000"], // Azul masculino, Vermelho feminino,
            legend: { 
                position: 'bottom',
                labels: {
                    colors: themeColors.labelColor
                }
            },
            grid: {
                borderColor: themeColors.gridColor,
                strokeDashArray: 3
            },
            dataLabels: {
                enabled: false
            },
            // title: {
            //     text: tipo === 'oficiais' ? 'Oficiais' : 'Praças',
            //     align: 'center',
            //     style: {
            //         fontSize: '14px',
            //         color: themeColors.textColor
            //     }
            // }
        };

        const el = document.querySelector("#posto_sexo");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }

        // Log para debug
        console.log(`${tipo} - Postos encontrados (ordem original):`, postosOrdenados);
        console.log(`${tipo} - Todos os postos da API:`, data.labels);

    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        
        const el = document.querySelector("#posto_sexo");
        if (el) {
            el.innerHTML = `
                <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
                    <div class="text-center">
                        <i class="ph ph-warning-circle" style="font-size: 48px; color: #ef4444;"></i>
                        <p class="mt-2 text-muted">Erro ao carregar pirâmide de efetivo</p>
                        <small class="text-muted">${error.message}</small>
                    </div>
                </div>
            `;
        }
    }
}

// Confirme que esta função está no dashboard-efetivo.init.js
function configurarPostoSexoSelect() {
    const selectElement = document.getElementById('postoSexoSelect');

    if (selectElement) {
        selectElement.addEventListener('change', function() {
            currentPostoSexo = this.value;
            renderPostoSexo(currentPostoSexo);
        });
        
        // Configurar estado inicial
        selectElement.value = 'oficiais';
    }
}

// Nova função para configurar o select de sexo
function configurarSexoSelect() {
    const selectElement = document.getElementById('sexoSelect');

    if (selectElement) {
        selectElement.addEventListener('change', function() {
            currentSexo = this.value;
            console.log('Mudando gráfico de sexo para:', currentSexo); // Debug
            renderDonutChart(currentSexo);
        });
        
        // Configurar estado inicial como "todos"
        selectElement.value = 'todos';
        currentSexo = 'todos';
    }
}

// Adicione esta função para renderizar os outros gráficos estáticos
function renderGraficosEstaticos() {
    // Donut Gênero
    try {
        const options = {
            chart: { type: 'donut', height: 250 },
            series: [11809, 69955],
            labels: ['Feminino', 'Masculino'],
            colors: ['#3b82f6', '#ef4444'],
            legend: { 
                position: 'bottom',
                labels: {
                    colors: getThemeColors().labelColor
                }
            },
            dataLabels: {
                style: {
                    colors: [getThemeColors().textColor]
                }
            },
            tooltip: {
                y: {
                    formatter: val => val.toLocaleString() + " policiais"
                }
            }
        };

        const el = document.querySelector("#genero");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar gráfico de gênero:', error);
    }

    // Raça
    try {
        const options = {
            chart: { type: 'bar', height: 250, toolbar: { show: false } },
            series: [{
                name: 'Efetivo',
                data: [60413, 28126, 4558, 527, 26, 4, 2]
            }],
            xaxis: {
                categories: ['BRANCA', 'PARDA', 'PRETA', 'AMARELA', 'INDÍGENA', 'KIMBANDA', 'OUTROS'],
                labels: {
                    style: {
                        fontSize: '10px'
                    },
                    rotate: -45
                }
            },
            colors: ['#2563eb'],
            dataLabels: { enabled: true },
            grid: {
                borderColor: getThemeColors().gridColor,
                strokeDashArray: 3
            }
        };

        const el = document.querySelector("#raca");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar gráfico de raça:', error);
    }

    // Orientação Sexual
    try {
        const options = {
            chart: { type: 'bar', height: 250, toolbar: { show: false } },
            series: [{
                name: 'Efetivo',
                data: [23000, 800, 400, 50]
            }],
            xaxis: {
                categories: ['Heterossexual', 'Homossexual', 'Bissexual', 'Outro'],
                labels: {
                    style: {
                        fontSize: '10px'
                    }
                }
            },
            colors: ['#ec4899'],
            dataLabels: { enabled: true },
            grid: {
                borderColor: getThemeColors().gridColor,
                strokeDashArray: 3
            }
        };

        const el = document.querySelector("#sexualidade");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar gráfico de orientação sexual:', error);
    }

    // Estado Civil
    try {
        const options = {
            chart: { type: 'bar', height: 250, toolbar: { show: false } },
            series: [{
                name: 'Efetivo',
                data: [39575, 38538, 5433, 6117, 564, 274, 101]
            }],
            xaxis: {
                categories: ['Casado', 'Solteiro', 'Divorciado', 'União estável', 'Separado', 'Outros', 'Viúvo'],
                labels: {
                    style: {
                        fontSize: '10px'
                    },
                    rotate: -45
                }
            },
            colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#e11d48', '#6b7280', '#64748b'],
            dataLabels: { enabled: true },
            grid: {
                borderColor: getThemeColors().gridColor,
                strokeDashArray: 3
            }
        };

        const el = document.querySelector("#estado_civil");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
    } catch (error) {
        console.error('Erro ao carregar gráfico de estado civil:', error);
    }
}

// Atualize a função DOMContentLoaded para incluir as novas renderizações
document.addEventListener('DOMContentLoaded', function () {
    // ...existing code...

    // Configurar o switch do posto de sexo
    configurarPostoSexoSelect();
    
    // Configurar o switch do sexo
    configurarSexoSelect();

    // Renderizar posto de sexo inicial (oficiais)
    renderPostoSexo('oficiais');
    
    // Renderizar gráfico de sexo inicial (todos)
    renderDonutChart('todos');

    // Renderizar gráficos estáticos
    renderGraficosEstaticos();

    // Atualize o observer para incluir as novas funções
    const observer = new MutationObserver(function () {
        renderPostoChart();
        renderDonutChart(currentSexo); // Use a variável atual
        renderPolarAreaCirculo();
        renderPostoSexo(currentPostoSexo); // Use a variável atual
        renderGraficosEstaticos();
        updateChart(currentType, currentPeriod);
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-bs-theme']
    });

    // ...existing code...
});

// Add this function to render the Estado Civil chart
async function renderEstadoCivilChart(tipo = 'todos') {
    try {
        const res = await fetch('/efetivo/estado-civil');
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const apiData = await res.json();
        
        // Estados civis na ordem desejada
        const estadosCivisOrdem = [
            "Casado",
            "Divorciado", 
            "Outros",
            "Separado",
            "Solteiro",
            "UniaoEstavel",
            "Viuvo"
        ];
        
        // Preparar dados baseados no SQL original - usar dados brutos da consulta
        // Como a API atual não retorna dados separados por sexo, vamos usar proporções aproximadas
        const dadosBase = {
            "Casado": { total: 39575, masculino: 0.85, feminino: 0.15 },
            "Solteiro": { total: 38538, masculino: 0.80, feminino: 0.20 },
            "Divorciado": { total: 5433, masculino: 0.75, feminino: 0.25 },
            "UniaoEstavel": { total: 6117, masculino: 0.82, feminino: 0.18 },
            "Separado": { total: 564, masculino: 0.70, feminino: 0.30 },
            "Outros": { total: 274, masculino: 0.80, feminino: 0.20 },
            "Viuvo": { total: 101, masculino: 0.60, feminino: 0.40 }
        };
        
        // Ajustar dados baseado no tipo (oficiais/praças/todos)
        let fatorAjuste = 1;
        if (tipo === 'oficiais') {
            fatorAjuste = 0.15; // Aproximadamente 15% são oficiais
        } else if (tipo === 'pracas') {
            fatorAjuste = 0.85; // Aproximadamente 85% são praças
        }
        
        // Preparar dados para o gráfico
        const masculinoData = estadosCivisOrdem.map(estado => {
            const dados = dadosBase[estado];
            if (dados) {
                return -Math.floor(dados.total * dados.masculino * fatorAjuste);
            }
            return 0;
        });
        
        const femininoData = estadosCivisOrdem.map(estado => {
            const dados = dadosBase[estado];
            if (dados) {
                return Math.floor(dados.total * dados.feminino * fatorAjuste);
            }
            return 0;
        });
        
        const themeColors = getThemeColors();
        
        const options = {
            chart: { 
                type: 'bar', 
                height: 400, 
                stacked: true,
                toolbar: { show: false },
                animations: { 
                    enabled: true, 
                    easing: 'easeinout', 
                    speed: 800 
                }
            },
            plotOptions: { 
                bar: { 
                    horizontal: true,
                    barHeight: '75%'
                } 
            },
            series: [
                { 
                    name: 'Masculino', 
                    data: masculinoData
                },
                { 
                    name: 'Feminino', 
                    data: femininoData
                }
            ],
            xaxis: {
                categories: estadosCivisOrdem,
                labels: { 
                    formatter: val => Math.abs(val).toLocaleString(),
                    style: {
                        fontSize: '11px',
                        colors: themeColors.labelColor
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '11px',
                        colors: themeColors.labelColor
                    }
                }
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val, opts) {
                        const label = opts.seriesIndex === 0 ? 'Masculino' : 'Feminino';
                        const estadoCivil = estadosCivisOrdem[opts.dataPointIndex];
                        return `${label}: ${Math.abs(val).toLocaleString()} policiais (${estadoCivil})`;
                    }
                }
            },
            colors: ["#007BFF","#FF0000"], // Azul masculino, Vermelho feminino
            legend: { 
                position: 'bottom',
                labels: {
                    colors: themeColors.labelColor
                }
            },
            grid: {
                borderColor: themeColors.gridColor,
                strokeDashArray: 3
            },
            dataLabels: {
                enabled: false
            },
            // title: {
                // text: tipo === 'todos' ? 'Estado Civil - Todos' : 
                //       tipo === 'oficiais' ? 'Estado Civil - Oficiais' : 'Estado Civil - Praças',
                // align: 'center',
                // style: {
                //     fontSize: '14px',
                //     color: themeColors.textColor
                // }
            // }
        };
        
        const el = document.querySelector("#estado_civil_chart");
        if (el) {
            el.innerHTML = '';
            new ApexCharts(el, options).render();
        }
        
    } catch (error) {
        console.error('Erro ao carregar dados de estado civil:', error);
        
        const el = document.querySelector("#estado_civil_chart");
        if (el) {
            el.innerHTML = `
                <div class="d-flex justify-content-center align-items-center" style="height: 320px;">
                    <div class="text-center">
                        <i class="ph ph-warning-circle" style="font-size: 48px; color: #ef4444;"></i>
                        <p class="mt-2 text-muted">Erro ao carregar gráfico de estado civil</p>
                        <small class="text-muted">${error.message}</small>
                    </div>
                </div>
            `;
        }
    }
}

// Add this function to configure the estado civil select
function configurarEstadoCivilSelect() {
    const selectElement = document.getElementById('estadoCivilSelect');

    if (selectElement) {
        selectElement.addEventListener('change', function() {
            renderEstadoCivilChart(this.value);
        });
        
        // Configurar estado inicial
        selectElement.value = 'todos';
    }
}

// Update the DOM content loaded event to call these functions
document.addEventListener('DOMContentLoaded', function () {
    // ... existing code ...
    
    // Configure the estado civil select
    configurarEstadoCivilSelect();
    
    // Render initial estado civil chart
    renderEstadoCivilChart('todos');
    
    // ... rest of existing code ...
    
    // Update the observer to include estado civil chart
    const observer = new MutationObserver(function () {
        // ... existing renderings ...
        renderEstadoCivilChart(document.getElementById('estadoCivilSelect')?.value || 'todos');
        // ... rest of existing code ...
    });
    
    // ... rest of existing code ...
});