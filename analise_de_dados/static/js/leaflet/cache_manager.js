// Cache manager para melhorar performance do mapa
class MapaCacheManager {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutos
  }

  // Gerar chave única para o cache
  generateKey(url) {
    return btoa(url);
  }

  // Verificar se o item está no cache e ainda é válido
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.cacheExpiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  // Adicionar item ao cache
  set(key, data) {
    this.cache.set(key, {
      data: data,
      timestamp: Date.now()
    });
  }

  // Fetch com cache
  async fetchWithCache(url, options = {}) {
    const key = this.generateKey(url + JSON.stringify(options));
    
    // Verificar cache primeiro
    const cachedData = this.get(key);
    if (cachedData) {
      console.log(`Cache hit para ${url}`);
      return cachedData;
    }

    // Se não está no cache, fazer fetch
    console.log(`Cache miss para ${url} - fazendo fetch`);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      this.set(key, data);
      return data;
    } catch (error) {
      console.error('Erro no fetch:', error);
      throw error;
    }
  }

  // Limpar cache expirado
  clearExpired() {
    for (const [key, item] of this.cache.entries()) {
      if (Date.now() - item.timestamp > this.cacheExpiry) {
        this.cache.delete(key);
      }
    }
  }

  // Limpar todo o cache
  clearAll() {
    this.cache.clear();
  }

  // Obter estatísticas do cache
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Instância global do cache manager
const mapaCache = new MapaCacheManager();

// Limpar cache expirado a cada 2 minutos
setInterval(() => {
  mapaCache.clearExpired();
}, 2 * 60 * 1000);
