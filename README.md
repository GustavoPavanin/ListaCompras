# ListaCompras
Aplicação de lista de compras de supermercado com React + Spring Boot + PostgreSQL.

## 🚀 Executar com Docker (Recomendado)

Subir toda a aplicação (frontend, backend e banco de dados) com um único comando:

```bash
docker-compose up --build
```

Acesse:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api/shopping-lists

Para parar:
```bash
docker-compose down
```

Para parar e remover volumes (apaga dados do banco):
```bash
docker-compose down -v
```

## 🛠️ Desenvolvimento Local

### Requisitos
- Node.js 20+
- Java 17+
- PostgreSQL 15+
- Maven

### 1. Banco de Dados
```bash
# Criar banco de dados no PostgreSQL
createdb listacompras
```

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend rodando em http://localhost:8080

### 3. Frontend
```bash
cd frontend
npm install
npm start
```
Frontend rodando em http://localhost:3000

## 📁 Estrutura

```
ListaCompras/
├── backend/          # Spring Boot + JPA + PostgreSQL
├── frontend/       # React + Material-UI
├── docker-compose.yml
└── README.md
```

## 🔧 Tecnologias

- **Frontend**: React 19, Material-UI, React Router
- **Backend**: Spring Boot 4, Spring Data JPA
- **Banco**: PostgreSQL
- **Docker**: Multi-stage builds, Docker Compose
