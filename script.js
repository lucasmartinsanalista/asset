// Configurações do seu repositório
const REPO_OWNER = 'lucasmartinsanalista';
const REPO_NAME = 'asset';
const FILE_PATH = 'planilha.xlsx'; // Coloque sua planilha na raiz do repositório

// Variável global para os dados
let allData = [];
const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Tenta carregar dados do cache
    loadCachedData();
    
    // Configura o botão de atualização
    document.getElementById('refresh-btn').addEventListener('click', fetchDataFromGitHub);
});

// Busca dados do GitHub
async function fetchDataFromGitHub() {
    try {
        // URL direta para o arquivo raw no GitHub Pages
        const fileUrl = `https://${REPO_OWNER}.github.io/${REPO_NAME}/${FILE_PATH}`;
        
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Erro ao carregar planilha');
        
        const arrayBuffer = await response.arrayBuffer();
        processData(arrayBuffer);
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao atualizar: " + error.message);
    }
}

// Processa os dados da planilha
function processData(arrayBuffer) {
    try {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        if (!workbook.Sheets['CONTROLE FINANCEIRO']) {
            throw new Error('A planilha deve ter uma aba chamada "CONTROLE FINANCEIRO"');
        }
        
        const sheet = workbook.Sheets['CONTROLE FINANCEIRO'];
        allData = XLSX.utils.sheet_to_json(sheet);
        
        // Salva no localStorage
        localStorage.setItem('financialData', JSON.stringify(allData));
        localStorage.setItem('lastUpdated', new Date().toISOString());
        
        updateUI();
        showLastUpdate();
        
    } catch (error) {
        console.error("Erro ao processar dados:", error);
        throw error;
    }
}

// Carrega dados do cache
function loadCachedData() {
    const savedData = localStorage.getItem('financialData');
    if (savedData) {
        allData = JSON.parse(savedData);
        updateUI();
        showLastUpdate();
    }
}

// Atualiza a interface
function updateUI() {
    document.getElementById('data-count').textContent = allData.length;
    document.getElementById('data-info').style.display = 'block';
    populateFilters();
    renderCharts();
}

// Mostra a última atualização
function showLastUpdate() {
    const lastUpdated = localStorage.getItem('lastUpdated');
    const element = document.getElementById('last-update');
    if (lastUpdated) {
        element.textContent = `Última atualização: ${new Date(lastUpdated).toLocaleString()}`;
    } else {
        element.textContent = 'Dados ainda não atualizados';
    }
}

// Mantenha as funções existentes:
// parseDateBR(), parseBRLCurrency(), populateFilters(), renderCharts()
// (elas podem permanecer exatamente como estão no seu código original)
