// Atualiza o valor de apresentações do dia usando a API /apresentacaojuizo/dia
function atualizarApresentacoesDia() {
  fetch("/apresentacaojuizo/dia")
    .then((response) => response.json())
    .then((data) => {
      let valor = 0;
      if (Array.isArray(data) && data.length > 0) {
        valor = data[0].Qtd_Apr || data[0].qtd_apr || 0;
      }
      var el = document.getElementById("counter_apresentacoes_dia");
      if (el) el.textContent = valor;
    })
    .catch(() => {
      var el = document.getElementById("counter_apresentacoes_dia");
      if (el) el.textContent = 0;
    });
}

function getChartColorsArray(t) {
  var e = document.getElementById(t);
  if (e) {
    e = e.dataset.colors;
    if (e)
      return JSON.parse(e).map((t) => {
        var e = t.replace(/\s/g, "");
        return e.includes(",")
          ? 2 === (t = t.split(",")).length
            ? `rgba(${getComputedStyle(
                document.documentElement
              ).getPropertyValue(t[0])}, ${t[1]})`
            : e
          : getComputedStyle(document.documentElement).getPropertyValue(e) || e;
      });
    console.warn("data-colors attribute not found on: " + t);
  }
}
var totalStudentsChart = "",
  totalCoursesChart = "",
  chartStorkeRadialbarChart = "",
  linechartDatalabelChart = "",
  areachartSplineChart = "";
