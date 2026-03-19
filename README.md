# 📋 Protocol Monitor

![React](https://img.shields.io/badge/React-Frontend-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/SpringBoot-Backend-green?logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Sistema web para **gerenciamento de protocolos de atendimento**, permitindo registrar, acompanhar e atualizar solicitações de pacientes entre diferentes unidades.

O sistema foi desenvolvido utilizando **React no frontend**, **Spring Boot no backend** e **MySQL como banco de dados**, com toda a aplicação containerizada utilizando **Docker**.

---

# 🚀 Funcionalidades

<ul>
<li>Cadastro de protocolos </li>
<li>Listagem paginada de protocolos</li>
<li>Edição de protocolos existentes</li>
<li>Atualização de status (pendente, em andamento, resolvido, suspenso)</li>
<li>Exclusão de protocolos</li>
<li>Observações com quebra de linha</li>
<li>Interface web simples e responsiva</li>
<li>Filtros por:</li>
<ul>

* status
* unidade
* data
* nome do paciente

---

# 🏗️ Arquitetura do Sistema

O sistema segue uma arquitetura **Frontend → Backend → Banco de dados**.

```
Usuário
   │
   │ HTTP
   ▼
+------------+
|   NGINX    |
|  Frontend  |
|   React    |
+------------+
      │
      │ /protocolos
      ▼
+-------------+
| Spring Boot |
|    API      |
+-------------+
      │
      │ JDBC
      ▼
+-------------+
|    MySQL    |
|  Database   |
+-------------+
```

---


# 📂 Estrutura do Projeto

```
protocol-monitor
│
├── back
│   └── protocol-monitor
│       ├── src
│       ├── pom.xml
│
├── front
│   ├── src
│   ├── nginx.conf
│   └── Dockerfile
│
├── docs
│   ├── arquitetura.png
│   ├── demo.gif
│   ├── lista-protocolos.png
│   └── editar-protocolo.png
│
├── docker-compose.yml
├── .env
└── README.md
```

---

# ⚙️ Tecnologias Utilizadas

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate

### Frontend

* React
* React Router
* Axios
* Nginx

### Banco de dados

* MySQL

### Infraestrutura

* Docker
* Docker Compose

---

# 🐳 Executando o Projeto com Docker

## 1️⃣ Clonar o repositório

```
git clone https://github.com/seu-usuario/protocol-monitor.git
cd protocol-monitor
```

---

## 2️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
MYSQL_DATABASE=protocol_monitor
MYSQL_USER=admin
MYSQL_PASSWORD=admin123
MYSQL_ROOT_PASSWORD=admin

SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/protocol_monitor
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=admin123
```

---

## 3️⃣ Subir os containers

```
docker compose up --build
```

---

## 4️⃣ Acessar a aplicação

Frontend:

```
http://localhost:5173
```

Backend API:

```
http://localhost:8080/protocolos
```

---

# 🔄 Comandos úteis

### Rebuild completo

```
docker compose down
docker compose up --build
```

### Ver logs

```
docker compose logs -f
```

### Parar containers

```
docker compose down
```

---

# 📌 Status do Projeto

🚧 Em desenvolvimento

---

# 📄 Licença

Este projeto está sob a licença **MIT**.

---

# 👨‍💻 Autor

Desenvolvido por **Douglas Silva**
