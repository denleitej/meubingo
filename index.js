function desenharCartela() {
    var body_cartelas = document.getElementById('body_cartelas');
  
    // Prompt para inserir o nome do jogador
    var nomeJogador = prompt('Digite o nome do jogador:');
    if (nomeJogador === null) {
      // Se o usuário cancelar, não faz nada
      return;
    }
  
    // Criar uma div com a classe "cartela"
    var divCartela = document.createElement('div');
    divCartela.className = 'cartela';
  
    // Criar o título com o nome do jogador
    var titulo = document.createElement('h4');
    titulo.textContent = nomeJogador;
    divCartela.appendChild(titulo);
  
    // Criar a tabela da cartela
    var tabela = document.createElement('table');
  
    // Criar o cabeçalho da tabela
    var thead = document.createElement('thead');
    var cabecalho = ['B', 'I', 'N', 'G', 'O'];
    var th;
  
    var primeiraLinha = document.createElement('tr');
    for (var i = 0; i < cabecalho.length; i++) {
      th = document.createElement('th');
      th.textContent = cabecalho[i];
      primeiraLinha.appendChild(th);
    }
    thead.appendChild(primeiraLinha);
    tabela.appendChild(thead);
  
    var tbody = document.createElement('tbody');
  
    // Gerar números aleatórios não repetidos para cada coluna
    var numerosB = gerarNumerosNaoRepetidos(1, 15, 5);
    var numerosI = gerarNumerosNaoRepetidos(16, 30, 5);
    var numerosN = gerarNumerosNaoRepetidos(31, 45, 5);
    var numerosG = gerarNumerosNaoRepetidos(46, 60, 5);
    var numerosO = gerarNumerosNaoRepetidos(61, 75, 5);
  
    // Criar as linhas e células da tabela com os números aleatórios
    for (var j = 0; j < 5; j++) {
      var tr = document.createElement('tr');
  
      var tdB = document.createElement('td');
      tdB.textContent = numerosB[j];
      tr.appendChild(tdB);
  
      var tdI = document.createElement('td');
      tdI.textContent = numerosI[j];
      tr.appendChild(tdI);
  
      var tdN = document.createElement('td');
      tdN.textContent = numerosN[j];
      tr.appendChild(tdN);
  
      var tdG = document.createElement('td');
      tdG.textContent = numerosG[j];
      tr.appendChild(tdG);
  
      var tdO = document.createElement('td');
      tdO.textContent = numerosO[j];
      tr.appendChild(tdO);
  
      tbody.appendChild(tr);
    }
  
    tabela.appendChild(tbody);
  
    // Adicionar a tabela à div da cartela
    divCartela.appendChild(tabela);
  
    // Adicionar a div da cartela ao body_cartelas
    body_cartelas.appendChild(divCartela);
  }
  
  function gerarNumerosNaoRepetidos(min, max, quantidade) {
    var numeros = [];
    
    // Gerar números aleatórios únicos dentro do intervalo
    while (numeros.length < quantidade) {
      var numero = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numeros.includes(numero)) {
        numeros.push(numero);
      }
    }
  
    return numeros;
  }
  
  
  
  
  
  function apagarCartelas() {
    var cartelas = document.querySelectorAll('.cartela');
    var sorteiosSection = document.getElementById('sorteios');
    var mensagemSection = document.getElementById('mensagem');
  
    for (var i = 0; i < cartelas.length; i++) {
      cartelas[i].innerHTML = '';
    }
  
    sorteiosSection.innerHTML = '';
    mensagemSection.innerHTML = '';
  
    clearInterval(intervalId); 
    // Interrompendo o jogo (NÃO TA FUNCIONANDO NÃO CONSEGUI CONSERTAR)
  }
 

  function jogarBingo() {
    var cartelas = document.querySelectorAll('.cartela');
    var numerosSorteados = [];
    var intervalId;
  
    if (cartelas.length === 0) {
      alert('Não há cartelas geradas. Gere as cartelas antes de iniciar o jogo.');
      return;
    }
  
    iniciarJogo();
  
    function iniciarJogo() {
      intervalId = setInterval(sortearNumero, 1000);
    }
  
    function sortearNumero() {
        var numeroSorteado = gerarNumeroNaoRepetido(1, 75);
        numerosSorteados.push(numeroSorteado);
        exibirNumeroSorteado(numeroSorteado);
        preencherCartelas(numeroSorteado);
      
        console.log('Estado das cartelas:');
        for (var i = 0; i < cartelas.length; i++) {
          var espacos = cartelas[i].getElementsByTagName('td');
          var cartelaEstado = Array.from(espacos).map(function (espaco) {
            return espaco.style.backgroundColor === 'yellow';
          });
          console.log('Cartela', i + 1, ':', cartelaEstado);
        }
      
        var cartelasCompletas = verificarCartelasCompletas();
        if (cartelasCompletas.length > 0) {
          encerrarJogo(cartelasCompletas);
        }
      }
  
    function gerarNumeroNaoRepetido(min, max) {
      var numero = Math.floor(Math.random() * (max - min + 1)) + min;
      while (numerosSorteados.includes(numero)) {
        numero = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return numero;
    }
  
    function exibirNumeroSorteado(numero) {
      var sorteiosSection = document.getElementById('sorteios');
      var h5 = document.createElement('h5');
      h5.textContent = numero;
      sorteiosSection.appendChild(h5);
    }
  
    function preencherCartelas(numeroSorteado) {
      for (var i = 0; i < cartelas.length; i++) {
        var espacos = cartelas[i].getElementsByTagName('td');
        for (var j = 0; j < espacos.length; j++) {
          if (espacos[j].textContent === String(numeroSorteado)) {
            espacos[j].style.backgroundColor = 'yellow';
          }
        }
      }
    }
  
    function verificarCartelasCompletas() {
      var cartelasCompletas = [];
      for (var i = 0; i < cartelas.length; i++) {
        var espacos = cartelas[i].getElementsByTagName('td');
        var completa = true;
        for (var j = 0; j < espacos.length; j++) {
          if (espacos[j].style.backgroundColor !== 'yellow') {
            completa = false;
            break;
          }
        }
        if (completa) {
          cartelasCompletas.push(cartelas[i].querySelector('h4').textContent);
        }
      }
      return cartelasCompletas;
    }
  
    function encerrarJogo(vencedores) {
      clearInterval(intervalId);
      exibirMensagemVitoria(vencedores);
    }
  
    function exibirMensagemVitoria(vencedores) {
      var mensagemSection = document.getElementById('mensagem');
      mensagemSection.innerHTML = '';
  
      for (var i = 0; i < vencedores.length; i++) {
        var paragrafo = document.createElement('p');
        paragrafo.textContent = 'Parabéns, ' + vencedores[i] + '! Você venceu!';
        mensagemSection.appendChild(paragrafo);
      }
    }
  }