function loadCharts() {
  var t, e;
  // Carregar dados da API para total_apresentacoes (apresentacaojuizo/semana)
  e = getChartColorsArray("total_apresentacoes_semana");
  if (e) {
    fetch("/apresentacaojuizo/semana")
      .then((response) => response.json())
      .then((data) => {
        const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        let categorias = diasSemana;
        let valores = [0, 0, 0, 0, 0, 0, 0]; // Inicializa com zeros
        
        if (Array.isArray(data) && data.length > 0) {
          // Mapeia os dados corretamente por dia da semana
          data.forEach((d) => {
            // Corrige o problema de interpretação de data
            const dataStr = d.Dia;
            const partes = dataStr.split('-'); // ["2025", "08", "25"]
            const dt = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
            const diaSemana = dt.getDay(); // 0=Dom, 1=Seg, 2=Ter, ..., 6=Sáb
            valores[diaSemana] = d.Qtd_Apr || 0;
          });
        }
        
        t = {
          series: [{ name: "Apresentações", data: valores }],
          chart: { height: 95, type: "bar", toolbar: { show: !1 } },
          plotOptions: { bar: { distributed: !0 } },
          legend: { show: !1 },
          dataLabels: { enabled: !1 },
          grid: {
            show: !1,
            padding: { top: -15, right: 0, left: 0, bottom: -10 },
            yaxis: { lines: { show: !1 } },
          },
          stroke: { width: 2, curve: "smooth" },
          colors: e,
          xaxis: {
            categories: categorias,
            labels: { show: !0 },
          },
          yaxis: { show: !1 },
        };
        "" != totalStudentsChart && totalStudentsChart.destroy();
        totalStudentsChart = new ApexCharts(
          document.querySelector("#total_apresentacoes_semana"),
          t
        );
        totalStudentsChart.render();
      })
      .catch((err) => {
        // fallback: gráfico vazio
        t = {
          series: [{ name: "Apresentações", data: [0, 0, 0, 0, 0, 0, 0] }],
          chart: { height: 95, type: "bar", toolbar: { show: !1 } },
          plotOptions: { bar: { distributed: !0 } },
          legend: { show: !1 },
          dataLabels: { enabled: !1 },
          grid: {
            show: !1,
            padding: { top: -15, right: 0, left: 0, bottom: -10 },
            yaxis: { lines: { show: !1 } },
          },
          stroke: { width: 2, curve: "smooth" },
          colors: e,
          xaxis: {
            categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            labels: { show: !0 },
          },
          yaxis: { show: !1 },
        };
        "" != totalStudentsChart && totalStudentsChart.destroy();
        totalStudentsChart = new ApexCharts(
          document.querySelector("#total_apresentacoes_semana"),
          t
        );
        totalStudentsChart.render();
      });
  }
  (e = getChartColorsArray("total_apresentacoes_semestre")) &&
    fetch("/apresentacaojuizo/mes")
      .then((response) => response.json())
      .then((data) => {
        // Descobre semestre atual (1º: Jan-Jun, 2º: Jul-Dez)
        const mesAtual = new Date().getMonth() + 1;
        const semestre = mesAtual <= 6 ? 1 : 2;
        // Filtra meses do semestre
        const mesesSemestre =
          semestre === 1 ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12];
        // Ordena por mês
        const dataSemestre = mesesSemestre.map((mes) => {
          const obj = data.find((d) => Number(d.Mes || d.mes) === mes);
          return obj ? obj.Qtd_Apr || obj.qtd_apr || 0 : 0;
        });
        const categorias =
          semestre === 1
            ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]
            : ["Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        t = {
          series: [{ name: "Total Semestre", data: dataSemestre }],
          chart: { height: 95, type: "line", toolbar: { show: !1 } },
          legend: { show: !1 },
          dataLabels: { enabled: !1 },
          grid: {
            show: !1,
            padding: { top: -15, right: 0, left: 0, bottom: -10 },
            yaxis: { lines: { show: !1 } },
          },
          stroke: { width: 2, curve: "smooth" },
          colors: e,
          xaxis: {
            categories: categorias,
            labels: { show: !1 },
          },
          yaxis: { show: !1 },
        };
        "" != totalCoursesChart && totalCoursesChart.destroy();
        totalCoursesChart = new ApexCharts(
          document.querySelector("#total_apresentacoes_semestre"),
          t
        );
        totalCoursesChart.render();
      });
  (e = getChartColorsArray("stroked_radialbar")) &&
    ((t = {
      series: [67],
      chart: { height: 320, type: "radialBar" },
      plotOptions: {
        radialBar: {
          startAngle: -120,
          endAngle: 120,
          dataLabels: {
            name: { fontSize: "16px", color: void 0, offsetY: 80 },
            value: {
              offsetY: 30,
              fontSize: "20px",
              color: "#87888a",
              formatter: function (t) {
                return t + "%";
              },
            },
          },
        },
      },
      grid: {
        show: !1,
        padding: { top: -15, right: 0, left: 0, bottom: -10 },
        yaxis: { lines: { show: !1 } },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: !1,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: { dashArray: 4 },
      labels: ["Meta"],
      colors: e,
    }),
    "" != chartStorkeRadialbarChart && chartStorkeRadialbarChart.destroy(),
    (chartStorkeRadialbarChart = new ApexCharts(
      document.querySelector("#stroked_radialbar"),
      t
    )).render()),
    (e = getChartColorsArray("line_chart_datalabel")) &&
      ((t = {
        chart: { height: 405, zoom: { enabled: !0 }, toolbar: { show: !1 } },
        colors: e,
        markers: {
          size: 0,
          colors: "#ffffff",
          strokeColors: e,
          strokeWidth: 1,
          strokeOpacity: 0.9,
          fillOpacity: 1,
        },
        dataLabels: { enabled: !1 },
        stroke: { width: [2, 2, 2], curve: "smooth" },
        series: [
          {
            name: "Orders",
            type: "line",
            data: [180, 274, 346, 290, 370, 420, 490, 542, 510, 580, 636, 745],
          },
          {
            name: "Refunds",
            type: "area",
            data: [100, 154, 302, 411, 300, 284, 273, 232, 187, 174, 152, 122],
          },
          {
            name: "Earnings",
            type: "line",
            data: [260, 360, 320, 345, 436, 527, 641, 715, 832, 794, 865, 933],
          },
        ],
        fill: {
          type: ["solid", "gradient", "solid"],
          gradient: {
            shadeIntensity: 1,
            type: "vertical",
            inverseColors: !1,
            opacityFrom: 0.3,
            opacityTo: 0,
            stops: [20, 80, 100, 100],
          },
        },
        grid: {
          row: { colors: ["transparent", "transparent"], opacity: 0.2 },
          borderColor: "#f1f1f1",
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: !0,
          offsetY: -25,
          offsetX: -5,
        },
        responsive: [
          {
            breakpoint: 600,
            options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
          },
        ],
      }),
      "" != linechartDatalabelChart && linechartDatalabelChart.destroy(),
      (linechartDatalabelChart = new ApexCharts(
        document.querySelector("#line_chart_datalabel"),
        t
      )).render());
  // Gráfico de evolução: compara ano atual e anterior mês a mês usando /apresentacaojuizo/mesano
  if ((e = getChartColorsArray("area_chart_spline"))) {
    // Função para renderizar o gráfico de evolução com filtro
    function renderEvolucaoChart(data, filtro) {
      const meses = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const anoAtual = new Date().getFullYear();
      const anoAnterior = anoAtual - 1;
      function getSerie(ano) {
        const arr = Array(12).fill(0);
        data
          .filter((d) => d.Ano === ano)
          .forEach((d) => {
            arr[(d.Mes || d.mes) - 1] = d.Qtd_Apr || d.qtd_apr || 0;
          });
        return arr;
      }
      let serieAtual = getSerie(anoAtual);
      let serieAnterior = getSerie(anoAnterior);
      let categorias = meses;
      // Aplica filtro
      if (filtro === "1M") {
        // Último mês disponível (considera mês atual)
        const mesAtual = new Date().getMonth();
        categorias = [meses[mesAtual]];
        serieAtual = [serieAtual[mesAtual]];
        serieAnterior = [serieAnterior[mesAtual]];
      } else if (filtro === "6M") {
        // Últimos 6 meses
        const mesAtual = new Date().getMonth();
        let start = mesAtual - 5;
        if (start < 0) start = 0;
        categorias = meses.slice(start, mesAtual + 1);
        serieAtual = serieAtual.slice(start, mesAtual + 1);
        serieAnterior = serieAnterior.slice(start, mesAtual + 1);
      } else if (filtro === "1Y") {
        // Ano inteiro (default)
        categorias = meses;
        // já está correto
      }
      t = {
        series: [
          { name: anoAnterior.toString(), data: serieAnterior },
          { name: anoAtual.toString(), data: serieAtual },
        ],
        chart: { height: 320, type: "area", toolbar: { show: !1 } },
        fill: {
          type: ["gradient", "gradient"],
          gradient: {
            shadeIntensity: 1,
            type: "vertical",
            inverseColors: !1,
            opacityFrom: 0.2,
            opacityTo: 0,
            stops: [50, 70, 100, 100],
          },
        },
        markers: {
          size: 4,
          strokeColors: e,
          strokeWidth: 1,
          strokeOpacity: 0.9,
          fillOpacity: 1,
          hover: { size: 6 },
        },
        grid: { show: !1, padding: { top: 0, right: 0, bottom: 0 } },
        legend: { show: !0 },
        dataLabels: { enabled: !1 },
        xaxis: {
          categories: categorias,
          labels: { rotate: -90 },
          axisTicks: { show: !0 },
          axisBorder: { show: !0, stroke: { width: 1 } },
        },
        stroke: { width: [2, 2], curve: "smooth" },
        colors: e,
      };
      "" != areachartSplineChart && areachartSplineChart.destroy();
      areachartSplineChart = new ApexCharts(
        document.querySelector("#area_chart_spline"),
        t
      );
      areachartSplineChart.render();
    }

    // Carrega dados e habilita filtros
    fetch("/apresentacaojuizo/mesano")
      .then((response) => response.json())
      .then((data) => {
        // Render padrão (1Y)
        renderEvolucaoChart(data, "1Y");
        // Habilita filtros
        const filtroBtns = document.querySelectorAll(
          ".card-header .btn.btn-subtle-secondary, .card-header .btn.btn-subtle-primary"
        );
        filtroBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            filtroBtns.forEach((b) => b.classList.remove("btn-subtle-primary"));
            filtroBtns.forEach((b) => b.classList.add("btn-subtle-secondary"));
            this.classList.remove("btn-subtle-secondary");
            this.classList.add("btn-subtle-primary");
            let filtro = "1Y";
            if (this.textContent.trim() === "1M") filtro = "1M";
            else if (this.textContent.trim() === "6M") filtro = "6M";
            else if (this.textContent.trim() === "ALL") filtro = "1Y";
            renderEvolucaoChart(data, filtro);
          });
        });
      })
      .catch(() => {
        // fallback: gráfico vazio
        t = {
          series: [
            { name: "Ano Anterior", data: Array(12).fill(0) },
            { name: "Ano Atual", data: Array(12).fill(0) },
          ],
          chart: { height: 320, type: "area", toolbar: { show: !1 } },
          fill: {
            type: ["gradient", "gradient"],
            gradient: {
              shadeIntensity: 1,
              type: "vertical",
              inverseColors: !1,
              opacityFrom: 0.2,
              opacityTo: 0,
              stops: [50, 70, 100, 100],
            },
          },
          markers: {
            size: 4,
            strokeColors: e,
            strokeWidth: 1,
            strokeOpacity: 0.9,
            fillOpacity: 1,
            hover: { size: 6 },
          },
          grid: { show: !1, padding: { top: 0, right: 0, bottom: 0 } },
          legend: { show: !0 },
          dataLabels: { enabled: !1 },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            labels: { rotate: -90 },
            axisTicks: { show: !0 },
            axisBorder: { show: !0, stroke: { width: 1 } },
          },
          stroke: { width: [2, 2], curve: "smooth" },
          colors: e,
        };
        "" != areachartSplineChart && areachartSplineChart.destroy();
        areachartSplineChart = new ApexCharts(
          document.querySelector("#area_chart_spline"),
          t
        );
        areachartSplineChart.render();
      });
  }
}
// Atualiza o valor de apresentações do mês atual usando a API /apresentacaojuizo/mes
function atualizarApresentacoesMesAtual() {
  fetch("/apresentacaojuizo/mes")
    .then((response) => response.json())
    .then((data) => {
      let valor = 0;
      if (Array.isArray(data) && data.length > 0) {
        // Descobre o mês atual (1-12)
        const mesAtual = new Date().getMonth() + 1;
        // Garante comparação numérica
        const objMes = data.find((d) => Number(d.Mes || d.mes) === mesAtual);
        valor = objMes ? objMes.Qtd_Apr || objMes.qtd_apr || 0 : 0;
      }
      var el = document.getElementById("counter_apresentacoes_mes_atual");
      if (el) el.textContent = valor;
    })
    .catch(() => {
      var el = document.getElementById("counter_apresentacoes_mes_atual");
      if (el) el.textContent = 0;
    });
}

