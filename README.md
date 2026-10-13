# Bibliothèque Française

**Leia francês no seu nível.** Uma biblioteca gratuita com 233 leituras em francês, de livrinhos ilustrados para iniciantes até Racine, Pascal e Hugo, organizadas em seis etapas. Inclui um guia de leitura em PDF e uma planilha de acompanhamento.

🌐 **Site:** https://oaleffemanuel.github.io/biblioth-que-fran-aise/

Para quem só quer ler, basta o site. Não precisa de conta nem de saber usar o GitHub.

Projeto irmão da [Biblioteca Italiana](https://oaleffemanuel.github.io/biblioteca-italiana/).

## O que tem aqui

| | |
|---|---|
| Catálogo | 233 obras com filtros por etapa, forma, trilha, fonte, áudio e duração, e lista "Quero ler / Lido" salva no navegador. |
| [Guia de leitura (PDF)](docs/telechargements/guia-de-leitura-bibliotheque-francaise.pdf) | Como começar, como escolher livros, ler e ouvir, vocabulário, résumés, as 6 etapas com obras reais, 3 trilhas temáticas e dicas para brasileiros. |
| [Diário de leitura (XLSX)](docs/telechargements/diario-de-leitura-bibliotheque-francaise.xlsx) | Catálogo com links, status e notas, painel de progresso, sessões, vocabulário com revisão e résumés. Funciona no Excel e no Google Planilhas. |
| [Dados abertos](docs/donnees/) | Catálogo em CSV/JSON e manifesto de publicação. |

### As seis etapas

| Étape | Nome | Nível | Obras |
|---|---|---|---:|
| 1 | *Premiers pas* | A1 | 20 |
| 2 | *Petites histoires* | A1–A2 | 18 |
| 3 | *Le pont* | A2–B1 | 17 |
| 4 | *Contes et nouvelles* | B1–B2 | 22 |
| 5 | *Le roman* | B2 | 120 |
| 6 | *Les classiques* | C1 | 36 |

Só as 24 histórias MeloLingua têm nível CEFR **oficial**. Os níveis internos do African Storybook não são CEFR. Os demais níveis são estimativas do projeto.

## Direitos autorais

Acesso gratuito não é permissão para redistribuir. Detalhes em [`MANIFESTO_PUBLICACAO.md`](MANIFESTO_PUBLICACAO.md) e, obra a obra, em [`data/manifesto.csv`](data/manifesto.csv).

- **Hospedados aqui: 152 PDFs** com licença verificada.
  - ELTeC-fra: CC BY 4.0.
  - MeloLingua: CC BY-NC 4.0.
  - African Storybook: CC BY 4.0 e CC BY-NC 3.0.
  - Wikisource: CC BY-SA 4.0.

  Créditos em [`docs/livres/CREDITOS.md`](docs/livres/CREDITOS.md).
- **Só link: 81 obras.** O Project Gutenberg é acessado diretamente na fonte oficial, que oferece EPUB e HTML.
- **Áudio:** nenhum arquivo de áudio é hospedado. Os audiolivros ficam no LibriVox (domínio público) e os áudios MeloLingua na página oficial.

É titular de direitos e quer corrigir ou retirar algo? [Abra uma issue](https://github.com/oaleffemanuel/biblioth-que-fran-aise/issues).

## Licenças deste projeto

- **Código:** [MIT](LICENSE).
- **Textos do site, guia, planilha e dados:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.pt_BR).
- **PDFs em `docs/livres/`:** a licença de cada fonte, conforme o manifesto.

## Para quem mantém o projeto

O site é HTML, CSS e JavaScript puro, publicado pelo GitHub Pages a partir da pasta `docs/`. Todos os links são relativos, então o site funciona em qualquer endereço, inclusive em um futuro portal de bibliotecas.

```
data/catalogo.json          catálogo público (fonte única de verdade)
data/manifesto.csv          decisão de publicação de cada obra (hospedar / link / excluir) e a base legal
ferramentas/construir.py    gera páginas, guia em PDF, planilha, CSV/JSON, créditos e sitemap
docs/                       site publicado
  livres/                   os 152 PDFs com licença verificada + CREDITOS.md
  telechargements/          guia (PDF) e planilha (XLSX)
  donnees/                  catálogo em CSV/JSON e manifesto
```

Para reconstruir:

```bash
pip install -r ferramentas/requirements.txt          # weasyprint e openpyxl
python3 ferramentas/construir.py                     # use --sem-pdf para pular o guia
SITE_URL=https://outro-endereco/ python3 ferramentas/construir.py   # endereço público diferente
```

---

Projeto pessoal e sem fins lucrativos, não afiliado às fontes citadas. *Bonne lecture !*
