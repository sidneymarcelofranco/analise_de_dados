// Mostrar loading
function mostrarLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'map-loading';
  loadingDiv.innerHTML = `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                text-align: center; z-index: 1000;">
      <div style="margin-bottom: 10px;">
        <div style="border: 3px solid #f3f3f3; border-radius: 50%; border-top: 3px solid #3498db; 
                    width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
      </div>
      <div>Carregando mapa...</div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  document.getElementById('map').appendChild(loadingDiv);
}

// Esconder loading
function esconderLoading() {
  const loading = document.getElementById('map-loading');
  if (loading) {
    loading.remove();
  }
}

// Mostrar erro
function mostrarErro(mensagem) {
  esconderLoading();
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: #ff6b6b; color: white; padding: 20px; border-radius: 8px; 
                text-align: center; z-index: 1000;">
      <div style="margin-bottom: 10px; font-weight: bold;">⚠️ Erro ao carregar mapa</div>
      <div style="font-size: 14px;">${mensagem}</div>
      <button onclick="location.reload()" style="margin-top: 10px; padding: 5px 15px; 
                     background: white; color: #ff6b6b; border: none; border-radius: 4px; cursor: pointer;">
        Tentar novamente
      </button>
    </div>
  `;
  document.getElementById('map').appendChild(errorDiv);
}

const map = L.map('map').setView([-22.5, -48.5], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

function normalizar(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

// Função principal com melhor controle de erro e loading
async function inicializarMapa() {
  mostrarLoading();
  
  try {
    // Aguardar que as regiões sejam carregadas primeiro
    console.log('Aguardando carregamento das regiões...');
    await aguardarRegioes();
    console.log('Regiões prontas, carregando dados do mapa...');
    
    // Carregar dados do mapa com timeout e cache
    const [geojsonData, pessoasData] = await Promise.race([
      Promise.all([
        mapaCache.fetchWithCache('static/json/geojs-35-mun.json'),
        mapaCache.fetchWithCache('static/json/pessoas.json')
      ]),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout ao carregar dados do mapa')), 15000)
      )
    ]);

    console.log('Dados carregados, processando...');
    
    const qtdPorMunicipio = {};
    pessoasData.forEach(item => {
      const nome = normalizar(item.municipio);
      qtdPorMunicipio[nome] = item.quantidade;
    });

    // Adicionar marcadores
    let marcadoresAdicionados = 0;
    Object.entries(qtdPorMunicipio).forEach(([municipio, qtd]) => {
      const coord = coordenadasMock[municipio];
      if (coord) {
        L.marker(coord)
          .addTo(map)
          .bindTooltip(`${qtd} PM`, { permanent: true, direction: 'top' })
          .bindPopup(`<strong>${municipio}</strong><br/>Quantidade: ${qtd}`);
        marcadoresAdicionados++;
      }
    });

    console.log(`${marcadoresAdicionados} marcadores adicionados`);

    // Adicionar polígonos com cores das regiões
    let municipiosColoridos = 0;
    const geoLayer = L.geoJSON(geojsonData, {
      style: feature => {
        const nome = normalizar(feature.properties.name);
        let regiao = null;
        
        // Find the region for this municipality
        for (const [nomeRegiao, municipiosObj] of Object.entries(regioes)) {
          if (Object.keys(municipiosObj).includes(nome)) {
            regiao = nomeRegiao;
            municipiosColoridos++;
            break;
          }
        }

        return {
          color: '#333',
          weight: 1,
          fillOpacity: 0.6,
          fillColor: cores[regiao] || '#cccccc'
        };
      },
      onEachFeature: (feature, layer) => {
        const nomeOriginal = feature.properties.name;
        const nomeNormalizado = normalizar(nomeOriginal);
        const qtd = qtdPorMunicipio[nomeNormalizado] || 0;
        
        // Encontrar região para mostrar no popup
        let regiao = 'Não definida';
        for (const [nomeRegiao, municipiosObj] of Object.entries(regioes)) {
          if (Object.keys(municipiosObj).includes(nomeNormalizado)) {
            regiao = nomeRegiao;
            break;
          }
        }
        
        layer.bindPopup(`
          <strong>${nomeOriginal}</strong><br/>
          Região: ${regiao}<br/>
          Quantidade: ${qtd}
        `);
      }
    }).addTo(map);

    console.log(`${municipiosColoridos} municípios coloridos por região`);
    
    esconderLoading();
    
    // Mostrar estatísticas no console
    console.log('Mapa carregado com sucesso!');
    console.log(`- ${Object.keys(regioes).length} regiões carregadas`);
    console.log(`- ${marcadoresAdicionados} marcadores adicionados`);
    console.log(`- ${municipiosColoridos} municípios coloridos`);
    
  } catch (error) {
    console.error('Erro ao inicializar mapa:', error);
    mostrarErro(error.message);
  }
}

// Aguardar DOM estar pronto antes de inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarMapa);
} else {
  inicializarMapa();
}