function carregarApresentacaoList() {
  return fetch("/apresentacaojuizo/apresentacaolist")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#apresentacaolist tbody");
      if (!tbody) return;
      tbody.innerHTML = "";
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td class="re">${item.RE || ""}</td>
            <td class="posto">${item.Posto || ""}</td>
            <td class="nome">${item.Nome || ""}</td>
            <td class="opmatual">${item.OpmAtual || ""}</td>
            <td class="forum">${item.Forum || ""}</td>
            <td class="numprocesso">${item.NumProcesso || ""}</td>
            <td class="data_audiencia">${item.Data_Audiencia || ""}</td>
            <td class="hora_audiencia">${item.Hora_Audiencia || ""}</td>
            <td class="juizado">${item.Juizado || ""}</td>
            <td class="tipoapresentacao">${item.TipoApresentacao || ""}</td>
            <td class="datainclusaosistema">${item.DataInclusaoSistema || ""}</td>
            <td class="usuarioinclusaosistema">${item.UsuarioInclusaoSistema || ""}</td>
          `;
          tbody.appendChild(tr);
        });
      } else {
        tbody.innerHTML = `<tr><td colspan="12" class="text-center">Nenhuma apresentação encontrada</td></tr>`;
      }
    })
    .catch(() => {
      const tbody = document.querySelector("#apresentacaolist tbody");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="12" class="text-center">Erro ao carregar dados</td></tr>`;
      }
    });
}

