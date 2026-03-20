# Job Simulator — Tennis Players API

## Descripción

API REST con operaciones CRUD completas para gestionar jugadores de tenis profesionales. Construida con Node.js y Express, con persistencia en PostgreSQL y entorno completamente containerizado con Docker.

## Dominio

El recurso principal es **players** (jugadores de tenis), con los siguientes campos:

| Campo | Nombre real | Tipo | Descripción |
|---|---|---|---|
| id | ID | integer | Clave primaria, autoincremental |
| campo1 | Nombre | string | Nombre completo del jugador |
| campo2 | Nacionalidad | string | País de origen |
| campo3 | Mano Dominante | string | Derecha o Zurda |
| campo4 | Edad | integer | Edad del jugador |
| campo5 | Puntos ATP | float | Puntos en el ranking ATP |
| campo6 | Grand Slam | boolean | Si ha ganado algún Grand Slam |

## Stack

- **Lenguaje:** JavaScript (Node.js)
- **Framework:** Express
- **Base de datos:** PostgreSQL 16
- **Containerización:** Docker + Docker Compose

## Requisitos

- Docker Desktop instalado y corriendo

## Cómo levantar el sistema

1. Clona el repositorio:
```bash
   git clone https://github.com/tu-usuario/job-simulator.git
   cd job-simulator
```

2. Copia el archivo de variables de entorno:
```bash
   cp .env.example .env
```

3. Levanta el sistema:
```bash
   docker compose up --build
```

4. Accede a:
   - **Frontend:** http://localhost:8088
   - **API:** http://localhost:8080/players

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /players | Obtiene todos los jugadores |
| GET | /players/:id | Obtiene un jugador por ID |
| POST | /players | Crea un jugador nuevo |
| PUT | /players/:id | Actualiza un jugador completo |
| PATCH | /players/:id | Actualiza campos específicos |
| DELETE | /players/:id | Elimina un jugador |

## Variables de entorno
```env
DB_HOST=db
DB_PORT=5432
DB_NAME=jobsimulator
DB_USER=usuario
DB_PASSWORD=password123
APP_PORT=8080
```


## Estructura del proyecto
```
job-simulator/
├── frontend/          # Cliente web (nginx)
├── api/
│   ├── src/
│   │   ├── db.js      # Configuración de base de datos
│   │   ├── routes.js  # Definición de endpoints
│   │   └── server.js  # Punto de entrada
│   ├── init.sql       # Script de inicialización de BD
│   ├── package.json
│   └── Dockerfile
├── .env
├── .env.example
├── .gitignore
└── docker-compose.yml
```
