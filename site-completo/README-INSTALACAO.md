# DestravaAI - Site Completo

Este é o código completo do site DestravaAI, um quiz gamificado para diagnóstico de procrastinação.

## 🚀 Como instalar e executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone ou baixe este código**
2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o projeto em desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

### Build para produção

```bash
npm run build
```

Os arquivos de produção ficarão na pasta `dist/`.

## 📁 Estrutura do Projeto

```
site-completo/
├── src/
│   ├── components/           # Componentes principais
│   │   ├── landing-destrava-ai.tsx
│   │   ├── quiz-destrava-ai-new.tsx
│   │   └── gamification-layer-refined.tsx
│   ├── pages/               # Páginas do quiz e landing
│   │   ├── landing/         # Seções da landing page
│   │   ├── quiz/            # Páginas individuais do quiz
│   │   └── shared/          # Componentes compartilhados
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── public/                  # Arquivos públicos
├── package.json             # Dependências e scripts
└── README-INSTALACAO.md     # Este arquivo
```

## 🎯 Funcionalidades

- **Landing Page** com seções de notícias, depoimentos e CTA
- **Quiz Gamificado** com 21 páginas interativas
- **Sistema de Gamificação** com XP, níveis e conquistas
- **Diagnóstico Personalizado** baseado nas respostas
- **Design Responsivo** otimizado para mobile e desktop
- **Animações Suaves** com Framer Motion

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **React Router** - Roteamento
- **Vite** - Build tool
- **Lucide React** - Ícones

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎨 Paleta de Cores

- **Primária:** `#2b1a4e` → `#4B2E83` (gradiente roxo)
- **Acento:** `#F25C54` (coral)
- **Texto:** `#FCEEE3` (bege claro)
- **Destaque:** `#C39BD3` (lilás)
- **CTA:** `#39FF88` (verde neon)

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do React e Vite.

---

**Desenvolvido com ❤️ para transformar vidas através da produtividade**