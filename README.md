# Auction Platform - Back-end (API)

API RESTful desenvolvida em **NestJS** para a gestão de leilões online, carteiras virtuais de licitantes e controle transacional de lances com **PostgreSQL**.

---

## 🚀 Tecnologias Utilizadas

* **Framework:** NestJS (Node.js & TypeScript)
* **ORM:** TypeORM
* **Banco de Dados:** PostgreSQL (Hospedado via Supabase Connection Pooler)
* **Autenticação:** JWT (JSON Web Tokens) & Passport
* **Hospedagem / Deploy:** Render

---

## 📌 Principais Funcionalidades

- **Autenticação & Controle de Usuários:** Cadastro e login via JWT com suporte a papéis (Licitante / Leiloeiro).
- **Gestão de Carteira Virtual:** Controle de saldo disponível e cálculo de saldo comprometido em lances ativos.
- **Gestão de Leilões:** Criação, listagem e acompanhamento de leilões.
- **Mecanismo de Lances:**
  - Garantia de atomidade em transações de lances.
  - Validação estrita de valor (o lance atual deve superar o valor vigente).
  - Bloqueio de lances sem saldo suficiente na carteira.
  - Padronização de fusos horários via UTC (`timestamptz`).

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto back-end com as seguintes variáveis:

```env
PORT=3000
DATABASE_URL=postgresql://postgres.seu_projeto:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET=sua_chave_secreta_jwt_aqui
FRONTEND_URL=https://auction-frontend-sable.vercel.app
```

> **Nota de Configuração de Banco:** Para evitar travamentos em conexões puramente IPv4 no ambiente de nuvem (Render), utilize a porta do Transaction Pooler do Supabase (`6543`).

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
* Node.js (v18+)
* npm ou yarn
* Instância do PostgreSQL ativa (ou Supabase)

### Passo a Passo

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o arquivo `.env`** na raiz do projeto seguindo a seção de Variáveis de Ambiente.

3. **Inicie a aplicação em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. A API estará acessível em `http://localhost:3000`.

---

## 🌐 Deploy em Produção

* **Back-end (Render):** `https://auction-backend-indc.onrender.com`
* **Front-end (Vercel):** `https://auction-frontend-sable.vercel.app`

> ⚠️ **Nota de Desempenho (Plano Gratuito do Render):** 
> Como o back-end está hospedado na camada gratuita do Render, a instância entra em modo de hibernação após períodos de inatividade. Por esse motivo, **a primeira requisição à API pode levar entre 30 e 60 segundos** para "acordar" o servidor. As requisições subsequentes responderão em tempo real e com velocidade normal.

---

## 🔑 Credenciais para Teste Rápido em Produção (Dados Semeados)

Para avaliar o sistema sem a necessidade de criar novas contas e lotes do zero, utilize os acessos pré-cadastrados abaixo:

### 1. Leiloeiro
* **E-mail:** leiloeiro@email.com
* **Senha:** Leiloeiro123!
* **Papel:** Gestão e criação de leilões/lotes.

### 2. Licitante 1 (Comprador 1)
* **Nome:** Comprador Um
* **E-mail:** licitante1@email.com
* **Senha:** Licitante123!

### 3. Licitante 2 (Comprador 2)
* **Nome:** Comprador Dois
* **E-mail:** licitante2@email.com
* **Senha:** Licitante223!

### 4. Lote Ativo no Ar
* **Item:** iPhone X
* **Status:** Lances Abertos
* **Valor Inicial:** R$ 899,99
