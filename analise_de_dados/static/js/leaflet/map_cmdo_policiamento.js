const cores = {
  CPC: "#FF5151",
  CPM: "#FFEA00",
  "CPI-1": "#1391D2",
  "CPI-2": "#9C27B0",
  "CPI-3": "#F9A825",
  "CPI-4": "#d62728",
  "CPI-5": "#880E4F",
  "CPI-6": "#1A237E",
  "CPI-7": "#673AB7",
  "CPI-8": "#7f7f7f",
  "CPI-9": "#0097A7",
  "CPI-10": "#E65100",
};

let regioes = {};
let regioesCarregadas = false;
let tentativasCarregamento = 0;
const maxTentativas = 3;

// Função para carregar regiões com retry, timeout e cache
async function carregarRegioes() {
  return new Promise(async (resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout ao carregar regiões'));
    }, 10000); // 10 segundos de timeout

    try {
      // Tentar carregar do cache primeiro
      const data = await mapaCache.fetchWithCache('/efetivo/api/batalhao_municipio');
      
      clearTimeout(timeout);
      regioes = data;
      regioesCarregadas = true;
      console.log('Regiões carregadas com sucesso:', Object.keys(data).length, 'regiões');
      resolve(data);
      
    } catch (error) {
      clearTimeout(timeout);
      console.error('Erro ao carregar regiões:', error);
      tentativasCarregamento++;
      
      if (tentativasCarregamento < maxTentativas) {
        console.log(`Tentativa ${tentativasCarregamento + 1} de ${maxTentativas} em 2 segundos...`);
        setTimeout(() => {
          carregarRegioes().then(resolve).catch(reject);
        }, 2000);
      } else {
        regioes = {};
        regioesCarregadas = false;
        reject(error);
      }
    }
  });
}

// Função para verificar se as regiões estão carregadas
function aguardarRegioes() {
  return new Promise((resolve) => {
    if (regioesCarregadas) {
      resolve(regioes);
      return;
    }
    
    const verificar = setInterval(() => {
      if (regioesCarregadas) {
        clearInterval(verificar);
        resolve(regioes);
      }
    }, 100);
    
    // Timeout de segurança
    setTimeout(() => {
      clearInterval(verificar);
      console.warn('Timeout aguardando regiões - usando dados vazios');
      resolve({});
    }, 15000);
  });
}

// Iniciar carregamento imediatamente
carregarRegioes().catch(error => {
  console.error('Falha final no carregamento das regiões:', error);
});