// Adicione estas funções para inclusões por usuário:
function carregarInclusoesUsuarioDia() {
  fetch("/apresentacaojuizo/usuario-dia")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tabela-usuario-dia tbody");
      if (!tbody) return;
      tbody.innerHTML = "";
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${item.UserName || item.username || "-"}</td>
            <td class="text-end">${item.Qtd_Apr || item.qtd_apr || 0}</td>
          `;
          tbody.appendChild(tr);
        });
      } else {
        tbody.innerHTML = `<tr><td colspan="2" class="text-center">Sem dados para o dia</td></tr>`;
      }
    })
    .catch(() => {
      const tbody = document.querySelector("#tabela-usuario-dia tbody");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="2" class="text-center">Erro ao carregar dados</td></tr>`;
      }
    });
}

function carregarInclusoesUsuarioMes() {
  fetch("/apresentacaojuizo/usuario-mes")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#tabela-usuario-mes tbody");
      if (!tbody) return;
      tbody.innerHTML = "";
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${item.UserName || item.username || "-"}</td>
            <td class="text-end">${item.Qtd_Apr || item.qtd_apr || 0}</td>
          `;
          tbody.appendChild(tr);
        });
      } else {
        tbody.innerHTML = `<tr><td colspan="2" class="text-center">Sem dados para o mês</td></tr>`;
      }
    })
    .catch(() => {
      const tbody = document.querySelector("#tabela-usuario-mes tbody");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="2" class="text-center">Erro ao carregar dados</td></tr>`;
      }
    });
}

