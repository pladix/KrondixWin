# 🎰 KrondixWin - Caixas Misteriosas & Login via Telefone

## Sobre o Projeto

**KrondixWin** é um sistema desenvolvido para aqueles que desejam criar cassinos online e sistemas de jogos de azar personalizados. O projeto permite diversas modificações e atualmente está baseado em **VITE + ReactJS**, utilizando o framework **TailwindCSS** para uma interface moderna, bonita e organizada.

## 🔥 Recursos

- 📱 **Autenticação via número de telefone**
- 📜 **Histórico de jogos**
- 🔍 **Consulta de jogos por hash**, permitindo verificar:
  - Situação da jogatina
  - Se houve vitória ou não
  - Data da jogada
  - Outros detalhes importantes
- 💾 **Sistema de armazenamento de informações dos usuários e históricos de jogos no servidor local** (pasta `src/data`)
- ⚙️ **Configuração de manipulação do jogo via `.env`**
  - No arquivo `.env`, você pode configurar a manipulação do jogo através da variável:
    ```sh
    VITE_GAME_MANIPULATION=
    ```
  - Definindo como `false`, o jogo ocorre normalmente, gerando cartões de caixas misteriosas aleatoriamente.
  - Definindo como `true`, o jogador sempre perderá, sem qualquer possibilidade de vitória enquanto esse modo estiver ativado.

## 🚀 Tecnologias Utilizadas

- **VITE**
- **ReactJS**
- **TailwindCSS**

## 📥 Instalação no Windows via Node.js

1. Certifique-se de ter o **Node.js** instalado.
2. No terminal, execute o seguinte comando para instalar as dependências:
   ```sh
   npm install
   ```
3. Para iniciar o modo de desenvolvimento, utilize:
   ```sh
   npm run dev
   ```
4. Para rodar o sistema no modo de produção, utilize:
   ```sh
   npm run build
   ```

## 🛠 Contribuições & Feedback

Agradeço a todos pelos feedbacks! Caso encontre **bugs ou queira sugerir melhorias**, entre em contato.

📩 **Contato:** [t.me/pladixoficial](https://t.me/pladixoficial)
