# Roof calculator

## Services
All services containerized using Docker.

- API: Node w/AdonisJS
- Frontend: ReactJS
- DB: MariaDB
- Reverse-proxy: Nginx (jwilder/nginx Docker image)

## Requirements
- Docker/docker-compose

## Starting
Add URL's to /etc/hosts (linux)
```bash
127.0.0.1 api.tak.local
127.0.0.1 db.tak.local
127.0.0.1 tak.local
```

Run the following command:
```bash
docker-compose up
```
