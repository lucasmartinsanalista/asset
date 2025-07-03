<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Financeiro - Lucas Martins</title>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h1>Dashboard Financeiro - Lucas Martins</h1>
    
    <div class="controls">
      <button id="refresh-btn" class="refresh-button">Atualizar Dados</button>
      <div id="last-update" class="last-update"></div>
    </div>
    
    <div id="data-info">
      <p>Dados carregados: <span id="data-count">0</span> registros</p>
    </div>
    
    <div class="filters-container">
      <!-- Filtros mantidos iguais ao seu original -->
    </div>
    
    <div id="charts">
      <div class="chart-box">
        <div class="chart-container" id="mes-chart"></div>
      </div>
      <div class="chart-box">
        <div class="chart-container" id="top-chart"></div>
      </div>
    </div>
  </div>

  <script src="js/script.js"></script>
</body>
</html>
