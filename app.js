const MUSICAS_PADRAO = [
  { id: 1, titulo: 'Queen - Bohemian Rhapsody', posicaoBase: 1 },
  { id: 2, titulo: 'Pink Floyd - Wish You Were Here', posicaoBase: 2 },
  { id: 3, titulo: 'The Beatles - Come Together', posicaoBase: 3 },
  { id: 4, titulo: 'Led Zeppelin - Stairway to Heaven', posicaoBase: 4 },
  { id: 5, titulo: 'Nirvana - Smells Like Teen Spirit', posicaoBase: 5 }
];

let rankingUsuarioB = [...MUSICAS_PADRAO];

const elementoListaA = document.getElementById('lista-usuario-a');
const elementoListaB = document.getElementById('lista-usuario-b');
const elementoPorcentagem = document.getElementById('porcentagem-afinidade');
const elementoTotalInversoes = document.getElementById('total-inversoes');
const elementoMaxInversoes = document.getElementById('max-inversoes');
const elementoComparacoesDC = document.getElementById('comparacoes-dc');
const elementoTempoDC = document.getElementById('tempo-dc');
const elementoComparacoesFB = document.getElementById('comparacoes-fb');
const elementoTempoFB = document.getElementById('tempo-fb');
const elementoListaPares = document.getElementById('lista-pares-divergentes');

function renderizarUsuarioA(musicas) {
  elementoListaA.innerHTML = musicas.slice(0, 10).map(musica => `
    <li class="flex items-center justify-between p-2 rounded bg-neutral-900 border border-neutral-800 text-xs">
      <div class="flex items-center gap-2 truncate">
        <span class="font-mono text-neutral-400 font-bold">#${musica.posicaoBase}</span>
        <span class="text-neutral-200 truncate">${musica.titulo}</span>
      </div>
    </li>
  `).join('');

  if (musicas.length > 10) {
    elementoListaA.innerHTML += `<li class="text-center text-xs text-neutral-500 py-1">+ ${musicas.length - 10} músicas...</li>`;
  }
}

function renderizarUsuarioB(musicas) {
  const listaGrande = musicas.length > 10;
  const itensExibidos = listaGrande ? musicas.slice(0, 6) : musicas;

  elementoListaB.innerHTML = itensExibidos.map((musica, indice) => {
    const alinhado = musica.posicaoBase === indice + 1;
    return `
      <li class="flex items-center justify-between p-2 rounded border text-xs ${
        alinhado ? 'bg-neutral-900 border-neutral-800' : 'bg-spotify-green/10 border-spotify-green/30'
      }">
        <div class="flex items-center gap-2 truncate">
          <span class="font-mono font-bold ${alinhado ? 'text-neutral-400' : 'text-spotify-green'}">${indice + 1}</span>
          <span class="truncate ${alinhado ? 'text-neutral-300' : 'text-white font-medium'}">${musica.titulo}</span>
        </div>
        ${!listaGrande ? `
          <div class="flex items-center gap-1 shrink-0">
            <span class="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-1 rounded">Orig: #${musica.posicaoBase}</span>
            <button onclick="moverMusica(${indice}, -1)" ${indice === 0 ? 'disabled' : ''} class="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-20 text-neutral-200">▲</button>
            <button onclick="moverMusica(${indice}, 1)" ${indice === musicas.length - 1 ? 'disabled' : ''} class="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-20 text-neutral-200">▼</button>
          </div>
        ` : ''}
      </li>
    `;
  }).join('');

  if (listaGrande) {
    elementoListaB.innerHTML += `<li class="text-center text-xs text-spotify-green py-1 font-mono">Modo Benchmark: 1.000 músicas</li>`;
  }
}

