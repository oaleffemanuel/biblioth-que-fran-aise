# Manifesto de publicação — Bibliothèque Française

Versão de 2026-10-13. A decisão para cada obra, com base legal, atribuição e URL da fonte, está em [`data/manifesto.csv`](data/manifesto.csv). Este arquivo é o resumo.

## Princípios

1. Só hospedamos um arquivo quando há **licença verificada para aquela edição exata** que permite redistribuição.
2. Domínio público nos EUA não é domínio público em todo lugar; o original em domínio público não cobre traduções, adaptações, notas ou ilustrações modernas.
3. Texto e áudio têm direitos separados.
4. Na dúvida, link para a fonte oficial ou exclusão.

## Hospedados (152 PDFs)

| Fonte | Licença | Obras | Base | Atribuição exigida |
|---|---|---:|---|---|
| African Storybook | CC BY 4.0 | 20 | licença no próprio arquivo/fonte | ver CREDITOS.md |
| African Storybook | CC BY-NC 3.0 | 2 | licença no próprio arquivo/fonte | ver CREDITOS.md |
| ELTeC-fra | CC BY 4.0 | 99 | licença no próprio arquivo/fonte | ver CREDITOS.md |
| MeloLingua | CC BY-NC 4.0 | 24 | licença no próprio arquivo/fonte | ver CREDITOS.md |
| Wikisource (fr) | CC BY-SA 4.0 | 7 | licença no próprio arquivo/fonte | ver CREDITOS.md |

- **ELTeC-fra:** `<availability>` de cada TEI declara CC BY 4.0. PDF gerado do TEI sem alterar o texto; crédito ao ELTeC (COST Action CA16204, DOI 10.5281/zenodo.3462535).
- **MeloLingua:** `LICENSE-DATA.md` do dataset (CC BY-NC 4.0). Uso não comercial; marca MeloLingua não licenciada; mudança indicada (Markdown → PDF). O áudio do site oficial **não** é hospedado.
- **African Storybook:** a licença de cada livro foi lida na última página do PDF oficial: 20 em CC BY 4.0 e 2 em CC BY-NC 3.0 (*Le haricot qui germe*, *Trop petits*).
- **Wikisource:** transcrições CC BY-SA 4.0 de textos em domínio público (Racine, Corneille, Molière, Pascal e uma tradução anônima de 1911 da *Chanson de Roland*); os PDFs derivados seguem CC BY-SA 4.0.

## Só link (81 obras)

- **Project Gutenberg:** 78
- **ELTeC-fra:** 1
- **Project Gutenberg + LibriVox:** 1
- **Wikisource (fr) + LibriVox:** 1

- **Project Gutenberg:** domínio público nos EUA; para 5 leitores escolares, a data de morte do organizador não foi confirmada fora dos EUA. O site leva direto à fonte oficial (EPUB e página da obra), sem copiar arquivos.
- **ELTeC:** *Blondine*, porque a data de morte da autora não foi confirmada; link para o TEI oficial.
- **Fables (La Fontaine) e *Alcools* (Apollinaire):** as cópias do acervo pessoal não são publicadas. O site aponta para o texto no Gutenberg ou no Wikisource e para a gravação LibriVox.
- **Áudio:**
  - LibriVox (domínio público, declaração do projeto): 19 obras, só link;
  - MeloLingua: narração na página oficial (18 histórias), só link.
- **Inklingo:** recomendado só como link por nível, sem listar histórias. Os termos proíbem coleta automatizada e reservam o conteúdo.

## Excluídos (88 obras)

Todo o acervo pessoal (arquivos do InfoLivres) fica fora do site:
- **14 obras com redistribuição não permitida**, entre elas *Le Petit Prince*, *Autant en emporte le vent*, *Gatsby*, *Peter Pan* (exceção legal para pessoas com deficiência) e traduções e materiais comerciais;
- **74 obras** cuja edição, tradução ou licença não pode ser verificada publicamente (BeQ, ELG, BNR, Bibebook, compilações InfoLivres).

## Verificações feitas antes da publicação

- Só existem em `docs/livres/` arquivos de fontes autorizadas (prefixos `el-`, `ml-`, `as-`, `ws-`).
- Os hospedados no catálogo coincidem com os do manifesto.
- Nenhum MP3, EPUB, TEI ou arquivo do acervo pessoal está no repositório.
