// 1. Dividir e Conquistar: Merge Sort Adaptado - O(N log N)
function contarInversoesDividirEConquistar(listaRanking) {
  const tempoInicio = performance.now();
  let comparacoes = 0;
  const paresInvertidos = [];

  function dividirEContar(array) {
    if (array.length <= 1) {
      return { ordenado: array, total: 0 };
    }

    const meio = Math.floor(array.length / 2);
    const metadeEsquerda = array.slice(0, meio);
    const metadeDireita = array.slice(meio);

    const resultadoEsquerda = dividirEContar(metadeEsquerda);
    const resultadoDireita = dividirEContar(metadeDireita);
    const resultadoMesclagem = mesclarEContar(resultadoEsquerda.ordenado, resultadoDireita.ordenado);

    return {
      ordenado: resultadoMesclagem.ordenado,
      total: resultadoEsquerda.total + resultadoDireita.total + resultadoMesclagem.inversoesCruzadas
    };
  }

  function mesclarEContar(esquerda, direita) {
    const ordenado = [];
    let i = 0;
    let j = 0;
    let inversoesCruzadas = 0;

    while (i < esquerda.length && j < direita.length) {
      comparacoes++;

      if (esquerda[i].posicaoBase <= direita[j].posicaoBase) {
        ordenado.push(esquerda[i]);
        i++;
      } else {
        // Se esquerda[i] > direita[j], todos os restantes da esquerda formam inversão com direita[j]
        inversoesCruzadas += esquerda.length - i;

        if (paresInvertidos.length < 100) {
          for (let k = i; k < esquerda.length && paresInvertidos.length < 100; k++) {
            paresInvertidos.push({
              maiorPrioridade: direita[j],
              menorPrioridade: esquerda[k]
            });
          }
        }

        ordenado.push(direita[j]);
        j++;
      }
    }

    while (i < esquerda.length) {
      ordenado.push(esquerda[i]);
      i++;
    }
    while (j < direita.length) {
      ordenado.push(direita[j]);
      j++;
    }

    return { ordenado, inversoesCruzadas };
  }

  const { total } = dividirEContar([...listaRanking]);
  const tempoMs = performance.now() - tempoInicio;

  return { total, paresInvertidos, comparacoes, tempoMs };
}

// 2. Força Bruta: Dois Laços Aninhados - O(N²)
function contarInversoesForcaBruta(listaRanking) {
  const tempoInicio = performance.now();
  let total = 0;
  let comparacoes = 0;
  const paresInvertidos = [];
  const n = listaRanking.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      comparacoes++;

      if (listaRanking[i].posicaoBase > listaRanking[j].posicaoBase) {
        total++;

        if (paresInvertidos.length < 100) {
          paresInvertidos.push({
            maiorPrioridade: listaRanking[j],
            menorPrioridade: listaRanking[i]
          });
        }
      }
    }
  }

  const tempoMs = performance.now() - tempoInicio;

  return { total, paresInvertidos, comparacoes, tempoMs };
}

// 3. Métrica de Similaridade (%)
function calcularSimilaridade(totalItens, totalInversoes) {
  const maximoInversoes = (totalItens * (totalItens - 1)) / 2;
  if (maximoInversoes === 0) return { maximoInversoes: 0, porcentagem: 100 };

  const porcentagem = Math.max(0, Math.round((1 - (totalInversoes / maximoInversoes)) * 100));
  return { maximoInversoes, porcentagem };
}
