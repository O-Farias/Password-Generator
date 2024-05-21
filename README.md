# Gerador de Senhas

Este é um projeto de Gerador de Senhas desenvolvido com React e Vite. O gerador de senhas permite criar senhas seguras com diferentes critérios e possui funcionalidades adicionais como a exibição de partículas animadas e um histórico de senhas geradas.

## Funcionalidades

- Geração de senhas com diferentes critérios:
  - Letras maiúsculas
  - Números
  - Símbolos
- Exibição da força da senha gerada (Fraca, Média, Forte)
- Cópia da senha gerada para a área de transferência
- Histórico de senhas geradas
- Limpeza do histórico de senhas
- Partículas animadas que aparecem gradualmente conforme o usuário clica na tela

## Tecnologias Utilizadas

- React
- Vite
- Tailwind CSS
- react-icons
- react-tsparticles
- LocalStorage (para armazenar o histórico de senhas)

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- npm instalado

### Passos para Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/O-Farias/Password-Generator.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd Password-Generator
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra seu navegador e acesse:

   ```bash
   http://localhost:3000
   ```

### Estrutura do Projeto

gerador-de-senhas
│ README.md
│ package.json
│ vite.config.js
│
├───public
│ favicon.ico
│ index.html
│
└───src
App.jsx
index.css
main.jsx

## Detalhes de Implementação

### App.jsx

- Implementa a lógica principal do gerador de senhas.
- Usa `useState` e `useEffect` para gerenciar o estado da aplicação.
- Contém funções para gerar senhas, verificar a força da senha, copiar para a área de transferência e gerenciar o histórico.
- Inclui a configuração de partículas com `react-tsparticles`.

### Partículas Animadas

- A configuração das partículas está localizada dentro do componente `App.jsx`.
- As partículas aumentam gradualmente conforme o usuário clica na tela.

### Estilo

- O estilo da aplicação é gerenciado com Tailwind CSS.
- A estrutura do estilo está definida no arquivo `index.css`.

### Favicon

- Um ícone de cadeado é usado como favicon.
- O favicon está localizado na pasta `public` e é referenciado no arquivo `index.html`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
