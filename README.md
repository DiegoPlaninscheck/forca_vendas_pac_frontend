# Front-End da Aplicação - CRUD com Keycloak

## 📋 Descrição

Este é o front-end de uma aplicação que realiza operações de **CRUD** (_Create, Read, Update, Delete_) integradas com uma **API REST**. A aplicação utiliza **autenticação e autorização via [Keycloak](w)** para garantir segurança e controle de acesso.

---

## 🚀 Funcionalidades

- Formulário de cadastro com operações:
  - **GET**
  - **POST**
  - **PUT**
  - **DELETE**
- Autenticação de usuários via **Keycloak**
- Autorização baseada em **roles**, com validações refletidas no front-end
- Controle dinâmico de botões e ações com base nas permissões do usuário

---

## ✅ Pré-requisitos

Antes de executar o front-end, certifique-se de ter:

- [Node.js](w) (recomenda-se a versão **LTS**)
- `npm` (vem junto com o Node.js) ou [`Yarn`](w) (opcional)
- Um servidor **Keycloak** configurado com:
  - Realm específico para a aplicação
  - Clientes configurados para o **front-end** e para a **API**
  - Roles criadas para cada método da API (**GET, POST, PUT, DELETE**)
  - Usuários com as **roles** apropriadas

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone <url-do-repositório>
cd <pasta-do-repositório>



Instale as Dependências:
npm install
# ou
yarn install

Configure o Keycloak:

No arquivo de configuração do Keycloak (keycloak.json ou keycloak-config.js), insira as informações do seu servidor, como:

realm

clientId

url do servidor Keycloak

▶️ Executando a Aplicação
Para iniciar o front-end, execute:
npm start
# ou
yarn start

A aplicação estará disponível no navegador em:
👉 http://localhost:3000


🔐 Funcionalidades de Autenticação e Autorização
🔑 Autenticação
O usuário deve fazer login via Keycloak para acessar o formulário

Após o login, um token JWT é obtido e usado para autenticar as requisições à API

🔒 Autorização
O front-end verifica as roles do usuário para habilitar ou desabilitar botões e ações

As permissões são validadas também na API, e o front-end reflete essas validações
```