function renderizarPares(pares, total) {
  if (total === 0) {
    elementoListaPares.innerHTML = `<p class="text-xs text-neutral-400 py-2 text-center">Nenhuma divergência. Rankings idênticos!</p>`;
    return;
  }

  const itensParaMostrar = pares.slice(0, 8);
  elementoListaPares.innerHTML = itensParaMostrar.map(p => `
    <li class="p-1.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] flex items-center justify-between">
      <span class="truncate">
        <strong class="text-white">${p.maiorPrioridade.titulo}</strong>
        <span class="text-neutral-500">ficou antes de</span>
        <span class="text-spotify-green">${p.menorPrioridade.titulo}</span>
      </span>
      <span class="text-[9px] uppercase px-1 rounded bg-red-950/80 text-red-400 border border-red-900">Inversão</span>
    </li>
  `).join('');

  if (total > itensParaMostrar.length) {
    elementoListaPares.innerHTML += `<p class="text-center text-[10px] text-neutral-500 py-1">+ ${(total - itensParaMostrar.length).toLocaleString('pt-BR')} outras inversões</p>`;
  }
}

function moverMusica(indiceAtual, deslocamento) {
  const novoIndice = indiceAtual + deslocamento;
  if (novoIndice < 0 || novoIndice >= rankingUsuarioB.length) return;

  const temporario = rankingUsuarioB[indiceAtual];
  rankingUsuarioB[indiceAtual] = rankingUsuarioB[novoIndice];
  rankingUsuarioB[novoIndice] = temporario;

  renderizarUsuarioB(rankingUsuarioB);
  atualizarResultados();
}

function atualizarResultados() {
  const resultadoDC = contarInversoesDividirEConquistar(rankingUsuarioB);
  const resultadoFB = contarInversoesForcaBruta(rankingUsuarioB);
  const { maximoInversoes, porcentagem } = calcularSimilaridade(rankingUsuarioB.length, resultadoDC.total);

  elementoPorcentagem.textContent = `${porcentagem}%`;
  elementoTotalInversoes.textContent = resultadoDC.total.toLocaleString('pt-BR');
  elementoMaxInversoes.textContent = `/ máx ${maximoInversoes.toLocaleString('pt-BR')}`;

  elementoComparacoesDC.textContent = `${resultadoDC.comparacoes.toLocaleString('pt-BR')} comparações`;
  elementoTempoDC.textContent = `${resultadoDC.tempoMs.toFixed(3)} ms`;

  elementoComparacoesFB.textContent = `${resultadoFB.comparacoes.toLocaleString('pt-BR')} comparações`;
  elementoTempoFB.textContent = `${resultadoFB.tempoMs.toFixed(3)} ms`;

  renderizarPares(resultadoDC.paresInvertidos, resultadoDC.total);
}

function aplicarCenario(tipo) {
  if (tipo === 'identico') {
    rankingUsuarioB = [...MUSICAS_PADRAO];
    renderizarUsuarioA(MUSICAS_PADRAO);
  } else if (tipo === 'parecido') {
    rankingUsuarioB = [
      MUSICAS_PADRAO[0],
      MUSICAS_PADRAO[2],
      MUSICAS_PADRAO[1],
      MUSICAS_PADRAO[3],
      MUSICAS_PADRAO[4]
    ];
    renderizarUsuarioA(MUSICAS_PADRAO);
  } else if (tipo === 'oposto') {
    rankingUsuarioB = [...MUSICAS_PADRAO].reverse();
    renderizarUsuarioA(MUSICAS_PADRAO);
  } else if (tipo === 'benchmark') {
    const listaBenchmark = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      titulo: `Música #${i + 1}`,
      posicaoBase: i + 1
    }));
    
    const embaralhado = [...listaBenchmark];
    for (let i = embaralhado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [embaralhado[i], embaralhado[j]] = [embaralhado[j], embaralhado[i]];
    }

    rankingUsuarioB = embaralhado;
    renderizarUsuarioA(listaBenchmark);
  }

  renderizarUsuarioB(rankingUsuarioB);
  atualizarResultados();
}

window.addEventListener('DOMContentLoaded', () => {
  renderizarUsuarioA(MUSICAS_PADRAO);
  renderizarUsuarioB(rankingUsuarioB);
  atualizarResultados();
});
