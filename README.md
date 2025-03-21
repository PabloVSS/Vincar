# Vincar
 
# Nome do Projeto: [Nome do seu Aplicativo de Caronas]

## Descrição

Vincar é um aplicativo desenvolvido como um projeto de portfolio, com o objetivo de conectar pessoas que estão indo no mesmo trajetos e querem reduzir custos. O projeto tem duas partes Principais:

-   Backend: API RESTful desenvolvida com o Node.JS com express, utilizando o Prisma para gestão do Banco de Dados.
-   Frontend Mobile: Aplicação mobile desenvolvida em React native e expo.

## Funcionalidades Principais

-   **Solicitação de Carona:** Passageiros podem solicitar caronas, especificando o local de partida e destino.
-   **Aceitação de Carona:** Motoristas podem aceitar solicitações de carona, visualizando detalhes da viagem e do passageiro.
-   **Histórico de Viagens:** Os usuários podem visualizar seu histórico de viagens, tanto o passageiro, quanto o motorista.

## Tecnologias Utilizadas

### Backend

-   **Linguagem:**  Node.js
-   **Framework:** Express.js
-   **Banco de Dados:** Sqlite
-   **Autenticação:** JWT (JSON Web Tokens) para autenticação
-   **Criptografia de Senha:** Bcrypt 
-   **API:** RESTful API
-   **Outras Tecnologias:** Prisma

### Frontend Mobile

-   **Framework:** React Native
-   **Linguagem:** JavaScript/TypeScript
-   **Mapas:** React Native Maps
-   **Outras Bibliotecas:**     
    -   Axios: Para requisições HTTP.
    -   AsyncStorage: Para armazenar dados de forma persistente no dispositivo.
    -   React Navigation: Para gerenciar navegação entre telas.
    -   React Native Gesture Handler: Para gerenciar gestos no aplicativo.
    -   React Native Reanimated: Para animações fluídas e de alto desempenho.

## Estrutura do Projeto

# Configuração e Execução

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node.js](https://nodejs.org/) 
- [Expo CLI](https://docs.expo.dev/get-started/installation/) 
- [Prisma CLI](https://www.prisma.io/docs/getting-started) 
- [SQLite](https://www.sqlite.org/)
-  Clone o repositório:

    ```bash
    git clone <URL_DO_SEU_REPOSITÓRIO>
    ```

    Substitua `<URL_DO_SEU_REPOSITÓRIO>` pela URL do seu repositório Git.

## Backend

1.  Navegue até o diretório do projeto:

    ```bash
    cd vincar-api
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3. Crie o Banco de Dados com o Prisma
    ```bash
    npx prisma migrate dev --name init

    ```

4.  Inicie o servidor de desenvolvimento Expo:

    ```bash
    npx run dev 
    ```

## Frontend mobile


1.  Navegue até o diretório do projeto:

    ```bash
    cd vincar-mobile
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Inicie o servidor de desenvolvimento Expo:

    ```bash
    npx expo start
    ```

# Telas do Aplicativo

- Tela Inicial
  
![inicial](https://github.com/user-attachments/assets/50800375-2303-4d7d-a09c-633dc2ed1140)

- Tela de Cadastro

  ![cadastrar](https://github.com/user-attachments/assets/b2fa1dc7-bf27-41d0-9a83-943041282222)

- Tela de resetar Senha

![reset_senha](https://github.com/user-attachments/assets/6177b835-86b5-455b-8629-5f7b7a2c5329)

![reset_senha2](https://github.com/user-attachments/assets/0c91ece2-6392-423e-a05e-22330bf0cfd3)

- Tela de Login

![login](https://github.com/user-attachments/assets/c780cb45-0fe1-4267-a263-45db9d2a441c)

- Tela de Passageiro

![passageiro](https://github.com/user-attachments/assets/cab8db36-f7d9-4309-854e-325c27f672f4)

- Tela de Corridas

![corridas](https://github.com/user-attachments/assets/d3b22d17-a818-4290-a0b6-de6236f5522b)

- Tela de Historico

![historico](https://github.com/user-attachments/assets/d604e355-1adc-4631-afe1-81991b9fc24a)

- Tela de Perfil

![perfil](https://github.com/user-attachments/assets/44f55c39-09e8-4530-9bf8-f9041f9de425)


# Aprendizado

O projeto me ajudou a entender o processo completo de desenvolvimento de software, desde o Backend até o Frontend.

No Backend, aprendi sobre a criação de APIs, rotas e segurança de dados.

No React Native, explorei o uso de hooks, o ciclo de vida dos componentes e como cada um influencia o projeto.

Ainda há espaço para melhorias e correções, mas o projeto me deu uma boa visão do desenvolvimento e mostrou minha capacidade de criar projetos.

O maior desafio do projeto foi lidar com sua complexidade e encontrar um equilíbrio para não gerar problemas durante a criação. Como é um projeto de portfólio, meu objetivo era mostrar o que sei, mas também torná-lo útil, como um projeto real seria.

No final, estou satisfeito com o resultado. Consegui realizar tudo o que planejei e ainda deixei espaço para expandir o projeto no futuro.


## 🚀 Contato

Pablo Vinícius Sousa Silva - sviniciuspablo@gmail.com
https://www.linkedin.com/in/pabloviniciusss/
https://github.com/PabloVSS

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

