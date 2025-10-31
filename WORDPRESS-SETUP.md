# Guia de Implementação no WordPress

Seu código foi separado em 7 partes para fácil gerenciamento no WordPress.

## Estrutura dos Arquivos

```
00-HEAD-STYLES.html          → Estilos e configurações (HEAD)
01-header-navbar.html        → Cabeçalho e navegação
02-hero-section.html         → Seção principal (headline)
03-news-section.html         → Seção de notícias
04-testimonials-section.html → Seção de depoimentos
05-cta-section.html          → Chamada para ação
06-footer.html               → Rodapé
07-gamification-dashboard.html → Gamificação (XP, Níveis, Conquistas)
```

## Como Implementar

### Passo 1: Adicione os Estilos (Uma vez no site todo)
1. Vá para **Aparência > Personalizar > CSS Adicional**
2. Cole TODO o conteúdo do arquivo `00-HEAD-STYLES.html` (apenas a parte `<style>...</style>`)
3. **OU** vá para **Configurações > Editor de Tema** e adicione em `functions.php`:

```php
function enqueue_destrava_styles() {
    wp_enqueue_script('tailwind', 'https://cdn.tailwindcss.com');
}
add_action('wp_enqueue_scripts', 'enqueue_destrava_styles');
```

### Passo 2: Adicione as 7 Partes do Conteúdo
Para cada arquivo (01 a 07), siga este processo:

#### Opção A: Usando o Gutenberg (Recomendado)
1. Crie ou edite a página onde quer adicionar
2. Clique em **+** para adicionar bloco
3. Procure por **"HTML Customizado"** (ou "Custom HTML")
4. Cole o conteúdo do arquivo correspondente

#### Opção B: Usando um Theme Builder (Elementor, Divi, etc)
1. Use o módulo de **HTML Customizado** do seu builder
2. Cole o código HTML diretamente

#### Opção C: Manualmente no Código
1. Vá para **Páginas > Editar > Visualização de Código** (três pontos)
2. Cole na sequência as 7 partes

### Passo 3: Adicione a Gamificação em Todas as Páginas
O arquivo `07-gamification-dashboard.html` **deve estar presente em todas as páginas** onde você adicionar as outras partes.

**Melhor prática:** Cole no **Footer** do seu tema (Aparência > Widgets > Footer)

## Sequência de Adição (Ordem Importante!)

1. **Primeiro:** Adicione `07-gamification-dashboard.html` ao footer
2. **Depois adicione em ordem:**
   - `01-header-navbar.html`
   - `02-hero-section.html`
   - `03-news-section.html`
   - `04-testimonials-section.html`
   - `05-cta-section.html`
   - `06-footer.html`

## Customizações Fáceis

### Mudar Texto
- **Header:** Edite "Destrava Aí" em `01-header-navbar.html`
- **Headlines:** Edite em `02-hero-section.html` e `05-cta-section.html`
- **Notícias:** Edite títulos e conteúdo em `03-news-section.html`
- **Depoimentos:** Edite nomes e textos em `04-testimonials-section.html`

### Mudar Cores
Procure por estes valores e substitua:
- `#2b1a4e` - Roxo escuro (fundo)
- `#3c2569` - Roxo médio
- `#4B2E83` - Roxo claro
- `#F25C54` - Vermelho destaque
- `#C39BD3` - Roxo secundário

### Mudar Imagens
Procure por: `ChatGPT Image 20 de ago. de 2025, 19_59_46.png`
E substitua pelo caminho da sua imagem

### Adicionar Links
- Procure por `href="#"` e adicione seus links reais
- A seção de quiz: Procure por `onclick="handleStartQuiz()"` e customize o comportamento

## Funcionalidades Ativas

✅ **Gamificação:**
- Contagem de XP
- Sistema de Níveis (10 níveis)
- Conquistas desbloqueáveis
- Notificações em tempo real

✅ **Tracking:**
- Cliques em notícias rastreados
- XP ganho em ações específicas
- Dados salvos em `localStorage`

✅ **Responsivo:**
- Mobile-first design
- Otimizado para todos os tamanhos

## Troubleshooting

### O layout quebrou depois que colei
- Certifique-se que o arquivo `00-HEAD-STYLES.html` está incluído
- Tailwind CSS precisa estar carregado (`<script src="https://cdn.tailwindcss.com"></script>`)

### Os efeitos/animações não funcionam
- Verifique se as classes CSS estão presentes
- Em alguns builders, talvez você precise adicionar CSS customizado

### A gamificação não está funcionando
- O arquivo `07-gamification-dashboard.html` **precisa estar em TODAS as páginas**
- Não há limite de quantidade - coloque em todas as seções

### Links não funcionam
- Procure por `href="#"` e substitua por URLs reais
- Procure por `onclick="handleStartQuiz()"` e customize a ação

## Dicas Profissionais

1. **Use um plugin de cache CSS** para melhor performance
2. **Teste em mobile** antes de publicar
3. **Mantenha backup** dos arquivos originais
4. **Reutilize a estrutura** para outras páginas
5. **Customize o arquivo `07-gamification-dashboard.html`** para adicionar mais achievements

## Arquivo de Teste Completo

Se quiser testar TUDO junto primeiro, use `landing-page-complete.html` - é o arquivo completo em um só lugar.

---

**Dúvidas?** Cada arquivo está claramente comentado no início com a descrição do que contém.
