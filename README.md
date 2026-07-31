# Gestão de Custos e Projetos Agropecuários

Guia de estudo da disciplina — Colégio Politécnico da UFSM, eixo Recursos Naturais.
Prof. Róberson Macedo de Oliveira.

Site estático (HTML/CSS/JS puro), publicado via GitHub Pages.

## Estrutura
- `index.html` — página inicial (precisa ficar na raiz do repositório)
- `parte-1.html` … `parte-6.html` — as seis partes (aulas em blocos acordeão)
- `aulas.html` — catálogo de vídeos
- `quiz-geral.html` — autoavaliação (Partes I–IV)
- `.nojekyll` — desliga o processamento Jekyll do GitHub Pages (site servido como está)

O logo do Colégio está embutido (inline) no `index.html`; o arquivo `.svg` na pasta
é opcional (mantido apenas como fonte editável do logo).

- `docs/` — briefings e roteiro de aulas (não fazem parte do site publicado)
- `fruticultura/` — aulas de "Vivências em Fruticultura I" (outra disciplina), hospedadas
  no mesmo domínio mas sem link no menu, fora do `sitemap.xml` e bloqueadas no
  `robots.txt`. Acesso só por URL direta, repassada aos alunos dessa turma.

## Como atualizar
1. Editar o arquivo no VS Code.
2. Source Control → escrever a mensagem → Commit.
3. Sync / Push.
4. Aguardar ~1 minuto: o GitHub Pages reconstrói e publica.