window.addEventListener("resize", function () {
  setTimeout(() => {
    loadCharts();
    atualizarApresentacoesDia();
    atualizarApresentacoesMesAtual();
    carregarApresentacaoList();
    carregarInclusoesUsuarioDia(); // Adicione esta linha
  }, 250);
});

loadCharts();
atualizarApresentacoesDia();
atualizarApresentacoesMesAtual();
carregarInclusoesUsuarioDia(); // Adicione esta linha

carregarApresentacaoList().then(() => {
  window.options = new List("apresentacaolist", {
    valueNames: [
      "re",
      "posto", 
      "nome",
      "opmatual",
      "forum",
      "numprocesso",
      "data_audiencia",
      "hora_audiencia",
      "juizado",
      "tipoapresentacao",
      "datainclusaosistema",
      "usuarioinclusaosistema"
    ],
    page: 10,
    pagination: true,
  });
  
  // Previne scroll ao trocar página - VERSÃO CORRIGIDA
  setTimeout(() => {
    const paginationContainer = document.querySelector('#apresentacaolist .pagination');
    if (paginationContainer) {
      paginationContainer.addEventListener('click', function(e) {
        // Verifica se é um link ou botão de paginação (incluindo Previous/Next)
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
            e.target.closest('.page-link') || e.target.closest('[data-i]')) {
          const currentScrollPosition = window.pageYOffset;
          
          setTimeout(() => {
            window.scrollTo({
              top: currentScrollPosition,
              behavior: 'instant'
            });
          }, 100); // Aumentei para 100ms para dar mais tempo
        }
      });
    }
    
    // Também adiciona evento nos botões Previous/Next especificamente
    const prevBtn = document.querySelector('#apresentacaolist .pagination .page-link[aria-label="Previous"]');
    const nextBtn = document.querySelector('#apresentacaolist .pagination .page-link[aria-label="Next"]');
    
    [prevBtn, nextBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', function(e) {
          const currentScrollPosition = window.pageYOffset;
          setTimeout(() => {
            window.scrollTo({
              top: currentScrollPosition,
              behavior: 'instant'
            });
          }, 100);
        });
      }
    });
  }, 500); // Aumentei para 500ms para garantir que a paginação foi renderizada
});

// Adicione evento para carregar dados do mês quando a aba for ativada
document.addEventListener("DOMContentLoaded", function() {
  const tabMes = document.getElementById("tab-mes");
  if (tabMes) {
    tabMes.addEventListener("shown.bs.tab", carregarInclusoesUsuarioMes);
  }
});



