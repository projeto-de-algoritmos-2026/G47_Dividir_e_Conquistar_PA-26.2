# G47_Dividir_e_Conquistar_PA-26.2 - Music Matcher (Sistema de Recomendação Musical)

Trabalho prático sobre **Dividir e Conquistar (Divide and Conquer)** da matéria de **Projeto de Algoritmos (2026/2)**.

## Integrantes

| Matrícula | Nome | Usuário GitHub |
| :--- | :--- | :--- |
| 232027476 | João Guilherme | [@jonas3688](https://github.com/jonas3688) |
| 232013917 | Arthur Gomes Oliveira | [@arthurgomes1290](https://github.com/arthurgomes1290) |

## Sobre o Projeto

O projeto consiste em uma aplicação web interativa desenvolvida com **HTML5, Tailwind CSS e JavaScript puro (ES6+)** para visualização e execução do algoritmo de **Contagem de Inversões via Dividir e Conquistar (Merge Sort Adaptado)** aplicado ao problema real de cálculo de afinidade em sistemas de recomendação musical (estilo Spotify).

O cenário prático modelado é o de dois usuários que ranqueiam suas preferências de músicas ou bandas favoritas. A aplicação compara os dois rankings calculando o número de pares fora de ordem (**inversões**) para medir a similaridade de gosto musical.

A aplicação permite:
- **Visualizar o ranking base fixo** (Usuário A) e o ranking interativo (Usuário B).
- **Reordenar músicas em tempo real** através dos botões de subir (▲) e descer (▼).
- **Utilizar presets rápidos** de demonstração: *Idêntico* (0 inversões, 100% afinidade), *Parecido* (baixa divergência), *Invertido* (oposto total, 0% afinidade) e *1.000 Músicas* (teste de estresse).
- **Comparar visualmente o desempenho**: tempo de execução e número real de comparações do algoritmo ótimo $O(N \log N)$ contra a Força Bruta $O(N^2)$.
- **Listar os pares divergentes** com indicação exata de quais músicas geraram conflito na preferência.

## Vídeo de Demonstração

O vídeo demonstrando o funcionamento da aplicação, os casos de uso e a explicação prática do algoritmo pode ser assistido no YouTube clicando na imagem abaixo ou pelo link direto:

[![Demonstração do Projeto](https://img.youtube.com/vi/9Sg-5JmrEHw/hqdefault.jpg)](https://youtu.be/9Sg-5JmrEHw)

> 🎥 **Link direto para o YouTube:** [https://youtu.be/9Sg-5JmrEHw](https://youtu.be/9Sg-5JmrEHw)

## Algoritmos Utilizados

### 1. Contagem de Inversões via Dividir e Conquistar (Merge Sort Adaptado)

Responde à pergunta: **como calcular a divergência entre dois rankings com eficiência ótima $O(N \log N)$ mesmo para catálogos com milhares de músicas?**

**Passos do Algoritmo:**
1. **Divisão:** Divide a lista de preferências ao meio recursivamente até sublistas de tamanho 1 ou 0 (caso base).
2. **Conquista:** Conta recursivamente o número de inversões contidas inteiramente na metade esquerda e na metade direita.
3. **Combinação (Merge):** Ao intercalar duas metades ordenadas `left` e `right`, se `left[i] > right[j]`, significa que `right[j]` é menor que **todos** os elementos restantes em `left` a partir de `i`. Contabiliza-se `left.length - i` inversões instantaneamente em $O(1)$ por passo, totalizando tempo linear $O(N)$ na mesclagem.
4. **Resultado:** O total de inversões é a soma das inversões da esquerda + inversões da direita + inversões cruzadas da mesclagem.

**Onde aparece na aplicação:**
- **Card de Afinidade e Inversões:** Cálculo da porcentagem de match e quantidade total de inversões.
- **Card Comparativo:** Exibição do número de comparações e tempo de execução sob a complexidade $O(N \log N)$.
- **Pares Invertidos:** Identificação e listagem dos pares divergentes.

---

### 2. Contagem de Inversões por Força Bruta

Responde à pergunta: **qual é o impacto do crescimento quadrático $O(N^2)$ ao comparar todos os pares individualmente?**

**Passos do Algoritmo:**
1. **Dois Loops Aninhados:** Itera sobre todos os pares de índices $(i, j)$ tais que $i < j$.
2. **Comparação:** Compara diretamente se a preferência de base do item $i$ é maior que a do item $j$.
3. **Resultado:** Executa exatamente $\frac{N(N - 1)}{2}$ comparações.

**Onde aparece na aplicação:**
- **Card Comparativo de Desempenho:** Demonstra a explosão de comparações (ex: ~500.000 operações para 1.000 itens, contra apenas ~8.700 no Dividir e Conquistar).

## Como Executar o Projeto

### Pré-requisitos
- Qualquer navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
- Não requer Node.js, compilação ou instalação de dependências.

### Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/projeto-de-algoritmos-2026/G47_Dividir_e_Conquistar_PA-26.2.git
   cd G47_Dividir_e_Conquistar_PA-26.2
   ```

2. Abra o arquivo `index.html` diretamente no navegador:
   - No Linux:
     ```bash
     xdg-open index.html
     ```
   - Ou utilize um servidor HTTP local simples:
     ```bash
     python3 -m http.server 8000
     ```
     Depois acesse `http://localhost:8000` no seu navegador.

## 🛠️ Tecnologias Utilizadas

- **Lógica e Algoritmos (Backend Puro):** JavaScript puro ES6+ ([`algorithms.js`](algorithms.js))
- **Interface e Apresentação (Frontend):** HTML5, Tailwind CSS (via CDN) e JavaScript puro ([`app.js`](app.js), [`index.html`](index.html))
